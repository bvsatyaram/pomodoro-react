var Reflux = require('reflux');

var TaskActions = Reflux.createActions([
  'getTasks',
  'postTask',
  'deleteTask'
]);

module.exports = TaskActions;
