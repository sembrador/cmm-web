var pageSession = new ReactiveDict();

Template.Pacientes.onCreated(function() {
	
});

Template.Pacientes.onDestroyed(function() {
	
});

Template.Pacientes.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Pacientes.events({
	
});

Template.Pacientes.helpers({
	
});

var PacientesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PacientesViewSearchString");
	var sortBy = pageSession.get("PacientesViewSortBy");
	var sortAscending = pageSession.get("PacientesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["cliente_numero", "cliente_nombres", "cliente_apellidos", "cliente_genero", "cliente_fch_nac", "cliente_tipaje", "cliente_telefonos.celular", "cliente_telefonos.trabajo", "cliente_telefonos.casa", "cliente_telefonos.otro", "cliente_direccion_casa.calle", "cliente_direccion_casa.corregimiento", "cliente_direccion_casa.distrito", "cliente_direccion_casa.provincia", "cliente_direccion_casa.apartado", "cliente_direccion_trabajo.calle", "cliente_direccion_trabajo.corregimiento", "cliente_direccion_trabajo.distrito", "cliente_direccion_trabajo.provincia", "cliente_direccion_trabajo.apartado", "cliente_cedula", "cliente_pasaporte", "cliente_ssocial", "cliente_email", "cliente_ecivil", "cliente_clase", "cliente_activo", "cliente_notas"];
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

var PacientesViewExport = function(cursor, fileType) {
	var data = PacientesViewItems(cursor);
	var exportFields = ["cliente_numero", "cliente_telefonos.celular", "cliente_telefonos.trabajo", "cliente_telefonos.casa", "cliente_telefonos.otro"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.PacientesView.onCreated(function() {
	
});

Template.PacientesView.onDestroyed(function() {
	
});

Template.PacientesView.onRendered(function() {
	pageSession.set("PacientesViewStyle", "table");
	
});

Template.PacientesView.events({
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
				pageSession.set("PacientesViewSearchString", searchString);
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
					pageSession.set("PacientesViewSearchString", searchString);
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
					pageSession.set("PacientesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("pacientes.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PacientesViewExport(this.paciente_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PacientesViewExport(this.paciente_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PacientesViewExport(this.paciente_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PacientesViewExport(this.paciente_list, "json");
	}

	
});

Template.PacientesView.helpers({

	"insertButtonClass": function() {
		return InfoPacientes.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.paciente_list || this.paciente_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.paciente_list && this.paciente_list.count() > 0;
	},
	"isNotFound": function() {
		return this.paciente_list && pageSession.get("PacientesViewSearchString") && PacientesViewItems(this.paciente_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PacientesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PacientesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("PacientesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("PacientesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PacientesViewStyle") == "gallery";
	}

	
});


Template.PacientesViewTable.onCreated(function() {
	
});

Template.PacientesViewTable.onDestroyed(function() {
	
});

Template.PacientesViewTable.onRendered(function() {
	
});

Template.PacientesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PacientesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PacientesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PacientesViewSortAscending") || false;
			pageSession.set("PacientesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PacientesViewSortAscending", true);
		}
	}
});

Template.PacientesViewTable.helpers({
	"tableItems": function() {
		return PacientesViewItems(this.paciente_list);
	}
});


Template.PacientesViewTableItems.onCreated(function() {
	
});

Template.PacientesViewTableItems.onDestroyed(function() {
	
});

Template.PacientesViewTableItems.onRendered(function() {
	
});

Template.PacientesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("pacientes.details", mergeObjects(Router.currentRouteParams(), {pacienteId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("infoPacientesUpdate", this._id, values, function(err, res) {
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
			message: "Delete? Are you sure?",
			title: "Eliminar",
			animate: false,
			buttons: {
				success: {
					label: "Si",
					className: "btn-success",
					callback: function() {
						Meteor.call("infoPacientesRemove", me._id, function(err, res) {
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
		Router.go("pacientes.update", mergeObjects(Router.currentRouteParams(), {pacienteId: this._id}));
		return false;
	}
});

Template.PacientesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InfoPacientes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InfoPacientes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
