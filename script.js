import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minsLeft: 25,
      secsLeft: 0,
      running: false,
      phase: "Session" };

    this.reset = this.reset.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  breakDecrement() {
    let newTime = this.state.breakLength;
    if (this.state.breakLength > 1 && !this.state.running) newTime--;
    this.setState({ breakLength: newTime });
    if (this.state.phase == "Break" && !this.state.running) this.setState({ minsLeft: newTime, secsLeft: 0 });
  }

  sessionDecrement() {
    let newTime = this.state.sessionLength;
    if (this.state.sessionLength > 1 && !this.state.running) newTime--;
    this.setState({ sessionLength: newTime });
    if (this.state.phase == "Session" && !this.state.running) this.setState({ minsLeft: newTime, secsLeft: 0 });
  }

  breakIncrement() {
    let newTime = this.state.breakLength;
    if (this.state.breakLength < 60 && !this.state.running) newTime++;
    this.setState({ breakLength: newTime });
    if (this.state.phase == "Break" && !this.state.running) this.setState({ minsLeft: newTime, secsLeft: 0 });
  }

  sessionIncrement() {
    let newTime = this.state.sessionLength;
    if (this.state.sessionLength < 60 && !this.state.running) newTime++;
    this.setState({ sessionLength: newTime });
    if (this.state.phase == "Session" && !this.state.running) this.setState({ minsLeft: newTime, secsLeft: 0 });
  }

  togglePause() {
    this.setState({
      running: this.state.running ? false : true });

  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.running) {
        this.setState({
          secsLeft: this.state.secsLeft - 1 });


        if (this.state.secsLeft < 0) {
          this.setState({
            secsLeft: 59,
            minsLeft: this.state.minsLeft - 1 });

        }

        if (this.state.minsLeft < 0) {
          if (this.state.phase == "Session") {
            this.setState({
              minsLeft: this.state.breakLength,
              secsLeft: 0,
              phase: "Break" });

          } else {
            this.setState({
              minsLeft: this.state.sessionLength,
              secsLeft: 0,
              phase: "Session" });

          }
        }

        if (this.state.minsLeft == 0 && this.state.secsLeft == 0) this.audioBeep.play();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minsLeft: 25,
      secsLeft: 0,
      running: false,
      phase: "Session" });

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", { className: "lengths", id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("h2", { className: "lengths", id: "break-label" }, "Break Length"), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/

      React.createElement("button", { className: "lengths", id: "session-decrement", onClick: this.sessionDecrement }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-minus-circle" })), /*#__PURE__*/

      React.createElement("h2", { className: "lengths", id: "session-length" }, this.state.sessionLength.toString().padStart(2, 0)), /*#__PURE__*/
      React.createElement("button", { className: "lengths", id: "session-increment", onClick: this.sessionIncrement }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-plus-circle" })), /*#__PURE__*/


      React.createElement("button", { className: "lengths", id: "break-decrement", onClick: this.breakDecrement }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-minus-circle" })), /*#__PURE__*/

      React.createElement("h2", { className: "lengths", id: "break-length" }, this.state.breakLength.toString().padStart(2, 0)), /*#__PURE__*/
      React.createElement("button", { className: "lengths", id: "break-increment", onClick: this.breakIncrement }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-plus-circle" })), /*#__PURE__*/


      React.createElement("h2", { id: "timer-label" }, this.state.phase), /*#__PURE__*/
      React.createElement("h2", { id: "time-left" }, this.state.minsLeft.toString().padStart(2, 0), ":", this.state.secsLeft.toString().padStart(2, 0)), /*#__PURE__*/

      React.createElement("button", { id: "start_stop", onClick: this.togglePause }, /*#__PURE__*/
      React.createElement("i", { class: this.state.running ? "fas fa-pause" : "fas fa-play" })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.reset }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-redo" })), /*#__PURE__*/


      React.createElement("audio", {
        id: "beep",
        src: "https://www.myinstants.com/media/sounds/untitled_1071.mp3",
        ref: audio => {
          this.audioBeep = audio;
        } })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));