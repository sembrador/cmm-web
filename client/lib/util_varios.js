
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2017-08-22 09:34:39
 * @modify date 2017-08-22 09:34:39
 * @desc Utilitarios varios (cliente)
*/

toastr.options = {
    "closeButton": false,
    "debug": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

moment.locale('es', {
    months: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    monthsShort: [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ],
    weekdays: [
        "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
    ],
    weekdaysShort: [
        "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"
    ],
    weekdaysMin: [
        "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"
    ],
    longDateFormat: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "MM/DD/YYYY",
        l: "M/D/YYYY",
        LL: "MMMM Do YYYY",
        ll: "MMM D YYYY",
        LLL: "MMMM Do YYYY LT",
        lll: "MMM D YYYY LT",
        LLLL: "dddd, MMMM Do YYYY LT",
        llll: "ddd, MMM D YYYY LT"
    },
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un dia",
        dd: "%d dias",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años"
    },
    meridiem: {
        am: 'am',
        AM: 'AM',
        pm: 'pm',
        PM: 'PM'
    }
});

UI.registerHelper("localizedDateAndTime", function(date) {
    if (date)
        return moment(date).format('l LT');
});

paises = [
	["AF", "Afganistán" ],
	["AX", "Åland" ],
	["AL", "Albania" ],
	["DE", "Alemania" ],
	["AD", "Andorra" ],
	["AO", "Angola" ],
	["AI", "Anguila" ],
	["AQ", "Antártico" ],
	["AG", "Antigua y Barbuda" ],
	["AN", "Antillas Nerlandesas" ],
	["SA", "Arabia Saudita" ],
	["DZ", "Argelia" ],
	["AR", "Argentina" ],
	["AM", "Armenia" ],
	["AW", "Aruba" ],
	["AU", "Australia" ],
	["AT", "Austria" ],
	["AZ", "Azerbaiyán" ],
	["BS", "Bahamas" ],
	["BH", "Bahréin" ],
	["BD", "Bangladesh" ],
	["BB", "Barbados" ],
	["BY", "Bielorrusia" ],
	["BE", "Bélgica" ],
	["BZ", "Belice" ],
	["BJ", "Benín" ],
	["BM", "Bermudas" ],
	["BT", "Bután" ],
	["BO", "Bolivia" ],
	["BQ", "Bonaire, San Estaquio y Saba" ],
	["BA", "Bosnia-Herzegovina" ],
	["BW", "Botsuana" ],
	["BR", "Brasil" ],
	["BN", "Brunei Darussalam" ],
	["BG", "Bulgaria" ],
	["BF", "Burkina Faso" ],
	["BI", "Burundi" ],
	["KH", "Camboya" ],
	["CM", "Camerún" ],
	["CA", "Canadá" ],
	["CV", "Cabo Verde" ],
	["TD", "Chad" ],
	["CL", "Chile" ],
	["CN", "China (República Popular)" ],
	["CY", "Chipre" ],
	["VA", "Ciudad del Vaticano" ],
	["CO", "Colombia" ],
	["KM", "Comoras" ],
	["CG", "Congo (República del)" ],
	["CR", "Costa Rica" ],
	["CI", "Costa de Marfil" ],
	["KP", "Corea del Norte" ],
	["KO", "Corea del Sur" ],
	["HR", "Croacia" ],
	["CU", "Cuba" ],
	["CW", "Curasao" ],
	["DK", "Dinamarca" ],
	["DM", "Dominica" ],
	["EC", "Ecuador" ],
	["EG", "Egipto" ],
	["SV", "El Salvador" ],
	["AE", "Emiratos Árabes Unidos" ],
	["ER", "Eritrea" ],
	["SK", "Eslovaquia" ],
	["SI", "Eslovenia" ],
	["ES", "España" ],
	["US", "Estados Unidos de América" ],
	["EE", "Estonia" ],
	["ET", "Etiopía" ],
	["PH", "Filipinas" ],
	["FI", "Finlandia" ],
	["FJ", "Fiyi" ],
	["FR", "Francia" ],
	["GF", "Guayana Francesa" ],
	["GQ", "Guinea Ecuatorial" ],
	["GA", "Gabón" ],
	["GM", "Gambia" ],
	["GE", "Georgia" ],
	["GH", "Ghana" ],
	["GI", "Gibraltar" ],
	["GR", "Grecia" ],
	["GL", "Groenlandia" ],
	["GD", "Granada" ],
	["GP", "Guadalupe" ],
	["GU", "Guam" ],
	["GT", "Guatemala" ],
	["GG", "Guernesey" ],
	["GN", "Guinea" ],
	["GW", "Guinea-Bissau" ],
	["GY", "Guyana" ],
	["HT", "Haití" ],
	["NL", "Holanda" ],
	["HN", "Honduras" ],
	["HK", "Hong Kong" ],
	["HU", "Hungría" ],
	["IN", "India" ],
	["ID", "Indonesia" ],
	["IR", "Irán" ],
	["IQ", "Iraq" ],
	["IE", "Irlanda" ],
	["UK", "Irlanda del Norte" ],
	["IM", "Isla de Man" ],
	["AC", "Isla Ascensión" ],
	["JE", "Isla de Jersey" ],
	["CX", "Isla de Navidad" ],
	["NF", "Isla Norfolk" ],
	["IS", "Islandia" ],
	["KY", "Islas Caimán" ],
	["CC", "Islas Cocos" ],
	["CK", "Islas Cook" ],
	["GS", "Islas Georgias del Sur y Sandwich del Sur" ],
	["HM", "Islas Heard y McDonald" ],
	["FK", "Islas Malvinas" ],
	["MP", "Islas Marianas del Norte" ],
	["MH", "Islas Marshall" ],
	["FO", "Islas Feroe" ],
	["PN", "Islas Pitcairn" ],
	["SB", "Islas Salomón" ],
	["SJ", "Islas Svalbard y Jan Mayen" ],
	["TC", "Islas Turcas y Caicos" ],
	["VG", "Islas Vírgenes Británicas" ],
	["VI", "Islas Vírgenes de los Estados Unidos" ],
	["IL", "Israel" ],
	["IT", "Italia" ],
	["JM", "Jamaica" ],
	["JP", "Japón" ],
	["JO", "Jordania" ],
	["KZ", "Kazajistán" ],
	["KE", "Kenia" ],
	["KI", "Kiribati" ],
	["KW", "Kuwait" ],
	["KG", "Kirguistán" ],
	["LA", "Laos" ],
	["LV", "Letonia" ],
	["LB", "Líbano" ],
	["LS", "Lesotho" ],
	["LR", "Liberia" ],
	["LY", "Libia" ],
	["LI", "Liechtenstein" ],
	["LT", "Lituania" ],
	["LU", "Luxemburgo" ],
	["MO", "Macao" ],
	["MK", "Macedonia (República de)" ],
	["MG", "Madagascar" ],
	["MW", "Malawi" ],
	["MY", "Malasia" ],
	["MV", "Maldivas" ],
	["ML", "Malí" ],
	["MT", "Malta" ],
	["MQ", "Martinica" ],
	["MR", "Mauritania" ],
	["MU", "Mauricio" ],
	["YT", "Mayotte" ],
	["MX", "México" ],
	["FM", "Micronesia (Estados Federados de)" ],
	["MD", "Moldavia" ],
	["MC", "Mónaco" ],
	["MN", "Mongolia" ],
	["ME", "Montenegro" ],
	["MS", "Montserrat" ],
	["MA", "Marruecos" ],
	["MZ", "Mozambique" ],
	["MM", "Myanmar" ],
	["NA", "Namibia" ],
	["NR", "Nauru" ],
	["NP", "Nepal" ],
	["NC", "Nueva Caledonia" ],
	["NZ", "Nueva Zelanda" ],
	["NI", "Nicaragua" ],
	["NE", "Níger" ],
	["NG", "Nigeria" ],
	["NU", "Niue" ],
	["NO", "Noruega" ],
	["OM", "Omán" ],
	["PK", "Pakistán" ],
	["PW", "Palau" ],
	["PS", "Palestina" ],
	["PA", "Panamá" ],
	["PG", "Papúa Nueva Guinea" ],
	["PY", "Paraguay" ],
	["PE", "Perú" ],
	["PF", "Polinesia Francesa" ],
	["PL", "Polonia" ],
	["PT", "Portugal" ],
	["PR", "Puerto Rico" ],
	["QA", "Qatar" ],
	["UK", "Reino Unido" ],
	["CF", "República Centroafricana" ],
	["CZ", "República Checa" ],
	["CD", "República Democrática del Congo" ],
	["DO", "República Dominicana" ],
	["RE", "Reunión" ],
	["RO", "Rumania" ],
	["RU", "Rusia" ],
	["RW", "Ruanda" ],
	["SH", "Santa Helena" ],
	["KN", "San Cristóbal y Nieves" ],
	["LC", "Santa Lucía" ],
	["SX", "San Martín" ],
	["VC", "San Vicente y las Granadinas" ],
	["PM", "San Pedro y Miquelón" ],
	["SM", "San Marino" ],
	["ST", "Santo Tomé y Príncipe" ],
	["SN", "Senegal" ],
	["RS", "Serbia" ],
	["SC", "Seychelles" ],
	["SL", "Sierra Leona" ],
	["SG", "Singapur" ],
	["SO", "Somalia" ],
	["LK", "Sri Lanka" ],
	["ZA", "Sudáfrica" ],
	["SD", "Sudán" ],
	["SR", "Surinam" ],
	["SZ", "Swazilandia" ],
	["SE", "Suecia" ],
	["CH", "Suiza" ],
	["SY", "Siria" ],
	["TW", "Taiwán" ],
	["TJ", "Tayikistán" ],
	["TZ", "Tanzania" ],
	["TH", "Tailandia" ],
	["IO", "Territorio Británico en el Océano Índico" ],
	["TF", "Territorios Australes Franceses" ],
	["TL", "Timor Oriental" ],
	["TG", "Togo" ],
	["TK", "Tokelau" ],
	["TO", "Tonga" ],
	["TT", "Trinidad y Tobago" ],
	["TN", "Túnez" ],
	["TR", "Turquía" ],
	["TM", "Turkmenistán" ],
	["TV", "Tuvalu" ],
	["UG", "Uganda" ],
	["UA", "Ucrania" ],
	["SU", "Unión Soviética" ],
	["UY", "Uruguay" ],
	["UZ", "Uzbekistán" ],
	["VU", "Vanuatu" ],
	["VE", "Venezuela" ],
	["VN", "Vietnam" ],
	["WF", "Wallis y Futuna" ],
	["AS", "Samoa Americana" ],
	["WS", "Samoa del Oeste" ],
	["YE", "Yemen" ],
	["DJ", "Yibuti" ],
	["YU", "Yugoslavia" ],
	["ZM", "Zambia" ],
	["ZW", "Zimbawue" ]
];

