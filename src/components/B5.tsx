import React, { Component } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

type State = {
  name: string;
  email: string;
  age: string;
};

export default class B5 extends Component<{}, State> {
  state: State = {
    name: "",
    email: "",
    age: "",
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  handleSubmit = () => {
    const { name, email, age } = this.state;
    const ageNum = parseInt(age);

    if (!email.includes("@")) {
      Swal.fire("Email không hợp lệ", "", "error");
      return;
    }
    if (isNaN(ageNum) || ageNum < 0) {
      Swal.fire("Tuổi không được âm", "", "error");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Thông tin đã nhập",
      html: `
        <p><b>Họ tên:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Tuổi:</b> ${age}</p>
      `,
    });
  };

  handleReset = () => {
    this.setState({ name: "", email: "", age: "" });
    Swal.fire("Đã xóa tất cả!", "", "info");
  };

  render() {
    const { name, email, age } = this.state;
    return (
      <div className="container mt-4 p-3 border rounded" style={{ maxWidth: 400 }}>
        <h4 className="mb-3">Nhập thông tin người dùng</h4>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Họ tên"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Tuổi"
          name="age"
          value={age}
          onChange={this.handleChange}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={this.handleSubmit}>Gửi</button>
          <button className="btn btn-secondary" onClick={this.handleReset}>Xóa tất cả</button>
        </div>
      </div>
    );
  }
}