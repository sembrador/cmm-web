var pageSession = new ReactiveDict();

Template.Secciones.onCreated(function() {
	
});

Template.Secciones.onDestroyed(function() {
	
});

Template.Secciones.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Secciones.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Secciones.helpers({
	
});

var SeccionesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SeccionesViewSearchString");
	var sortBy = pageSession.get("SeccionesViewSortBy");
	var sortAscending = pageSession.get("SeccionesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["sec_descripcion"];
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

var SeccionesViewExport = function(cursor, fileType) {
	var data = SeccionesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.SeccionesView.onCreated(function() {
	
});

Template.SeccionesView.onDestroyed(function() {
	
});

Template.SeccionesView.onRendered(function() {
	pageSession.set("SeccionesViewStyle", "table");
	
});

Template.SeccionesView.events({
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
				pageSession.set("SeccionesViewSearchString", searchString);
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
					pageSession.set("SeccionesViewSearchString", searchString);
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
					pageSession.set("SeccionesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("secciones.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		SeccionesViewExport(this.seccion_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SeccionesViewExport(this.seccion_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SeccionesViewExport(this.seccion_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SeccionesViewExport(this.seccion_list, "json");
	}

	
});

Template.SeccionesView.helpers({

	"insertButtonClass": function() {
		return InfoSecciones.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.seccion_list || this.seccion_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.seccion_list && this.seccion_list.count() > 0;
	},
	"isNotFound": function() {
		return this.seccion_list && pageSession.get("SeccionesViewSearchString") && SeccionesViewItems(this.seccion_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SeccionesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SeccionesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("SeccionesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("SeccionesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SeccionesViewStyle") == "gallery";
	}

	
});


Template.SeccionesViewTable.onCreated(function() {
	
});

Template.SeccionesViewTable.onDestroyed(function() {
	
});

Template.SeccionesViewTable.onRendered(function() {
	
});

Template.SeccionesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("SeccionesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SeccionesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SeccionesViewSortAscending") || false;
			pageSession.set("SeccionesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SeccionesViewSortAscending", true);
		}
	}
});

Template.SeccionesViewTable.helpers({
	"tableItems": function() {
		return SeccionesViewItems(this.seccion_list);
	}
});


Template.SeccionesViewTableItems.onCreated(function() {
	
});

Template.SeccionesViewTableItems.onDestroyed(function() {
	
});

Template.SeccionesViewTableItems.onRendered(function() {
	
});

Template.SeccionesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("secciones.details", mergeObjects(Router.currentRouteParams(), {seccionId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoSeccionesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoSeccionesRemove", me._id, function(err, res) {
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
		Router.go("secciones.update", mergeObjects(Router.currentRouteParams(), {seccionId: this._id}));
		return false;
	}
});

Template.SeccionesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoSecciones.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoSecciones.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
