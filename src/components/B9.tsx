import React, { Component } from "react";
import {
  FaShoppingCart,
  FaCartPlus,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ==== Types ====
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

// ==== Navbar ====
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}
class Navbar extends Component<NavbarProps> {
  render() {
    const { cartCount, onCartClick } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-warning px-3">
        <a className="navbar-brand fw-bold" href="/">
          Trang chủ
        </a>
        <button className="btn btn-outline-dark ms-auto" onClick={onCartClick}>
          <FaShoppingCart /> Giỏ hàng{" "}
          <span className="badge bg-danger ms-1">{cartCount}</span>
        </button>
      </nav>
    );
  }
}

// ==== App ====
interface AppState {
  cartItems: CartItem[];
  showCart: boolean;
  showConfirm: boolean;
  confirmId: number | null;
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    cartItems: [],
    showCart: false,
    showConfirm: false,
    confirmId: null,
  };

  products: Product[] = [
    {
      id: 1,
      name: "Samsung Galaxy",
      price: 20000000,
      stock: 5,
      image:
        "https://cdn.tgdd.vn/Products/Images/42/331206/samsung-galaxy-a16-gray-thumb-600x600.jpg",
    },
    {
      id: 2,
      name: "iPhone 14 Pro Max",
      price: 25000000,
      stock: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWyG4yd2heSly9wXyXKAAzuIO5aq_wpXcgw&s",
    },
    {
      id: 3,
      name: "Oppo A9",
      price: 15000000,
      stock: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHU8U8ABIemUhyHwY7TrlBxdwEmO1Nff1QA&s",
    },
    {
      id: 4,
      name: "Iphone 15 Pro",
      price: 20000000,
      stock: 2,
      image:
        "https://media.wired.com/photos/6500ad57fe61eb702d721b58/4:3/w_1913,h_1435,c_limit/Apple-iPhone-15-Pro-Hero-Gear.jpg",
    },
  ];

  handleAddToCart = (product: Product) => {
    this.setState((prev) => {
      const exist = prev.cartItems.find((p) => p.id === product.id);
      if (exist) {
        if (exist.quantity + 1 > product.stock) {
          alert("Số lượng sản phẩm trong kho không đủ");
          return prev;
        }
        return {
          ...prev,
          cartItems: prev.cartItems.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return {
        ...prev,
        cartItems: [...prev.cartItems, { ...product, quantity: 1 }],
      };
    });
  };

  handleIncrease = (id: number) => {
    this.setState((prev) => {
      const item = prev.cartItems.find((p) => p.id === id);
      if (item && item.quantity + 1 > item.stock) {
        alert("Số lượng sản phẩm trong kho không đủ");
        return prev;
      }
      return {
        ...prev,
        cartItems: prev.cartItems.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      };
    });
  };

  handleDecrease = (id: number) => {
    this.setState((prev) => {
      const item = prev.cartItems.find((p) => p.id === id);
      if (item && item.quantity === 1) {
        // Hiển thị modal xác nhận xóa
        return { ...prev, showConfirm: true, confirmId: id };
      }
      return {
        ...prev,
        cartItems: prev.cartItems.map((p) =>
          p.id === id && p.quantity > 1
            ? { ...p, quantity: p.quantity - 1 }
            : p
        ),
      };
    });
  };

  handleRemove = (id: number) => {
    this.setState((prev) => ({
      ...prev,
      cartItems: prev.cartItems.filter((p) => p.id !== id),
      showConfirm: false,
      confirmId: null,
    }));
  };

  toggleCart = () => {
    this.setState((prev) => ({ showCart: !prev.showCart }));
  };

  // Xác nhận xóa từ modal
  confirmDelete = () => {
    if (this.state.confirmId !== null) {
      this.handleRemove(this.state.confirmId);
    }
  };

  render() {
    const { cartItems, showCart, showConfirm } = this.state;
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
      <>
        <Navbar cartCount={cartItems.length} onCartClick={this.toggleCart} />

        {/* Danh sách sản phẩm */}
        <div className="container mt-4">
          <div className="row g-3">
            {this.products.map((p) => (
              <div className="col-md-4" key={p.id}>
                <div className="card h-100">
                  <img src={p.image} className="card-img-top" alt={p.name} />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="card-text text-danger fw-bold">
                      {p.price.toLocaleString()} đ
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleAddToCart(p)}
                    >
                      <FaCartPlus /> Thêm vào giỏ
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
            style={{ width: "320px", zIndex: 999 }}
          >
            <h5>Giỏ hàng</h5>
            {cartItems.length === 0 && <p>Chưa có sản phẩm</p>}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center justify-content-between mb-2"
              >
                <span className="fw-bold">{item.name}</span>
                <div>
                  <button
                    className="btn btn-sm btn-light me-1"
                    onClick={() => this.handleIncrease(item.id)}
                  >
                    <FaPlus />
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-sm btn-light ms-1"
                    onClick={() => this.handleDecrease(item.id)}
                  >
                    <FaMinus />
                  </button>
                </div>
                <FaTrash
                  className="text-danger ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({ showConfirm: true, confirmId: item.id })
                  }
                />
              </div>
            ))}
            <hr />
            <div className="fw-bold">Tổng: {total.toLocaleString()} đ</div>
          </div>
        )}

        {/* Modal xác nhận xóa */}
        {showConfirm && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xác nhận</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      this.setState({ showConfirm: false, confirmId: null })
                    }
                  ></button>
                </div>
                <div className="modal-body">
                  Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      this.setState({ showConfirm: false, confirmId: null })
                    }
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.confirmDelete}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
