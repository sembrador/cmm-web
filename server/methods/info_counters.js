Meteor.methods({
	"infoCountersInsert": function(data) {
		if(!InfoCounters.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoCounters.insert(data);
	},

	"infoCountersUpdate": function(id, data) {
		var doc = InfoCounters.findOne({ _id: id });
		if(!InfoCounters.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoCounters.update({ _id: id }, { $set: data });
	},

	"infoCountersRemove": function(id) {
		var doc = InfoCounters.findOne({ _id: id });
		if(!InfoCounters.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoCounters.remove({ _id: id });
	}
});
