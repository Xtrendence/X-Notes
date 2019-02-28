<div class="settings-wrapper" data-global='<?php echo $config_json; ?>'>
	<div class="settings-container noselect">
		<div class="settings-topbar-wrapper">
			<span class="settings-title">Settings</span>
			<button type="button" class="close-button">Close</button>
			<button type="button" class="apply-button">Apply</button>
		</div>
		<div class="settings-sidebar-wrapper">
			<div class="settings-sidebar-container">
				<button type="button" class="settings-sidebar-button settings-notes-button">Notes</button>
				<button type="button" class="settings-sidebar-button settings-appearance-button">Appearance</button>
				<button type="button" class="settings-sidebar-button settings-behavior-button">Behavior</button>
				<button type="button" class="settings-sidebar-button settings-actions-button">Actions</button>
				<button type="button" class="settings-sidebar-button settings-account-button">Account</button>
			</div>
		</div>
		<div class="settings-pane settings-notes-pane"></div>
		<div class="settings-pane settings-appearance-pane">
			<div class="settings-section">
				<span class="settings-heading-text">Theme</span>
				<button class="settings-action-button choice blue settings-theme-light-button" data-category="appearance" data-setting="theme" data-choice="light">Light</button>
				<button class="settings-action-button choice blue settings-theme-dark-button" data-category="appearance" data-setting="theme" data-choice="dark">Dark</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Note Icons</span>
				<button class="settings-action-button choice blue settings-note-icons-mono-button" data-category="appearance" data-setting="note-icons" data-choice="monochrome">Monochrome</button>
				<button class="settings-action-button choice blue settings-note-icons-colored-button" data-category="appearance" data-setting="note-icons" data-choice="colored">Colored</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Formatting Buttons</span>
				<button class="settings-action-button choice blue settings-format-circle-button" data-category="appearance" data-setting="formatting-buttons" data-choice="circle">Circle</button>
				<button class="settings-action-button choice blue settings-format-square-button" data-category="appearance" data-setting="formatting-buttons" data-choice="square">Square</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Search Box</span>
				<button class="settings-action-button choice blue settings-search-visible-button" data-category="appearance" data-setting="search-box" data-choice="visible">Visible</button>
				<button class="settings-action-button choice blue settings-search-hidden-button" data-category="appearance" data-setting="search-box" data-choice="hidden">Hidden</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Separators</span>
				<button class="settings-action-button choice blue settings-separators-visible-button" data-category="appearance" data-setting="separators" data-choice="visible">Visible</button>
				<button class="settings-action-button choice blue settings-separators-hidden-button" data-category="appearance" data-setting="separators" data-choice="hidden">Hidden</button>
			</div>
		</div>
		<div class="settings-pane settings-behavior-pane">
			<div class="settings-section">
				<span class="settings-heading-text">Reopen Notes</span>
				<button class="settings-action-button choice blue settings-reopen-notes-auto-button" data-category="behavior" data-setting="reopen-notes" data-choice="automatically">Automatically</button>
				<button class="settings-action-button choice blue settings-reopen-notes-manual-button" data-category="behavior" data-setting="reopen-notes" data-choice="manually">Manually</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Tooltips (Desktop) - Requires Refresh</span>
				<button class="settings-action-button choice blue settings-tooltips-enabled-button" data-category="behavior" data-setting="tooltips" data-choice="enabled">Enabled</button>
				<button class="settings-action-button choice blue settings-tooltips-disabled-button" data-category="behavior" data-setting="tooltips" data-choice="disabled">Disabled</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Default Settings Page</span>
				<button class="settings-action-button choice blue settings-default-notes-button" data-category="behavior" data-setting="default-settings-page" data-choice="notes">Notes</button>
				<button class="settings-action-button choice blue settings-default-appearance-button" data-category="behavior" data-setting="default-settings-page" data-choice="appearance">Appearance</button>
				<button class="settings-action-button choice blue settings-default-behavior-button" data-category="behavior" data-setting="default-settings-page" data-choice="behavior">Behavior</button>
				<button class="settings-action-button choice blue settings-default-actions-button" data-category="behavior" data-setting="default-settings-page" data-choice="actions">Actions</button>
				<button class="settings-action-button choice blue settings-default-account-button" data-category="behavior" data-setting="default-settings-page" data-choice="account">Account</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Notifications</span>
				<button class="settings-action-button choice blue settings-notifications-enabled-button" data-category="behavior" data-setting="notifications" data-choice="enabled">Enabled</button>
				<button class="settings-action-button choice blue settings-notifications-disabled-button" data-category="behavior" data-setting="notifications" data-choice="disabled">Disabled</button>
			</div>
		</div>
		<div class="settings-pane settings-actions-pane">
			<div class="settings-section settings-delete-section">
				<span class="settings-heading-text">Delete All Notes</span>
				<input class="settings-input-field settings-input-password" type="password" placeholder="Account Password...">
				<button class="settings-action-button red settings-delete-all-notes-button">Delete</button>
			</div>
			<div class="settings-section">
				<span class="settings-heading-text">Reset Settings - Refresh Required</span>
				<button class="settings-action-button red settings-reset-preferences-button">Reset</button>
			</div>
		</div>
		<div class="settings-pane settings-account-pane">
			<div class="settings-section settings-username-section">
				<span class="settings-heading-text">Username - Refresh &amp; Login Required</span>
				<input class="settings-input-field settings-input-username" type="text" placeholder="New Username...">
				<input class="settings-input-field settings-input-password" type="password" placeholder="Password...">
				<button class="settings-action-button blue settings-change-username-button">Change Username</button>
			</div>
			<div class="settings-section settings-password-section">
				<span class="settings-heading-text">Password - Refresh &amp; Login Required</span>
				<input class="settings-input-field settings-input-current-password" type="password" placeholder="Current Password...">
				<input class="settings-input-field settings-input-new-password" type="password" placeholder="New Password...">
				<input class="settings-input-field settings-input-repeat-password" type="password" placeholder="Repeat Password...">
				<button class="settings-action-button blue settings-change-password-button">Change Password</button>
			</div>
		</div>
	</div>
