this.PacientesUpdateController = RouteController.extend({
	template: "PacientesUpdate",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("clasificacion_list"),
			Meteor.subscribe("paciente", this.params.pacienteId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			clasificacion_list: InfoClasificaciones.find({}, {}),
			paciente: InfoPacientes.findOne({_id:this.params.pacienteId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});