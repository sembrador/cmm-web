Meteor.publish("pacientes", function() {
	return InfoPacientes.find({}, {});
});

Meteor.publish("paciente_list", function() {
	return InfoPacientes.find({}, {});
});

Meteor.publish("pacientes_null", function() {
	return InfoPacientes.find({_id:null}, {});
});

Meteor.publish("paciente", function(pacienteId) {
	return InfoPacientes.find({_id:pacienteId}, {});
});