val3 = function (v) {return v.substr(0,3);};

toString = function (s) { 
	return s!=_null ? ''+s : '';
};

isType = function (s,o) {
	return typeof s == o;
};

isString = function (s) {
	return isType(s, 'string');
};

isObject = function (f) {
	return !!f && isType(f, 'object');
};

isNode = function (n) {
	return n && n.nodeType;
};

isNumber = function (n) {
	return isType(n, 'number');
};

isDate = function (n) {
	return isObject(n) && !!n.getDay;
};

isBool = function (n) {
	return n === true || n === false;
};

isValue = function (n) {
	var type = typeof n;
	return type == 'object' ? !!(n && n.getDay) : (type == 'string' || type == 'number' || isBool(n));
};

nonOp = function (v) {
	return v;
};

plusOne = function (d) { 
	return d+1; 
};

replace = function (s, regexp, sub) {
	return toString(s).replace(regexp, sub != _null ? sub : '');
};

escapeRegExp = function (s) {
	return replace(s, /[\\\[\]\/{}()*+?.$|^-]/g, "\\$&");
};

trim = function (s) {
	return replace(s, /^\s+|\s+$/g);
};

eachObj = function (obj, cb, ctx) {
	for (var n in obj)
		if (obj.hasOwnProperty(n))
			cb.call(ctx || obj, n, obj[n]);
	return obj;
};

