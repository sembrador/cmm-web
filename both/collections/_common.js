
/**
 * Created by sembrador on 04/22/2017.
 */

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['decimal']);

function makeGlobal(key,val){
   if(typeof window !== 'undefined'){ window[key] = val; }
   if(typeof global !== 'undefined'){ global[key] = val; }
}

//makeGlobal( 'simpl-schema', SimpleSchema );

TabularTables = {};

i18n.setLanguage('es');

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);
