import React, { Component } from "react";
type State = {
  isLoggedIn: boolean;
};

export default class Ex2Login extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    let button;

    if (isLoggedIn) {
      button = <button onClick={this.handleLogoutClick}>Đăng xuất</button>;
    } else {
      button = <button onClick={this.handleLoginClick}>Đăng nhập</button>;
    }

    return (
      <div>
        {isLoggedIn ? (
          <h1>Xin chào, User!</h1>
        ) : (
          <h1>Vui lòng đăng nhập để tiếp tục.</h1>
        )}
        {button}
      </div>
    );
  }
}
