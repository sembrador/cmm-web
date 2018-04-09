
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2017-08-22 09:36:06
 * @modify date 2017-08-22 09:36:06
 * @desc Código común UI - javascript
*/

// Bootstrap Theme
import dataTablesBootstrap from 'datatables.net-bs';

// Buttons Core
import dataTableButtons from 'datatables.net-buttons-bs';

// Import whichever buttons you are using
import JSZip from 'jszip';
import pdfmake from 'pdfmake/build/pdfmake';
import columnVisibilityButton from 'datatables.net-buttons/js/buttons.colVis';
import html5ExportButtons from 'datatables.net-buttons/js/buttons.html5';
import flashExportButtons from 'datatables.net-buttons/js/buttons.flash';
import printButton from 'datatables.net-buttons/js/buttons.print';

// Then initialize everything you imported
dataTablesBootstrap(window, $);
dataTableButtons(window, $);
columnVisibilityButton(window, $);
html5ExportButtons(window, $);
flashExportButtons(window, $);
printButton(window, $);

this.Helpers = {};
documentos = [
		["FC", "FACTURA" ],
		["ND", "NOTA DEBITO" ],
		["AD", "AJUSTE DEBITO" ],
		["OD", "OTROS DEBITO" ],
		["RC", "RECIBO" ],
		["NC", "NOTA CREDITO" ],
		["AC", "AJUSTE CREDITO" ],
		["OC", "OTROS CREDITO" ]
	]

function doSomething(e)
{
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
}

Helpers.formatNumber = function(valor) {
	return numeral(typeof valor == 'number' ? valor : 0).format('0,0.00');
};

Helpers.tipoTransaccion = function(b) {
	return b ? "DEBITO" : "CREDITO";
};

Helpers.showFullName = function(socio){
	var oData = InfoSocios.findOne({socio_numero: socio});
	if (oData) {
		return oData.socio_nombres.trim() + ' ' + oData.socio_apellidos.trim();
	} else {
		return '<DESCONOCIDO>'
	}
};

Helpers.displayFullName = function(nombres, apellidos){
	if (typeof nombres == 'string' && typeof apellidos == 'string') {
		return nombres.trim() + '  ' + apellidos.trim();
	} else {
		return '<REVISAR>';            
	}
};

Helpers.trimString = function( sData ){
	if (typeof sData == 'string') {
		return sData.trim();
	} else {
		return '<TYPE ERROR>';            
	}
};

Helpers.showDocument = function(tipo) {
	for( var i = 0, len = documentos.length; i < len; i++ ) {
		if( documentos[i][0] === tipo ) {
			return documentos[i][1];
		}
	}
};

Helpers.trabajaEn = function( aData ){
	var sTrabajos = '';
	for( var i = 0, len = aData.length; i < len; i++ ) {
		switch ( true ) {
			case aData[i] == 'C':
				sTrabajos += 'CSS ';
				break;
			case aData[i] == 'F':
				sTrabajos += 'FACULTAD ';
				break;
			case aData[i] == 'M':
				sTrabajos += 'MINISTERIO ';
				break;
			case aData[i] == 'P':
				sTrabajos += 'PRIVADA ';
				break;
			default:
		}
	}
	return sTrabajos;
};

Helpers.esDebito = function(b) {
	return b;
};

Helpers.printDiv = function (divID) {
	//Get the HTML of div
	//var divElements = document.getElementById(divID).innerHTML;
	//Get the HTML of whole page
	//var oldPage = document.body.innerHTML;
	//Reset the page's HTML with div's HTML only
	//document.body.innerHTML = "<html><head><title></title></head><body>" + divElements + "</body>";
	//Print Page
	//window.print();
	printJS('divID', 'html')
	//Restore orignal HTML
	//document.body.innerHTML = oldPage;
};

Helpers.lookUpUser = function(id){
	var objGroup = Meteor.users.findOne({ _id: id });
	if (objGroup) {
		return objGroup.profile.name.toUpperCase();
	} else {
		return '<N/A>';
	}
};

