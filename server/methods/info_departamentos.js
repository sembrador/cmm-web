Meteor.methods({
	"infoDepartamentosInsert": function(data) {
		if(!InfoDepartamentos.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoDepartamentos.insert(data);
	},

	"infoDepartamentosUpdate": function(id, data) {
		var doc = InfoDepartamentos.findOne({ _id: id });
		if(!InfoDepartamentos.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoDepartamentos.update({ _id: id }, { $set: data });
	},

	"infoDepartamentosRemove": function(id) {
		var doc = InfoDepartamentos.findOne({ _id: id });
		if(!InfoDepartamentos.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoDepartamentos.remove({ _id: id });
	}
});
