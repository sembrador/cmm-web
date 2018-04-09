
/**
 * @author Leandro Camaño Guerrero
 * @email developer@castle-soft.com
 * @create date 2017-08-20 01:20:45
 * @modify date 2017-08-20 01:20:45
 * @desc log file extension
*/

import { Logger }     from 'meteor/ostrio:logger'
import { LoggerFile } from 'meteor/ostrio:loggerfile'

// Initialize Logger:
const log = new Logger();

// Initialize LoggerFile:how to repeate 
const LogFile = new LoggerFile(log, {
  fileNameFormat: function(time) {
    // Create log-files hourly
    return (time.getDate()) + "-" + (time.getMonth() + 1) + "-" + (time.getFullYear()) + "_" + (time.getHours()) + ".log";
  },
  format: function(time, level, message, data, userId) {
    // Omit Date and hours from messages
    return "[" + level + "] | " + (time.getMinutes()) + ":" + (time.getSeconds()) + " | \"" + message + "\" | Usuario: " + userId + "\r\n";
  },
  path: process.env.HOME + '/logs/'
  // path: '/var/logs/' // Use absolute storage path
});

// Enable LoggerFile with default settings
LogFile.enable();

/*
  message {String} - Any text message
  data    {Object} - [optional] Any additional info as object
  userId  {String} - [optional] Current user id
 

log.info(message, data, userId);
log.debug(message, data, userId);
log.error(message, data, userId);
log.fatal(message, data, userId);
log.warn(message, data, userId);
log.trace(message, data, userId);
log._(message, data, userId); // Shortcut

// Use with throw
throw log.error(message, data, userId);
*/
