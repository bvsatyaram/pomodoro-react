var React = require('react');
var Reflux = require('reflux');
var TaskStore = require('../dataStores/tasks.jsx');
var Progress = require('rc-progress');
var Circle = Progress.Circle;


var Tasks = React.createClass({
  colors: {
    green: '#27ae60',
    blue: '#2980b9',
    orange: '#d35400',
    red: '#c0392b'
  },
  totalTime: (1*60),
  mixins: [Reflux.listenTo(TaskStore, 'handleCurrentTaskChange')],
  getInitialState: function() {
    return {currentTaskId: null, currentTaskTitle: null, time: 0, percent: 0, progressColor: '#27ae60'};
  },
  handleCurrentTaskChange: function(event, task) {
    if (event == 'currentTaskChange') {
      this.setState({currentTaskId: task.id, currentTaskTitle: task.title});
    }
  },
  runTimer: function() {
    var time = this.state.time + 5;
    if (time > totalTime) {
      this.stopTimer();
    } else {
      var percent = 100*time/this.totalTime;
      var color = null;
      if (percent < 25) {
        color = this.colors.green;
      } else if (percent < 50) {
        color = this.colors.blue;
      } else if (percent < 75) {
        color = this.colors.orange;
      } else {
        color = this.colors.red;
      }

      this.setState({time: time, percent: percent, progressColor: color});
    }
  },
  startTimer: function() {
    this.timer = setInterval(this.runTimer, 5);
  },
  stopTimer: function() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({time: 0, percent: 0, progressColor: '#27ae60'})
    }
  },
  render: function() {
    setInterval(function() {
      this.setState({time: this.state.time + 1});
    }.bind(this), 300);

    var content = <div />
    if (this.state.currentTaskId) {
      content = (
        <div>
          <Circle percent={this.state.percent} strokeWidth="4" strokeColor={this.state.progressColor} />
          <button onClick={this.startTimer}>Start Timer</button>
          <button onClick={this.stopTimer}>Stop Timer</button>
        </div>
      )
    }

    return (
      <div>
        <h1>{this.state.currentTaskTitle}</h1>
        <p>{content}</p>
      </div>
    );
  }
})

module.exports = Tasks;
