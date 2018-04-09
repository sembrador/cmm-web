
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoAgendaSop = new Mongo.Collection("info_agenda_sop");

this.InfoAgendaSop.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoAgendaSop.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoAgendaSop.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoAgendaSop = new SimpleSchema({
	"type.a": {
		label: "PROCEDIMIENTO 1",
		type: Object,
		blackbox: true
	},
	"type.b": {
		label: "PROCEDIMIENTO 2",
		type: Object,
		blackbox: true,
		optional: true
	},
	"type.c": {
		label: "PROCEDIMIENTO 3",
		type: Object,
		blackbox: true,
		optional: true
	},
	start: {
		label: "INICIA",
		type: String
	},
	end: {
		label: "TERMINA",
		type: String
	},
	title: {
		label: "DESCRIPCION",
		type: String
	},
	guests: {
		label: "PERSONAS",
		type: String
	}
});

this.InfoAgendaSop.attachSchema(this.Schemas.InfoAgendaSop);
