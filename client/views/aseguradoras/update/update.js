var pageSession = new ReactiveDict();

Template.AseguradorasUpdate.onCreated(function() {
	
});

Template.AseguradorasUpdate.onDestroyed(function() {
	
});

Template.AseguradorasUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AseguradorasUpdate.events({
	
});

Template.AseguradorasUpdate.helpers({
	
});

Template.AseguradorasUpdateForm.onCreated(function() {
	
});

Template.AseguradorasUpdateForm.onDestroyed(function() {
	
});

Template.AseguradorasUpdateForm.onRendered(function() {
	

	pageSession.set("aseguradorasUpdateFormInfoMessage", "");
	pageSession.set("aseguradorasUpdateFormErrorMessage", "");

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

Template.AseguradorasUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("aseguradorasUpdateFormInfoMessage", "");
		pageSession.set("aseguradorasUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var aseguradorasUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(aseguradorasUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("aseguradorasUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("aseguradoras", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("aseguradorasUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoAseguradorasUpdate", t.data.aseguradora._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AseguradorasUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("aseguradorasUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("aseguradorasUpdateFormErrorMessage");
	}
	
});
