this.ProcedimientosUpdateController = RouteController.extend({
	template: "ProcedimientosUpdate",
	

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
			Meteor.subscribe("procedimiento", this.params.procedimientoId)
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
			procedimiento: InfoProcedimientos.findOne({_id:this.params.procedimientoId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});