</div>
<div class="note-title-edit-wrapper">
	<div class="note-title-edit-container">
		<span class="note-title-edit-text noselect"></span>
		<div class="note-title-edit-title-wrapper">
			<input class="note-title-edit-input" type="text" placeholder="Title..." maxlength="32">
			<div class="note-title-edit-counter-wrapper noselect">
				<span class="note-title-edit-counter">32</span>
			</div>
		</div>
		<div class="note-title-edit-buttons-wrapper noselect">
			<?php echo $close_icon; ?>
			<?php echo $check_icon; ?>
		</div>
	</div>
</div>
<div class="user-confirmation-wrapper">
	<div class="user-confirmation-container">
		<span class="user-confirmation-title noselect"></span>
		<span class="user-confirmation-description noselect"></span>
		<div class="user-confirmation-buttons-wrapper noselect">
			<?php echo $close_icon; ?>
			<?php echo $check_icon; ?>
		</div>
	</div>
</div>
<div class="raw-data-wrapper">
	<div class="raw-data-container">
		<span class="raw-data-title noselect">Raw JSON Data</span>
		<div class="raw-data-content-wrapper">
			<span class="raw-data-content select"></span>
		</div>
		<div class="raw-data-buttons-wrapper noselect">
			<?php echo $close_icon; ?>
		</div>
	</div>
</div>
<div class="notification-area"></div>
<div class="note-lock-wrapper">
	<div class="note-lock-container">
		<span class="note-lock-title noselect"></span>
		<span class="note-lock-description noselect"></span>
		<div class="note-lock-input-wrapper">
			<input class="note-lock-input current-password" type="password">
			<input class="note-lock-input new-password" type="password" placeholder="New Password...">
			<input class="note-lock-input repeat-password" type="password" placeholder="Repeat New Password...">
		</div>
		<div class="note-lock-buttons-wrapper noselect">
			<?php echo $close_icon; ?>
			<?php echo $check_icon; ?>
		</div>
	</div>
