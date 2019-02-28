<?php
	session_start();
	$username = $_SESSION['Username'];
	$account = json_decode(file_get_contents("../source/cfg/account.config"), true);
	$token = json_decode(file_get_contents("../source/cfg/token.config"), true);
	if(!empty($token["time"]) && time() - $token["time"] > 604800) {
		$token["key"] = str_shuffle(hash("sha512", str_shuffle(time())));
		$token["time"] = "";
		$json = json_encode($token);
		$write = file_put_contents("../source/cfg/token.config", $json);
		setcookie("x-notes-remember-me", null, -1, "/");
	}
	if(isset($_COOKIE['x-notes-remember-me']) && $_COOKIE['x-notes-remember-me'] == $token["key"] && !empty($token["time"])) {
		$token_valid = true;
	}
	$valid_username = $account["username"];
	if(strtolower($username) == strtolower($valid_username) or $token_valid) {
		$logged_in = true;
	}
	
	$action = $_POST['action'];
	
	if($logged_in) {
		include "./detect_device.php";
		if($user_agent_mobile) {
			$mobile = true;
		}
		
		function get_notes($format) {
			include "../assets/function_icons.php";
			$files = glob("../files/*.xnt");
			array_multisort(array_map('filemtime', $files), SORT_NUMERIC, SORT_DESC, $files);
			
			$file_list = array();
			
			foreach($files as $file) {
				$file_content = json_decode(file_get_contents($file), true);
				$note_title = $file_content["title"];
				$note_file = $file_content["file_name"];
				$note_time_modified = $file_content["time_modified"];
				$note_time_modified_formatted = date('jS \O\f F, Y - g:i A', $note_time_modified);
				$note_locked = $file_content["locked"];
				$note_shared = $file_content["shared"];
				$note_status_lock = $unlocked_icon;
				$note_status_shared = "";
				$note_state_locked = "unlocked-note";
				$note_state_shared = "unshared-note";
				$note_tag_locked = "";
				$note_tag_shared = "";
				if($note_locked) {
					$note_status_lock = $locked_icon;
					$note_state_locked = "locked-note";
					$note_tag_locked = "| #locked-note |";
				}
				if($note_shared) {
					$note_status_shared = $globe_icon;
					$note_state_shared = "shared-note";
					$note_tag_shared = "| #shared-note |";
				}
				if($format == "html") {
					echo '<div class="note-wrapper" id="n-' . $note_file . '" data-locked="' . $note_state_locked . '" data-shared="' . $note_state_shared . '">
						<div class="note-container">
							<div class="note-title-wrapper">
								<span class="note-title">' . $note_title . '</span>
							</div>
							<div class="note-date-wrapper">
								<span class="note-date">' . $note_time_modified_formatted . '</span>
							</div>
							<div class="note-status-wrapper">
								' . $note_status_lock . $note_status_shared . '
							</div>
						</div>
						<div class="note-tags">' . $note_tag_locked . $note_tag_shared . '</div>
					</div>';
				}
				if($format == "json") {
					$item = array("title" => $note_title, "locked" => $note_locked, "shared" => $note_shared, "time_modified" => $note_time_modified_formatted);
					$file_list[substr($note_file, 0, -4)] = $item;
				}
			}
			
			if($format == "json") {
				if(!empty($file_list)) {
					echo json_encode($file_list);
				}
				else {
					echo "empty";
				}
			}
		}
		
		if($action == "get-notes") {
			get_notes("html");
		}
		if($action == "list-notes") {
			get_notes("json");
		}
		if($action == "open-note") {
			$file = $_POST['file'];
			if(!empty($_POST['password'])) {
				$password = $_POST['password'];
			}
			$note = json_decode(file_get_contents("../files/" . $file), true);
			$valid_password = $note["password"];
			$locked = $note["locked"];
			if($locked) {
				if(password_verify($password, $valid_password)) {
					if(!empty($note["content"])) {
						include "./aes.php";
						$encrypted = $note["content"];
						$aes = new AES($encrypted, $password, 256);
						$decrypted = $aes->decrypt();
						echo $decrypted;
					}
				}
				else {
					echo "incorrect";
				}
			}
			else {
				echo $note["content"];
			}
		}
		if($action == "get-config") {
			$config = file_get_contents("../source/cfg/preferences.config");
			echo $config;
		}
	}
	
	if($action == "view-note") {
		$file = substr($_POST['id'], 2) . ".xnt";
		if(!empty($_POST['password'])) {
			$password = $_POST['password'];
		}
		$note = json_decode(file_get_contents("../files/" . $file), true);
		$valid_password = $note["password"];
		$locked = $note["locked"];
		$shared = $note["shared"];
		if($shared) {
			if($locked) {
				if(password_verify($password, $valid_password)) {
					if(!empty($note["content"])) {
						include "./aes.php";
						$encrypted = $note["content"];
						$aes = new AES($encrypted, $password, 256);
						$decrypted = $aes->decrypt();
						$output = ["title" => $note["title"], "content" => $decrypted];
						echo json_encode($output);
					}
				}
				else {
					echo "incorrect";
				}
			}
			else {
				$output = ["title" => $note["title"], "content" => $note["content"]];
				echo json_encode($output);
			}
		}
	}
	
	if($action == "get-placeholders") {
		$files = glob("../files/*.xnt");
		array_multisort(array_map('filemtime', $files), SORT_NUMERIC, SORT_DESC, $files);
		
		foreach($files as $file) {
			$note = json_decode(file_get_contents($file), true);
			$title = $note["title"];
			$shared = $note["shared"];
			$shared_placeholder = "";
			if($shared) {
				$shared_placeholder = '<div class="note-icon-placeholder-left"></div>';
			}
			$characters = strlen($title);
			$length = $characters * 15;
			if($length > 260) {
				$length = 215;
			}
			echo '<div class="note-wrapper-placeholder">
				<div class="note-container-placeholder">
					<div class="note-title-wrapper-placeholder">
						<div class="note-title-placeholder" style="width:' . $length . 'px;"></div>
					</div>
					<div class="note-date-wrapper-placeholder">
						<div class="note-date-placeholder" style="width:200px;"></div>
					</div>
					<div class="note-status-wrapper-placeholder">'
						. $shared_placeholder . '<div class="note-icon-placeholder-right"></div>
					</div>
				</div>
			</div>';
		}
	}
?>