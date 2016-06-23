var React = require('react');
var Task = require('./Task.jsx');
var Reflux = require('reflux');
var TaskActions = require('../actions/task.jsx');
var TaskStore = require('../dataStores/tasks.jsx');


var Tasks = React.createClass({
  mixins: [Reflux.listenTo(TaskStore, 'handleTaskStoreChange')],
  getInitialState: function() {
    return {tasks: []};
  },
  componentWillMount: function() {
    TaskActions.getTasks();
  },
  handleTaskStoreChange: function(event, tasks) {
    this.setState({tasks: tasks});
  },
  render: function() {
    var taskElements = this.state.tasks.map(function(item) {
      return <Task key={item.id} title={item.title} />;
    });

    return (<div>{taskElements}</div>);
  }
})

module.exports = Tasks;
