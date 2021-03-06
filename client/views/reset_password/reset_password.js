var pageSession = new ReactiveDict();

Template.ResetPassword.onCreated(function() {
	
});

Template.ResetPassword.onDestroyed(function() {
	
});

Template.ResetPassword.onRendered(function() {
	pageSession.set("errorMessage", "");

	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ResetPassword.events({
	// change password
	'submit #reset_password_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));
		var new_password = t.find('#new_password').value;
		var new_password_confirm = t.find('#new_password_confirm').value;

		// check password
		var min_password_len = 6;
		if(!isValidPassword(new_password, min_password_len))
		{
			pageSession.set("errorMessage", "Su contraseña debe tener al menos " + min_password_len + " caracteres.");
			t.find('#new_password').focus();
			return false;
		}

		if(new_password != new_password_confirm)
		{
			pageSession.set("errorMessage", "Su nueva contraseña y confirme contraseña no son iguales.");
			t.find('#new_password_confirm').focus();
			return false;
		}

		submit_button.button("loading");
		Accounts.resetPassword(this.params.resetPasswordToken, new_password, function(err) {
			submit_button.button("reset");
			if (err)
				pageSession.set("errorMessage", err.message);
			else
				pageSession.set("errorMessage", "");
		});

		return false;
	}
	
});

Template.ResetPassword.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	}
	
});
