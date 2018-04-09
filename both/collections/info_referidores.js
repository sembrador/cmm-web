
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoReferidores = new Mongo.Collection("info_referidores");

this.InfoReferidores.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoReferidores.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoReferidores.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoReferidores = new SimpleSchema({
	ref_codigo: {
		label: "CODIGO",
		type: Number,
		optional: true
	},
	ref_nombres: {
		label: "NOMBRES",
		type: String
	},
	ref_apellidos: {
		label: "APELLIDOS",
		type: String
	},
	ref_genero: {
		label: "SEXO",
		type: String
	},
	ref_fch_nac: {
		label: "FECHA DE NACIMIENTO",
		type: Date
	},
	"ref_telefonos.celular": {
		label: "CELULAR",
		type: Object,
		blackbox: true
	},
	"ref_telefonos.trabajo": {
		label: "TRABAJO",
		type: Object,
		blackbox: true
	},
	"ref_telefonos.casa": {
		label: "CASA",
		type: Object,
		blackbox: true
	},
	"ref_telefonos.otro": {
		label: "OTRO",
		type: Object,
		blackbox: true
	},
	"ref_direccion.calle": {
		label: "CALLE",
		type: Object,
		blackbox: true
	},
	"ref_direccion.corregimiento": {
		label: "CORREGIMIENTO",
		type: Object,
		blackbox: true
	},
	"ref_direccion.distrito": {
		label: "DISTRITO",
		type: Object,
		blackbox: true
	},
	"ref_direccion.provincia": {
		label: "PROVINCIA",
		type: Object,
		blackbox: true
	},
	"ref_direccion.apartado": {
		label: "APARTADO",
		type: Object,
		blackbox: true,
		optional: true
	},
	ref_email: {
		label: "E-MAIL",
		type: String,
		regEx: SimpleSchema.RegEx.Email
	}
});

this.InfoReferidores.attachSchema(this.Schemas.InfoReferidores);