each = function (list, cb, ctx) {
	if (list)
		for (var i = 0; i < list.length; i++)
			cb.call(ctx || list, list[i], i);
	return list;
};

filter = function (list, filterFuncOrObject, ctx) {
	var r = []; 
	var f = isFunction(filterFuncOrObject) ? filterFuncOrObject : function(value) { return filterFuncOrObject != value; };
	each(list, function(value, index) {
		if (f.call(ctx || list, value, index))
			r.push(value);
	});
	return r;
};

collector = function (iterator, obj, collectFunc, ctx) {
	var result = [];
	iterator(obj, function (a, b) {
		if (isList(a = collectFunc.call(ctx || obj, a, b))) // extreme variable reusing: a is now the callback result
			each(a, function(rr) { result.push(rr); });
		else if (a != _null)
			result.push(a);
	});
	return result;
};

collectObj = function (obj, collectFunc, ctx) {
	return collector(eachObj, obj, collectFunc, ctx);
};

collect = function (list, collectFunc, ctx) {
	return collector(each, list, collectFunc, ctx);
};

keyCount = function (obj) {
	var c = 0;
	eachObj(obj, function(key) { c++; });
	return c;
};

keys = function (obj) { // use Object.keys? in IE>=9
	var list = [];
	eachObj(obj, function(key) { list.push(key); });
	return list;
};

