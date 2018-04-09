var pageSession = new ReactiveDict();

Template.AdminCountersInsert.onCreated(function() {
	
});

Template.AdminCountersInsert.onDestroyed(function() {
	
});

Template.AdminCountersInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminCountersInsert.events({
	
});

Template.AdminCountersInsert.helpers({
	
});

Template.AdminCountersInsertForm.onCreated(function() {
	
});

Template.AdminCountersInsertForm.onDestroyed(function() {
	
});

Template.AdminCountersInsertForm.onRendered(function() {
	

	pageSession.set("adminCountersInsertFormInfoMessage", "");
	pageSession.set("adminCountersInsertFormErrorMessage", "");

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

Template.AdminCountersInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCountersInsertFormInfoMessage", "");
		pageSession.set("adminCountersInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminCountersInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminCountersInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("adminCountersInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.counters", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminCountersInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoCountersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.counters", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminCountersInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCountersInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCountersInsertFormErrorMessage");
	}
	
});
