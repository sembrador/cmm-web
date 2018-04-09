var pageSession = new ReactiveDict();

Template.Aseguradoras.onCreated(function() {
	
});

Template.Aseguradoras.onDestroyed(function() {
	
});

Template.Aseguradoras.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Aseguradoras.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Aseguradoras.helpers({
	
});

var AseguradorasViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AseguradorasViewSearchString");
	var sortBy = pageSession.get("AseguradorasViewSortBy");
	var sortAscending = pageSession.get("AseguradorasViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["ase_descripcion", "ase_telefonos.celular", "ase_telefonos.oficina", "ase_telefonos.fax", "ase_telefonos.otro", "ase_tipo", "ase_active"];
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

var AseguradorasViewExport = function(cursor, fileType) {
	var data = AseguradorasViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.AseguradorasView.onCreated(function() {
	
});

Template.AseguradorasView.onDestroyed(function() {
	
});

Template.AseguradorasView.onRendered(function() {
	pageSession.set("AseguradorasViewStyle", "table");
	
});

Template.AseguradorasView.events({
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
				pageSession.set("AseguradorasViewSearchString", searchString);
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
					pageSession.set("AseguradorasViewSearchString", searchString);
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
					pageSession.set("AseguradorasViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("aseguradoras.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AseguradorasViewExport(this.aseguradora_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AseguradorasViewExport(this.aseguradora_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AseguradorasViewExport(this.aseguradora_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AseguradorasViewExport(this.aseguradora_list, "json");
	}

	
});

Template.AseguradorasView.helpers({

	"insertButtonClass": function() {
		return InfoAseguradoras.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.aseguradora_list || this.aseguradora_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.aseguradora_list && this.aseguradora_list.count() > 0;
	},
	"isNotFound": function() {
		return this.aseguradora_list && pageSession.get("AseguradorasViewSearchString") && AseguradorasViewItems(this.aseguradora_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AseguradorasViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AseguradorasViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("AseguradorasViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("AseguradorasViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AseguradorasViewStyle") == "gallery";
	}

	
});


Template.AseguradorasViewTable.onCreated(function() {
	
});

Template.AseguradorasViewTable.onDestroyed(function() {
	
});

Template.AseguradorasViewTable.onRendered(function() {
	
});

Template.AseguradorasViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AseguradorasViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AseguradorasViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AseguradorasViewSortAscending") || false;
			pageSession.set("AseguradorasViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AseguradorasViewSortAscending", true);
		}
	}
});

Template.AseguradorasViewTable.helpers({
	"tableItems": function() {
		return AseguradorasViewItems(this.aseguradora_list);
	}
});


Template.AseguradorasViewTableItems.onCreated(function() {
	
});

Template.AseguradorasViewTableItems.onDestroyed(function() {
	
});

Template.AseguradorasViewTableItems.onRendered(function() {
	
});

Template.AseguradorasViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("aseguradoras.details", mergeObjects(Router.currentRouteParams(), {aseguradoraId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoAseguradorasUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoAseguradorasRemove", me._id, function(err, res) {
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
		Router.go("aseguradoras.update", mergeObjects(Router.currentRouteParams(), {aseguradoraId: this._id}));
		return false;
	}
});

Template.AseguradorasViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoAseguradoras.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoAseguradoras.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
