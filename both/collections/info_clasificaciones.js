
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoClasificaciones = new Mongo.Collection("info_clasificaciones");

this.InfoClasificaciones.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoClasificaciones.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoClasificaciones.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoClasificaciones = new SimpleSchema({
	cla_descripcion: {
		label: "DESCRIPCION",
		type: String
	}
});

this.InfoClasificaciones.attachSchema(this.Schemas.InfoClasificaciones);
