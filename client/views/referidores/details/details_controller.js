this.ReferidoresDetailsController = RouteController.extend({
	template: "ReferidoresDetails",
	

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
			Meteor.subscribe("referidor", this.params.referidorId)
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
			referidor: InfoReferidores.findOne({_id:this.params.referidorId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});