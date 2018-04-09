var pageSession = new ReactiveDict();

Template.PacientesDetails.onCreated(function() {
	
});

Template.PacientesDetails.onDestroyed(function() {
	
});

Template.PacientesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PacientesDetails.events({
	
});

Template.PacientesDetails.helpers({
	
});

Template.PacientesDetailsForm.onCreated(function() {
	
});

Template.PacientesDetailsForm.onDestroyed(function() {
	
});

Template.PacientesDetailsForm.onRendered(function() {
	

	pageSession.set("pacientesDetailsFormInfoMessage", "");
	pageSession.set("pacientesDetailsFormErrorMessage", "");

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

Template.PacientesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pacientesDetailsFormInfoMessage", "");
		pageSession.set("pacientesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var pacientesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(pacientesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("pacientesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pacientesDetailsFormErrorMessage", message);
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

		Router.go("pacientes", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("pacientes", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PacientesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pacientesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pacientesDetailsFormErrorMessage");
	}
	
});
