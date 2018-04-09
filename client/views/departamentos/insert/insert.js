var pageSession = new ReactiveDict();

Template.DepartamentosInsert.onCreated(function() {
	
});

Template.DepartamentosInsert.onDestroyed(function() {
	
});

Template.DepartamentosInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DepartamentosInsert.events({
	
});

Template.DepartamentosInsert.helpers({
	
});

Template.DepartamentosInsertForm.onCreated(function() {
	
});

Template.DepartamentosInsertForm.onDestroyed(function() {
	
});

Template.DepartamentosInsertForm.onRendered(function() {
	

	pageSession.set("departamentosInsertFormInfoMessage", "");
	pageSession.set("departamentosInsertFormErrorMessage", "");

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

Template.DepartamentosInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departamentosInsertFormInfoMessage", "");
		pageSession.set("departamentosInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var departamentosInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(departamentosInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("departamentosInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("departamentos", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("departamentosInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoDepartamentosInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.DepartamentosInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departamentosInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departamentosInsertFormErrorMessage");
	}
	
});
