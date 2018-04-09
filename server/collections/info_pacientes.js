
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2018-04-09 01:45:13
 * @modify date 2018-04-09 01:45:13
 * @desc archivo de pacientes hooks - javascript
*/

InfoPacientes.allow({
	insert: function (userId, doc) {
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return false;
	},
	remove: function (userId, doc) {
		return false;
	}
});

InfoPacientes.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;
	doc.cliente_numero = getNextNumber('paciente');
	if(!doc.createdBy) doc.createdBy = userId;
});

InfoPacientes.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;
});

InfoPacientes.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;
});

InfoPacientes.before.remove(function(userId, doc) {});

InfoPacientes.after.insert(function(userId, doc) {});

InfoPacientes.after.update(function(userId, doc, fieldNames, modifier, options) {});

InfoPacientes.after.remove(function(userId, doc) {});
