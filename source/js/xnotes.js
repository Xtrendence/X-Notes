$(document).ready(function() {
	// Initialization
	
	initialize();
	
	// Note List Search Function
	
	$(".search-bar").on("keyup", function() {
		var search = $(this).val().toLowerCase();
		if(search.trim().length != 0) {
			$(".note-wrapper").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
			});
		}
		else {
			$(".note-wrapper").show();
		}
	});
	
	// Sidebar Middle Functionality
	
	$(".notes-button").on("click", function() {
		var search = "";
		$(".sidebar-icon-wrapper").removeClass("active");
		$(this).addClass("active");
		$(".note-wrapper").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
		});
	});
	$(".locked-button").on("click", function() {
		var search = "#locked-note";
		$(".sidebar-icon-wrapper").removeClass("active");
		$(this).addClass("active");
		$(".note-wrapper").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
		});
	});
	$(".shared-button").on("click", function() {
		var search = "#shared-note";
		$(".sidebar-icon-wrapper").removeClass("active");
		$(this).addClass("active");
		$(".note-wrapper").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
		});
	});
	
	// Sidebar Bottom Functionality
	
	$(".help-button").on("click", function() {
		$(".help-wrapper").show();
	});
	$(".settings-button").on("click", function() {
		open_settings_page();
	});
	$(".logout-button").on("click", function() {
		$.ajax({
			type: "POST",
			data: { action: "logout" },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					close_note();
					notify("Loading...", "You're being logged out.", "blue", 4000);
					setTimeout(function() {
						location.reload();
					}, 2500);
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	});
	
	// Actions Navbar Button Functionality
	
	$(".actions-navbar, .editor-menu-wrapper").on("mousedown", function(event) {
		event.preventDefault();
	});
	$(".action-bold").on("click", function() {
		if($(".editor-content").is(":focus")) {
			document.execCommand("bold");
		}
	});
	$(".action-italic").on("click", function() {
		if($(".editor-content").is(":focus")) {
			document.execCommand("italic");
		}
	});
	$(".action-heading").on("click", function() {
		if($(".editor-content").is(":focus")) {
			document.execCommand("formatBlock", false, "h3");
		}
	});
	$(".action-text").on("click", function() {
		if($(".editor-content").is(":focus")) {
			document.execCommand("formatBlock", false, "div");
		}
	});
	$(".action-save").on("click", function() {
		save_note();
	});
	
	// Editor "More" Menu Button Functionality
	
	$(".delete-button").on("click", function() {
		var file = $(".editor-content").attr("id").substr(2);
		open_user_confirmation("Are you sure?", "The note will be permanently deleted.", file, "delete-note");
	});
	$(".action-menu").on("click", function() {
		if($(this).hasClass("active")) {
			close_editor_menu();
		}
		else {
			$(".editor-menu-wrapper").show();
			$(".editor-submenu-lock-wrapper, .editor-submenu-share-wrapper").hide();
			if(global_setting_theme == "light") {
				$(".submenu-lock-button, .submenu-share-button").css({"border-left":"2px solid rgb(125,125,125)"}).removeClass("active");
			}
			else if(global_setting_theme == "dark") {
				$(".submenu-lock-button, .submenu-share-button").css({"border-left":"2px solid rgb(200,200,200)"}).removeClass("active");
			}
			$(this).addClass("active");
		}
		$(this).find("svg").css("fill","rgb(0,150,255)");
	});
	$(".editor-menu-wrapper .close-button").on("click", function() {
		close_note();
	});
	$(".submenu-lock-button").on("click", function() {
		if($(this).hasClass("active")) {
			$(".editor-submenu-lock-wrapper, .editor-submenu-share-wrapper").hide();
			$(this).removeClass("active");
			if(global_setting_theme == "light") {
				$(".submenu-share-button").removeClass("active").css({"border-left":"2px solid rgb(125,125,125)"});
			}
			else if(global_setting_theme == "dark") {
				$(".submenu-share-button").removeClass("active").css({"border-left":"2px solid rgb(200,200,200)"});
			}
			$(this).css({"border-left":"2px solid rgb(125,125,125)"});
		}
		else {
			$(".editor-submenu-lock-wrapper").show();
			$(".editor-submenu-share-wrapper").hide();
			$(this).addClass("active");
			if(global_setting_theme == "light") {
				$(".submenu-share-button").removeClass("active").css({"border-left":"2px solid rgb(125,125,125)"});
			}
			else if(global_setting_theme == "dark") {
				$(".submenu-share-button").removeClass("active").css({"border-left":"2px solid rgb(200,200,200)"});
			}
			$(this).css({"border-left":"2px solid rgb(0,150,255)"});
		}
	});
	$(".submenu-share-button").on("click", function() {
		if($(this).hasClass("active")) {
			$(".editor-submenu-share-wrapper, .editor-submenu-lock-wrapper").hide();
			$(this).removeClass("active");
			if(global_setting_theme == "light") {
				$(".submenu-lock-button").removeClass("active").css({"border-left":"2px solid rgb(125,125,125)"});
				$(this).css({"border-left":"2px solid rgb(125,125,125)"});
			}
			else if(global_setting_theme == "dark") {
				$(".submenu-lock-button").removeClass("active").css({"border-left":"2px solid rgb(200,200,200)"});
				$(this).css({"border-left":"2px solid rgb(200,200,200)"});
			}
		}
		else {
			$(".editor-submenu-share-wrapper").show();
			$(".editor-submenu-lock-wrapper").hide();
			$(this).addClass("active");
			if(global_setting_theme == "light") {
				$(".submenu-lock-button").removeClass("active").css({"border-left":"2px solid rgb(125,125,125)"});
				$(this).css({"border-left":"2px solid rgb(0,150,255)"});
			}
			else if(global_setting_theme == "dark") {
				$(".submenu-lock-button").removeClass("active").css({"border-left":"2px solid rgb(200,200,200)"});
				$(this).css({"border-left":"2px solid rgb(0,150,255)"});
			}
		}
	});
	$(".public-button").on("click", function() {
		var file = $(".editor-content").attr("id").substr(2);
		var password = atob($(".editor-content").data("pw"));
		note_sharing(file, password, true);
	});
	$(".private-button").on("click", function() {
		var file = $(".editor-content").attr("id").substr(2);
		var password = atob($(".editor-content").data("pw"));
		note_sharing(file, password, false);
	});
	$(".link-button").on("click", function() {
		notify("Copying...", "A public link to your note has been copied to your clipboard.", "blue", 4000);
		var domain = $("body").attr("data-domain");
		var share_id = $(".editor-content").attr("data-si");
		var link = domain + "view.php?" + share_id;
		copy_to_clipboard(link);
	});
	$(".lock-button").on("click", function() {
		$(".note-lock-wrapper .close-icon").attr("id", "change");
		open_note_lock("unlocked", "lock-note", "Set Lock Password", "Changes will be saved automatically.");
	});
	$(".unlock-button").on("click", function() {
		$(".note-lock-wrapper .close-icon").attr("id", "change");
		open_note_lock("locked", "unlock-note", "Remove Lock Password", "Changes will be saved automatically.");
	});
	$(".relock-button").on("click", function() {
		$(".note-lock-wrapper .close-icon").attr("id", "change");
		open_note_lock("locked", "relock-note", "Change Lock Password", "Changes will be saved automatically.");
	});
	$(".rename-button").on("click", function() {
		var title = $(".editor-content").attr("data-title");
		$(".note-title-edit-wrapper").show();
		$(".note-title-edit-wrapper .check-icon").attr("id", "rename-note");
		$(".note-title-edit-text").html("What's the new title of your note?");
		$(".note-title-edit-input").focus().attr("placeholder", title);
		close_editor_menu();
	});
	$(".raw-button").on("click", function() {
		var file = $(".editor-content").attr("id").substr(2);
		var password = atob($(".editor-content").data("pw"));
		raw_data(file, password);
	});
	$(".copy-button").on("click", function() {
		notify("Copying...", "This note's content has been copied to your clipboard.", "blue", 4000);
		var text = $(".editor-content").html();
		copy_to_clipboard(text);
	});
	
	// Composing A Note
	
	$(".compose-button").on("click", function() {
		$(".note-title-edit-wrapper").show();
		$(".note-title-edit-wrapper .check-icon").attr("id", "create-note");
		$(".note-title-edit-text").html("What's the title of your new note?");
		$(".note-title-edit-input").focus().attr("placeholder", "Title...");
	});
	$(".editor-wrapper").delegate(".editor-empty", "click", function() {
		$(".note-title-edit-wrapper").show();
		$(".note-title-edit-wrapper .check-icon").attr("id", "create-note");
		$(".note-title-edit-text").html("What's the title of your new note?");
		$(".note-title-edit-input").focus().attr("placeholder", "Title...");
	});
	
	// Help Page Functionality
	
	$(".help-content-title").on("click", function() {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).parent().next(".help-content-text-wrapper").css({"max-height":"0px"});
		}
		else {
			$(this).addClass("active");
			var height = $(this).parent().next(".help-content-text-wrapper")[0].scrollHeight;
			$(this).parent().next(".help-content-text-wrapper").css({"max-height":height});
		}
	});
	$(".help-wrapper .close-icon").on("click", function() {
		$(".help-wrapper").hide();
	});
	
	// Settings Functionality
	
	$(".settings-wrapper .close-button").on("click", function() {
		close_settings_page();
	});
	$(".settings-sidebar-button").on("click", function() {
		$(".settings-sidebar-button").removeClass("active").css("border-right", "2px solid rgba(245,245,245,0)");
		$(this).addClass("active").css("border-right", "2px solid rgb(0,150,255)");
		close_settings_pane();
		if($(this).hasClass("settings-notes-button")) {
			open_settings_pane("notes");
		}
		if($(this).hasClass("settings-appearance-button")) {
			open_settings_pane("appearance");
		}
		if($(this).hasClass("settings-behavior-button")) {
			open_settings_pane("behavior");
		}
		if($(this).hasClass("settings-actions-button")) {
			open_settings_pane("actions");
		}
		if($(this).hasClass("settings-account-button")) {
			open_settings_pane("account");
		}
	});
	
	$(".settings-pane").delegate(".settings-note-delete-button", "click", function() {
		var file = $(this).attr("id");
		delete_note(file, "", true);
		setTimeout(function() {
			$(".settings-notes-button").trigger("click");
		}, 250);
	});
	
	$(".settings-action-button.settings-reset-preferences-button").on("click", function() {
		$.ajax({
			type: "POST",
			data: { action: "reset-settings" },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					close_settings_page();
					apply_settings();
					var i = 5;
					setInterval(function() {
						i -= 1;
						$(".notification-wrapper:first .notification-description").text("Your settings have been reset. Refreshing in " + i + " seconds.");
					}, 1000);
					$("body").css("pointer-events", "none");
					notify("Resetting Settings...", "Your settings have been reset. Refreshing in 5 seconds.", "purple", 4000);
					setTimeout(function() {
						location.reload();
					}, 5000);
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	});
	$(".settings-action-button.choice").on("click", function() {
		if(!$(this).hasClass("active")) {
			$(this).parent().find(".settings-action-button.choice").removeClass("active");
			$(this).addClass("active");
			
			var category = $(this).attr("data-category");
			var setting = $(this).attr("data-setting");
			var choice = $(this).attr("data-choice");
			
			var config = JSON.parse($(".settings-wrapper .apply-button").attr("data-change"));
			config[category][setting] = choice;
			$(".settings-wrapper .apply-button").attr("data-change", JSON.stringify(config));
			
			var current = JSON.stringify($(".settings-wrapper").data("config"));
			var config = $(".settings-wrapper .apply-button").attr("data-change");
			
			if(config == current) {
				$(".settings-wrapper .apply-button").hide();
			}
			else {
				$(".settings-wrapper .apply-button").show();
			}
		}
	});
	$(".settings-wrapper .apply-button").on("click", function() {
		var current = JSON.stringify($(".settings-wrapper").data("config"));
		var config = $(".settings-wrapper .apply-button").attr("data-change");
		if(config == current) {
			notify("Error...", "Settings are already set that way.", "red", 4000);
		}
		else {
			save_settings(config);
		}
	});
	$(".settings-change-username-button").on("click", function() {
		var username = $(".settings-username-section .settings-input-username").val();
		var password = $(".settings-username-section .settings-input-password").val();
		$.ajax({
			type: "POST",
			data: { action: "change-username", username: username, password: password },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					var i = 5;
					setInterval(function() {
						i -= 1;
						$(".notification-wrapper:first .notification-description").text("Your username has been changed. Refreshing in " + i + " seconds.");
					}, 1000);
					$("body").css("pointer-events", "none");
					notify("Changing Username...", "Your username has been changed. Refreshing in 5 seconds.", "purple", 10000);
					setTimeout(function() {
						$.ajax({
							type: "POST",
							data: { action: "logout" },
							url: "./scripts/process.php"
						});
					}, 4000);
					setTimeout(function() {
						location.reload();
					}, 5000);
				}
				else {
					notify("Error...", data, "red", 4000);
				}
			}
		});
	});
	$(".settings-change-password-button").on("click", function() {
		var current_password = $(".settings-password-section .settings-input-current-password").val();
		var new_password = $(".settings-password-section .settings-input-new-password").val();
		var repeat_password = $(".settings-password-section .settings-input-repeat-password").val();
		if(new_password == repeat_password) {
			$.ajax({
				type: "POST",
				data: { action: "change-password", current_password: current_password, new_password: repeat_password },
				url: "./scripts/process.php",
				success: function(data) {
					if(data == "done") {
						var i = 5;
						setInterval(function() {
							i -= 1;
							$(".notification-wrapper:first .notification-description").text("Your password has been changed. Refreshing in " + i + " seconds.");
						}, 1000);
						$("body").css("pointer-events", "none");
						notify("Changing Password...", "Your password has been changed. Refreshing in 5 seconds.", "purple", 5000);
						setTimeout(function() {
							$.ajax({
								type: "POST",
								data: { action: "logout" },
								url: "./scripts/process.php"
							});
						}, 4000);
						setTimeout(function() {
							location.reload();
						}, 5000);
					}
					else {
						notify("Error...", data, "red", 4000);
					}
				}
			});
		}
		else {
			notify("Error...", "The passwords you entered don't match.", "red", 4000);
		}
	});
	$(".settings-delete-all-notes-button").on("click", function() {
		var password = $(".settings-delete-section .settings-input-password").val();
		$.ajax({
			type: "POST",
			data: { action: "delete-all-notes", password: password },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					close_note();
					close_settings_page();
					get_notes();
					notify("Deleting Notes...", "Your notes have been deleted.", "purple", 4000);
				}
				else {
					notify("Error...", data, "red", 4000);
				}
			}
		});
	});
	function save_settings(config) {
		$.ajax({
			type: "POST",
			data: { action: "save-settings", config: config },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					$(".settings-wrapper").attr("data-global", config);
					set_global_settings();
					apply_settings();
					notify("Saving Settings...", "Your settings have been saved.", "purple", 4000);
					close_settings_page();
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	}
	function open_settings_pane(pane) {
		if(pane == "notes") {
			$.ajax({
				type: "POST",
				data: { action: "list-notes" },
				url: "./scripts/api.php",
				success: function(data) {
					if(data != "empty") {
						var notes = JSON.parse(data);
						$(".settings-notes-pane").show().html("");
						$.each(notes, function(key, value) {
							$(".settings-notes-pane").append('<div class="settings-note-wrapper"><span class="settings-note-wrapper-text settings-note-wrapper-id"><b>ID: </b><span class="spoiler">' + key + '</span></span><span class="settings-note-wrapper-text"><b>Title:</b> ' + value["title"] + '</span><span class="settings-note-wrapper-text settings-note-wrapper-locked"><b>Locked:</b> ' + ucfirst(value["locked"].toString()) + '</span><span class="settings-note-wrapper-text settings-note-wrapper-shared"><b>Shared:</b> ' + ucfirst(value["shared"].toString()) + '</span><span class="settings-note-wrapper-text settings-note-wrapper-date"><b>Last Modified:</b> ' + value["time_modified"] + '</span><button class="settings-note-delete-button" id="' + key + '.xnt">Delete</button></div>');
						});
					}
					else {
						$(".settings-notes-pane").show().html('<div class="settings-section" style="border:none;"><span class="settings-heading-text">No notes found.</span></div>');
					}
				}
			});
		}
		if(pane == "appearance") {
			$(".settings-appearance-pane").show();
		}
		if(pane == "behavior") {
			$(".settings-behavior-pane").show();
		}
		if(pane == "actions") {
			$(".settings-actions-pane").show();
		}
		if(pane == "account") {
			$(".settings-account-pane").show();
		}
	}
	function get_config() {
		$.ajax({
			type: "POST",
			data: { action: "get-config" },
			url: "./scripts/api.php", 
			success: function(data) {
				if(data.length != 0) {
					var config = JSON.parse(data);
					$(".settings-wrapper").data("config", config);
					$(".settings-wrapper .apply-button").attr("data-change", JSON.stringify(config));
				}
				else {
					notify("Error...", "Failed to fetch user preferences.", "red", 4000);
					close_settings_pane();
				}
			}
		});
	}
	function close_settings_pane() {
		$(".settings-pane").hide();
	}
	function close_settings_page() {
		$(".settings-wrapper").data("config", "").hide();
		$(".settings-wrapper .apply-button").attr("data-change", "");
		$(".settings-wrapper input").val("");
		close_note();
		get_notes();
	}
	function open_settings_page() {
		get_config();
		$(".settings-wrapper .apply-button").hide();
		$(".settings-action-button").removeClass("active");
		setTimeout(function() {
			var config = $(".settings-wrapper").data("config");
			var default_settings_page = config["behavior"]["default-settings-page"];
			$(".settings-wrapper").show();
			setTimeout(function() {
				var theme = config["appearance"]["theme"];
				var note_icons = config["appearance"]["note-icons"];
				var formatting_buttons = config["appearance"]["formatting-buttons"];
				var search_box = config["appearance"]["search-box"];
				var separators = config["appearance"]["separators"];
				var reopen_notes = config["behavior"]["reopen-notes"];
				var tooltips = config["behavior"]["tooltips"];
				var notifications = config["behavior"]["notifications"];
				
				if(theme == "light") {
					$(".settings-theme-light-button").addClass("active");
				}
				else if(theme == "dark") {
					$(".settings-theme-dark-button").addClass("active");
				}
				if(note_icons == "monochrome") {
					$(".settings-note-icons-mono-button").addClass("active");
				}
				else if(note_icons == "colored") {
					$(".settings-note-icons-colored-button").addClass("active");
				}
				if(formatting_buttons == "circle") {
					$(".settings-format-circle-button").addClass("active");
				}
				else if(formatting_buttons == "square") {
					$(".settings-format-square-button").addClass("active");
				}
				if(search_box == "visible") {
					$(".settings-search-visible-button").addClass("active");
				}
				else if(search_box == "hidden") {
					$(".settings-search-hidden-button").addClass("active");
				}
				if(separators == "visible") {
					$(".settings-separators-visible-button").addClass("active");
				}
				else if(separators == "hidden") {
					$(".settings-separators-hidden-button").addClass("active");
				}
				if(reopen_notes == "automatically") {
					$(".settings-reopen-notes-auto-button").addClass("active");
				}
				else if(reopen_notes == "manually") {
					$(".settings-reopen-notes-manual-button").addClass("active");
				}
				if(tooltips == "enabled") {
					$(".settings-tooltips-enabled-button").addClass("active");
				}
				else if(tooltips == "disabled") {
					$(".settings-tooltips-disabled-button").addClass("active");
				}
				if(notifications == "enabled") {
					$(".settings-notifications-enabled-button").addClass("active");
				}
				else if(notifications == "disabled") {
					$(".settings-notifications-disabled-button").addClass("active");
				}
				$(".settings-default-" + default_settings_page + "-button").addClass("active");
			}, 200);
			$(".settings-" + default_settings_page + "-button").trigger("click");
		}, 50);
	}
	
	// User Prompt UI Functionality
	
	$(".raw-data-wrapper .close-icon").on("click", function() {
		close_raw_data();
	});
	$(".user-confirmation-wrapper .close-icon").on("click", function() {
		close_user_confirmation();
	});
	$(".user-confirmation-wrapper .check-icon").on("click", function() {
		var action = $(".user-confirmation-wrapper .check-icon").attr("id");
		var data = $(".user-confirmation-wrapper").show().attr("id");
		if(action == "delete-note") {
			var password = atob($(".editor-content").data("pw"));
			delete_note(data, password, false);
		}
		close_user_confirmation();
	});
	
	// Note Lock Editing UI Functionality
	
	$(".note-lock-wrapper .close-icon").on("click", function() {
		var condition = $(".note-lock-wrapper .close-icon").attr("id");
		if(condition == "change") {
			close_note_lock("change");
		}
		else if(condition == "reveal") {
			close_note_lock("reveal");
		}
	});
	$(".note-lock-wrapper .check-icon").on("click", function() {
		var action = $(".note-lock-wrapper .check-icon").attr("id");
		if(action == "lock-note") {
			var file = $(".editor-content").attr("id").substr(2);
			save_note(true);
			var new_password = $(".new-password").val();
			var repeat_password = $(".repeat-password").val();
			if(new_password == repeat_password) {
				setTimeout(function() {
					lock_note(file, repeat_password);
				}, 250);
				setTimeout(function() {
					close_note_lock();
				}, 500);
			}
			else {
				notify("Passwords Don't Match", "The passwords you entered don't match.", "red", 4000);
				$(".new-password").val("").focus();
				$(".repeat-password").val("");
			}
		}
		if(action == "unlock-note") {
			var file = $(".editor-content").attr("id").substr(2);
			save_note(true);
			var password = $(".current-password").val();
			setTimeout(function() {
				unlock_note(file, password);
				setTimeout(function() {
					close_note_lock();
				}, 250);
			}, 250);
		}
		if(action == "relock-note") {
			var file = $(".editor-content").attr("id").substr(2);
			save_note(true);
			var current_password = $(".current-password").val();
			var new_password = $(".new-password").val();
			var repeat_password = $(".repeat-password").val();
			if(new_password == repeat_password) {
				setTimeout(function() {
					relock_note(file, current_password, repeat_password);
					setTimeout(function() {
						close_note_lock();
					}, 250);
				}, 250);
			}
			else {
				notify("Passwords Don't Match", "The passwords you entered don't match.", "red", 4000);
				$(".new-password").val("").focus();
				$(".repeat-password").val("");
			}
		}
		if(action == "reveal-note") {
			var file = $(".note-lock-wrapper .check-icon").attr("data-file");
			var password = $(".current-password").val();
			open_note(file, password, true);
			setTimeout(function() {
				close_note_lock();
			}, 250);
		}
	});
	
	// Note Title Editing UI Functionality
	
	$(".note-title-edit-wrapper .close-icon").on("click", function() {
		$(".note-title-edit-wrapper").hide();
		$(".note-title-edit-text").html("");
		$(".note-title-edit-input").val("").attr("placeholder", "");
		$(".note-title-edit-wrapper .check-icon").attr("id", "");
	});
	$(".note-title-edit-wrapper .check-icon").on("click", function() {
		var title = $(".note-title-edit-input").val();
		var action = $(".note-title-edit-wrapper .check-icon").attr("id");
		if(action == "create-note") {
			create_note(title);
		}
		else if(action == "rename-note") {
			var file = $(".editor-content").attr("id").substr(2);
			rename_note(file, title);
		}
		$(".note-title-edit-wrapper").hide();
		$(".note-title-edit-input").val("").attr("placeholder", "");
		$(".note-title-edit-text").html("");
		$(".note-title-edit-wrapper .check-icon").attr("id", "");
	});
	
	// Clicking On Note List Items
	
	$(".notes-list").delegate(".note-wrapper", "click", function() {
		var file = $(this).attr("id").substr(2);
		var title = $(this).find(".note-title").text();
		var locked = false;
		var shared = false;
		if($(this).attr("data-locked") == "locked-note") {
			var locked = true;
		}
		if($(this).attr("data-shared") == "shared-note") {
			var shared = true;
		}
		if(locked) {
			$(".lock-button").hide();
			$(".unlock-button").show();
			$(".relock-button").show();
			if(!$(this).hasClass("active")) {
				open_note_lock("locked", "reveal-note", "View Note", "This will not remove the lock permanently.");
				$(".note-lock-wrapper .close-icon").attr("id", "reveal");
				$(".note-lock-wrapper .check-icon").attr("data-file", file);
				$(".editor-content").removeClass("editor-empty").attr({"data-title":title, "id":"e-" + file, "data-locked":"true"}).data("pw", "");
				$(".actions-wrapper-left-overlay").show();
				if(global_setting_theme == "light") {
					$(".editor-wrapper").css("background", "rgb(235,235,235)");
					$(".actions-wrapper-left svg").css("fill", "rgb(175,175,175)");
					$(".actions-wrapper-right svg").css("fill", "rgb(75,75,75)");
				}
				else if(global_setting_theme == "dark") {
					$(".editor-wrapper").css("background", "rgb(55,55,55)");
					$(".actions-wrapper-left svg").css("fill", "rgb(125,125,125)");
					$(".actions-wrapper-right svg").css("fill", "rgb(245,245,245)");
				}
				$(".editor-container").css({"height":"calc(100% - 90px)", "top":"50px"});
				$(".actions-navbar").css({"display":"block"});
				deselect_notes();
				$(this).find(".note-container").css({"background":"rgb(0,150,255)"});
				if(global_setting_separators == "visible") {
					$(this).find(".note-container").css({"border-bottom":"1px solid rgb(0,150,255)"});
					$(this).prev().find(".note-container").css("border-bottom", "1px solid rgba(255,255,255,0)");
				}
				$(this).find(".note-title-wrapper").css({"color":"rgb(245,245,245)"});
				$(this).find(".note-date-wrapper").css({"color":"rgb(235,235,235)"});
				$(this).find("svg").css("fill", "rgb(240,240,240)");
				$(this).addClass("active");
			}
			else {
				$(".editor-content").focus();
			}
		}
		else {
			$(".lock-button").show();
			$(".unlock-button").hide();
			$(".relock-button").hide();
			if(!$(this).hasClass("active")) {
				open_note(file);
				$(".editor-content").removeClass("editor-empty").attr({"data-title":title, "id":"e-" + file, "data-locked":"false"});
				$(".actions-wrapper-left-overlay").show();
				if(global_setting_theme == "light") {
					$(".editor-wrapper").css("background", "rgb(235,235,235)");
					$(".actions-wrapper-left svg").css("fill", "rgb(175,175,175)");
					$(".actions-wrapper-right svg").css("fill", "rgb(75,75,75)");
				}
				else if(global_setting_theme == "dark") {
					$(".editor-wrapper").css("background", "rgb(55,55,55)");
					$(".actions-wrapper-left svg").css("fill", "rgb(125,125,125)");
					$(".actions-wrapper-right svg").css("fill", "rgb(245,245,245)");
				}
				$(".editor-container").css({"height":"calc(100% - 90px)", "top":"50px"});
				$(".actions-navbar").css({"display":"block"});
				deselect_notes();
				$(this).find(".note-container").css({"background":"rgb(0,150,255)"});
				if(global_setting_separators == "visible") {
					$(this).find(".note-container").css({"border-bottom":"1px solid rgb(0,150,255)"});
					$(this).prev().find(".note-container").css("border-bottom", "1px solid rgba(255,255,255,0)");
				}
				$(this).find(".note-title-wrapper").css({"color":"rgb(245,245,245)"});
				$(this).find(".note-date-wrapper").css({"color":"rgb(235,235,235)"});
				$(this).find("svg").css("fill", "rgb(240,240,240)");
				$(this).addClass("active");
			}
			else {
				$(".editor-content").focus();
			}
		}
		if(shared) {
			$(".public-button").hide();
			$(".private-button").show();
			$(".link-button").show();
			$(".editor-content").attr("data-si", "s-" + file.substr(0, file.length - 4));
		}
		else {
			$(".public-button").show();
			$(".private-button").hide();
			$(".link-button").hide();
			$(".editor-content").attr("data-si", "");
		}
		adjust_to_window_size();
	});
	
	// Fading/Unfading The Actions Navbar
	
	$(".editor-content").on("focusin", function() {
		$(".actions-wrapper-left-overlay").hide();
		if(global_setting_theme == "light") {
			$(".editor-wrapper").css("background", "rgb(250,250,250)");
			$(".actions-wrapper-left svg").css("fill", "rgb(75,75,75)");
		}
		else if(global_setting_theme == "dark") {
			$(".editor-wrapper").css("background", "rgb(60,60,60)");
			$(".actions-wrapper-left svg").css("fill", "rgb(245,245,245)");
		}
	});
	$(".editor-content").on("focusout", function() {
		$(".actions-wrapper-left-overlay").show();
		if(global_setting_theme == "light") {
			$(".editor-wrapper").css("background", "rgb(235,235,235)");
			$(".actions-wrapper-left svg").css("fill", "rgb(175,175,175)");
		}
		else if(global_setting_theme == "dark") {
			$(".editor-wrapper").css("background", "rgb(55,55,55)");
			$(".actions-wrapper-left svg").css("fill", "rgb(125,125,125)");
		}
	});
	
	// Binding Functions
	
	$(".editor-empty").on("contextmenu", function(event) {
		$(this).trigger("click");
	});
	
	$(".note-title-edit-input").on("keyup", count_title_characters);
	$(".note-title-edit-input").on("keydown", count_title_characters);
	
	$(".editor-content").bind('keydown', function(event) {
		if(event.ctrlKey || event.metaKey) {
			switch(String.fromCharCode(event.which).toLowerCase()) {
			case 's':
				event.preventDefault();
				save_note();
				break;
			}
		}
	});
	$(window).bind('keydown', function(event) {
		if(event.which == 13 && $(".note-title-edit-wrapper").is(":visible")) {
			$(".note-title-edit-wrapper .check-icon").trigger("click");
		}
		if(event.which == 27 && !$(".editor-content").hasClass(".editor-empty")) {
			close_note();
		}
		if(event.which == 13 && $(".note-lock-wrapper").is(":visible")) {
			$(".note-lock-wrapper .check-icon").trigger("click");
		}
		if(event.which == 13 && $(".user-confirmation-wrapper").is(":visible")) {
			$(".user-confirmation-wrapper .check-icon").trigger("click");
		}
	});
	$(document).mouseup(function(e) {
		var container = new Array();
		container.push($('.editor-menu-wrapper'));

		$.each(container, function(key, value) {
			if(!$(value).is(e.target) && $(value).has(e.target).length === 0) {
				$(value).hide();
			}
		});
		
		setTimeout(function() {
			if($(".editor-menu-wrapper").is(":hidden")) {
				close_editor_menu();
			}
		}, 5);
	});
	$(window).resize(function() {
		adjust_to_window_size();
	});
	
	// User Prompt & Popup UI Functions
	
	function open_user_confirmation(title, description, data, action) {
		$(".user-confirmation-wrapper").show().attr("id", data);
		$(".user-confirmation-title").html(title);
		$(".user-confirmation-description").html(description);
		$(".user-confirmation-wrapper .check-icon").attr("id", action);
	}
	function close_user_confirmation() {
		$(".user-confirmation-wrapper").hide().attr("id", "");
		$(".user-confirmation-title").html("");
		$(".user-confirmation-description").html("");
		$(".user-confirmation-wrapper .check-icon").attr("id", "");
	}
	function close_raw_data() {
		$(".raw-data-wrapper").hide();
		$(".raw-data-content").text("");
	}
	function close_note_lock(condition) {
		$(".note-lock-wrapper").hide();
		$(".note-lock-wrapper .current-password").val("");
		$(".note-lock-wrapper .new-password").val("");
		$(".note-lock-wrapper .repeat-password").val("");
		$(".note-lock-title").html("");
		$(".note-lock-wrapper .check-icon").attr("id", "");
		if(condition == "reveal") {
			deselect_notes();
			close_note();
		}
	}
	function open_note_lock(state, action, title, description) {
		close_editor_menu();
		$(".note-lock-title").html(title);
		$(".note-lock-description").html(description);
		$(".note-lock-wrapper .check-icon").attr("id", action);
		$(".note-lock-wrapper").show();
		if(action == "lock-note") {
			$(".note-lock-container").css({"height":"300px", "top":"calc(50% - 150px)"});
			$(".note-lock-wrapper .current-password").hide();
			$(".note-lock-wrapper .new-password").show().focus();
			$(".note-lock-wrapper .repeat-password").show();
		}
		else if(action == "unlock-note") {
			$(".note-lock-container").css({"height":"230px", "top":"calc(50% - 115px)"});
			$(".note-lock-wrapper .current-password").show().focus().attr("placeholder", "Password...");
			$(".note-lock-wrapper .new-password").hide();
			$(".note-lock-wrapper .repeat-password").hide();
		}
		else if(action == "relock-note") {
			$(".note-lock-container").css({"height":"350px", "top":"calc(50% - 175px)"});
			$(".note-lock-wrapper .current-password").show().focus().attr("placeholder", "Current Password...");
			$(".note-lock-wrapper .new-password").show();
			$(".note-lock-wrapper .repeat-password").show();
		}
		else if(action == "reveal-note") {
			$(".note-lock-container").css({"height":"230px", "top":"calc(50% - 115px)"});
			$(".note-lock-wrapper .current-password").show().focus().attr("placeholder", "Password...");
			$(".note-lock-wrapper .new-password").hide();
			$(".note-lock-wrapper .repeat-password").hide();
		}
	}
	
	// Note Modifying/Viewing Functions
	
	function get_notes() {
		$.ajax({
			type: "POST",
			data: { action: "get-notes" },
			url: "./scripts/api.php", 
			success: function(data) {
				if(data.length != 0) {
					$(".notes-wrapper").show();
					$(".editor-wrapper").css({"width":"calc(100% - 400px)", "left":"400px"});
					$(".notes-list").html(data);
					$(".sidebar-middle").show();
					apply_settings();
				}
				else {
					$(".notes-wrapper").hide();
					$(".editor-wrapper").css({"width":"calc(100% - 50px)", "left":"50px"});
					$(".notes-list").html("");
					$(".sidebar-middle").hide();
				}
				adjust_to_window_size();
			}
		});
	}
	function lock_note(file, password) {
		$.ajax({ 
			type: "POST",
			data: { action: "lock-note", file: file, password: password },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					notify("Locking...", "Your note has been locked.", "blue", 4000);
					get_notes();
					setTimeout(function() {
						close_note();
					}, 250);
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	}
	function unlock_note(file, password) {
		$.ajax({ 
			type: "POST",
			data: { action: "unlock-note", file: file, password: password },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					notify("Unlocking...", "Your note has been unlocked.", "blue", 4000);
					get_notes();
					setTimeout(function() {
						close_note();
						setTimeout(function() {
							if(global_setting_reopen_notes == "automatically") {
								$(".note-wrapper:first").trigger("click");
							}
						});
					}, 250);
				}
				else {
					notify("Error...", "The password you entered was incorrect.", "red", 4000);
				}
			}
		});
	}
	function relock_note(file, current_password, new_password) {
		$.ajax({ 
			type: "POST",
			data: { action: "relock-note", file: file, current_password: current_password, new_password: new_password },
			url: "./scripts/process.php",
			success: function(data) {
				if(data == "done") {
					notify("Relocking...", "Your note's password has been changed.", "blue", 4000);
					get_notes();
					close_note();
				}
				else {
					notify("Error...", "The password you entered was incorrect.", "red", 4000);
				}
			}
		});
	}
	function rename_note(file, title) {
		var password = atob($(".editor-content").data("pw"));
		$.ajax({
			type: "POST",
			data: { action: "rename-note", file: file, title: title, password: password },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					notify("Renaming...", "Your note has been renamed.", "blue", 4000);
					get_notes();
					setTimeout(function() {
						adjust_note_facade();
					}, 250);
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	}
	function create_note(title) {
		$.ajax({
			type: "POST",
			data: { action: "create-note", title: title },
			url: "./scripts/process.php", 
			success: function(data) {
				if(data == "done") {
					notify("Creating...", "Your note has been created.", "blue", 4000);
					get_notes();
					setTimeout(function() {
						if(global_setting_reopen_notes == "automatically") {
							$(".note-wrapper:first").trigger("click");
						}
					}, 250);
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	}
	function open_note(file, password, locked) {
		$.ajax({
			type: "POST",
			data: { action: "open-note", file: file, password: password },
			url: "./scripts/api.php",
			success: function(data) {
				if(locked) {
					if(data != "incorrect") {
						$(".editor-content").data("pw", btoa(password));
						$(".editor-content").html(data).attr({"placeholder":"Write something...", "id":"e-" + file});
					}
					else {
						close_note();
						notify("Error...", "The password you entered was incorrect.", "red", 4000);
					}
				}
				else {
					$(".editor-content").html(data).attr({"placeholder":"Write something...", "id":"e-" + file});
				}
			}
		});
	}
	function save_note(background) {
		var file = $(".editor-content").attr("id").substr(2);
		var text = $(".editor-content").html();
		var password = atob($(".editor-content").data("pw"));
		$.ajax({
			type: "POST",
			data: { action: "save-note", file: file, text: text, password: password },
			url: "./scripts/process.php",
			success: function(data) {
				if(data == "done") {
					if(!background) {
						notify("Saving...", "Your note has been saved.", "blue", 4000);
					}
					get_notes();
					setTimeout(function() {
						adjust_note_facade();
						$(".editor-content").focus();
					}, 250);
				}
				else {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
			}
		});
	}
	function delete_note(file, password, bypass) {
		$.ajax({
			type: "POST",
			data: { action: "delete-note", file: file, password: password, bypass: bypass },
			url: "./scripts/process.php",
			success: function(data) {
				if(data == "done") {
					notify("Deleting...", "Your note has been deleted.", "blue", 4000);
					close_note();
					get_notes();
				}
			}
		});
	}
	function raw_data(file, password) {
		$.ajax({
			type: "POST",
			data: { action: "raw-data", file: file, password: password },
			url: "./scripts/process.php",
			success: function(data) {
				if(data == "incorrect") {
					notify("Error...", "Something went wrong.", "red", 4000);
				}
				else {
					notify("Opening...", "Raw data extracted.", "blue", 4000);
					$(".raw-data-wrapper").show();
					$(".raw-data-content").text(data);
				}
			}
		});
	}
	function note_sharing(file, password, share) {
		if(share) {
			$.ajax({
				type: "POST",
				data: { action: "publicize-note", file: file, password: password },
				url: "./scripts/process.php",
				success: function(data) {
					if(data == "done") {
						notify("Publicizing...", "Your note is now publicly accessible.", "green", 6500);
						get_notes();
						$(".public-button").hide();
						$(".private-button").show();
						$(".link-button").show();
						$(".editor-content").attr("data-si", "s-" + file.substr(0, file.length - 4));
						setTimeout(function() {
							adjust_note_facade();
						}, 250);
					}
				}
			});
		}
		else {
			$.ajax({
				type: "POST",
				data: { action: "privatize-note", file: file, password: password },
				url: "./scripts/process.php",
				success: function(data) {
					if(data == "done") {
						notify("Privatizing...", "Your note can no longer be accessed publicly.", "green", 4000);
						get_notes();
						$(".public-button").show();
						$(".private-button").hide();
						$(".link-button").hide();
						$(".editor-content").attr("data-si", "");
						setTimeout(function() {
							adjust_note_facade();
						}, 250);
					}
				}
			});
		}
	}
	function close_note() {
		deselect_notes();
		$(".editor-content").addClass("editor-empty").attr({"contenteditable":"true", "placeholder":"New note...", "id":"", "data-title":"", "data-locked":"", "data-si":""}).data("pw", "").html("").blur();
		$(".editor-container").css({"height":"calc(100% - 40px)", "top":"0"});
		$(".actions-navbar").css({"display":"none"});
		close_editor_menu();
		adjust_to_window_size();
	}
	function copy_to_clipboard(text) {
		var temp = $("<textarea>");
		$("body").append(temp);
		temp.val(text).select();
		document.execCommand("copy");
		temp.remove();
	}
	
	// CSS & Adjustments
	
	function adjust_note_facade() {
		$(".note-wrapper:first").find(".note-container").css({"background":"rgb(0,150,255)"});
		if(global_setting_separators == "visible") {
			$(".note-wrapper:first").find(".note-container").css({"border-bottom":"1px solid rgb(0,150,255)"});
			$(".note-wrapper:first").prev().find(".note-container").css("border-bottom", "1px solid rgba(255,255,255,0)");
		}
		$(".note-wrapper:first").find(".note-title-wrapper").css({"color":"rgb(245,245,245)"});
		$(".note-wrapper:first").find(".note-date-wrapper").css({"color":"rgb(235,235,235)"});
		$(".note-wrapper:first").find("svg").css("fill", "rgb(240,240,240)");
		$(".note-wrapper:first").addClass("active");
	}
	function deselect_notes() {
		$(".note-container").css({"background":"none"});
		if(global_setting_separators == "visible") {
			if(global_setting_theme == "light") {
				$(".note-container").css({"border-bottom":"1px solid rgb(200,200,200)"});
			}
			else if(global_setting_theme == "dark") {
				$(".note-container").css({"border-bottom":"1px solid rgb(80,80,80)"});
			}
		}
		if(global_setting_theme == "light") {
			$(".note-date-wrapper").css({"color":"rgb(125,125,125)"});
			$(".note-title-wrapper").css({"color":"rgb(75,75,75)"});
		}
		else if(global_setting_theme == "dark") {
			$(".note-date-wrapper").css({"color":"rgb(140,140,140)"});
			$(".note-title-wrapper").css({"color":"rgb(245,245,245)"});
		}
		if(global_setting_note_icons == "colored") {
			$(".note-status-wrapper .locked-icon").css("fill", "rgb(230,60,60)");
			$(".note-status-wrapper .globe-icon").css("fill", "rgb(15,200,0)");
		}
		else {
			$(".note-status-wrapper .locked-icon").css("fill", "rgb(200,200,200)");
			$(".note-status-wrapper .globe-icon").css("fill", "rgb(200,200,200)");
		}
		$(".note-status-wrapper .unlocked-icon").css("fill", "rgb(200,200,200)");
		$(".note-wrapper").removeClass("active");
	}
	function close_editor_menu() {
		$(".editor-menu-wrapper").hide();
		if(global_setting_theme == "light") {
			$(".editor-wrapper .action-menu svg").css("fill","rgb(75,75,75)");
		}
		else if(global_setting_theme == "dark") {
			$(".editor-wrapper .action-menu svg").css("fill","rgb(245,245,245)");
		}
		$(".action-menu").removeClass("active");
		$(".editor-submenu-lock-wrapper, .editor-submenu-share-wrapper").hide();
		if(global_setting_theme == "light") {
			$(".submenu-lock-button, .submenu-share-button").css({"border-left":"2px solid rgb(125,125,125)"}).removeClass("active");
		}
		else if(global_setting_theme == "dark") {
			$(".submenu-lock-button, .submenu-share-button").css({"border-left":"2px solid rgb(200,200,200)"}).removeClass("active");
		}
	}
	if(desktop) {
		$(".action-wrapper").hover(function() {
				$(this).find("svg").css("fill", "rgb(0,150,255)");
			}, function() {
			if(!$(this).hasClass("active")) {
				if(global_setting_theme == "light") {
					$(this).find("svg").css("fill", "rgb(75,75,75)");
				}
				else if(global_setting_theme == "dark") {
					$(this).find("svg").css("fill", "rgb(245,245,245)");
				}
			}
		});
	}
	
	function dark_mode() {
		$(".theme-stylesheet").attr("href", "./source/css/dark.css?" + epoch());
		$(".navbar-theme-color").attr("content", "#3c3c3c");
	}
	function light_mode() {
		$(".theme-stylesheet").attr("href", "./source/css/light.css?" + epoch());
		$(".navbar-theme-color").attr("content", "#ebebeb");
	}
	function set_theme() {
		if(global_setting_theme == "light") {
			light_mode();
		}
		else if(global_setting_theme == "dark") {
			dark_mode();
		}
	}
	function adjust_note_icons() {
		if(global_setting_note_icons == "monochrome") {
			$(".note-status-wrapper .locked-icon").css("fill", "rgb(200,200,200)");
			$(".note-status-wrapper .globe-icon").css("fill", "rgb(200,200,200)");
		}
		else {
			$(".note-status-wrapper .locked-icon").css("fill", "rgb(230,60,60)");
			$(".note-status-wrapper .globe-icon").css("fill", "rgb(15,200,0)");
		}
	}
	function adjust_formatting_buttons() {
		if(global_setting_formatting_buttons == "square") {
			$(".action-wrapper").css("border-radius", "3px");
		}
		else {
			$(".action-wrapper").css("border-radius", "50%");
		}
	}
	function adjust_search_box() {
		if(global_setting_search_box == "visible") {
			$(".search-wrapper").show();
		}
		else {
			$(".search-wrapper").hide();
		}
	}
	function adjust_separators() {
		if(global_setting_separators == "visible") {
			if(global_setting_theme == "light") {
				$(".note-container").css("border-bottom", "1px solid rgb(200,200,200)");
				$(".settings-note-wrapper").css("border-bottom", "1px solid rgb(200,200,200)");
				$(".settings-section").css("border-bottom", "1px solid rgb(200,200,200)");
			}
			else if(global_setting_theme == "dark") {
				$(".note-container").css("border-bottom", "1px solid rgb(80,80,80)");
				$(".settings-note-wrapper").css("border-bottom", "1px solid rgb(80,80,80)");
				$(".settings-section").css("border-bottom", "1px solid rgb(80,80,80)");
			}
		}
		else {
			$(".note-container").css("border-bottom", "none");
			$(".settings-note-wrapper").css("border-bottom", "none");
			$(".settings-section").css("border-bottom", "none");
		}
	}
	function adjust_to_window_size() {
		var window_width = $(window).width();
		var window_height = $(window).height();
		if(window_width < 740 && $(".notes-list").html().length != 0 && $(".editor-content").hasClass("editor-empty")) {
			$(".editor-wrapper").hide().css({"width":"calc(100% - 400px)", "left":"400px"});
			$(".notes-wrapper").show().css({"width":"calc(100% - 50px)"});
			if(global_setting_search_box == "visible") {
				$(".search-wrapper").show().css({"width":"calc(100% - 50px)"});
			}
		}
		if(window_width < 740 && $(".notes-list").html().length != 0 && !$(".editor-content").hasClass("editor-empty")) {
			$(".editor-wrapper").show().css({"width":"calc(100% - 50px)", "left":"50px"});
			$(".notes-wrapper").hide().css({"width":"350px"});
			if(global_setting_search_box == "visible") {
				$(".search-wrapper").hide().css({"width":"350px"});
			}
		}
		if(window_width < 740 && $(".notes-list").html().length == 0 && $(".editor-content").hasClass("editor-empty")) {
			$(".editor-wrapper").show().css({"width":"calc(100% - 50px)", "left":"50px"});
			$(".notes-wrapper").hide().css({"width":"350px"});
			if(global_setting_search_box == "visible") {
				$(".search-wrapper").hide().css({"width":"350px"});
			}
		}
		
		if(window_width > 740 && $(".notes-list").html().length != 0 && $(".editor-content").hasClass("editor-empty")) {
			$(".editor-wrapper").show().css({"width":"calc(100% - 400px)", "left":"400px"});
			$(".notes-wrapper").show().css({"width":"350px"});
			if(global_setting_search_box == "visible") {
				$(".search-wrapper").show().css({"width":"350px"});
			}
		}
		if(window_width > 740 && $(".notes-list").html().length == 0 && $(".editor-content").hasClass("editor-empty")) {
			$(".editor-wrapper").show().css({"width":"calc(100% - 50px)", "left":"50px"});
			$(".notes-wrapper").hide().css({"width":"350px"});
			if(global_setting_search_box == "visible") {
				$(".search-wrapper").hide().css({"width":"350px"});
			}
		}
		if(window_width > 740 && $(".notes-list").html().length != 0 && !$(".editor-content").hasClass("editor-empty")) {
			$(".editor-wrapper").show().css({"width":"calc(100% - 400px)", "left":"400px"});
			$(".notes-wrapper").show().css({"width":"350px"});
			if(global_setting_search_box == "visible") {
				$(".search-wrapper").show().css({"width":"350px"});
			}
		}
	}
	
	// Other Functions
	
	function apply_settings() {
		set_theme();
		adjust_note_icons();
		adjust_formatting_buttons();
		adjust_search_box();
		adjust_separators();
	}
	function notify(title, description, color, duration) {
		if(global_setting_notifications == "enabled") { 
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
	}
	function count_title_characters() {
		var characters = $(".note-title-edit-input").val().length;
		var remaining = 32 - characters;
		if(remaining < -99) {
			$(".note-title-edit-counter-wrapper").css("width", "50px");
			$(".note-title-edit-counter").html("Really?");
		}
		else {
			$(".note-title-edit-counter-wrapper").css("width", "20px");
			$(".note-title-edit-counter").html(remaining);
		}
		if(remaining <= 0) {
			$(".note-title-edit-counter").css("color", "rgb(230,60,60)");
		}
		else {
			$(".note-title-edit-counter").css("color", "rgb(0,150,255)");
		}
	}
	function ucfirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	function epoch() {
		var date = new Date();
		var time = Math.round(date.getTime() / 1000);
		return time;
	}
	function create_tooltips() {
		tippy('.compose-button', { content: "<span class='tooltip'>New Note</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		tippy('.notes-button', { content: "<span class='tooltip'>All Notes</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		tippy('.locked-button', { content: "<span class='tooltip'>Locked Notes</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		tippy('.shared-button', { content: "<span class='tooltip'>Shared Notes</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		tippy('.help-button', { content: "<span class='tooltip'>Help</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		tippy('.settings-button', { content: "<span class='tooltip'>Settings</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		tippy('.logout-button', { content: "<span class='tooltip'>Logout</span>", arrow: false, interactive: false, placement: "right", distance: "-50", duration: 200,  offset: "0"});
		
		tippy('.action-bold', { content: "<span class='tooltip'>Bold</span>", arrow: false, interactive: false, placement: "bottom", distance: "5", duration: 200,  offset: "0"});
		tippy('.action-italic', { content: "<span class='tooltip'>Italic</span>", arrow: false, interactive: false, placement: "bottom", distance: "5", duration: 200,  offset: "0"});
		tippy('.action-heading', { content: "<span class='tooltip'>Heading</span>", arrow: false, interactive: false, placement: "bottom", distance: "5", duration: 200,  offset: "0"});
		tippy('.action-text', { content: "<span class='tooltip'>Paragraph</span>", arrow: false, interactive: false, placement: "bottom", distance: "5", duration: 200,  offset: "0"});
		tippy('.action-save', { content: "<span class='tooltip'>Save</span>", arrow: false, interactive: false, placement: "bottom", distance: "5", duration: 200,  offset: "0"});
	}
	
	// Initialization Functions
	
	function initialize() {
		if($("body").attr("id") == "desktop") {
			mobile = false;
			desktop = true;
		}
		if($("body").attr("id") == "mobile") {
			mobile = true;
			desktop = false;
		}
		get_notes();
		get_config();
		set_global_settings();
		adjust_to_window_size();
		setTimeout(function() {
			if(desktop && global_setting_tooltips == "enabled") {
				create_tooltips();
			}
		}, 250);
		$(".editor-content").attr({"contenteditable":"true", "placeholder":"New note...", "id":"", "data-title":"", "data-locked":"", "data-si":""}).data("pw", "");	
	}
	function set_global_settings() {
		global_setting_config = JSON.parse($(".settings-wrapper").attr("data-global"));
		global_setting_theme = global_setting_config["appearance"]["theme"];
		global_setting_note_icons = global_setting_config["appearance"]["note-icons"];
		global_setting_formatting_buttons = global_setting_config["appearance"]["formatting-buttons"];
		global_setting_search_box = global_setting_config["appearance"]["search-box"];
		global_setting_separators = global_setting_config["appearance"]["separators"];
		global_setting_reopen_notes = global_setting_config["behavior"]["reopen-notes"];
		global_setting_tooltips = global_setting_config["behavior"]["tooltips"];
		global_setting_notifications = global_setting_config["behavior"]["notifications"];
		setTimeout(apply_settings, 125); // TO BE CHANGED
	}
});