
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2018-04-02 09:59:31
 * @modify date 2018-04-02 09:59:31
 * @desc Agenda Sop methods - javascript
*/

Meteor.methods({
	"infoAgendaSopInsert": function(data) {
		check(data, {
			title: String,
			start: String,
			end: String,
			type: String,
			guests: Number
		});
		if(!InfoAgendaSop.userCanInsert(this.userId, data)) {
            throw new Meteor.Error(403, "PROHIBIDO.");
		} else {
			try {
				return InfoAgendaSop.insert(data);
			} catch (exception) {
				throw new Meteor.Error(500, '' + exception);
			}
		}
	},
	"infoAgendaSopUpdate": function(data) {
		check(data, {
			_id: String,
			title: Match.Optional(String),
			start: String,
			end: String,
			type: Match.Optional(String),
			guests: Match.Optional(Number)
		});
		var doc = InfoAgendaSop.findOne({ _id: data._id });
		if(!InfoAgendaSop.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "PROHIBIDO.");
		} else {
			try {
				return InfoAgendaSop.update({ _id: data._id }, { $set: data });
			} catch (exception) {
				throw new Meteor.Error(500, '' + exception);
			}
		}
	},
	"infoAgendaSopRemove": function(id) {
        check(id, String);
		var doc = InfoAgendaSop.findOne({ _id: id });
		if(!InfoAgendaSop.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "PROHIBIDO.");
		} else {
			try {
				return InfoAgendaSop.remove({ _id: id });
			} catch (exception) {
				throw new Meteor.Error(500, '' + exception);
			}
		}		
	}
});
