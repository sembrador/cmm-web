Meteor.publish("plan_list", function() {
	return InfoPlanes.find({}, {});
});

Meteor.publish("planes_null", function() {
	return InfoPlanes.find({_id:null}, {});
});

Meteor.publish("plan", function(planId) {
	return InfoPlanes.find({_id:planId}, {});
});

