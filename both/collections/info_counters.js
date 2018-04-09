
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoCounters = new Mongo.Collection("info_counters");

this.InfoCounters.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoCounters.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoCounters.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoCounters = new SimpleSchema({
	descripcion: {
		label: "DESCRIPCION",
		type: String
	},
	contador: {
		label: "VALOR",
		type: Number,
		min: 0
	}
});

this.InfoCounters.attachSchema(this.Schemas.InfoCounters);
