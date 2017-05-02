import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 1
    };

    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }
  render() {
    const styles = {
      color: this.props.foregroundColor,
      backgroundColor: this.props.backgrondColor
    };
    return (
      <div>
        <CountDisplay style={styles} counter={this.state.counter} />
        <h1>{this.props.foregroundColor}</h1>
        {this.props.books.map((b) => <Book title={b} />)}
        {this.props.children}
      </div>
    );
  }
}
// Default Props Example
Quiz.propTypes = {
  foregroundColor: PropTypes.string.isRequired,
  backgrondColor: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  children: React.PropTypes.node,
  dangerous: PropTypes.string.isRequired
};

Quiz.defaultProps = {
  foregroundColor: 'blue',
  backgrondColor: 'black'
};

class QuizChildOne extends React.Component {
  render() {
    return <p>1st Child - checkin in</p>;
  }
}

class QuizChildTwo extends React.Component {
  render() {
    return <p>2nd Child - holla at yo boi</p>;
  }
}

class DangerQuizChildThree extends React.Component {
  render() {
    return <p dangerouslySetInnerHTML={{ __html: this.props.dangerous }} />;
  }
}

class CountDisplay extends React.Component {
  componentDidUpdate() {
    const node = $(ReactDOM.findDOMNode(this));
    node.slideUp();
    node.slideDown();
  }
  render() {
    return (
      <h1 style={this.props.style}>This has state counter {this.props.counter}</h1>
    );
  }
}

class Book extends React.Component {
  render() {
    return (
      <div><h4>this comment says: {this.props.title}</h4></div>
    );
  }
}

ReactDOM.render(
  <div>
    { // Is today an Odd Numbered Day?
      new Date().getDate % 2 !== 0 ?
        <Quiz books={['lol', 'wtf', 'okbbgrl']} >
          <QuizChildOne />
          <QuizChildTwo />
          <DangerQuizChildThree dangerous="<strong>Austin Danger Powers</strong>" />
        </Quiz> :
        <Book title="hi" />
    }
    {'Bob'}{' '}{'Alice'}
  </div>,
    document.querySelector('#root')
);