map = function (list, mapFunc, ctx) {
	var result = [];
	each(list, function(item, index) {
		result.push(mapFunc.call(ctx || list, item, index));
	});
	return result;
};

startsWith = function (base, start) {
	if (isList(base)) {
		var s2 = _(start); // convert start as we don't know whether it is a list yet
		return equals(sub(base, 0, s2.length), s2);
	}
	else
		return start != _null && base.substr(0, start.length) == start;
};

endsWith = function (base, end) {
	if (isList(base)) {
		var e2 = _(end);
		return equals(sub(base, -e2.length), e2) || !e2.length;
	}
	else
		return end != _null && base.substr(base.length - end.length) == end;
};

reverse = function (list) {
	var len = list.length;
	if (isList(list))
		return new M(map(list, function() { return list[--len]; }));
	else
		return replace(list, /[\s\S]/g, function() { return list.charAt(--len); });
};

toObject = function (list, value) {
	var obj = {};
	each(list, function(item, index) {
		obj[item] = value;
	});
	return obj;
};

copyObj = function (from, to) {
	var dest = to || {};
	for (var name in from)
		dest[name] = from[name];
	return dest;
};

merge = function (list, target) {
	var o = target;
	for (var i = 0; i < list.length; i++)
		o = copyObj(list[i], o);
	return o;
};

getFindFunc = function (findFunc) {
	return isFunction(findFunc) ? findFunc : function(obj, index) { if (findFunc === obj) return index; };
};

getFindIndex =function (list, index, defaultIndex) {
	return index == _null ? defaultIndex : index < 0 ? Math.max(list.length+index, 0) : Math.min(list.length, index);
};

