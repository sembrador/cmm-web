
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoAgendaRx = new Mongo.Collection("info_agenda_rx");

this.InfoAgendaRx.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoAgendaRx.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoAgendaRx.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoAgendaRx = new SimpleSchema({
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

this.InfoAgendaRx.attachSchema(this.Schemas.InfoAgendaRx);
