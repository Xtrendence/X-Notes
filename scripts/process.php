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
	$valid_password = $account["password"];
	if(strtolower($username) == strtolower($valid_username) or $token_valid) {
		$logged_in = true;
	}
	
	$action = $_POST['action'];
	
	if($action == "login") {
		if(!empty($_POST['username']) && !empty($_POST['password'])) {			
			$username = strtolower($_POST['username']);
			$password = $_POST["password"];
			$remember = $_POST["remember"];
			
			if(strtolower($username) == strtolower($valid_username) && password_verify($password, $valid_password)) {
				$_SESSION['Username'] = $valid_username;
				
				$token["key"] = str_shuffle(hash("sha512", str_shuffle(time())));
				
				if($remember == "true") {
					$token["time"] = time();
					setcookie("x-notes-remember-me", $token["key"], time() + 604800, "/");
				}
				else {
					$token["time"] = "";
					setcookie("x-notes-remember-me", null, -1, "/");
				}
				
				$json = json_encode($token);
				$write = file_put_contents("../source/cfg/token.config", $json);
				echo "done";
			}
			else {
				echo "Invalid credentials.";
			}
		}
		else {
			echo "Please fill out both input fields.";
		}
	}
	if($action == "logout") {
		session_start();
		session_destroy();
		$_SESSION = array();
		$token["key"] = str_shuffle(hash("sha512", str_shuffle(time())));
		$token["time"] = "";
		$json = json_encode($token);
		$write = file_put_contents("../source/cfg/token.config", $json);
		if(empty($_SESSION)) {
			echo "done";	
		}
	}
	
	if($logged_in) {
		if($action == "create-note") {
			$title = $_POST['title'];
			if(empty(trim($title))) {
				$title = "Undefined Title";
			}
			$file_name = time() . "-" . md5(str_shuffle(time())) . ".xnt";
			$file_content = ["time_created" => time(), "time_modified" => time(), "file_name" => $file_name, "locked" => false, "shared" => false, "password" => "", "author" => $valid_username, "title" => $title, "content" => ""];
			if(!file_exists("../files/" . $file_name)) {
				$handle = fopen("../files/" . $file_name, "w");
				$write = fwrite($handle, json_encode($file_content));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "rename-note") {
			$title = $_POST['title'];
			$file = "../files/" . $_POST['file'];
			if(empty(trim($title))) {
				$title = "Undefined Title";
			}
			$current = json_decode(file_get_contents($file), true);
			$locked = $current["locked"];
			if($locked) {
				if(!empty($_POST['password'])) {
					$password = $_POST['password'];
					$valid_password = $current['password'];
					if(password_verify($password, $valid_password)) {
						$current["title"] = $title;
						$current["time_modified"] = time();
						$handle = fopen($file, "w");
						$write = fwrite($handle, json_encode($current));
						if($write !== false) {
							echo "done";
						}
					}
				}
			}
			else {
				$current["title"] = $title;
				$current["time_modified"] = time();
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "save-note") {
			$file = "../files/" . $_POST['file'];
			$text = $_POST['text'];
			$current = json_decode(file_get_contents($file), true);
			$locked = $current["locked"];
			if($locked) {
				if(!empty($_POST['password'])) {
					$password = $_POST['password'];
					$valid_password = $current['password'];
					include "./aes.php";
					if(password_verify($password, $valid_password)) {
						$aes = new AES($text, $password, 256);
						$encrypted = $aes->encrypt();
						$current["content"] = $encrypted;
						if($current["content"] != $text) {
							$current["time_modified"] = time();
						}
						$handle = fopen($file, "w");
						$write = fwrite($handle, json_encode($current));
						if($write !== false) {
							echo "done";
						}
					}
				}
			}
			else {
				$current["content"] = $text;
				if($current["content"] != $text) {
					$current["time_modified"] = time();
				}
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "delete-note") {
			$file = "../files/" . $_POST['file'];
			$bypass = $_POST['bypass'];
			if($bypass) {
				$delete = unlink($file);
				if($delete) {
					echo "done";
				}
			}
			else {
				$current = json_decode(file_get_contents($file), true);
				$locked = $current["locked"];
				if($locked) {
					if(!empty($_POST['password'])) {
						$password = $_POST['password'];
						$valid_password = $current['password'];
						if(password_verify($password, $valid_password)) {
							$delete = unlink($file);
							if($delete) {
								echo "done";
							}
						}
					}
				}
				else {
					$delete = unlink($file);
					if($delete) {
						echo "done";
					}
				}
			}
		}
		if($action == "lock-note") {
			include "./aes.php";
			$file = "../files/" . $_POST['file'];
			$password = $_POST['password'];
			$current = json_decode(file_get_contents($file), true);
			if(!$current["locked"]) {
				$text = $current["content"];
				if(!empty($text)) {
					$aes = new AES($text, $password, 256);
					$encrypted = $aes->encrypt();
					$current["content"] = $encrypted;
				}
				$current["locked"] = true;
				$current["time_modified"] = time();
				$current["password"] = password_hash($password, PASSWORD_BCRYPT);
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "unlock-note") {
			include "./aes.php";
			$file = "../files/" . $_POST['file'];
			$password = $_POST['password'];
			$current = json_decode(file_get_contents($file), true);
			$valid_password = $current["password"];
			if(password_verify($password, $valid_password)) {
				if(!empty($current["content"])) {
					$encrypted = $current["content"];
					$aes = new AES($encrypted, $password, 256);
					$decrypted = $aes->decrypt();
					$current["content"] = $decrypted;
				}
				$current["locked"] = false;
				$current["time_modified"] = time();
				$current["password"] = "";
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "relock-note") {
			include "./aes.php";
			$file = "../files/" . $_POST['file'];
			$current_password = $_POST['current_password'];
			$new_password = $_POST['new_password'];
			$current = json_decode(file_get_contents($file), true);
			$valid_password = $current["password"];
			if(password_verify($current_password, $valid_password)) {
				$encrypted = $current["content"];
				$aes = new AES($encrypted, $current_password, 256);
				$decrypted = $aes->decrypt();
				$aes = new AES($decrypted, $new_password, 256);
				$encrypted = $aes->encrypt();
				$current["content"] = $encrypted;
				$current["time_modified"] = time();
				$current["password"] = password_hash($new_password, PASSWORD_BCRYPT);
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "publicize-note") {
			$file = "../files/" . $_POST['file'];
			$current = json_decode(file_get_contents($file), true);
			$locked = $current["locked"];
			if($locked) {
				if(!empty($_POST['password'])) {
					$password = $_POST['password'];
					$valid_password = $current['password'];
					if(password_verify($password, $valid_password)) {
						$current["shared"] = true;
						$current["time_modified"] = time();
						$handle = fopen($file, "w");
						$write = fwrite($handle, json_encode($current));
						if($write !== false) {
							echo "done";
						}
					}
				}
			}
			else {
				$current["shared"] = true;
				$current["time_modified"] = time();
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "privatize-note") {
			$file = "../files/" . $_POST['file'];
			$current = json_decode(file_get_contents($file), true);
			$locked = $current["locked"];
			if($locked) {
				if(!empty($_POST['password'])) {
					$password = $_POST['password'];
					$valid_password = $current['password'];
					if(password_verify($password, $valid_password)) {
						$current["shared"] = false;
						$current["time_modified"] = time();
						$handle = fopen($file, "w");
						$write = fwrite($handle, json_encode($current));
						if($write !== false) {
							echo "done";
						}
					}
				}
			}
			else {
				$current["shared"] = false;
				$current["time_modified"] = time();
				$handle = fopen($file, "w");
				$write = fwrite($handle, json_encode($current));
				if($write !== false) {
					echo "done";
				}
			}
		}
		if($action == "raw-data") {
			$file = $_POST['file'];
			if(!empty($_POST['password'])) {
				$password = $_POST['password'];
			}
			$note = json_decode(file_get_contents("../files/" . $file), true);
			$valid_password = $note["password"];
			$locked = $note["locked"];
			if($locked) {
				if(password_verify($password, $valid_password)) {
					echo json_encode($note);
				}
				else {
					echo "incorrect";
				}
			}
			else {
				$note["file_name"] = "REDACTED";
				echo json_encode($note);
			}
		}
		if($action == "save-settings") {
			$config = $_POST["config"];
			$write = file_put_contents("../source/cfg/preferences.config", $config);
			if($write) {
				echo "done";
			}
		}
		if($action == "reset-settings") {
			$config = array("appearance" => array("theme" => "light", "note-icons" => "colored", "formatting-buttons" => "square", "search-box" => "visible", "separators" => "visible"), "behavior" => array("reopen-notes" => "automatically", "tooltips" => "enabled", "default-settings-page" => "appearance", "notifications" => "enabled"));
			$json = json_encode($config);
			$write = file_put_contents("../source/cfg/preferences.config", $json);
			if($write) {
				echo "done";
			}
		}
		if($action == "change-username") {
			if(!empty($_POST['username']) && !empty($_POST['password'])) {
				$posted_username = $_POST['username'];
				$posted_password = $_POST['password'];
				if(password_verify($posted_password, $valid_password)) {
					if(ctype_alnum($posted_username)) {
						$account["username"] = $posted_username;
						$json = json_encode($account);
						file_put_contents("../source/cfg/account.config", $json);
						echo "done";
					}
					else {
						echo "Username can only have letters and numbers.";
					}
				}
				else {
					echo "Wrong password.";
				}
			}
			else {
				echo "Please fill out both fields.";
			}
		}
		if($action == "change-password") {
			if(!empty($_POST['current_password']) && !empty($_POST['new_password'])) {
				$posted_current_password = $_POST['current_password'];
				$posted_new_password = $_POST['new_password'];
				if(password_verify($posted_current_password, $valid_password)) {
					$hashed = password_hash($posted_new_password, PASSWORD_BCRYPT);
					$account["password"] = $hashed;
					$json = json_encode($account);
					file_put_contents("../source/cfg/account.config", $json);
					echo "done";
				}
				else {
					echo "Wrong password.";
				}
			}
			else {
				echo "Please fill out all fields.";
			}
		}
		if($action == "delete-all-notes") {
			if(!empty($_POST['password'])) {
				$posted_password = $_POST['password'];
				if(password_verify($posted_password, $valid_password)) {
					$files = glob("../files/*.xnt");
					foreach($files as $file) {
						unlink($file);
					}
					$notes = glob("../files/*.xnt");
					if(empty($notes)) {
						echo "done";
					}
					else {
						echo "Files couldn't be deleted.";
					}
				}
				else {
					echo "Incorrect password.";
				}
			}
			else {
				echo "Please fill out the password field.";
			}
		}
	}
?>