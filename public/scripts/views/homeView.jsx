'use strict;'

class Navbar extends React.Component {
  render() {
    return (
      <header>
        <nav class="nav">
          <div data-page="home" class=""><a href="/">Score Keeper</a></div>
          <div class="">
            <div class=""></div>
            <ul>
              <Groups />
              <li data-page="about"><a href="/about">About</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

class Groups extends React.Component {
  render() {
    return (
      <li ><a href="#group">Groups</a></li>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Clock />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