find = function (list, findFunc, startIndex, endIndex) {
	var f = getFindFunc(findFunc);
	var e = getFindIndex(list, endIndex, list.length);
	var r;
	for (var i = getFindIndex(list, startIndex, 0); i < e; i++)
		if ((r = f.call(list, list[i], i)) != _null)
			return r;
};

findLast = function (list, findFunc, startIndex, endIndex) {
	var f = getFindFunc(findFunc);
	var e = getFindIndex(list, endIndex, -1);
	var r;
	for (var i = getFindIndex(list, startIndex, list.length-1); i > e; i--)
		if ((r = f.call(list, list[i], i)) != _null)
			return r;
};

sub = function (list, startIndex, endIndex) {
	var r = [];
	if (list) {
		var e = getFindIndex(list, endIndex, list.length);
		for (var i = getFindIndex(list, startIndex, 0); i < e; i++)
			r.push(list[i]);
	}
	return r;
};

array = function (list) {
	return map(list, nonOp);
};

unite = function (list) {
	return function() {
		return new M(callList(list, arguments));
	};
};

uniq = function (list) {
	var found = {};
	return filter(list, function(item) {
		if (found[item])
			return false;
		else
			return found[item] = 1;
	});
};

intersection = function (list, otherList) {
	var keys = toObject(otherList, 1);
	return filter(list, function(item) {
		var r = keys[item];
		keys[item] = 0;
		return r;
	});
};

contains = function (list, value) { // TODO: can Array.indexOf be used in >IE8?
	for (var i = 0; i < list.length; i++)
		if (list[i] == value)
			return true;
	return false;
};

equals = function (x, y) {
	var a = isFunction(x) ? x() : x;
	var b = isFunction(y) ? y() : y;
	var aKeys;
	if (a == b)
		return true;
	else if (a == _null || b == _null)
		return false;
	else if (isValue(a) || isValue(b))
		return isDate(a) && isDate(b) && +a==+b;
	else if (isList(a)) {
		return (a.length == b.length) &&
			!find(a, function(val, index) {
				if (!equals(val, b[index]))
					return true;
			});
	}
	else {
		return !isList(b) &&
			((aKeys = keys(a)).length == keyCount(b)) && 
			!find(aKeys, function(key) {
					if (!equals(a[key],b[key]))
						return true;
			});
	}
};

call = function (f, fThisOrArgs, args) {
	if (isFunction(f))
		return f.apply(args && fThisOrArgs, map(args || fThisOrArgs, nonOp));
};

callList = function (list, fThisOrArgs, args) {
	return map(list, function(f) { return call(f, fThisOrArgs, args);});
};

bind = function (f, fThis, beforeArgs, afterArgs) {
	return function() {
		return call(f, fThis, collect([beforeArgs, arguments, afterArgs], nonOp));
	};
};

partial = function (f, beforeArgs, afterArgs) {
	return bind(f, this, beforeArgs, afterArgs);
};

pad = function (digits, number) {
	var signed = number < 0 ? '-' : '';
	var preDecimal = (signed?-number:number).toFixed(0);
	while (preDecimal.length < digits)
		preDecimal = '0' + preDecimal;
	return signed + preDecimal;
};

processNumCharTemplate = function (tpl, input, fwd) {
	var inHash;
	var inputPos = 0;
	var rInput = fwd ? input : reverse(input);
	var s = (fwd ? tpl : reverse(tpl)).replace(/./g, function(tplChar) {
		if (tplChar == '0') {
			inHash = false;
			return rInput.charAt(inputPos++) || '0';
		}
		else if (tplChar == '#') {
			inHash = true;
			return rInput.charAt(inputPos++) || '';
		}
		else
			return inHash && !rInput.charAt(inputPos) ? '' : tplChar;
	});
	return fwd ? s : (input.substr(0, input.length - inputPos) + reverse(s));
};

