var pageSession = new ReactiveDict();

Template.AdminCounters.onCreated(function() {
	
});

Template.AdminCounters.onDestroyed(function() {
	
});

Template.AdminCounters.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminCounters.events({
	
});

Template.AdminCounters.helpers({
	
});

var AdminCountersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminCountersViewSearchString");
	var sortBy = pageSession.get("AdminCountersViewSortBy");
	var sortAscending = pageSession.get("AdminCountersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["descripcion", "contador"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AdminCountersViewExport = function(cursor, fileType) {
	var data = AdminCountersViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.AdminCountersView.onCreated(function() {
	
});

Template.AdminCountersView.onDestroyed(function() {
	
});

Template.AdminCountersView.onRendered(function() {
	pageSession.set("AdminCountersViewStyle", "table");
	
});

Template.AdminCountersView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AdminCountersViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AdminCountersViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AdminCountersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.counters.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminCountersViewExport(this.counter_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminCountersViewExport(this.counter_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminCountersViewExport(this.counter_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminCountersViewExport(this.counter_list, "json");
	}

	
});

Template.AdminCountersView.helpers({

	"insertButtonClass": function() {
		return InfoCounters.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.counter_list || this.counter_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.counter_list && this.counter_list.count() > 0;
	},
	"isNotFound": function() {
		return this.counter_list && pageSession.get("AdminCountersViewSearchString") && AdminCountersViewItems(this.counter_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminCountersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminCountersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("AdminCountersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("AdminCountersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminCountersViewStyle") == "gallery";
	}

	
});


Template.AdminCountersViewTable.onCreated(function() {
	
});

Template.AdminCountersViewTable.onDestroyed(function() {
	
});

Template.AdminCountersViewTable.onRendered(function() {
	
});

Template.AdminCountersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminCountersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminCountersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminCountersViewSortAscending") || false;
			pageSession.set("AdminCountersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminCountersViewSortAscending", true);
		}
	}
});

Template.AdminCountersViewTable.helpers({
	"tableItems": function() {
		return AdminCountersViewItems(this.counter_list);
	}
});


Template.AdminCountersViewTableItems.onCreated(function() {
	
});

Template.AdminCountersViewTableItems.onDestroyed(function() {
	
});

Template.AdminCountersViewTableItems.onRendered(function() {
	
});

Template.AdminCountersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("admin.counters.details", mergeObjects(Router.currentRouteParams(), {counterId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoCountersUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Esta Seguro? Eliminar Este Registro?",
			title: "Eliminar",
			animate: false,
			buttons: {
				success: {
					label: "Si",
					className: "btn-success",
					callback: function() {
						Meteor.call("infoCountersRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.counters.update", mergeObjects(Router.currentRouteParams(), {counterId: this._id}));
		return false;
	}
});

Template.AdminCountersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoCounters.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoCounters.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
