<?php
	include "./assets/function_icons.php";
	
	$share_id = $_SERVER['QUERY_STRING'];
	$file = substr($share_id, 2) . ".xnt";
	$note = json_decode(file_get_contents("./files/" . $file), true);
	$shared = $note["shared"];
	$locked = $note["locked"];
	if($shared) {
		if($locked) {
			$title_text = "Password Required";
			$body_content = '<div class="form-wrapper"><input type="password" class="password" placeholder="Password..."><button type="button" class="submit">Unlock</button></div>';
		}
		else {
			$title_text = $note["title"];
			$body_content = $note["content"];
		}
	}
	else {
		$title_text = "Error";
		$body_content = "You either entered an invalid link, or the note you're trying to access is a private one.";
	}
	
	include "./scripts/detect_device.php";
	if($user_agent_mobile) {
		$device = "mobile";
	}
	else {
		$device = "desktop";
	}
	
	$domain = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
?>
<!-- Copyright <?php echo date('Y'); ?> © Xtrendence -->
<!DOCTYPE html>
<html>
	<head>
		<script src="./source/js/jquery.js"></script>
		<script src="./source/js/view.js?<?php echo time(); ?>"></script>
		<link rel="stylesheet" href="./source/css/view.css?<?php echo time(); ?>">
		<link rel="stylesheet" href="./source/css/resize.css?<?php echo time(); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<title><?php echo $title_text; ?></title>
	</head>
	
	<body id="<?php echo $device; ?>" data-domain="<?php echo $domain; ?>">
		<div class="title-wrapper light noselect">
			<div class="title-container light"><span class="title-text"><?php echo $title_text; ?></span></div>
			<?php echo $moon_icon; ?>
			<?php echo $sun_icon; ?>
		</div>
		<div class="body-wrapper light" data-si="<?php echo $share_id; ?>">
			<?php echo $body_content; ?>
		</div>
		<div class="notification-area"></div>
	</body>
</html>