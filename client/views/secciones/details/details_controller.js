this.SeccionesDetailsController = RouteController.extend({
	template: "SeccionesDetails",
	

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
			Meteor.subscribe("seccion", this.params.seccionId)
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
			seccion: InfoSecciones.findOne({_id:this.params.seccionId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});