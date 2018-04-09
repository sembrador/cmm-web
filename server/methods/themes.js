
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2017-11-03 10:51:30
 * @modify date 2017-11-03 10:51:30
 * @desc Method to return the CSS file to the client for the selected theme
*/

Meteor.methods({
    'cambiarTema': function ( themeName ) {
        var css = null;
        switch ( themeName ) {
            case 'cerulean':
                css = Assets.getText( 'themes/cerulean/bootstrap.min.css' );
                break;
            case 'cosmo':
                css = Assets.getText( 'themes/cosmo/bootstrap.min.css' );
                break;
            case 'cyborg':
                css = Assets.getText( 'themes/cyborg/bootstrap.min.css' );
                break;
            case 'darkly':
                css = Assets.getText( 'themes/darkly/bootstrap.min.css' );
                break;
            case 'flatly':
                css = Assets.getText( 'themes/flatly/bootstrap.min.css' );
                break;
            case 'journal':
                css = Assets.getText( 'themes/journal/bootstrap.min.css' );
                break;
            case 'litera':
                css = Assets.getText( 'themes/litera/bootstrap.min.css' );
                break;
            case 'lumen':
                css = Assets.getText( 'themes/lumen/bootstrap.min.css' );
                break;
            case 'lux':
                css = Assets.getText( 'themes/lux/bootstrap.min.css' );
                break;
            case 'materia':
                css = Assets.getText( 'themes/materia/bootstrap.min.css' );
                break;
            case 'minty':
                css = Assets.getText( 'themes/minty/bootstrap.min.css' );
                break;
            case 'paper':
                css = Assets.getText( 'themes/paper/bootstrap.min.css' );
                break;
            case 'pulse':
                css = Assets.getText( 'themes/pulse/bootstrap.min.css' );
                break;
            case 'readable':
                css = Assets.getText( 'themes/readable/bootstrap.min.css' );
                break;
            case 'sandstone':
                css = Assets.getText( 'themes/sandstone/bootstrap.min.css' );
                break;
            case 'simplex':
                css = Assets.getText( 'themes/simplex/bootstrap.min.css' );
                break;
            case 'sketchy':
                css = Assets.getText( 'themes/sketchy/bootstrap.min.css' );
                break;
            case 'slate':
                css = Assets.getText( 'themes/slate/bootstrap.min.css' );
                break;
            case 'solar':
                css = Assets.getText( 'themes/solar/bootstrap.min.css' );
                break;
            case 'spacelab':
                css = Assets.getText( 'themes/spacelab/bootstrap.min.css' );
                break;
            case 'superhero':
                css = Assets.getText( 'themes/superhero/bootstrap.min.css' );
                break;
            case 'united':
                css = Assets.getText( 'themes/united/bootstrap.min.css' );
                break;
            case 'yeti':
                css = Assets.getText( 'themes/yeti/bootstrap.min.css' );
                break;
            default:
                css = Assets.getText( 'themes/flat-ui/bootstrap.min.css' );
        }
        return css + Assets.getText('font-awesome.min.css');
    }
});
