var pageSession = new ReactiveDict();

Template.ProcedimientosUpdate.onCreated(function() {
	
});

Template.ProcedimientosUpdate.onDestroyed(function() {
	
});

Template.ProcedimientosUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProcedimientosUpdate.events({
	
});

Template.ProcedimientosUpdate.helpers({
	
});

Template.ProcedimientosUpdateForm.onCreated(function() {
	
});

Template.ProcedimientosUpdateForm.onDestroyed(function() {
	
});

Template.ProcedimientosUpdateForm.onRendered(function() {
	

	pageSession.set("procedimientosUpdateFormInfoMessage", "");
	pageSession.set("procedimientosUpdateFormErrorMessage", "");

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

Template.ProcedimientosUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("procedimientosUpdateFormInfoMessage", "");
		pageSession.set("procedimientosUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var procedimientosUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(procedimientosUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("procedimientosUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("procedimientos", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("procedimientosUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoProcedimientosUpdate", t.data.procedimiento._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ProcedimientosUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("procedimientosUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("procedimientosUpdateFormErrorMessage");
	}
	
});
