import React, { Component } from "react";
import { products } from "./product.data";
import type { Product } from "./product.data";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  showCart: boolean;
}

export default class B8 extends Component<{}, AppState> {
  state: AppState = {
    cart: [],
    showCart: false,
  };

  componentDidMount(): void {
    // Lấy giỏ hàng từ localStorage
    const saved = localStorage.getItem("cart");
    if (saved) {
      this.setState({ cart: JSON.parse(saved) });
    }
  }

  componentDidUpdate(_: {}, prevState: AppState): void {
    // Cập nhật localStorage khi giỏ hàng thay đổi
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
  }

 handleAddToCart = (product: Product) => {
  this.setState((prev: AppState): AppState => {
    const exist = prev.cart.find((item) => item.id === product.id);

    if (exist) {
      // kiểm tra số lượng kho
      if (exist.quantity + 1 > product.stock) {
        alert("Số lượng sản phẩm trong kho không đủ");
        return prev; // không thay đổi state
      }

      return {
        ...prev,
        cart: prev.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    return {
      ...prev,
      cart: [...prev.cart, { ...product, quantity: 1 }],
    };
  });
};

  toggleCart = () => {
    this.setState((prev) => ({ showCart: !prev.showCart }));
  };

  render() {
    const { cart, showCart } = this.state;
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-light bg-warning px-3">
          <a className="navbar-brand fw-bold" href="/">Trang chủ</a>
          <button
            className="btn btn-outline-dark ms-auto"
            onClick={this.toggleCart}
          >
            <FaShoppingCart /> Giỏ hàng{" "}
            <span className="badge bg-danger ms-1">{cart.length}</span>
          </button>
        </nav>

        {/* Danh sách sản phẩm */}
        <div className="container mt-4">
          <div className="row g-3">
            {products.map((p) => (
              <div className="col-md-3" key={p.id}>
                <div className="card h-100">
                  <img src={p.image} className="card-img-top" alt={p.name} />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="card-text text-danger fw-bold">
                      {p.price.toLocaleString()} đ
                    </p>
                    <p>Còn lại: {p.stock}</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => this.handleAddToCart(p)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Giỏ hàng */}
        {showCart && (
          <div
            className="card p-3 position-fixed end-0 top-0 m-3"
            style={{ width: "300px", zIndex: 999 }}
          >
            <h5>Giỏ hàng</h5>
            {cart.length === 0 && <p>Chưa có sản phẩm</p>}
            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </div>
            ))}
            <hr />
            <strong>
              Tổng: {total.toLocaleString()} đ
            </strong>
          </div>
        )}
      </div>
    );
  }
}
