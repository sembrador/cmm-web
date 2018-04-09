var pageSession = new ReactiveDict();

Template.AdminCountersDetails.onCreated(function() {
	
});

Template.AdminCountersDetails.onDestroyed(function() {
	
});

Template.AdminCountersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminCountersDetails.events({
	
});

Template.AdminCountersDetails.helpers({
	
});

Template.AdminCountersDetailsForm.onCreated(function() {
	
});

Template.AdminCountersDetailsForm.onDestroyed(function() {
	
});

Template.AdminCountersDetailsForm.onRendered(function() {
	

	pageSession.set("adminCountersDetailsFormInfoMessage", "");
	pageSession.set("adminCountersDetailsFormErrorMessage", "");

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

Template.AdminCountersDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCountersDetailsFormInfoMessage", "");
		pageSession.set("adminCountersDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminCountersDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminCountersDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("adminCountersDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminCountersDetailsFormErrorMessage", message);
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

		Router.go("admin.counters", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.counters", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminCountersDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCountersDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCountersDetailsFormErrorMessage");
	}
	
});
