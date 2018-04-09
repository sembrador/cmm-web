Meteor.methods({
	"infoReferidoresInsert": function(data) {
		if(!InfoReferidores.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoReferidores.insert(data);
	},

	"infoReferidoresUpdate": function(id, data) {
		var doc = InfoReferidores.findOne({ _id: id });
		if(!InfoReferidores.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoReferidores.update({ _id: id }, { $set: data });
	},

	"infoReferidoresRemove": function(id) {
		var doc = InfoReferidores.findOne({ _id: id });
		if(!InfoReferidores.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoReferidores.remove({ _id: id });
	}
});
