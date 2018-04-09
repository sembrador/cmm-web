this.DepartamentosDetailsController = RouteController.extend({
	template: "DepartamentosDetails",
	

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
			Meteor.subscribe("departamento", this.params.departamentoId)
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
			departamento: InfoDepartamentos.findOne({_id:this.params.departamentoId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});