import React from "react";
import { Link } from "react-router-dom";
import '../css/styles.css';
import '../css/bootstrap.min.css';
import '../css/bootstrap-icons.css';

const ShopOrder = () => {
  return (
    <div>
      <header className="navbar sticky-top" style={{ alignItems: "center" }}>
        <Link to="shoporder">
          <img style={{ width: "100px" }} src="images/logo EIPS.png" alt="" />
        </Link>
        <Link className="nav-link" to="/shoporder">
          <i className="bi-wallet me-2" />
          Shop Order
        </Link>
        <Link className="nav-link" to="/product">
          <i className="bi-wallet me-2" />
          Product
        </Link>
        <Link className="nav-link" to="/setting">
          <i className="bi-gear me-2" />
          Settings
        </Link>
        <Link className="nav-link" to="#">
          <i className="bi-box-arrow-left me-2" />
          Logout
        </Link>
        <div className="px-3">
          <Link
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="images/medium-shot-happy-man-smiling.jpg"
              className="profile-image"
              alt=""
            />
          </Link>
        </div>
      </header>
        <div className="row" sx={{position: "fixed"}}>
            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h1 className="h2 mb-0">MENU</h1>
              <small className="text-muted">Hello Hao Phan, welcome back!</small>
            </div>
            <div className="row my-4">
              <div className="col-lg-6 col-12">
                <form
                  className="custom-form input-group mb-3"
                  action="#"
                  method="get"
                  role="form"
                >
                  <input
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search ID"
                    aria-label="Search"
                  />
                  <button style={{ width: "100px" }} type="submit">
                    Search
                  </button>
                </form>
                <form
                  className="custom-form input-group mb-3"
                  action="#"
                  method="get"
                  role="form"
                >
                  <input
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search Product"
                    aria-label="Search"
                  />
                  <button style={{ width: "100px" }} type="submit">
                    Search
                  </button>
                </form>
                <div className="custom-block bg-white">
                  <h5 className="mb-4">Product</h5>
                  <div className="table-responsive">
                    <table
                      className="account-table table"
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
                          <th scope="col">Category</th>
                          <th scope="col">Add to cart</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">1</td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td className="text-danger" scope="row">
                            <span className="me-1">-</span>
                          </td>
                          <td scope="row" style={{ alignItems: "center" }}>
                            <button className="form-control">Add</button>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">2</td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td className="text-success" scope="row">
                            <span className="me-2"></span>
                          </td>
                          <td scope="row" style={{ alignItems: "center" }}>
                            <button className="form-control">Add</button>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">3</td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td className="text-danger" scope="row">
                            <span className="me-2"></span>
                          </td>
                          <td scope="row" style={{ alignItems: "center" }}>
                            <button className="form-control">Add</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <table
                  className="account-table table"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">ID Event</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ textAlign: "center" }}>
                      <td scope="row">1</td>
                      <td scope="row"></td>
                      <td scope="row"></td>
                      <td scope="row"></td>
                      <td scope="row"></td>
                    </tr>
                  </tbody>
                </table>
                <div className="custom-block bg-white">
                  <h5 className="mb-4">Cart</h5>
                  <div className="table-responsive">
                    <table
                      className="account-table table"
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">1</td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row">
                            <a href="">
                              <i className="bi bi-caret-left-fill"></i>
                            </a>
                            1
                            <a href="">
                              <i className="bi bi-caret-right-fill"></i>
                            </a>
                          </td>
                          <td scope="row"></td>
                        </tr>
                        <tr>
                          <td scope="row">2</td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row">
                            <a href="">
                              <i className="bi bi-caret-left-fill"></i>
                            </a>
                            1
                            <a href="">
                              <i className="bi bi-caret-right-fill"></i>
                            </a>
                          </td>
                          <td scope="row"></td>
                        </tr>
                        <tr>
                          <td scope="row">3</td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row"></td>
                          <td scope="row">
                            <a href="">
                              <i className="bi bi-caret-left-fill"></i>
                            </a>
                            1
                            <a href="">
                              <i className="bi bi-caret-right-fill"></i>
                            </a>
                          </td>
                          <td scope="row"></td>
                        </tr>
                        <tr>
                          <td scope="row" colSpan="6" style={{ textAlign: "right" }}>
                            Total
                          </td>
                          <td scope="row"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default ShopOrder;
