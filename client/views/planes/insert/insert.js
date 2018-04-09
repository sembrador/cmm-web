var pageSession = new ReactiveDict();

Template.PlanesInsert.onCreated(function() {
	
});

Template.PlanesInsert.onDestroyed(function() {
	
});

Template.PlanesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PlanesInsert.events({
	
});

Template.PlanesInsert.helpers({
	
});

Template.PlanesInsertForm.onCreated(function() {
	
});

Template.PlanesInsertForm.onDestroyed(function() {
	
});

Template.PlanesInsertForm.onRendered(function() {
	

	pageSession.set("planesInsertFormInfoMessage", "");
	pageSession.set("planesInsertFormErrorMessage", "");

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

Template.PlanesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("planesInsertFormInfoMessage", "");
		pageSession.set("planesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var planesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(planesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Grabado.";
						pageSession.set("planesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("planes", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("planesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("infoPlanesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("planes", mergeObjects(Router.currentRouteParams(), {}));
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

Template.PlanesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("planesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("planesInsertFormErrorMessage");
	}
	
});
