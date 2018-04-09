
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoAseguradoras = new Mongo.Collection("info_aseguradoras");

this.InfoAseguradoras.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoAseguradoras.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoAseguradoras.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoAseguradoras = new SimpleSchema({
	ase_descripcion: {
		label: "DESCRIPCION",
		type: String
	},
	"ase_telefonos.celular": {
		label: "CELULAR",
		type: Object,
		blackbox: true
	},
	"ase_telefonos.oficina": {
		label: "TRABAJO",
		type: Object,
		blackbox: true
	},
	"ase_telefonos.fax": {
		label: "FAX",
		type: Object,
		blackbox: true,
		optional: true
	},
	"ase_telefonos.otro": {
		label: "OTRO",
		type: Object,
		blackbox: true,
		optional: true
	},
	ase_tipo: {
		label: "TIPO",
		type: String,
		optional: true
	},
	ase_active: {
		label: "HABILITADO",
		type: Boolean
	}
});

this.InfoAseguradoras.attachSchema(this.Schemas.InfoAseguradoras);