getTimezone = function (match, idx, refDate) { // internal helper, see below
	if (idx == _null || !match)
		return 0;
	return parseFloat(match[idx]+match[idx+1])*60 + parseFloat(match[idx]+match[idx+2]) + refDate.getTimezoneOffset();
};

// formats number with format string (e.g. "#.000", "#,#", "00000", "000.00", "000.000.000,00", "000,000,000.##")
// choice syntax: <cmp><value>:<format>|<cmp><value>:<format>|... 
// e.g. 0:no item|1:one item|>=2:# items
// <value>="null" used to compare with nulls.
// choice also works with strings or bools, e.g. ERR:error|WAR:warning|FAT:fatal|ok
formatValue = function (fmt, value) {
	var format = replace(fmt, /^\?/);
	if (isDate(value)) {
		var timezone, match;

		if (match = /^\[(([+-])(\d\d)(\d\d))\]\s*(.*)/.exec(format)) {
			timezone = match[1];
			value = dateAdd(value, 'minutes', getTimezone(match, 2, value));
			format = match[5];
		}

		return replace(format, /(\w)(\1*)(?:\[([^\]]+)\])?/g, function(s, placeholderChar, placeholderDigits, params) {
			var val = FORMAT_DATE_MAP[placeholderChar];
			if (val) {
				var d = value['get' + val[0]]();
				var optionArray = (params && params.split(','));

				if (isList(val[1])) 
					d = (optionArray || val[1])[d];
				else
					d = val[1](d, optionArray, timezone);
				if (d != _null && !isString(d))
					d = pad(placeholderDigits.length+1, d);
				return d;
			}
			else
				return s;
		});

	}
	else 
		return find(format.split(/\s*\|\s*/), function(fmtPart) {
			var match, numFmtOrResult;
			if (match = /^([<>]?)(=?)([^:]*?)\s*:\s*(.*)$/.exec(fmtPart)) {
				var cmpVal1 = value, cmpVal2 = +(match[3]);
				if (isNaN(cmpVal2) || !isNumber(cmpVal1)) {
					cmpVal1 = (cmpVal1==_null) ? "null" : toString(cmpVal1); // not ""+value, because undefined is treated as null here
					cmpVal2 = match[3];
				}
				if (match[1]) {
					if ((!match[2] && cmpVal1 == cmpVal2 ) ||
						(match[1] == '<'  && cmpVal1 > cmpVal2)  ||
						(match[1] == '>'  && cmpVal1 < cmpVal2))
						return _null;
				}
				else if (cmpVal1 != cmpVal2)
					return _null;
				numFmtOrResult = match[4];
			}
			else
				numFmtOrResult = fmtPart;

			if (isNumber(value))
				return numFmtOrResult.replace(/[0#](.*[0#])?/, function(numFmt) {
					var decimalFmt = /^([^.]+)(\.)([^.]+)$/.exec(numFmt) || /^([^,]+)(,)([^,]+)$/.exec(numFmt);
					var signed = value < 0 ? '-' : '';
					var numData = /(\d+)(\.(\d+))?/.exec((signed?-value:value).toFixed(decimalFmt ? decimalFmt[3].length:0));
					var preDecimalFmt = decimalFmt ? decimalFmt[1] : numFmt;
					var postDecimal = decimalFmt ? processNumCharTemplate(decimalFmt[3], replace(numData[3], /0+$/), true) : '';

					return 	(signed ? '-' : '') +
							(preDecimalFmt == '#' ? numData[1] : processNumCharTemplate(preDecimalFmt, numData[1])) +
							(postDecimal.length ? decimalFmt[2] : '') +
							postDecimal;
				});
			else
				return numFmtOrResult;
		});
};

