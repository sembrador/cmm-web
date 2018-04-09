var pageSession = new ReactiveDict();

Template.Clasificaciones.onCreated(function() {
	
});

Template.Clasificaciones.onDestroyed(function() {
	
});

Template.Clasificaciones.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Clasificaciones.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Clasificaciones.helpers({
	
});

var ClasificacionesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ClasificacionesViewSearchString");
	var sortBy = pageSession.get("ClasificacionesViewSortBy");
	var sortAscending = pageSession.get("ClasificacionesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["cla_descripcion"];
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

var ClasificacionesViewExport = function(cursor, fileType) {
	var data = ClasificacionesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ClasificacionesView.onCreated(function() {
	
});

Template.ClasificacionesView.onDestroyed(function() {
	
});

Template.ClasificacionesView.onRendered(function() {
	pageSession.set("ClasificacionesViewStyle", "table");
	
});

Template.ClasificacionesView.events({
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
				pageSession.set("ClasificacionesViewSearchString", searchString);
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
					pageSession.set("ClasificacionesViewSearchString", searchString);
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
					pageSession.set("ClasificacionesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("clasificaciones.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ClasificacionesViewExport(this.clasificacion_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ClasificacionesViewExport(this.clasificacion_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ClasificacionesViewExport(this.clasificacion_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ClasificacionesViewExport(this.clasificacion_list, "json");
	}

	
});

Template.ClasificacionesView.helpers({

	"insertButtonClass": function() {
		return InfoClasificaciones.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.clasificacion_list || this.clasificacion_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.clasificacion_list && this.clasificacion_list.count() > 0;
	},
	"isNotFound": function() {
		return this.clasificacion_list && pageSession.get("ClasificacionesViewSearchString") && ClasificacionesViewItems(this.clasificacion_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ClasificacionesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ClasificacionesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ClasificacionesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ClasificacionesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ClasificacionesViewStyle") == "gallery";
	}

	
});


Template.ClasificacionesViewTable.onCreated(function() {
	
});

Template.ClasificacionesViewTable.onDestroyed(function() {
	
});

Template.ClasificacionesViewTable.onRendered(function() {
	
});

Template.ClasificacionesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ClasificacionesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ClasificacionesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ClasificacionesViewSortAscending") || false;
			pageSession.set("ClasificacionesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ClasificacionesViewSortAscending", true);
		}
	}
});

Template.ClasificacionesViewTable.helpers({
	"tableItems": function() {
		return ClasificacionesViewItems(this.clasificacion_list);
	}
});


Template.ClasificacionesViewTableItems.onCreated(function() {
	
});

Template.ClasificacionesViewTableItems.onDestroyed(function() {
	
});

Template.ClasificacionesViewTableItems.onRendered(function() {
	
});

Template.ClasificacionesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("clasificaciones.details", mergeObjects(Router.currentRouteParams(), {clasificacionId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoClasificacionesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoClasificacionesRemove", me._id, function(err, res) {
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
		Router.go("clasificaciones.update", mergeObjects(Router.currentRouteParams(), {clasificacionId: this._id}));
		return false;
	}
});

Template.ClasificacionesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoClasificaciones.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoClasificaciones.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
