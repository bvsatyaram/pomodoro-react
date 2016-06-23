var React = require('react');
var ReactDOM = require('react-dom');
var Tasks = require('./components/Tasks.jsx');
var Timer = require('./components/Timer.jsx');

ReactDOM.render(<Tasks />, document.getElementById('tasks'));
ReactDOM.render(<Timer />, document.getElementById('timer'));
