
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2018-04-02 09:59:31
 * @modify date 2018-04-02 09:59:31
 * @desc Agenda Rx methods - javascript
*/

Meteor.methods({
	"infoAgendaRxInsert": function(data) {
		check(data, {
			title: String,
			start: String,
			end: String,
			type: String,
			guests: Number
		});
		if(!InfoAgendaRx.userCanInsert(this.userId, data)) {
            throw new Meteor.Error(403, "PROHIBIDO.");
		} else {
			try {
				return InfoAgendaRx.insert(data);
			} catch (exception) {
				throw new Meteor.Error(500, '' + exception);
			}
		}
	},
	"infoAgendaRxUpdate": function(data) {
		check(data, {
			_id: String,
			title: Match.Optional(String),
			start: String,
			end: String,
			type: Match.Optional(String),
			guests: Match.Optional(Number)
		});
		var doc = InfoAgendaRx.findOne({ _id: data._id });
		if(!InfoAgendaRx.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "PROHIBIDO.");
		} else {
			try {
				return InfoAgendaRx.update({ _id: data._id }, { $set: data });
			} catch (exception) {
				throw new Meteor.Error(500, '' + exception);
			}
		}
	},
	"infoAgendaRxRemove": function(id) {
        check(id, String);
		var doc = InfoAgendaRx.findOne({ _id: id });
		if(!InfoAgendaRx.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "PROHIBIDO.");
		} else {
			try {
				return InfoAgendaRx.remove({ _id: id });
			} catch (exception) {
				throw new Meteor.Error(500, '' + exception);
			}
		}		
	}
});
