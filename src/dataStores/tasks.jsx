var HTTP = require('../services/http');
var Reflux = require('reflux');
var TaskActions = require('../actions/task.jsx');

var TaskStore = Reflux.createStore({
  listenables: [TaskActions],
  getTasks: function() {
    HTTP.get('/tasks').then(function(data) {
      this.tasks = data;
      this.fireUpdate();
    }.bind(this));
  },
  postTasks: function(title) {},
  fireUpdate: function() {
    this.trigger('change', this.tasks);
  }
});

module.exports = TaskStore;
