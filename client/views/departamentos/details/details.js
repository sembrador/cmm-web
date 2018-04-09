var pageSession = new ReactiveDict();

Template.DepartamentosDetails.onCreated(function() {
	
});

Template.DepartamentosDetails.onDestroyed(function() {
	
});

Template.DepartamentosDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DepartamentosDetails.events({
	
});

Template.DepartamentosDetails.helpers({
	
});

Template.DepartamentosDetailsForm.onCreated(function() {
	
});

Template.DepartamentosDetailsForm.onDestroyed(function() {
	
});

Template.DepartamentosDetailsForm.onRendered(function() {
	

	pageSession.set("departamentosDetailsFormInfoMessage", "");
	pageSession.set("departamentosDetailsFormErrorMessage", "");

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

Template.DepartamentosDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departamentosDetailsFormInfoMessage", "");
		pageSession.set("departamentosDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var departamentosDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(departamentosDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("departamentosDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("departamentosDetailsFormErrorMessage", message);
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

		Router.go("departamentos", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("departamentos", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.DepartamentosDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departamentosDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departamentosDetailsFormErrorMessage");
	}
	
});
