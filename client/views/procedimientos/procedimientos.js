var pageSession = new ReactiveDict();

Template.Procedimientos.onCreated(function() {
	
});

Template.Procedimientos.onDestroyed(function() {
	
});

Template.Procedimientos.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Procedimientos.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Procedimientos.helpers({
	
});

var ProcedimientosViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProcedimientosViewSearchString");
	var sortBy = pageSession.get("ProcedimientosViewSortBy");
	var sortAscending = pageSession.get("ProcedimientosViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["pro_cpt", "pro_codigo", "pro_descripcion", "pro_precio", "pro_departamento", "pro_utiempo", "pro_color", "pro_activo"];
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

var ProcedimientosViewExport = function(cursor, fileType) {
	var data = ProcedimientosViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ProcedimientosView.onCreated(function() {
	
});

Template.ProcedimientosView.onDestroyed(function() {
	
});

Template.ProcedimientosView.onRendered(function() {
	pageSession.set("ProcedimientosViewStyle", "table");
	
});

Template.ProcedimientosView.events({
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
				pageSession.set("ProcedimientosViewSearchString", searchString);
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
					pageSession.set("ProcedimientosViewSearchString", searchString);
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
					pageSession.set("ProcedimientosViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("procedimientos.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ProcedimientosViewExport(this.procedimiento_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProcedimientosViewExport(this.procedimiento_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProcedimientosViewExport(this.procedimiento_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProcedimientosViewExport(this.procedimiento_list, "json");
	}

	
});

Template.ProcedimientosView.helpers({

	"insertButtonClass": function() {
		return InfoProcedimientos.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.procedimiento_list || this.procedimiento_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.procedimiento_list && this.procedimiento_list.count() > 0;
	},
	"isNotFound": function() {
		return this.procedimiento_list && pageSession.get("ProcedimientosViewSearchString") && ProcedimientosViewItems(this.procedimiento_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProcedimientosViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProcedimientosViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ProcedimientosViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ProcedimientosViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProcedimientosViewStyle") == "gallery";
	}

	
});


Template.ProcedimientosViewTable.onCreated(function() {
	
});

Template.ProcedimientosViewTable.onDestroyed(function() {
	
});

Template.ProcedimientosViewTable.onRendered(function() {
	
});

Template.ProcedimientosViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ProcedimientosViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProcedimientosViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProcedimientosViewSortAscending") || false;
			pageSession.set("ProcedimientosViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProcedimientosViewSortAscending", true);
		}
	}
});

Template.ProcedimientosViewTable.helpers({
	"tableItems": function() {
		return ProcedimientosViewItems(this.procedimiento_list);
	}
});


Template.ProcedimientosViewTableItems.onCreated(function() {
	
});

Template.ProcedimientosViewTableItems.onDestroyed(function() {
	
});

Template.ProcedimientosViewTableItems.onRendered(function() {
	
});

Template.ProcedimientosViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("procedimientos.details", mergeObjects(Router.currentRouteParams(), {procedimientoId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoProcedimientosUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoProcedimientosRemove", me._id, function(err, res) {
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
		Router.go("procedimientos.update", mergeObjects(Router.currentRouteParams(), {procedimientoId: this._id}));
		return false;
	}
});

Template.ProcedimientosViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoProcedimientos.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoProcedimientos.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
