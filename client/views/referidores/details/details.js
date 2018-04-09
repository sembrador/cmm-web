var pageSession = new ReactiveDict();

Template.ReferidoresDetails.onCreated(function() {
	
});

Template.ReferidoresDetails.onDestroyed(function() {
	
});

Template.ReferidoresDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ReferidoresDetails.events({
	
});

Template.ReferidoresDetails.helpers({
	
});

Template.ReferidoresDetailsForm.onCreated(function() {
	
});

Template.ReferidoresDetailsForm.onDestroyed(function() {
	
});

Template.ReferidoresDetailsForm.onRendered(function() {
	

	pageSession.set("referidoresDetailsFormInfoMessage", "");
	pageSession.set("referidoresDetailsFormErrorMessage", "");

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

Template.ReferidoresDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("referidoresDetailsFormInfoMessage", "");
		pageSession.set("referidoresDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var referidoresDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(referidoresDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("referidoresDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("referidoresDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("referidores", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("referidores", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ReferidoresDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("referidoresDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("referidoresDetailsFormErrorMessage");
	}
	
});
