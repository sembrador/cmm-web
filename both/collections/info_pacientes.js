
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoPacientes = new Mongo.Collection("info_pacientes");

this.InfoPacientes.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoPacientes.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoPacientes.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoPacientes = new SimpleSchema({
	cliente_numero: {
		label: "NUMERO",
		type: Number
	},
	cliente_nombres: {
		label: "NOMBRES",
		type: String
	},
	cliente_apellidos: {
		label: "APELLIDOS",
		type: String
	},
	cliente_genero: {
		label: "SEXO",
		type: String
	},
	cliente_fch_nac: {
		label: "FECHA DE NACIMIENTO",
		type: Date
	},
	cliente_tipaje: {
		label: "TIPO DE SANGRE",
		type: String
	},
	"cliente_telefonos.celular": {
		label: "CELULAR",
		type: Object,
		blackbox: true
	},
	"cliente_telefonos.trabajo": {
		label: "TRABAJO",
		type: Object,
		blackbox: true
	},
	"cliente_telefonos.casa": {
		label: "CASA",
		type: Object,
		blackbox: true
	},
	"cliente_telefonos.otro": {
		label: "OTRO",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_casa.calle": {
		label: "CALLE",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_casa.corregimiento": {
		label: "CORREGIMIENTO",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_casa.distrito": {
		label: "DISTRITO",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_casa.provincia": {
		label: "PROVINCIA",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_casa.apartado": {
		label: "APARTADO",
		type: Object,
		blackbox: true,
		optional: true
	},
	"cliente_direccion_trabajo.calle": {
		label: "CALLE",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_trabajo.corregimiento": {
		label: "CORREGIMIENTO",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_trabajo.distrito": {
		label: "DISTRITO",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_trabajo.provincia": {
		label: "PROVINCIA",
		type: Object,
		blackbox: true
	},
	"cliente_direccion_trabajo.apartado": {
		label: "APARTADO",
		type: Object,
		blackbox: true,
		optional: true
	},
	cliente_cedula: {
		label: "CEDULA",
		type: String
	},
	cliente_pasaporte: {
		label: "PASAPORTE",
		type: String,
		optional: true
	},
	cliente_ssocial: {
		label: "SEGURO SOCIAL",
		type: String,
		optional: true
	},
	cliente_email: {
		label: "E-MAIL",
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	cliente_ecivil: {
		label: "ESTADO CIVIL",
		type: String
	},
	cliente_clase: {
		label: "CLASIFICACION",
		type: String
	},
	cliente_activo: {
		label: "ACTIVO",
		type: Boolean
	},
	cliente_notas: {
		label: "OBSERVACIONES",
		type: String,
		optional: true
	}
});

this.InfoPacientes.attachSchema(this.Schemas.InfoPacientes);
