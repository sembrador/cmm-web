
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoEspecialidades = new Mongo.Collection("info_especialidades");

this.InfoEspecialidades.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoEspecialidades.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoEspecialidades.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoEspecialidades = new SimpleSchema({
	esp_descripcion: {
		label: "DESCRIPCION",
		type: String
	}
});

this.InfoEspecialidades.attachSchema(this.Schemas.InfoEspecialidades);
