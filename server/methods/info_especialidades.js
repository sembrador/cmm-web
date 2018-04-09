Meteor.methods({
	"infoEspecialidadesInsert": function(data) {
		if(!InfoEspecialidades.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoEspecialidades.insert(data);
	},

	"infoEspecialidadesUpdate": function(id, data) {
		var doc = InfoEspecialidades.findOne({ _id: id });
		if(!InfoEspecialidades.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoEspecialidades.update({ _id: id }, { $set: data });
	},

	"infoEspecialidadesRemove": function(id) {
		var doc = InfoEspecialidades.findOne({ _id: id });
		if(!InfoEspecialidades.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoEspecialidades.remove({ _id: id });
	}
});
