var pageSession = new ReactiveDict();

Template.Departamentos.onCreated(function() {
	
});

Template.Departamentos.onDestroyed(function() {
	
});

Template.Departamentos.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Departamentos.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Departamentos.helpers({
	
});

var DepartamentosViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DepartamentosViewSearchString");
	var sortBy = pageSession.get("DepartamentosViewSortBy");
	var sortAscending = pageSession.get("DepartamentosViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["dep_codigo", "dep_descripcion", "dep_seccion", "dep_agenda", "dep_activo"];
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

var DepartamentosViewExport = function(cursor, fileType) {
	var data = DepartamentosViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.DepartamentosView.onCreated(function() {
	
});

Template.DepartamentosView.onDestroyed(function() {
	
});

Template.DepartamentosView.onRendered(function() {
	pageSession.set("DepartamentosViewStyle", "table");
	
});

Template.DepartamentosView.events({
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
				pageSession.set("DepartamentosViewSearchString", searchString);
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
					pageSession.set("DepartamentosViewSearchString", searchString);
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
					pageSession.set("DepartamentosViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("departamentos.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		DepartamentosViewExport(this.departamento_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DepartamentosViewExport(this.departamento_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DepartamentosViewExport(this.departamento_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DepartamentosViewExport(this.departamento_list, "json");
	}

	
});

Template.DepartamentosView.helpers({

	"insertButtonClass": function() {
		return InfoDepartamentos.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.departamento_list || this.departamento_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.departamento_list && this.departamento_list.count() > 0;
	},
	"isNotFound": function() {
		return this.departamento_list && pageSession.get("DepartamentosViewSearchString") && DepartamentosViewItems(this.departamento_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DepartamentosViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DepartamentosViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("DepartamentosViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("DepartamentosViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DepartamentosViewStyle") == "gallery";
	}

	
});


Template.DepartamentosViewTable.onCreated(function() {
	
});

Template.DepartamentosViewTable.onDestroyed(function() {
	
});

Template.DepartamentosViewTable.onRendered(function() {
	
});

Template.DepartamentosViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("DepartamentosViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DepartamentosViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DepartamentosViewSortAscending") || false;
			pageSession.set("DepartamentosViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DepartamentosViewSortAscending", true);
		}
	}
});

Template.DepartamentosViewTable.helpers({
	"tableItems": function() {
		return DepartamentosViewItems(this.departamento_list);
	}
});


Template.DepartamentosViewTableItems.onCreated(function() {
	
});

Template.DepartamentosViewTableItems.onDestroyed(function() {
	
});

Template.DepartamentosViewTableItems.onRendered(function() {
	
});

Template.DepartamentosViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("departamentos.details", mergeObjects(Router.currentRouteParams(), {departamentoId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoDepartamentosUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoDepartamentosRemove", me._id, function(err, res) {
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
		Router.go("departamentos.update", mergeObjects(Router.currentRouteParams(), {departamentoId: this._id}));
		return false;
	}
});

Template.DepartamentosViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoDepartamentos.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoDepartamentos.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
