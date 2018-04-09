var pageSession = new ReactiveDict();

Template.EspecialidadesInsert.onCreated(function() {
	
});

Template.EspecialidadesInsert.onDestroyed(function() {
	
});

Template.EspecialidadesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.EspecialidadesInsert.events({
	
});

Template.EspecialidadesInsert.helpers({
	
});

Template.EspecialidadesInsertForm.onCreated(function() {
	
});

Template.EspecialidadesInsertForm.onDestroyed(function() {
	
});

Template.EspecialidadesInsertForm.onRendered(function() {
	

	pageSession.set("especialidadesInsertFormInfoMessage", "");
	pageSession.set("especialidadesInsertFormErrorMessage", "");

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

Template.EspecialidadesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("especialidadesInsertFormInfoMessage", "");
		pageSession.set("especialidadesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var especialidadesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(especialidadesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("especialidadesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("especialidades", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("especialidadesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoEspecialidadesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.EspecialidadesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("especialidadesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("especialidadesInsertFormErrorMessage");
	}
	
});
