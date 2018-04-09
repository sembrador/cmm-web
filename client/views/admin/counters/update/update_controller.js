this.AdminCountersUpdateController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminCountersUpdate': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("counter", this.params.counterId)
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
			counter: InfoCounters.findOne({_id:this.params.counterId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});