
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

this.InfoProcedimientos = new Mongo.Collection("info_procedimientos");

this.InfoProcedimientos.userCanInsert = function(userId, doc) {
	return true;
};

this.InfoProcedimientos.userCanUpdate = function(userId, doc) {
	return true;
};

this.InfoProcedimientos.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.InfoProcedimientos = new SimpleSchema({
	pro_cpt: {
		label: "CODIGO CPT",
		type: String
	},
	pro_codigo: {
		label: "CODIGO PROCEDIMIENTO",
		type: String
	},
	pro_descripcion: {
		label: "DESCRIPCION",
		type: String
	},
	pro_precio: {
		label: "PRECIO",
		type: Number,
		decimal: true,
		defaultValue: 0
	},
	pro_departamento: {
		label: "DEPARTAMENTO",
		type: String
	},
	pro_utiempo: {
		label: "UNIDAD DE TIEMPO",
		type: String
	},
	pro_color: {
		label: "COLOR EN AGENDA",
		type: String
	},
	pro_activo: {
		label: "HABILITADO",
		type: Boolean
	}
});

this.InfoProcedimientos.attachSchema(this.Schemas.InfoProcedimientos);
