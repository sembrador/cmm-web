var pageSession = new ReactiveDict();

Template.PacientesUpdate.onCreated(function() {
	
});

Template.PacientesUpdate.onDestroyed(function() {
	
});

Template.PacientesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PacientesUpdate.events({
	
});

Template.PacientesUpdate.helpers({
	
});

Template.PacientesUpdateForm.onCreated(function() {
	
});

Template.PacientesUpdateForm.onDestroyed(function() {
	
});

Template.PacientesUpdateForm.onRendered(function() {
	

	pageSession.set("pacientesUpdateFormInfoMessage", "");
	pageSession.set("pacientesUpdateFormErrorMessage", "");

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

Template.PacientesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pacientesUpdateFormInfoMessage", "");
		pageSession.set("pacientesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var pacientesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(pacientesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("pacientesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("pacientes", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pacientesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoPacientesUpdate", t.data.paciente._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("pacientes", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.PacientesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pacientesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pacientesUpdateFormErrorMessage");
	}
	
});
