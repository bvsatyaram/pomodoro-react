var React = require('react');
var Task = require('./Task.jsx');
var Reflux = require('reflux');
var TaskActions = require('../actions/task.jsx');
var TaskStore = require('../dataStores/tasks.jsx');


var Tasks = React.createClass({
  mixins: [Reflux.listenTo(TaskStore, 'handleTaskStoreChange')],
  getInitialState: function() {
    return {tasks: [], newTaskTitle: ""};
  },
  componentWillMount: function() {
    TaskActions.getTasks();
  },
  handleTaskStoreChange: function(event, tasks) {
    if (event == 'coreChange') {
      this.setState({tasks: tasks});
    }
  },
  handleNewTaskChange: function(e) {
    this.setState({newTaskTitle: e.target.value});
  },
  handleAddTask: function(e) {
    e.preventDefault();
    if (this.state.newTaskTitle) {
      TaskActions.postTask(this.state.newTaskTitle);
    }
    this.setState({newTaskTitle: ""});
  },
  render: function() {
    var taskElements = this.state.tasks.map(function(item) {
      return <Task key={item.id} title={item.title} objId={item.id} />;
    });

    return (
      <div>
        {taskElements}
        <form className="form-inline new-task-form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="New Task Title" value={this.state.newTaskTitle} onChange={this.handleNewTaskChange} />
          </div>
          <button className="btn btn-default" onClick={this.handleAddTask}>Add</button>
        </form>
      </div>
    );
  }
})

module.exports = Tasks;
