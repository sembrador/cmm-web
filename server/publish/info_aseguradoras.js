Meteor.publish("aseguradora_list", function() {
	return InfoAseguradoras.find({}, {});
});

Meteor.publish("aseguradoras_null", function() {
	return InfoAseguradoras.find({_id:null}, {});
});

Meteor.publish("aseguradora", function(aseguradoraId) {
	return InfoAseguradoras.find({_id:aseguradoraId}, {});
});

