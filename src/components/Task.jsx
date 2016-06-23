var React = require('react');
var Task = React.createClass({
  render: function() {
    return (
      <div className="task">
        {this.props.title}
      </div>
    );
  }
});

module.exports = Task;
