Meteor.methods({
	"infoProcedimientosInsert": function(data) {
		if(!InfoProcedimientos.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoProcedimientos.insert(data);
	},

	"infoProcedimientosUpdate": function(id, data) {
		var doc = InfoProcedimientos.findOne({ _id: id });
		if(!InfoProcedimientos.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoProcedimientos.update({ _id: id }, { $set: data });
	},

	"infoProcedimientosRemove": function(id) {
		var doc = InfoProcedimientos.findOne({ _id: id });
		if(!InfoProcedimientos.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoProcedimientos.remove({ _id: id });
	}
});
