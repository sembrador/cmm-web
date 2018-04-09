var pageSession = new ReactiveDict();

Template.AseguradorasDetails.onCreated(function() {
	
});

Template.AseguradorasDetails.onDestroyed(function() {
	
});

Template.AseguradorasDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AseguradorasDetails.events({
	
});

Template.AseguradorasDetails.helpers({
	
});

Template.AseguradorasDetailsForm.onCreated(function() {
	
});

Template.AseguradorasDetailsForm.onDestroyed(function() {
	
});

Template.AseguradorasDetailsForm.onRendered(function() {
	

	pageSession.set("aseguradorasDetailsFormInfoMessage", "");
	pageSession.set("aseguradorasDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "dd/mm/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.AseguradorasDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("aseguradorasDetailsFormInfoMessage", "");
		pageSession.set("aseguradorasDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var aseguradorasDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(aseguradorasDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("aseguradorasDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("aseguradorasDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("aseguradoras", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("aseguradoras", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AseguradorasDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("aseguradorasDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("aseguradorasDetailsFormErrorMessage");
	}
	
});
