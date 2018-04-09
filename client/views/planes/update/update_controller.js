this.PlanesUpdateController = RouteController.extend({
	template: "PlanesUpdate",
	

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
			Meteor.subscribe("aseguradora_list"),
			Meteor.subscribe("plan", this.params.planId)
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
			aseguradora_list: InfoAseguradoras.find({}, {}),
			plan: InfoPlanes.findOne({_id:this.params.planId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});