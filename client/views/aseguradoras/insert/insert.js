var pageSession = new ReactiveDict();

Template.AseguradorasInsert.onCreated(function() {
	
});

Template.AseguradorasInsert.onDestroyed(function() {
	
});

Template.AseguradorasInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AseguradorasInsert.events({
	
});

Template.AseguradorasInsert.helpers({
	
});

Template.AseguradorasInsertForm.onCreated(function() {
	
});

Template.AseguradorasInsertForm.onDestroyed(function() {
	
});

Template.AseguradorasInsertForm.onRendered(function() {
	

	pageSession.set("aseguradorasInsertFormInfoMessage", "");
	pageSession.set("aseguradorasInsertFormErrorMessage", "");

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

Template.AseguradorasInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("aseguradorasInsertFormInfoMessage", "");
		pageSession.set("aseguradorasInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var aseguradorasInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(aseguradorasInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("aseguradorasInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("aseguradoras", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("aseguradorasInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoAseguradorasInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("aseguradoras", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AseguradorasInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("aseguradorasInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("aseguradorasInsertFormErrorMessage");
	}
	
});
