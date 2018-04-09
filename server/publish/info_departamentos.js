Meteor.publish("departamento_list", function() {
	return InfoDepartamentos.find({}, {});
});

Meteor.publish("departamentos_null", function() {
	return InfoDepartamentos.find({_id:null}, {});
});

Meteor.publish("departamento", function(departamentoId) {
	return InfoDepartamentos.find({_id:departamentoId}, {});
});

