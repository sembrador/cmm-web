var pageSession = new ReactiveDict();

Template.Referidores.onCreated(function() {
	
});

Template.Referidores.onDestroyed(function() {
	
});

Template.Referidores.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Referidores.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("user_settings", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Referidores.helpers({
	
});

var ReferidoresViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ReferidoresViewSearchString");
	var sortBy = pageSession.get("ReferidoresViewSortBy");
	var sortAscending = pageSession.get("ReferidoresViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["ref_codigo", "ref_nombres", "ref_apellidos", "ref_genero", "ref_fch_nac", "ref_telefonos.celular", "ref_telefonos.trabajo", "ref_telefonos.casa", "ref_telefonos.otro", "ref_direccion.calle", "ref_direccion.corregimiento", "ref_direccion.distrito", "ref_direccion.provincia", "ref_direccion.apartado", "ref_email"];
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

var ReferidoresViewExport = function(cursor, fileType) {
	var data = ReferidoresViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ReferidoresView.onCreated(function() {
	
});

Template.ReferidoresView.onDestroyed(function() {
	
});

Template.ReferidoresView.onRendered(function() {
	pageSession.set("ReferidoresViewStyle", "table");
	
});

Template.ReferidoresView.events({
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
				pageSession.set("ReferidoresViewSearchString", searchString);
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
					pageSession.set("ReferidoresViewSearchString", searchString);
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
					pageSession.set("ReferidoresViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("referidores.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ReferidoresViewExport(this.referidor_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ReferidoresViewExport(this.referidor_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ReferidoresViewExport(this.referidor_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ReferidoresViewExport(this.referidor_list, "json");
	}

	
});

Template.ReferidoresView.helpers({

	"insertButtonClass": function() {
		return InfoReferidores.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.referidor_list || this.referidor_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.referidor_list && this.referidor_list.count() > 0;
	},
	"isNotFound": function() {
		return this.referidor_list && pageSession.get("ReferidoresViewSearchString") && ReferidoresViewItems(this.referidor_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ReferidoresViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ReferidoresViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ReferidoresViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ReferidoresViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ReferidoresViewStyle") == "gallery";
	}

	
});


Template.ReferidoresViewTable.onCreated(function() {
	
});

Template.ReferidoresViewTable.onDestroyed(function() {
	
});

Template.ReferidoresViewTable.onRendered(function() {
	
});

Template.ReferidoresViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ReferidoresViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ReferidoresViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ReferidoresViewSortAscending") || false;
			pageSession.set("ReferidoresViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ReferidoresViewSortAscending", true);
		}
	}
});

Template.ReferidoresViewTable.helpers({
	"tableItems": function() {
		return ReferidoresViewItems(this.referidor_list);
	}
});


Template.ReferidoresViewTableItems.onCreated(function() {
	
});

Template.ReferidoresViewTableItems.onDestroyed(function() {
	
});

Template.ReferidoresViewTableItems.onRendered(function() {
	
});

Template.ReferidoresViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("referidores.details", mergeObjects(Router.currentRouteParams(), {referidorId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoReferidoresUpdate", this._id, values, function(err, res) {
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
						Meteor.call("infoReferidoresRemove", me._id, function(err, res) {
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
		Router.go("referidores.update", mergeObjects(Router.currentRouteParams(), {referidorId: this._id}));
		return false;
	}
});

Template.ReferidoresViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoReferidores.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoReferidores.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
