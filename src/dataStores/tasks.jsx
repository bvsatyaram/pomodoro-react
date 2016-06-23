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
  selectTask: function(taskId) {
    var selectedTask = {};
    this.tasks.forEach(function(task) {
      if (task.id == taskId) {
        selectedTask = task;
      }
    });

    this.currentTask = selectedTask;
    this.fireCurrentTaskChange();
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

    if (taskId == this.currentTask.id) {
      this.currentTask = {};
      this.fireCurrentTaskChange();
    }
  },
  fireUpdate: function() {
    this.trigger('coreChange', this.tasks);
  },
  fireCurrentTaskChange: function() {
    this.trigger('currentTaskChange', this.currentTask);
  }
});

module.exports = TaskStore;
