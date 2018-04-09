var pageSession = new ReactiveDict();

Template.ClasificacionesUpdate.onCreated(function() {
	
});

Template.ClasificacionesUpdate.onDestroyed(function() {
	
});

Template.ClasificacionesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ClasificacionesUpdate.events({
	
});

Template.ClasificacionesUpdate.helpers({
	
});

Template.ClasificacionesUpdateForm.onCreated(function() {
	
});

Template.ClasificacionesUpdateForm.onDestroyed(function() {
	
});

Template.ClasificacionesUpdateForm.onRendered(function() {
	

	pageSession.set("clasificacionesUpdateFormInfoMessage", "");
	pageSession.set("clasificacionesUpdateFormErrorMessage", "");

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

Template.ClasificacionesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("clasificacionesUpdateFormInfoMessage", "");
		pageSession.set("clasificacionesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var clasificacionesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(clasificacionesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("clasificacionesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("clasificaciones", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("clasificacionesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoClasificacionesUpdate", t.data.clasificacion._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("clasificaciones", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ClasificacionesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("clasificacionesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("clasificacionesUpdateFormErrorMessage");
	}
	
});
