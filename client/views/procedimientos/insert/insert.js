var pageSession = new ReactiveDict();

Template.ProcedimientosInsert.onCreated(function() {
	
});

Template.ProcedimientosInsert.onDestroyed(function() {
	
});

Template.ProcedimientosInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProcedimientosInsert.events({
	
});

Template.ProcedimientosInsert.helpers({
	
});

Template.ProcedimientosInsertForm.onCreated(function() {
	
});

Template.ProcedimientosInsertForm.onDestroyed(function() {
	
});

Template.ProcedimientosInsertForm.onRendered(function() {
	

	pageSession.set("procedimientosInsertFormInfoMessage", "");
	pageSession.set("procedimientosInsertFormErrorMessage", "");

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

Template.ProcedimientosInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("procedimientosInsertFormInfoMessage", "");
		pageSession.set("procedimientosInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var procedimientosInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(procedimientosInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("procedimientosInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("procedimientos", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("procedimientosInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoProcedimientosInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("procedimientos", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ProcedimientosInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("procedimientosInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("procedimientosInsertFormErrorMessage");
	}
	
});
