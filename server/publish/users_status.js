
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2017-08-22 08:23:13
 * @modify date 2017-08-22 08:23:13
 * @desc Publicacion status
*/

Meteor.publish("userStatus", function() {
    return [
        Meteor.users.find({ "status.online": true }, { fields: { status: 1, profile: 1 }}), 
        UserStatus.connections.find()
    ];
});
