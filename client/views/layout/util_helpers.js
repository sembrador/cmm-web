
var themes = {
    "cyborg" : "bootstrap.min.css",
    "cerulean" : "bootstrap.min.css",
    "cosmo" : "bootstrap.min.css",
    "darkly" : "bootstrap.min.css",
	"default" : "bootstrap.min.css",
    "flatly" : "bootstrap.min.css",
    "journal" : "bootstrap.min.css",
    "litera" : "bootstrap.min.css",
    "lumen" : "bootstrap.min.css",
    "lux" : "bootstrap.min.css",
    "materia" : "bootstrap.min.css",
    "minty" : "bootstrap.min.css",
    "pulse" : "bootstrap.min.css",
    "sandstone" : "bootstrap.min.css",
    "simplex" : "bootstrap.min.css",
    "sketchy" : "bootstrap.min.css",
    "slate" : "bootstrap.min.css",
    "solar" : "bootstrap.min.css",
    "spacelab" : "bootstrap.min.css",
    "superhero" : "bootstrap.min.css",
    "united" : "bootstrap.min.css",
    "yeti" : "bootstrap.min.css"
};

Template.showCopyright.helpers({
	version: function() {
		return Meteor.settings.public.appVersion;
	}
});

Template.PrivateLayoutRightMenu.events({
	'click .toggle-text': function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	},
    'click #cmdStatus': function(event, template){
        $('#statusModal').modal('show');
	},
    'click .change-style-menu-item': function (e, t) {
		e.preventDefault();
		var theme_name = $( e.target ).attr( 'data-theme' );
        Meteor.call( 'cambiarTema', theme_name, function (err, result) {
            if ( result ) {
				changeCSS( result );
				saveTheme( theme_name );
            } else if ( err ) {
                alert( err );
            }
        });
    }
});

Template.infoSystem.helpers({
    usersOnline: function () {
        return Meteor.users.find({ "status.online": true }).count();
    },
	lastActivity: function() {
		var lastActivity;
		lastActivity = this.lastActivity();
		if (lastActivity !== null) {
			return relativeTime(lastActivity);
		} else {
			return "undefined";
		}
	},
	serverTime: function() {
		return new moment(Date(TimeSync.serverTime())).format('hh:mm:ss a');
	},
	serverOffset: TimeSync.serverOffset,
	serverRTT: TimeSync.roundTripTime,
	isIdleText: function() {
		return this.isIdle() || "false";
	},
	isMonitoringText: function() {
		return this.isMonitoring() || "false";
	}
});

Template.login.helpers({
	loggedIn: function() {
		return Meteor.userId();
	}
});

Template.status.events = {
	'submit form.start-monitor': function(e, tmpl) {
		e.preventDefault();
		return UserStatus.startMonitor({
			threshold: tmpl.find("input[name=threshold]").valueAsNumber,
			interval: tmpl.find("input[name=interval]").valueAsNumber,
			idleOnBlur: tmpl.find("select[name=idleOnBlur]").value === "true"
		});
	},
	'click .stop-monitor': function() {
		return UserStatus.stopMonitor();
	},
	'click .resync': function() {
		return TimeSync.resync();
	},
	'click .cancel': function() {
		$('#statusModal').modal('hide');
	}
};

Template.serverStatus.helpers({
	anonymous: function() {
		return UserConnections.find({
		userId: {
			$exists: false
		}
		});
	},
	users: function() {
		return Meteor.users.find();
	},
	userClass: function() {
		var ref;
		if ((ref = this.status) !== null ? ref.idle : void 0) {
			return "warning";
		} else {
			return "success";
		}
	},
	connections: function() {
		return UserConnections.find({
			userId: this._id
		});
	}
});

Template.serverConnection.helpers({
	connectionClass: function() {
		if (this.idle) {
			return "warning";
		} else {
			return "success";
		}
	},
	loginTime: function() {
		if (this.loginTime === null) {
			return;
		}
		return new Date(this.loginTime).toLocaleString();
	}
});

Template.login.events = {
	"submit form": function(e, tmpl) {
		var input;
		e.preventDefault();
		input = tmpl.find("input[name=username]");
		input.blur();
		return Meteor.insecureUserLogin(input.value, function(err, res) {
			if (err) {
				return console.log(err);
			}
		});
	}
};

Deps.autorun(function(c) {
	try {
		UserStatus.startMonitor({
			threshold: 30000,
			idleOnBlur: true
		});
		return c.stop();
	} catch (error) {}
});

function changeCSS( css ) {
	// delete any existing ones first
	var cssLinks = document.getElementsByTagName( 'link' );
	for ( var i = cssLinks.length - 1; i >= 0; --i ) {
		if ( cssLinks[i] && cssLinks[i].getAttribute( 'href' ) !== null ) {
			cssLinks[i].parentNode.removeChild( cssLinks[i] );
		}
	}
	// remove the previously created stylesheet (if any)
	var cssNode = document.getElementById( 'dynamicSheet' );
	
	if ( cssNode ) {
		cssNode.parentNode.removeChild( cssNode );
	}
	// create style and append to document
	cssNode = document.createElement( 'style' );
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.media = 'screen';
	cssNode.id = 'dynamicSheet';
	cssNode.innerHTML = css;
	document.getElementsByTagName( "head" )[0].appendChild( cssNode );
}

function saveTheme( theme ) {
	var userData = Users.findOne( { _id: Meteor.userId() }, {} );
	userData.profile.theme = theme;
	Meteor.call( 'updateUserAccount', userData._id, userData, function( e, r ) { if( e ) alert( e ); });
}
