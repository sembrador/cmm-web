
/**
 * Created by sembrador on 04/23/2017.
 */

Meteor.castleSoft = {
    zeroPad: function ( num, size ) {
        var s = num + "";
        while ( s.length < size )
            s = "0" + s;
        return s;
    }
};