</div>
<div class="help-wrapper">
	<div class="help-container">
		<span class="help-title noselect">Help</span>
		<div class="help-content-wrapper noselect">
			<div class="help-content-title-wrapper">
				<span class="help-content-title">Creating Notes</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">To create a note, click on the "Compose" button that looks like a notepad with a pen. You may then enter a title for your note, although a title isn't strictly required. Once you click the confirm button, a note will be created. You can then open said note and begin writing.</span>
			</div>
			<div class="help-content-title-wrapper">
				<span class="help-content-title">Deleting Notes</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">To delete a note, simply open it and click on the "..." icon on the top right followed by a click on the "Delete" button. You'll be asked to confirm the deletion. Once you click the confirm button, the note is irreversibly deleted, so be careful. If you want to delete a locked note that you've forgotten the password to, click on the "Settings" button that looks like a gear/cog on the bottom left of the main page, and go to the "Notes" section of the settings page, select the note you want to delete, and click the "Delete" button.</span>
			</div>
			<div class="help-content-title-wrapper">
				<span class="help-content-title">Locking Notes</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">To lock a note, open it, click on the "..." icon on the top right, and click on the "Lock" button. This will open up a new menu to the left of the currently opened one. You'll have the option to lock, unlock or change the lock password for the note depending on whether or not it's already locked. Setting a password encrypts the note content using AES-256. If you lose or forget the password, there is absolutely no way to get the note's content back, so set a password you'll remember, or write it down. Opening note files requires the user to be logged in, so even if you set a weak password, as long as your account's password is strong, your notes will be safe. That said, keep in mind that if the server is compromised, a weak password will be easy to brute force since the hacker will have the actual note file.</span>
			</div>
			<div class="help-content-title-wrapper">
				<span class="help-content-title">Sharing Notes</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">To share a note, open it, click on the "..." icon on the top right, and click on the "Share" button. This will open up a new menu to the left of the currently opened one. You'll have the option to make the note public, private or copy the publicly accessible link to the note depending on whether or not the note has been shared. The publicly accessible link is safe to give out and does not grant any editing privileges, meaning anyone with the link can read/view the note but cannot modify it in any way. If the note is locked, anyone who opens the link will be asked for a password to view the note's content. This would be the same password you used to lock the note, <b>not</b> your account password. Making the note private again will render that link useless, but the link won't change if you decide to make the note publicly accessible in the future, so no need to give out a new link every time you change your mind as the link isn't generated, and is unique to the note it's associated with. The link is made up of the UNIX timestamp at the time of the creation of the note along with an MD5 hash of a shuffled up version of the same timestamp. The note creation script does this to ensure no two notes can have the same unique identifier.</span>
			</div>
			<div class="help-content-title-wrapper">
				<span class="help-content-title">Security</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">This is probably the most secure website I've made, so you can expect your notes to be very safe. Your account's password is stored using BCrypt, which is a one-way password hashing algorithm that cannot be deciphered for the foreseeable future. The notes are stored on a server which nobody else besides me has access to and locked notes are stored using AES-256 military-grade encryption, so even if the server were to get hacked, your notes would be safe as long as you chose a secure password. The only way anyone could gain access to the notes' content is through brute force, but that's as impossible as you make it for them through the use of a strong password. X:/Notes also has a private API that is secure and riddled with validation checks, so even if someone gained access to your account, they still can't view or modify your locked notes, but they can delete them, though this is necessary to ensure you don't get stuck with a note just because you forgot the password. When you open a locked note, the note's password is stored locally on the client-side for use in some of the functions. The password is never revealed, but it's recommended you close locked notes before leaving your computer, or better yet, logout entirely. When a note is closed, that password is nullified, meaning it can no longer be retrieved. <b>Important:</b> When you use the "Remember Me" feature on the login page, your username and password are stored in a cookie on your browser. This isn't very safe if anyone else has or gets access to your browser and consequently its cookies. The password isn't stored in plain text, but it might as well be considering it's base64 encoded. Basically, if you're the only person who uses your computer and you don't have any security vulnerabilities, you're fine. This doesn't in any way compromise the security of your notes' content.</span>
			</div>
			<div class="help-content-title-wrapper">
				<span class="help-content-title">Accounts</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">Access to this site isn't possible without an account. Having an account, "<?php echo $valid_username; ?>", is the only way to create, delete, modify or otherwise interact with the website. Without an account, the only interaction possible is viewing a note that is shared. Through your account, you are able to change and set your preferences, such as your prefered theme, color scheme and certain ways the site behaves.</span>
			</div>
			<div class="help-content-title-wrapper">
				<span class="help-content-title">How It Works</span>
			</div>
			<div class="help-content-text-wrapper">
				<span class="help-content-text">X:/Notes uses a custom private API that takes care of almost everything. Alongside the API, there is also a processing script responsible for creating, deleting or otherwise modifying notes. The API opens notes and keeps track of them. These two scripts are called using AJAX requests, enabling this site to basically be a web application where you never actually leave the main page. People viewing shared notes also utilize the API, but are entirely limited to viewing notes that are shared, meaning they can't even try to view notes that aren't shared.</span>
			</div>
		</div>
		<div class="help-buttons-wrapper noselect">
			<?php echo $close_icon; ?>
		</div>
	</div>
</div>