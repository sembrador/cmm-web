Meteor.methods({
	"infoPacientesInsert": function(data) {
		if(!InfoPacientes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoPacientes.insert(data);
	},

	"infoPacientesUpdate": function(id, data) {
		var doc = InfoPacientes.findOne({ _id: id });
		if(!InfoPacientes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoPacientes.update({ _id: id }, { $set: data });
	},

	"infoPacientesRemove": function(id) {
		var doc = InfoPacientes.findOne({ _id: id });
		if(!InfoPacientes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoPacientes.remove({ _id: id });
	}
});
