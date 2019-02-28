$(document).ready(function() {
	// Just A QoL Improvement
	
	$(".password").focus();
	
	// Listen For Click Event
	
	$(".submit").on("click", function() {
		var id = $(".body-wrapper").attr("data-si");
		var password = $(".password").val();
		view_note(id, password);
	});
	
	$(".moon-icon").on("click", function() {
		$(".title-wrapper").addClass("dark").removeClass("light");
		$(".title-container").addClass("dark").removeClass("light");
		$(".body-wrapper").addClass("dark").removeClass("light");
		$("body").css("background", "rgb(40,40,40)");
		$(this).hide();
		$(".sun-icon").show();
	});
	$(".sun-icon").on("click", function() {
		$(".title-wrapper").addClass("light").removeClass("dark");
		$(".title-container").addClass("light").removeClass("dark");
		$(".body-wrapper").addClass("light").removeClass("dark");
		$("body").css("background", "rgb(245,245,245)");
		$(this).hide();
		$(".moon-icon").show();
	});
	
	// Press "Enter" To Submit Password
	
	$(window).bind('keydown', function(event) {
		if(event.which == 13 && $(".submit").is(":visible")) {
			$(".submit").trigger("click");
		}
	});
	
	// API Request
	
	function view_note(id, password) {
		$.ajax({
			type: "POST",
			data: { action: "view-note", id: id, password: password },
			url: "./scripts/api.php",
			success: function(data) {
				if(data == "incorrect") {
					notify("Error...", "The password you entered was incorrect.", "red", 4000);
					$(".password").val("").focus();
				}
				else {
					var decoded = JSON.parse(data);
					notify("Unlocking...", "You can now view the note content.", "blue", 4000);
					$("title").text(decoded["title"]);
					$(".title-text").text(decoded["title"]);
					$(".body-wrapper").html(decoded["content"]);
				}
			}
		});
	}
	
	// Notification Function
	
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
});