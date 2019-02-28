$(document).ready(function() {
	// Initialization 
	
	initialize();
	
	// Update Placeholders
	
	setInterval(get_placeholders, 5000);
	
	// Login Functionality
	
	$(".login-button").click(function() {
		var username = $(".username").val();
		var password = $(".password").val();
		if($(".login-remember-wrapper").hasClass("login-remember-active")) {
			var remember = "true";
		}
		else {
			var remember = "false";
		}
		$.ajax ({ 
			type: "POST",
			data: { action: "login", username: username, password: password, remember: remember },
			url: "./scripts/process.php",
			success: function(data) {
				if(data == "done") {
					notify("Loading...", "You are being logged in.", "blue", 2500);
					setTimeout(function() {
						location.reload();
					}, 2500);
				}
				else {
					notify("Error...", data, "red", 4000);
				}
			}
		});
	});
	$('.login-input-field').keypress(function (e) {
		if(e.which == 13) {
			$(".login-button").trigger("click");
		}
	});
	$(".login-remember-wrapper").click(function() {
		if($(".login-remember-wrapper").hasClass("login-remember-active")) {
			$(".login-remember-wrapper").removeClass("login-remember-active");
		}
		else {
			$(".login-remember-wrapper").addClass("login-remember-active");
		}
	});
	
	// Functions

	function get_placeholders() {
		$.ajax({
			type: "POST",
			data: { action: "get-placeholders" },
			url: "./scripts/api.php", 
			success: function(data) {
				if(data.length != 0) {
					$(".notes-wrapper").show();
					$(".editor-wrapper").css({"width":"calc(100% - 400px)", "left":"400px"});
					$(".notes-list").html(data);
					$(".sidebar-middle").show();
				}
				else {
					$(".notes-wrapper").hide();
					$(".editor-wrapper").css({"width":"calc(100% - 50px)", "left":"50px"});
					$(".notes-list").html("");
					$(".sidebar-middle").hide();
				}
			}
		});
		adjust_to_window_size();
	}
	function notify(title, description, color, duration) {
		var build = $('<div class="notification-wrapper noselect"><div class="notification-title-wrapper"><span class="notification-title">' + title + '</span></div><div class="notification-description-wrapper"><span class="notification-description">' + description + '</span></div></div>');
		$(".notification-area").show().append(build);
		$(build).show().css("right", "-600px").animate({right: 0}, 400);
		if(color == "red") {
			$(build).css("background", "rgb(230,60,60)");
		}
		else if(color == "blue") {
			$(build).css("background", "rgb(0,150,255)");
		}
		else if(color == "green") {
			$(build).css("background", "rgb(15,200,0)");
		}
		else if(color == "purple") {
			$(build).css("background", "rgb(150,0,200)");
		}
		setTimeout(function() {
			$(build).animate({right: -600}, 400);
			setTimeout(function() {
				$(build).remove();
				if($(".notification-area").html().length == 0) {
					$(".notification-area").hide();
				}
			}, 400);
		}, duration);
	}
	function adjust_to_window_size() {
		var window_width = $(window).width();
		var window_height = $(window).height();
		if(window_width < 740 && $(".notes-list").html().length != 0) {
			$(".editor-wrapper").hide();
			$(".notes-wrapper").css({"width":"calc(100% - 50px)"});
			$(".search-wrapper").css({"width":"calc(100% - 50px)"});
		}
		if(window_height < 500) {
			$(".sidebar-middle").hide();
		}
		else {
			$(".sidebar-middle").show();
		}
	}
	$(window).resize(function() {
		adjust_to_window_size();
	});
	function initialize() {
		if($("body").attr("id") == "desktop") {
			desktop = true;
		}
		if($("body").attr("id") == "mobile") {
			mobile = true;
		}
		adjust_to_window_size();
		get_placeholders();
	}
});