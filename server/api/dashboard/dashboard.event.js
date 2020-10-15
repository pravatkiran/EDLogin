/**
 * Adminanalyze model events
 */

import {EventEmitter} from 'events';
var Adminanalyze = require('../../sqldb').Adminanalyze;
var AdminanalyzeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdminanalyzeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Adminanalyze) {
  for(var e in events) {
    let event = events[e];
    Adminanalyze.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    AdminanalyzeEvents.emit(event + ':' + doc._id, doc);
    AdminanalyzeEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Adminanalyze);
export default AdminanalyzeEvents;
