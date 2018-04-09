Meteor.methods({
	"infoPlanesInsert": function(data) {
		if(!InfoPlanes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoPlanes.insert(data);
	},

	"infoPlanesUpdate": function(id, data) {
		var doc = InfoPlanes.findOne({ _id: id });
		if(!InfoPlanes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoPlanes.update({ _id: id }, { $set: data });
	},

	"infoPlanesRemove": function(id) {
		var doc = InfoPlanes.findOne({ _id: id });
		if(!InfoPlanes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoPlanes.remove({ _id: id });
	}
});
