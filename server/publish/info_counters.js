Meteor.publish("counter_list", function() {
	return InfoCounters.find({}, {});
});

Meteor.publish("counters_null", function() {
	return InfoCounters.find({_id:null}, {});
});

Meteor.publish("counter", function(counterId) {
	return InfoCounters.find({_id:counterId}, {});
});

