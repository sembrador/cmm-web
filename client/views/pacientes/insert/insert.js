var pageSession = new ReactiveDict();

Template.PacientesInsert.onCreated(function() {
	
});

Template.PacientesInsert.onDestroyed(function() {
	
});

Template.PacientesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PacientesInsert.events({
	
});

Template.PacientesInsert.helpers({
	
});

Template.PacientesInsertForm.onCreated(function() {
	
});

Template.PacientesInsertForm.onDestroyed(function() {
	
});

Template.PacientesInsertForm.onRendered(function() {
	

	pageSession.set("pacientesInsertFormInfoMessage", "");
	pageSession.set("pacientesInsertFormErrorMessage", "");

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

Template.PacientesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pacientesInsertFormInfoMessage", "");
		pageSession.set("pacientesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var pacientesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(pacientesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("pacientesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("pacientes", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pacientesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoPacientesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.PacientesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pacientesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pacientesInsertFormErrorMessage");
	}
	
});
