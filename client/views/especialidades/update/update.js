var pageSession = new ReactiveDict();

Template.EspecialidadesUpdate.onCreated(function() {
	
});

Template.EspecialidadesUpdate.onDestroyed(function() {
	
});

Template.EspecialidadesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.EspecialidadesUpdate.events({
	
});

Template.EspecialidadesUpdate.helpers({
	
});

Template.EspecialidadesUpdateForm.onCreated(function() {
	
});

Template.EspecialidadesUpdateForm.onDestroyed(function() {
	
});

Template.EspecialidadesUpdateForm.onRendered(function() {
	

	pageSession.set("especialidadesUpdateFormInfoMessage", "");
	pageSession.set("especialidadesUpdateFormErrorMessage", "");

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

Template.EspecialidadesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("especialidadesUpdateFormInfoMessage", "");
		pageSession.set("especialidadesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var especialidadesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(especialidadesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("especialidadesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("especialidades", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("especialidadesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoEspecialidadesUpdate", t.data.especialidad._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("especialidades", mergeObjects(Router.currentRouteParams(), {}));
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

Template.EspecialidadesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("especialidadesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("especialidadesUpdateFormErrorMessage");
	}
	
});
