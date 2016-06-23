var React = require('react');
var Reflux = require('reflux');
var TaskStore = require('../dataStores/tasks.jsx');
var Progress = require('rc-progress');
var Circle = Progress.Circle;
var totalTime = 1*60*1000;
var timeIncrement = 600;
var colors = ['#27ae60', '#2980b9', '#f39c12', '#d35400', '#c0392b'];

var Tasks = React.createClass({
  mixins: [Reflux.listenTo(TaskStore, 'handleCurrentTaskChange')],
  getInitialState: function() {
    return {currentTaskId: null, currentTaskTitle: null, time: 0, percent: 0, progressColor: colors[0]};
  },
  handleCurrentTaskChange: function(event, task) {
    if (event == 'currentTaskChange') {
      this.setState({currentTaskId: task.id, currentTaskTitle: task.title});
    }
  },
  runTimer: function() {
    var time = this.state.time + timeIncrement;
    if (time > totalTime) {
      this.stopTimer();
    } else {
      var percent = parseInt(100*time/totalTime);
      if (percent > 99) {
        percent = 99;
      }
      var color = colors[parseInt(percent/20)];

      this.setState({time: time, percent: percent, progressColor: color});
    }
  },
  startTimer: function() {
    if (this.timer) {
      this.stopTimer();
    }
    this.timer = setInterval(this.runTimer, timeIncrement);
  },
  stopTimer: function() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({time: 0, percent: 0, progressColor: colors[0]})
    }
  },
  render: function() {
    var content = <div />
    if (this.state.currentTaskId) {
      content = (
        <div className="timer-container">
          <Circle percent={this.state.percent} strokeWidth="4" strokeColor={this.state.progressColor} />
          <div className="button-container">
            <button onClick={this.startTimer} className="btn btn-lg start">Start Timer</button>
            <button onClick={this.stopTimer} className="btn btn-lg stop">Stop Timer</button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h1>{this.state.currentTaskTitle}</h1>
        <div>{content}</div>
      </div>
    );
  }
})

module.exports = Tasks;
