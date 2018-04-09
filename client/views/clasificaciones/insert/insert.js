var pageSession = new ReactiveDict();

Template.ClasificacionesInsert.onCreated(function() {
	
});

Template.ClasificacionesInsert.onDestroyed(function() {
	
});

Template.ClasificacionesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ClasificacionesInsert.events({
	
});

Template.ClasificacionesInsert.helpers({
	
});

Template.ClasificacionesInsertForm.onCreated(function() {
	
});

Template.ClasificacionesInsertForm.onDestroyed(function() {
	
});

Template.ClasificacionesInsertForm.onRendered(function() {
	

	pageSession.set("clasificacionesInsertFormInfoMessage", "");
	pageSession.set("clasificacionesInsertFormErrorMessage", "");

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

Template.ClasificacionesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("clasificacionesInsertFormInfoMessage", "");
		pageSession.set("clasificacionesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var clasificacionesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(clasificacionesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("clasificacionesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("clasificaciones", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("clasificacionesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoClasificacionesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ClasificacionesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("clasificacionesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("clasificacionesInsertFormErrorMessage");
	}
	
});
