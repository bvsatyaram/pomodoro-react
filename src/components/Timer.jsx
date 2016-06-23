var React = require('react');
var Reflux = require('reflux');
var TaskStore = require('../dataStores/tasks.jsx');


var Tasks = React.createClass({
  mixins: [Reflux.listenTo(TaskStore, 'handleCurrentTaskChange')],
  getInitialState: function() {
    return {currentTaskId: null, currentTaskTitle: null};
  },
  handleCurrentTaskChange: function(event, task) {
    if (event == 'currentTaskChange') {
      this.setState({currentTaskId: task.id, currentTaskTitle: task.title});
    }
  },
  render: function() {
    return (
      <div>
        <h1>{this.state.currentTaskTitle}</h1>
      </div>
    );
  }
})

module.exports = Tasks;
