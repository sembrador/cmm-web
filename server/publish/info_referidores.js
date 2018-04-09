Meteor.publish("referidor_list", function() {
	return InfoReferidores.find({}, {});
});

Meteor.publish("referidores_null", function() {
	return InfoReferidores.find({_id:null}, {});
});

Meteor.publish("referidor", function(referidorId) {
	return InfoReferidores.find({_id:referidorId}, {});
});

