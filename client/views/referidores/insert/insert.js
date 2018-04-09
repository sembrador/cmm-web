var pageSession = new ReactiveDict();

Template.ReferidoresInsert.onCreated(function() {
	
});

Template.ReferidoresInsert.onDestroyed(function() {
	
});

Template.ReferidoresInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ReferidoresInsert.events({
	
});

Template.ReferidoresInsert.helpers({
	
});

Template.ReferidoresInsertForm.onCreated(function() {
	
});

Template.ReferidoresInsertForm.onDestroyed(function() {
	
});

Template.ReferidoresInsertForm.onRendered(function() {
	

	pageSession.set("referidoresInsertFormInfoMessage", "");
	pageSession.set("referidoresInsertFormErrorMessage", "");

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

Template.ReferidoresInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("referidoresInsertFormInfoMessage", "");
		pageSession.set("referidoresInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var referidoresInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(referidoresInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("referidoresInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("referidores", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("referidoresInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoReferidoresInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ReferidoresInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("referidoresInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("referidoresInsertFormErrorMessage");
	}
	
});
