var pageSession = new ReactiveDict();

Template.PlanesDetails.onCreated(function() {
	
});

Template.PlanesDetails.onDestroyed(function() {
	
});

Template.PlanesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PlanesDetails.events({
	
});

Template.PlanesDetails.helpers({
	
});

Template.PlanesDetailsForm.onCreated(function() {
	
});

Template.PlanesDetailsForm.onDestroyed(function() {
	
});

Template.PlanesDetailsForm.onRendered(function() {
	

	pageSession.set("planesDetailsFormInfoMessage", "");
	pageSession.set("planesDetailsFormErrorMessage", "");

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

Template.PlanesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("planesDetailsFormInfoMessage", "");
		pageSession.set("planesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var planesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(planesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("planesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("planesDetailsFormErrorMessage", message);
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

		Router.go("planes", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("planes", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PlanesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("planesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("planesDetailsFormErrorMessage");
	}
	
});
