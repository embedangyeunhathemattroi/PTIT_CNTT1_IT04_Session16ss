import React, { Component } from 'react';
type Count = {
  count: number;
};
export default class Ex4 extends Component<{}, Count> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
