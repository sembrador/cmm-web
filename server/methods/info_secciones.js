Meteor.methods({
	"infoSeccionesInsert": function(data) {
		if(!InfoSecciones.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoSecciones.insert(data);
	},

	"infoSeccionesUpdate": function(id, data) {
		var doc = InfoSecciones.findOne({ _id: id });
		if(!InfoSecciones.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoSecciones.update({ _id: id }, { $set: data });
	},

	"infoSeccionesRemove": function(id) {
		var doc = InfoSecciones.findOne({ _id: id });
		if(!InfoSecciones.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoSecciones.remove({ _id: id });
	}
});
