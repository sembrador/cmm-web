Meteor.publish("clasificacion_list", function() {
	return InfoClasificaciones.find({}, {});
});

Meteor.publish("clasificaciones_null", function() {
	return InfoClasificaciones.find({_id:null}, {});
});

Meteor.publish("clasificacion", function(clasificacionId) {
	return InfoClasificaciones.find({_id:clasificacionId}, {});
});

