Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"home_public",
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"admin.counters",
	"admin.counters.details",
	"admin.counters.insert",
	"admin.counters.update",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"pacientes",
	"pacientes.details",
	"pacientes.insert",
	"pacientes.update",
	"clasificaciones",
	"clasificaciones.details",
	"clasificaciones.insert",
	"clasificaciones.update",
	"secciones",
	"secciones.details",
	"secciones.insert",
	"secciones.update",
	"departamentos",
	"departamentos.details",
	"departamentos.insert",
	"departamentos.update",
	"especialidades",
	"especialidades.details",
	"especialidades.insert",
	"especialidades.update",
	"referidores",
	"referidores.details",
	"referidores.insert",
	"referidores.update",
	"procedimientos",
	"procedimientos.details",
	"procedimientos.insert",
	"procedimientos.update",
	"aseguradoras",
	"aseguradoras.details",
	"aseguradoras.insert",
	"aseguradoras.update",
	"planes",
	"planes.details",
	"planes.insert",
	"planes.update",
	"agenda_rx",
	"agenda_sop"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "admin.counters",	roles: ["admin"] },
	{ route: "admin.counters.details",	roles: ["admin"] },
	{ route: "admin.counters.insert",	roles: ["admin"] },
	{ route: "admin.counters.update",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Hola {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/admin/counters", {name: "admin.counters", title: "", controller: "AdminCountersController"});
	this.route("/admin/counters/details/:counterId", {name: "admin.counters.details", title: "", controller: "AdminCountersDetailsController"});
	this.route("/admin/counters/insert", {name: "admin.counters.insert", title: "", controller: "AdminCountersInsertController"});
	this.route("/admin/counters/update/:counterId", {name: "admin.counters.update", title: "", controller: "AdminCountersUpdateController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/pacientes", {name: "pacientes", title: "", controller: "PacientesController"});
	this.route("/pacientes/details/:pacienteId", {name: "pacientes.details", title: "", controller: "PacientesDetailsController"});
	this.route("/pacientes/insert", {name: "pacientes.insert", title: "", controller: "PacientesInsertController"});
	this.route("/pacientes/update/:pacienteId", {name: "pacientes.update", title: "", controller: "PacientesUpdateController"});
	this.route("/clasificaciones", {name: "clasificaciones", title: "", controller: "ClasificacionesController"});
	this.route("/clasificaciones/details/:clasificacionId", {name: "clasificaciones.details", title: "", controller: "ClasificacionesDetailsController"});
	this.route("/clasificaciones/insert", {name: "clasificaciones.insert", title: "", controller: "ClasificacionesInsertController"});
	this.route("/clasificaciones/update/:clasificacionId", {name: "clasificaciones.update", title: "", controller: "ClasificacionesUpdateController"});
	this.route("/secciones", {name: "secciones", title: "", controller: "SeccionesController"});
	this.route("/secciones/details/:seccionId", {name: "secciones.details", title: "", controller: "SeccionesDetailsController"});
	this.route("/secciones/insert", {name: "secciones.insert", title: "", controller: "SeccionesInsertController"});
	this.route("/secciones/update/:seccionId", {name: "secciones.update", title: "", controller: "SeccionesUpdateController"});
	this.route("/departamentos", {name: "departamentos", title: "", controller: "DepartamentosController"});
	this.route("/departamentos/details/:departamentoId", {name: "departamentos.details", title: "", controller: "DepartamentosDetailsController"});
	this.route("/departamentos/insert", {name: "departamentos.insert", title: "", controller: "DepartamentosInsertController"});
	this.route("/departamentos/update/:departamentoId", {name: "departamentos.update", title: "", controller: "DepartamentosUpdateController"});
	this.route("/especialidades", {name: "especialidades", title: "", controller: "EspecialidadesController"});
	this.route("/especialidades/details/:especialidadId", {name: "especialidades.details", title: "", controller: "EspecialidadesDetailsController"});
	this.route("/especialidades/insert", {name: "especialidades.insert", title: "", controller: "EspecialidadesInsertController"});
	this.route("/especialidades/update/:especialidadId", {name: "especialidades.update", title: "", controller: "EspecialidadesUpdateController"});
	this.route("/referidores", {name: "referidores", title: "", controller: "ReferidoresController"});
	this.route("/referidores/details/:referidorId", {name: "referidores.details", title: "", controller: "ReferidoresDetailsController"});
	this.route("/referidores/insert", {name: "referidores.insert", title: "", controller: "ReferidoresInsertController"});
	this.route("/referidores/update/:referidorId", {name: "referidores.update", title: "", controller: "ReferidoresUpdateController"});
	this.route("/procedimientos", {name: "procedimientos", title: "", controller: "ProcedimientosController"});
	this.route("/procedimientos/details/:procedimientoId", {name: "procedimientos.details", title: "", controller: "ProcedimientosDetailsController"});
	this.route("/procedimientos/insert", {name: "procedimientos.insert", title: "", controller: "ProcedimientosInsertController"});
	this.route("/procedimientos/update/:procedimientoId", {name: "procedimientos.update", title: "", controller: "ProcedimientosUpdateController"});
	this.route("/aseguradoras", {name: "aseguradoras", title: "", controller: "AseguradorasController"});
	this.route("/aseguradoras/details/:aseguradoraId", {name: "aseguradoras.details", title: "", controller: "AseguradorasDetailsController"});
	this.route("/aseguradoras/insert", {name: "aseguradoras.insert", title: "", controller: "AseguradorasInsertController"});
	this.route("/aseguradoras/update/:aseguradoraId", {name: "aseguradoras.update", title: "", controller: "AseguradorasUpdateController"});
	this.route("/planes", {name: "planes", title: "", controller: "PlanesController"});
	this.route("/planes/details/:planId", {name: "planes.details", title: "", controller: "PlanesDetailsController"});
	this.route("/planes/insert", {name: "planes.insert", title: "", controller: "PlanesInsertController"});
	this.route("/planes/update/:planId", {name: "planes.update", title: "", controller: "PlanesUpdateController"});
	this.route("/agenda_rx", {name: "agenda_rx", title: "", controller: "AgendaRxController"});
	this.route("/agenda_sop", {name: "agenda_sop", title: "", controller: "AgendaSopController"});
});
