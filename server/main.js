
Accounts.emailTemplates.siteName = 'CMM-Web';
Accounts.emailTemplates.from = 'CMM-Web Admin <support@castle-soft.com>';

Accounts.emailTemplates.verifyEmail = {
   subject: function () {
      return "Como verificar su direccion de correo en app.marbellacm.net";
   },
   text: function(user, url) {
      return 'Hola ' + user.profile.name + '!,\n\n' +
        'Verifique su direccion de correo en el siguiente enlace:\n\n' + 
        url + '\n\n' +
        'Por Favor y Gracias,\n\n' +
        'El Equipo de CMM-Web.';
   }
};

/*Accounts.emailTemplates.enrollAccount.subject = function (user) {
  return 'Bienvenid@ a AOP-Web, ${user.profile.name}';
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  return 'Para verificar su direccion de correo haga click sobre el siguiente enlace.\n\n'
    + url;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'AwesomeSite Password Reset <no-reply@example.com>';
};*/
