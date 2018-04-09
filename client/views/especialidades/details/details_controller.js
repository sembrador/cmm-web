this.EspecialidadesDetailsController = RouteController.extend({
	template: "EspecialidadesDetails",
	

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
			Meteor.subscribe("especialidad", this.params.especialidadId)
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
			especialidad: InfoEspecialidades.findOne({_id:this.params.especialidadId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});