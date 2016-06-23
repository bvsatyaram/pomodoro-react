var React = require('react');
var Reflux = require('reflux');
var TaskStore = require('../dataStores/tasks.jsx');
var Progress = require('rc-progress');
var Circle = Progress.Circle;


var Tasks = React.createClass({
  colors: ['#27ae60', '#2980b9', '#d35400', '#c0392b'],
  totalTime: (1*60*1000),
  mixins: [Reflux.listenTo(TaskStore, 'handleCurrentTaskChange')],
  getInitialState: function() {
    return {currentTaskId: null, currentTaskTitle: null, time: 0, percent: 0, progressColor: this.colors[0]};
  },
  handleCurrentTaskChange: function(event, task) {
    if (event == 'currentTaskChange') {
      this.setState({currentTaskId: task.id, currentTaskTitle: task.title});
    }
  },
  runTimer: function() {
    var time = this.state.time + 5;
    if (time > self.totalTime) {
      this.stopTimer();
    } else {
      var percent = parseInt(100*time/this.totalTime);
      if (percent > 99) {
        percent = 99;
      }
      var color = this.colors[parseInt(percent/25)];

      this.setState({time: time, percent: percent, progressColor: color});
    }
  },
  startTimer: function() {
    if (this.timer) {
      this.stopTimer();
    }
    this.timer = setInterval(this.runTimer, 5);
  },
  stopTimer: function() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({time: 0, percent: 0, progressColor: this.colors[0]})
    }
  },
  render: function() {
    var content = <div />
    if (this.state.currentTaskId) {
      content = (
        <div className="timer-container">
          <Circle percent={this.state.percent} strokeWidth="4" strokeColor={this.state.progressColor} />
          <button onClick={this.startTimer}>Start Timer</button>
          <button onClick={this.stopTimer}>Stop Timer</button>
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
