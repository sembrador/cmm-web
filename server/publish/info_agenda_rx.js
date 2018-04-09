Meteor.publish("info_agenda_rx_list", function() {
	return InfoAgendaRx.find({}, {});
});

Meteor.publish("info_agenda_rx_null", function() {
	return InfoAgendaRx.find({_id:null}, {});
});

Meteor.publish("info_agenda_rx", function(infoEventRxId) {
	return InfoAgendaRx.find({_id:infoEventRxId}, {});
});

