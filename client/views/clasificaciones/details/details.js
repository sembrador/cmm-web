var pageSession = new ReactiveDict();

Template.ClasificacionesDetails.onCreated(function() {
	
});

Template.ClasificacionesDetails.onDestroyed(function() {
	
});

Template.ClasificacionesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ClasificacionesDetails.events({
	
});

Template.ClasificacionesDetails.helpers({
	
});

Template.ClasificacionesDetailsForm.onCreated(function() {
	
});

Template.ClasificacionesDetailsForm.onDestroyed(function() {
	
});

Template.ClasificacionesDetailsForm.onRendered(function() {
	

	pageSession.set("clasificacionesDetailsFormInfoMessage", "");
	pageSession.set("clasificacionesDetailsFormErrorMessage", "");

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

Template.ClasificacionesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("clasificacionesDetailsFormInfoMessage", "");
		pageSession.set("clasificacionesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var clasificacionesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(clasificacionesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("clasificacionesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("clasificacionesDetailsFormErrorMessage", message);
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

		Router.go("clasificaciones", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("clasificaciones", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ClasificacionesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("clasificacionesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("clasificacionesDetailsFormErrorMessage");
	}
	
});
