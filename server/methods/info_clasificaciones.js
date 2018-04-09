Meteor.methods({
	"infoClasificacionesInsert": function(data) {
		if(!InfoClasificaciones.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return InfoClasificaciones.insert(data);
	},

	"infoClasificacionesUpdate": function(id, data) {
		var doc = InfoClasificaciones.findOne({ _id: id });
		if(!InfoClasificaciones.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoClasificaciones.update({ _id: id }, { $set: data });
	},

	"infoClasificacionesRemove": function(id) {
		var doc = InfoClasificaciones.findOne({ _id: id });
		if(!InfoClasificaciones.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		InfoClasificaciones.remove({ _id: id });
	}
});
