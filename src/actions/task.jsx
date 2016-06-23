var Reflux = require('reflux');

var TaskActions = Reflux.createActions([
  'getTasks',
  'postTask',
  'selectTask',
  'deleteTask'
]);

module.exports = TaskActions;
