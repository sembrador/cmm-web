var pageSession = new ReactiveDict();

Template.ProcedimientosDetails.onCreated(function() {
	
});

Template.ProcedimientosDetails.onDestroyed(function() {
	
});

Template.ProcedimientosDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProcedimientosDetails.events({
	
});

Template.ProcedimientosDetails.helpers({
	
});

Template.ProcedimientosDetailsForm.onCreated(function() {
	
});

Template.ProcedimientosDetailsForm.onDestroyed(function() {
	
});

Template.ProcedimientosDetailsForm.onRendered(function() {
	

	pageSession.set("procedimientosDetailsFormInfoMessage", "");
	pageSession.set("procedimientosDetailsFormErrorMessage", "");

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

Template.ProcedimientosDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("procedimientosDetailsFormInfoMessage", "");
		pageSession.set("procedimientosDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var procedimientosDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(procedimientosDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("procedimientosDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("procedimientosDetailsFormErrorMessage", message);
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

		Router.go("procedimientos", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("procedimientos", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ProcedimientosDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("procedimientosDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("procedimientosDetailsFormErrorMessage");
	}
	
});
