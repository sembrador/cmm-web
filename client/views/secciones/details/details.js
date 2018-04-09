var pageSession = new ReactiveDict();

Template.SeccionesDetails.onCreated(function() {
	
});

Template.SeccionesDetails.onDestroyed(function() {
	
});

Template.SeccionesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SeccionesDetails.events({
	
});

Template.SeccionesDetails.helpers({
	
});

Template.SeccionesDetailsForm.onCreated(function() {
	
});

Template.SeccionesDetailsForm.onDestroyed(function() {
	
});

Template.SeccionesDetailsForm.onRendered(function() {
	

	pageSession.set("seccionesDetailsFormInfoMessage", "");
	pageSession.set("seccionesDetailsFormErrorMessage", "");

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

Template.SeccionesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("seccionesDetailsFormInfoMessage", "");
		pageSession.set("seccionesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var seccionesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(seccionesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("seccionesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("seccionesDetailsFormErrorMessage", message);
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

		Router.go("secciones", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("secciones", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.SeccionesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("seccionesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("seccionesDetailsFormErrorMessage");
	}
	
});