Helpers.dateToText = function(fecha) {
	return moment(fecha).format('DD/MM/YY hh:mm a');
};

Helpers.showBOD = function(fecha, fmt) {
	return moment(fecha).format(fmt) + ' (' + Math.floor((new Date() - new Date(fecha)) / 1000 / 60 / 60 / 24 / 365.25) + ' años)';
};

Helpers.showSex = function(value) {
	return value == 'M' ? 'HOMBRE' : 'MUJER';
};

Helpers.showSiNo = function(value) {
	if ( typeof value === 'boolean' ) {
		return value ? 'SI' : 'NO';
	} else {
		return '<PENDIENTE>';
	}
};

Helpers.showMoney = function(value) {
	return numeral(typeof value === 'number' ? value : 0 ).format('0,0.00');
};

Helpers.relativeTime = function(timeAgo) {
	var ago, days, diff, time;
    diff = moment.utc(TimeSync.serverTime() - timeAgo);
    time = diff.format("H:mm:ss");
    days = +diff.format("DDD") - 1;
    ago = (days ? days + "d " : "") + time;
    return ago + " ago";
};

Helpers.localeTime = function(date) {
    return date != null ? date.toLocaleString() : void 0;
};

Helpers.antiguedad = function (d1,d2,fmt) {
	var d2 = typeof d2 == 'date' ? new Date( d2 - d1 ) : new Date( new Date() - d1 ),
	fmt = typeof fmt == 'string' ? fmt : '2', elapsed = '';

	switch ( fmt ) {
		case '1':
			elapsed = ( d2.toISOString().slice( 0, 4 ) - 1970 ) + "a ";
			break;
		case '2':
			elapsed = ( d2.toISOString().slice( 0, 4 ) - 1970 ) + "a " + d2.getMonth() + "m ";
			break;
		case '3':
			elapsed = ( d2.toISOString().slice( 0, 4 ) - 1970 ) + "a " + d2.getMonth() + "m " + d2.getDate() + "d";
			break;
	}

	return  elapsed;
};

Helpers.json = function(a) {
	try {
		return JSON.stringify(a);
    } catch(e) { 
		return a;
	}
};

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});
  
this.UserConnections = new Mongo.Collection("user_status_sessions");

Handlebars.registerHelper("userStatus", UserStatus);
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

export function getBase64Image( img ) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext( "2d" );
	ctx.drawImage( img, 0, 0 );

	return canvas.toDataURL( "image/png" );
}

export function logoBase64() {
	var base64_data = getBase64Image( document.getElementById( 'logoImage' ) );
	return ( base64_data );
}

export function monthDiff( d1, d2 ) {
	var months = 0;

	if ( d2.getDate() >= d1.getDate() ) { months++ }

	months = ( d2.getFullYear() - d1.getFullYear() ) * 12;
    months -= d1.getMonth();
	months += d2.getMonth();

    return ( months <= 0 ? 0 : months );
}

export function antiguedad( d1, fmt ) {
	var d2 = new Date( new Date() - d1 ), elapsed = '';

	switch ( fmt ) {
		case '1':
			elapsed = ( d2.toISOString().slice( 0, 4 ) - 1970 ) + "a ";
			break;
		case '2':
			elapsed = ( d2.toISOString().slice( 0, 4 ) - 1970 ) + "a " + d2.getMonth() + "m ";
			break;
		default:
			elapsed = ( d2.toISOString().slice( 0, 4 ) - 1970 ) + "a " + d2.getMonth() + "m " + d2.getDate() + "d";
			break;
	}

	return  elapsed;
}

export function showBirthday(fecha, fmt) {
	return moment(fecha).format(fmt) + ' (' + Math.floor((new Date() - new Date(fecha)) / 1000 / 60 / 60 / 24 / 365.25) + ' años)';
}

export function formattedNumber(n, c, d, t){
	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
	d = d == undefined ? "." : d, 
	t = t == undefined ? "," : t, 
	s = n < 0 ? "-" : "", 
	i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
