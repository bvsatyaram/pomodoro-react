var React = require('react');
var TaskActions = require('../actions/task.jsx');

var Task = React.createClass({
  deleteTask: function() {
    TaskActions.deleteTask(this.props.objId);
  },
  selectTask: function() {
    TaskActions.selectTask(this.props.objId);
  },
  render: function() {
    return (
      <div className="task" onClick={this.selectTask}>
        <span className="glyphicon glyphicon-trash trash" onClick={this.deleteTask}></span>
        {this.props.title}
      </div>
    );
  }
});

module.exports = Task;