// returns date; null if optional and not set; undefined if parsing failed
parseDate = function (fmt, date) {
	var indexMap = {}; // contains reGroupPosition -> typeLetter or [typeLetter, value array]
	var reIndex = 1;
	var timezoneOffsetMatch;
	var timezoneIndex;
	var match;

	var format = replace(fmt, /^\?/);
	if (format!=fmt && !trim(date))
		return _null;

	if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
		timezoneOffsetMatch = match;
		format = match[4];
	}

	var parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g, function(wholeMatch, placeholderChar, placeholderDigits, param) {
		if (/[dmhkyhs]/i.test(placeholderChar)) {
			indexMap[reIndex++] = placeholderChar;
			var plen = placeholderDigits.length+1;
			return "(\\d"+(plen<2?"+":("{1,"+plen+"}"))+")";
		}
		else if (placeholderChar == 'z') {
			timezoneIndex = reIndex;
			reIndex += 3;
			return "([+-])(\\d\\d)(\\d\\d)";
		}
		else if (/[Nna]/.test(placeholderChar)) {
			indexMap[reIndex++] = [placeholderChar, param && param.split(',')];
			return "([a-zA-Z\\u0080-\\u1fff]+)";
		}
		else if (/w/i.test(placeholderChar))
			return "[a-zA-Z\\u0080-\\u1fff]+";
		else if (/\s/.test(placeholderChar))
			return "\\s+"; 
		else 
			return escapeRegExp(wholeMatch);
	}));

	if (!(match = parser.exec(date)))
		return undef;

	var ctorArgs = [0, 0, 0, 0, 0, 0,  0];
	for (var i = 1; i < reIndex; i++) {
		var matchVal = match[i];
		var indexEntry = indexMap[i];
		if (isList(indexEntry)) { // for a, n or N
			var placeholderChar = indexEntry[0];
			var mapEntry  = PARSE_DATE_MAP[placeholderChar];
			var ctorIndex = mapEntry[0];
			var valList = indexEntry[1] || mapEntry[1];
			var listValue = find(valList, function(v, index) { if (startsWith(matchVal.toLowerCase(), v.toLowerCase())) return index; });
			if (listValue == _null)
				return undef;
			if (placeholderChar == 'a')
				ctorArgs[ctorIndex] += listValue * 12;
			else
				ctorArgs[ctorIndex] = listValue;
		}
		else if (indexEntry) { // for numeric values (yHmMs)
			var value = parseFloat(matchVal);
			var mapEntry  = PARSE_DATE_MAP[indexEntry];
			if (isList(mapEntry))
				ctorArgs[mapEntry[0]] += value - mapEntry[1];
			else
				ctorArgs[mapEntry] += value;
		}
	}
	var d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4], ctorArgs[5], ctorArgs[6]);
	return dateAdd(d, 'minutes', -getTimezone(timezoneOffsetMatch, 1, d) - getTimezone(match, timezoneIndex, d));
};

