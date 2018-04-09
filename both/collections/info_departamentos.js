
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoDepartamentos = new Mongo.Collection("info_departamentos");

this.InfoDepartamentos.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoDepartamentos.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoDepartamentos.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoDepartamentos = new SimpleSchema({
	dep_codigo: {
		label: "CODIGO",
		type: Number
	},
	dep_descripcion: {
		label: "DESCRIPCION",
		type: String
	},
	dep_seccion: {
		label: "SECCION",
		type: String,
		optional: true
	},
	dep_agenda: {
		label: "AGENDA",
		type: String
	},
	dep_activo: {
		label: "ACTIVO",
		type: Boolean
	}
});

this.InfoDepartamentos.attachSchema(this.Schemas.InfoDepartamentos);
