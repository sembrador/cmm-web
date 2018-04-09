var pageSession = new ReactiveDict();

Template.ReferidoresUpdate.onCreated(function() {
	
});

Template.ReferidoresUpdate.onDestroyed(function() {
	
});

Template.ReferidoresUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ReferidoresUpdate.events({
	
});

Template.ReferidoresUpdate.helpers({
	
});

Template.ReferidoresUpdateForm.onCreated(function() {
	
});

Template.ReferidoresUpdateForm.onDestroyed(function() {
	
});

Template.ReferidoresUpdateForm.onRendered(function() {
	

	pageSession.set("referidoresUpdateFormInfoMessage", "");
	pageSession.set("referidoresUpdateFormErrorMessage", "");

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

Template.ReferidoresUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("referidoresUpdateFormInfoMessage", "");
		pageSession.set("referidoresUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var referidoresUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(referidoresUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("referidoresUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("referidores", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("referidoresUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoReferidoresUpdate", t.data.referidor._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("referidores", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ReferidoresUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("referidoresUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("referidoresUpdateFormErrorMessage");
	}
	
});
