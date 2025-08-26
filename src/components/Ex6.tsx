import React, { Component } from 'react';

type State = {
  isDarkMode: boolean;
};

export default class Ex6 extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isDarkMode: false
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode
    }));
  };

  render() {
    const { isDarkMode } = this.state;
    const themeStyles: React.CSSProperties = {
      backgroundColor: isDarkMode ? "black" : "white",
      color: isDarkMode ? "white" : "black", // đảo ngược màu chữ
      minHeight: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div style={themeStyles}>
        <h1>{isDarkMode ? "Chế độ đang bật" : "Chế độ đang tắt"}</h1>
        <button onClick={this.toggleTheme}>Chuyển theme</button>
      </div>
    );
  }
}