Meteor.publish("procedimiento_list", function() {
	return InfoProcedimientos.find({}, {});
});

Meteor.publish("procedimientos_null", function() {
	return InfoProcedimientos.find({_id:null}, {});
});

Meteor.publish("procedimiento", function(procedimientoId) {
	return InfoProcedimientos.find({_id:procedimientoId}, {});
});

