this.App = {};
this.Helpers = {};

this.globalOnRendered = function() {
	
	animateVisible();
};

Meteor.startup(function() {
	
	$(window).on("scroll resize", function() {
		animateVisible();
	});
});

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

Helpers.menuItemClass = function(routeName, params) {
	return menuItemClass(routeName, params);
};

Helpers.isPrivateZone = function() {
	return getCurrentZone() == "private";
};

Helpers.isPublicZone = function() {
	return getCurrentZone() == "public";
};

Helpers.isFreeZone = function() {
	return getCurrentZone() == "free";
};

Helpers.userFullName = function() {
	var name = "";
	if(Meteor.user() && Meteor.user().profile)
		name = Meteor.user().profile.name;
	return name;
};

Helpers.userEmail = function() {
	var email = "";
	if(Meteor.user() && Meteor.user().profile)
		email = Meteor.user().profile.email;
	return email;
};

Helpers.userIsAdmin = function() {
	var user = Meteor.user();
	if(!user || !user.roles) {
		return false;
	}
	return user.roles.indexOf("admin") >= 0;
};

Helpers.randomString = function(strLen) {
	return Random.id(strLen);
};

Helpers.secondsToTime = function(seconds, timeFormat) {
	return secondsToTime(seconds, timeFormat);
};

Helpers.integerDayOfWeekToString = function(day) {
	if(_.isArray(day)) {
		var s = "";
		_.each(day, function(d, i) {
			if(i > 0) {
				s = s + ", ";
			}
			s = s + ["Domingo", "Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][d];
		});
		return s;
	}
	return ["Domingo", "Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][day];
};

Helpers.formatDate = function(date, dateFormat) {
	if(!date) {
		return "";
	}

	var f = dateFormat || "DD/MM/YYYY";

	if(_.isString(date)) {
		if(date.toUpperCase() == "NOW") {
			date = new Date();
		}
		if(date.toUpperCase() == "TODAY") {
			var d = new Date();
			date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
		}
	}

	return moment(date).format(f);
};

Helpers.booleanToYesNo = function(b) {
	return b ? "Si" : "No";
};

Helpers.integerToYesNo = function(i) {
	return i ? "Si" : "No";
};

Helpers.integerToTrueFalse = function(i) {
	return i ? "True" : "False";
};

// Tries to convert argument to array
//   array is returned unchanged
//   string "a,b,c" or "a, b, c" will be returned as ["a", "b", "c"]
//   for other types, array with one element (argument) is returned
//   TODO: implement other types to array conversion
Helpers.getArray = function(a) {
	a = a || [];
	if(_.isArray(a)) return a;
	if(_.isString(a)) {
		var array = a.split(",") || [];
		_.each(array, function(item, i) { array[i] = item.trim(); });
		return array;
	}

	/* object... what to return? keys or values?
	if(_.isObject(a)) {
	}
	*/

	var array = [];
	array.push(a);
	return array;
};

Helpers.cursorEmpty = function(cursor) {
	return cursor && cursor.count();
};

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});
