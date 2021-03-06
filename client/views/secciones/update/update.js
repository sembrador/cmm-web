var pageSession = new ReactiveDict();

Template.SeccionesUpdate.onCreated(function() {
	
});

Template.SeccionesUpdate.onDestroyed(function() {
	
});

Template.SeccionesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SeccionesUpdate.events({
	
});

Template.SeccionesUpdate.helpers({
	
});

Template.SeccionesUpdateForm.onCreated(function() {
	
});

Template.SeccionesUpdateForm.onDestroyed(function() {
	
});

Template.SeccionesUpdateForm.onRendered(function() {
	

	pageSession.set("seccionesUpdateFormInfoMessage", "");
	pageSession.set("seccionesUpdateFormErrorMessage", "");

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

Template.SeccionesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("seccionesUpdateFormInfoMessage", "");
		pageSession.set("seccionesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var seccionesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(seccionesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("seccionesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("secciones", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("seccionesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoSeccionesUpdate", t.data.seccion._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("secciones", mergeObjects(Router.currentRouteParams(), {}));
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

Template.SeccionesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("seccionesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("seccionesUpdateFormErrorMessage");
	}
	
});
