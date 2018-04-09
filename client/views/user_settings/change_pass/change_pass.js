var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsChangePass.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsChangePass.onDestroyed(function() {
	
});

Template.UserSettingsChangePass.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettingsChangePass.events({
	'submit #change_pass_form' : function(e, t) {
		e.preventDefault();

		pageSession.set("errorMessage", "");
		pageSession.set("infoMessage", "");

		var submit_button = $(t.find(":submit"));

		var old_password = t.find('#old_password').value;
		var new_password = t.find('#new_password').value;
		var confirm_pass = t.find('#confirm_pass').value;

		if(old_password == "")
		{
			pageSession.set("errorMessage", "Por favor ingrese su contraseña actual.");
			t.find('#old_password').focus();
			return false;
		}
		if(new_password == "")
		{
			pageSession.set("errorMessage", "Por favor ingrese su contraseña nueva.");
			t.find('#new_password').focus();
			return false;
		}
		if(confirm_pass == "")
		{
			pageSession.set("errorMessage", "Por favor confirme su contraseña nueva.");
			t.find('#confirm_pass').focus();
			return false;
		}

		// check new password
		if(new_password != confirm_pass)
		{
			pageSession.set("errorMessage", "Su contraseña nueva no coincide con su contraseña confirmada.");
			t.find('#new_password').focus();
			return false;
		}

		submit_button.button("loading");
		Accounts.changePassword(old_password, new_password, function(err) {
			submit_button.button("reset");
			if (err) {
				pageSession.set("errorMessage", err.message);
				return false;
			} else {
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Su nueva contraseña esta lista.");
				t.find('#old_password').value = "";
				t.find('#new_password').value = "";
				t.find('#confirm_pass').value = "";
				t.find('#old_password').focus();
			}
		});
		return false; 
	}
	
});

Template.UserSettingsChangePass.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	}
	
});
