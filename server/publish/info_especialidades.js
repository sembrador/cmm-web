Meteor.publish("especialidad_list", function() {
	return InfoEspecialidades.find({}, {});
});

Meteor.publish("especialidades_null", function() {
	return InfoEspecialidades.find({_id:null}, {});
});

Meteor.publish("especialidad", function(especialidadId) {
	return InfoEspecialidades.find({_id:especialidadId}, {});
});

