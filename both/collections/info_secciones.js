
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoSecciones = new Mongo.Collection("info_secciones");

this.InfoSecciones.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoSecciones.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoSecciones.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoSecciones = new SimpleSchema({
	sec_descripcion: {
		label: "SECCION",
		type: String
	}
});

this.InfoSecciones.attachSchema(this.Schemas.InfoSecciones);
