var pageSession = new ReactiveDict();

Template.DepartamentosUpdate.onCreated(function() {
	
});

Template.DepartamentosUpdate.onDestroyed(function() {
	
});

Template.DepartamentosUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DepartamentosUpdate.events({
	
});

Template.DepartamentosUpdate.helpers({
	
});

Template.DepartamentosUpdateForm.onCreated(function() {
	
});

Template.DepartamentosUpdateForm.onDestroyed(function() {
	
});

Template.DepartamentosUpdateForm.onRendered(function() {
	

	pageSession.set("departamentosUpdateFormInfoMessage", "");
	pageSession.set("departamentosUpdateFormErrorMessage", "");

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

Template.DepartamentosUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departamentosUpdateFormInfoMessage", "");
		pageSession.set("departamentosUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var departamentosUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(departamentosUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("departamentosUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("departamentos", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("departamentosUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoDepartamentosUpdate", t.data.departamento._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("departamentos", mergeObjects(Router.currentRouteParams(), {}));
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

Template.DepartamentosUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departamentosUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departamentosUpdateFormErrorMessage");
	}
	
});
