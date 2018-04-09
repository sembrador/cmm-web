var pageSession = new ReactiveDict();

Template.Especialidades.onCreated(function() {
	
});

Template.Especialidades.onDestroyed(function() {
	
});

Template.Especialidades.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Especialidades.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Especialidades.helpers({
	
});

var EspecialidadesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EspecialidadesViewSearchString");
	var sortBy = pageSession.get("EspecialidadesViewSortBy");
	var sortAscending = pageSession.get("EspecialidadesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["esp_descripcion"];
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

var EspecialidadesViewExport = function(cursor, fileType) {
	var data = EspecialidadesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.EspecialidadesView.onCreated(function() {
	
});

Template.EspecialidadesView.onDestroyed(function() {
	
});

Template.EspecialidadesView.onRendered(function() {
	pageSession.set("EspecialidadesViewStyle", "table");
	
});

Template.EspecialidadesView.events({
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
				pageSession.set("EspecialidadesViewSearchString", searchString);
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
					pageSession.set("EspecialidadesViewSearchString", searchString);
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
					pageSession.set("EspecialidadesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("especialidades.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EspecialidadesViewExport(this.especialidad_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EspecialidadesViewExport(this.especialidad_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EspecialidadesViewExport(this.especialidad_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EspecialidadesViewExport(this.especialidad_list, "json");
	}

	
});

Template.EspecialidadesView.helpers({

	"insertButtonClass": function() {
		return InfoEspecialidades.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.especialidad_list || this.especialidad_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.especialidad_list && this.especialidad_list.count() > 0;
	},
	"isNotFound": function() {
		return this.especialidad_list && pageSession.get("EspecialidadesViewSearchString") && EspecialidadesViewItems(this.especialidad_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EspecialidadesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EspecialidadesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("EspecialidadesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("EspecialidadesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EspecialidadesViewStyle") == "gallery";
	}

	
});


Template.EspecialidadesViewTable.onCreated(function() {
	
});

Template.EspecialidadesViewTable.onDestroyed(function() {
	
});

Template.EspecialidadesViewTable.onRendered(function() {
	
});

Template.EspecialidadesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EspecialidadesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EspecialidadesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EspecialidadesViewSortAscending") || false;
			pageSession.set("EspecialidadesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EspecialidadesViewSortAscending", true);
		}
	}
});

Template.EspecialidadesViewTable.helpers({
	"tableItems": function() {
		return EspecialidadesViewItems(this.especialidad_list);
	}
});


Template.EspecialidadesViewTableItems.onCreated(function() {
	
});

Template.EspecialidadesViewTableItems.onDestroyed(function() {
	
});

Template.EspecialidadesViewTableItems.onRendered(function() {
	
});

Template.EspecialidadesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("especialidades.details", mergeObjects(Router.currentRouteParams(), {especialidadId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoEspecialidadesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoEspecialidadesRemove", me._id, function(err, res) {
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
		Router.go("especialidades.update", mergeObjects(Router.currentRouteParams(), {especialidadId: this._id}));
		return false;
	}
});

Template.EspecialidadesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoEspecialidades.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoEspecialidades.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
