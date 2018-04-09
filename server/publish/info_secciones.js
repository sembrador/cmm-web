Meteor.publish("seccion_list", function() {
	return InfoSecciones.find({}, {});
});

Meteor.publish("secciones_null", function() {
	return InfoSecciones.find({_id:null}, {});
});

Meteor.publish("seccion", function(seccionId) {
	return InfoSecciones.find({_id:seccionId}, {});
});

