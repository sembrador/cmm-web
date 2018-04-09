Meteor.methods({
	"infoAseguradorasInsert": function(data) {
		if(!InfoAseguradoras.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoAseguradoras.insert(data);
	},

	"infoAseguradorasUpdate": function(id, data) {
		var doc = InfoAseguradoras.findOne({ _id: id });
		if(!InfoAseguradoras.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoAseguradoras.update({ _id: id }, { $set: data });
	},

	"infoAseguradorasRemove": function(id) {
		var doc = InfoAseguradoras.findOne({ _id: id });
		if(!InfoAseguradoras.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoAseguradoras.remove({ _id: id });
	}
});
