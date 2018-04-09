
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoPlanes = new Mongo.Collection("info_planes");

this.InfoPlanes.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoPlanes.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoPlanes.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoPlanes = new SimpleSchema({
	pla_descripcion: {
		label: "DESCRIPCION",
		type: String
	},
	pla_aseguradora: {
		label: "COMPAÑIA",
		type: String
	},
	pla_descuento: {
		label: "DESCUENTO",
		type: Number,
		decimal: true,
		defaultValue: 0,
		min: 0
	},
	pla_activo: {
		label: "HABILITADO",
		type: Boolean
	}
});

this.InfoPlanes.attachSchema(this.Schemas.InfoPlanes);
