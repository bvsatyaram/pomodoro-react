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
  postTask: function(title) {
    if (!this.tasks) {
      this.tasks = [];
    }
    var task = {
      id: Date.now(),
      title: title
    };
    this.tasks.push(task);
    this.fireUpdate();

    HTTP.post('/tasks', task).then(function(response) {
      this.getTasks();
    }.bind(this));
  },
  deleteTask: function(taskId) {
    var newTasks = [];
    this.tasks.forEach(function(task) {
      if (task.id != taskId) {
        newTasks.push(task);
      }
    });
    this.tasks = newTasks;
    this.fireUpdate();

    HTTP.delete('/tasks/' + taskId).then(function(response) {
      this.getTasks();
    }.bind(this));
  },
  fireUpdate: function() {
    this.trigger('change', this.tasks);
  }
});

module.exports = TaskStore;
