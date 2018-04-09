var pageSession = new ReactiveDict();

Template.EspecialidadesDetails.onCreated(function() {
	
});

Template.EspecialidadesDetails.onDestroyed(function() {
	
});

Template.EspecialidadesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.EspecialidadesDetails.events({
	
});

Template.EspecialidadesDetails.helpers({
	
});

Template.EspecialidadesDetailsForm.onCreated(function() {
	
});

Template.EspecialidadesDetailsForm.onDestroyed(function() {
	
});

Template.EspecialidadesDetailsForm.onRendered(function() {
	

	pageSession.set("especialidadesDetailsFormInfoMessage", "");
	pageSession.set("especialidadesDetailsFormErrorMessage", "");

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

Template.EspecialidadesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("especialidadesDetailsFormInfoMessage", "");
		pageSession.set("especialidadesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var especialidadesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(especialidadesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("especialidadesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("especialidadesDetailsFormErrorMessage", message);
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

		Router.go("especialidades", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("especialidades", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.EspecialidadesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("especialidadesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("especialidadesDetailsFormErrorMessage");
	}
	
});
