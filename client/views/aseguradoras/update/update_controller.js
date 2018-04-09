this.AseguradorasUpdateController = RouteController.extend({
	template: "AseguradorasUpdate",
	

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
			Meteor.subscribe("aseguradora", this.params.aseguradoraId)
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
			aseguradora: InfoAseguradoras.findOne({_id:this.params.aseguradoraId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});