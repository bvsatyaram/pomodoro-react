var Reflux = require('reflux');

var TaskActions = Reflux.createActions([
  'getTasks',
  'postTask'
]);

module.exports = TaskActions;