// format ?##00,00##
// returns number; null if optional and not set; undefined if parsing failed
parseNumber = function (fmt, value) {
	var format = replace(fmt, /^\?/);
	if (format!=fmt && !trim(value))
		return _null;
	var decSep = (/(^|[^0#.,])(,|[0#.]*,[0#]+|[0#]+\.[0#]+\.[0#.,]*)($|[^0#.,])/.test(format)) ? ',' : '.';
	var r = parseFloat(replace(replace(replace(value, decSep == ',' ? /\./g : /,/g), decSep, '.'), /^[^\d-]*(-?\d)/, '$1'));
	return isNaN(r) ? undef : r;
};

now = function () {
	return new Date();
};

dateClone = function (date) {
	return new Date(+date);
};

capWord = function (w) { 
	return w.charAt(0).toUpperCase() + w.substr(1); 
};

dateAddInline = function (d, cProp, value) {
	d['set'+cProp](d['get'+cProp]() + value);
	return d;
};

dateAdd = function (date, property, value) {
	if (value == _null)
		return dateAdd(now(), date, property);
	return dateAddInline(dateClone(date), capWord(property), value);
};

dateMidnight = function (date) {
	var od = date || now();
	return new Date(od.getFullYear(), od.getMonth(), od.getDate());
};

dateDiff = function (property, date1, date2) {
	var d1t = +date1;
	var d2t = +date2;
	var dt = d2t - d1t;
	if (dt < 0)
		return -dateDiff(property, date2, date1);

	var propValues = {'milliseconds': 1, 'seconds': 1000, 'minutes': 60000, 'hours': 3600000};
	var ft = propValues[property];
	if (ft)
		return dt / ft;

	var cProp = capWord(property);
	var calApproxValues = {'fullYear': 8.64e7*365, 'month': 8.64e7*365/12, 'date': 8.64e7}; // minimum values, a little bit below avg values
	var minimumResult = Math.floor((dt / calApproxValues[property])-2); // -2 to remove the imperfections caused by the values above

	var d = dateAddInline(new Date(d1t), cProp, minimumResult);
	for (var i = minimumResult; i < minimumResult*1.2+4; i++) { // try out 20% more than needed, just to be sure
		if (+dateAddInline(d, cProp, 1) > d2t)
			return i;
	}
	// should never ever be reached
};

ucode = function (a) {
	return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
};

escapeJavaScriptString = function (s) {
	return replace(s, /[\x00-\x1f'"\u2028\u2029]/g, ucode);
};

// reimplemented split for IE8
split = function (str, regexp) {
	return str.split(regexp);
};

_null = null;
var undef;

MONTH_LONG_NAMES = split('Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Dicembre', /,/g);
MONTH_SHORT_NAMES = map(MONTH_LONG_NAMES, val3);
WEEK_LONG_NAMES = split('Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sabado', /,/g);
WEEK_SHORT_NAMES = map(WEEK_LONG_NAMES, val3); 
MERIDIAN_NAMES = split('am,pm', /,/g);
MERIDIAN_NAMES_FULL = split('am,am,am,am,am,am,am,am,am,am,am,am,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm', /,/g);

FORMAT_DATE_MAP = {
	'y': ['FullYear', nonOp],
	'Y': ['FullYear', function(d) { return d % 100; }],
	'M': ['Month', plusOne],
	'n': ['Month', MONTH_SHORT_NAMES],
	'N': ['Month', MONTH_LONG_NAMES],
	'd': ['Date', nonOp],
	'm': ['Minutes', nonOp],
	'H': ['Hours', nonOp],
	'h': ['Hours', function(d) { return (d % 12) || 12; }],
	'k': ['Hours', plusOne],
	'K': ['Hours', function(d) { return d % 12; }],
	's': ['Seconds', nonOp],
	'S': ['Milliseconds', nonOp],
	'a': ['Hours', MERIDIAN_NAMES_FULL],
	'w': ['Day', WEEK_SHORT_NAMES],
	'W': ['Day', WEEK_LONG_NAMES],
	'z': ['TimezoneOffset', function(d, dummy, timezone) {
		if (timezone)
			return timezone;

		var sign = d > 0 ? '-' : '+'; 
		var off = d < 0 ? -d : d; 
		return sign + pad(2, Math.floor(off/60)) + pad(2, off%60); 
	}]
};

PARSE_DATE_MAP = {
	'y': 0,      // placeholder -> ctorIndex
	'Y': [0, -2000],
	'M': [1,1], // placeholder -> [ctorIndex, offset|value array]
	'n': [1, MONTH_SHORT_NAMES], 
	'N': [1, MONTH_LONG_NAMES],
	'd': 2,
	'm': 4,
	'H': 3,
	'h': 3,
	'K': [3,1],
	'k': [3,1],
	's':  5,
	'S':  6,
	'a': [3, MERIDIAN_NAMES]
};

MAX_CACHED_TEMPLATES = 99;
templateCache={}; // template -> function
templates = [];   // list of MAX_CACHED_TEMPLATES templates
