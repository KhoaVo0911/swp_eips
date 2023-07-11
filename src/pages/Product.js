import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router if using it
import "../css/styles.css";
import "../css/bootstrap.min.css";
import "../css/bootstrap-icons.css";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);

  
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://647097ab3de51400f72493f6.mockapi.io/product"
        );
        setProducts(response);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    fetchProducts();
  }, [products]);
  console.log(products)

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
  event.preventDefault();
  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setSearchResults(filteredProducts);
  setSearchTerm("");
};

  return (
    <div>
      <header className="navbar sticky-top" style={{ alignItems: "center" }}>
        <Link to="Order.html">
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
          <a
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="images/medium-shot-happy-man-smiling.jpg"
              className="profile-image"
              alt=""
            />
          </a>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h1 className="h2 mb-0">UPDATE PRODUCT</h1>
              <small className="text-muted" />
            </div>
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <form
                  className="custom-form input-group mb-3"
                  action="#"
                  method="get"
                  role="form"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search Product"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                          <th scope="col">No</th>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
                          <th scope="col">Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(searchResults.length > 0 ? searchResults : products).map((products) => (
                            <tr key={products.id}>
                              <td itemScope="row">No</td>
                              <td itemScope="row">{products.id}</td>
                              <td itemScope="row">{products.Name}</td>
                              <td itemScope="row">
                                <img
                                  src={products.Image}
                                  alt={products.Name}
                                ></img>
                              </td>
                              <td itemScope="row">{products.Description}</td>
                              <td itemScope="row">{products.Price}</td>
                              <td className="text-danger" itemScope="row">{products.Category}
                                <span className="me-1">-</span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <Link
                className="nav-link form-control mb-3"
                style={{ textAlign: "center" }}
                to="/createproduct"
              >
                Create Product
              </Link>
              <Link
                className="nav-link form-control"
                style={{ textAlign: "center" }}
                to="/comboproduct"
              >
                Combo Product
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Product;
