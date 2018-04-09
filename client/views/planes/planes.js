var pageSession = new ReactiveDict();

Template.Planes.onCreated(function() {
	
});

Template.Planes.onDestroyed(function() {
	
});

Template.Planes.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Planes.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Planes.helpers({
	
});

var PlanesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PlanesViewSearchString");
	var sortBy = pageSession.get("PlanesViewSortBy");
	var sortAscending = pageSession.get("PlanesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["pla_descripcion", "pla_aseguradora", "pla_descuento", "pla_activo"];
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

var PlanesViewExport = function(cursor, fileType) {
	var data = PlanesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.PlanesView.onCreated(function() {
	
});

Template.PlanesView.onDestroyed(function() {
	
});

Template.PlanesView.onRendered(function() {
	pageSession.set("PlanesViewStyle", "table");
	
});

Template.PlanesView.events({
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
				pageSession.set("PlanesViewSearchString", searchString);
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
					pageSession.set("PlanesViewSearchString", searchString);
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
					pageSession.set("PlanesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("planes.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PlanesViewExport(this.plan_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PlanesViewExport(this.plan_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PlanesViewExport(this.plan_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PlanesViewExport(this.plan_list, "json");
	}

	
});

Template.PlanesView.helpers({

	"insertButtonClass": function() {
		return InfoPlanes.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.plan_list || this.plan_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.plan_list && this.plan_list.count() > 0;
	},
	"isNotFound": function() {
		return this.plan_list && pageSession.get("PlanesViewSearchString") && PlanesViewItems(this.plan_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PlanesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PlanesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("PlanesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("PlanesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PlanesViewStyle") == "gallery";
	}

	
});


Template.PlanesViewTable.onCreated(function() {
	
});

Template.PlanesViewTable.onDestroyed(function() {
	
});

Template.PlanesViewTable.onRendered(function() {
	
});

Template.PlanesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PlanesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PlanesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PlanesViewSortAscending") || false;
			pageSession.set("PlanesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PlanesViewSortAscending", true);
		}
	}
});

Template.PlanesViewTable.helpers({
	"tableItems": function() {
		return PlanesViewItems(this.plan_list);
	}
});


Template.PlanesViewTableItems.onCreated(function() {
	
});

Template.PlanesViewTableItems.onDestroyed(function() {
	
});

Template.PlanesViewTableItems.onRendered(function() {
	
});

Template.PlanesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("planes.details", mergeObjects(Router.currentRouteParams(), {planId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoPlanesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoPlanesRemove", me._id, function(err, res) {
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
		Router.go("planes.update", mergeObjects(Router.currentRouteParams(), {planId: this._id}));
		return false;
	}
});

Template.PlanesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoPlanes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoPlanes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
