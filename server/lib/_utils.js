
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2017-09-07 10:22:32
 * @modify date 2017-09-07 10:22:32
 * @desc several utils function server side - javascript
 **/

'use strict;';

pad = function ( n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array( width - n.length + 1 ).join( z ) + n;
};

getNextNumber = function ( name ) {
  var oCounter = Counters.findOne({ counter: name }), nNext;
  if (oCounter) {
    nNext = oCounter.seq + 1;
    Counters.update({ counter: name }, { $inc: { seq: 1 }});
  }
  return pad( nNext, 5 );
};
