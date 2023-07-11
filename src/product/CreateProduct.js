import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";
import "../css/bootstrap.min.css";
import "../css/bootstrap-icons.css";
import axios from "axios";

function CreateProduct() {
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

  console.log(products);

  const [product, setProduct] = useState({
    id: "",
    Name: "",
    Image: "",
    Description: "",
    Price: "",
    Category: "",
  });

  const handleChange = (event, field) => {
    const { value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://647097ab3de51400f72493f6.mockapi.io/product",
        product
      );
      console.log("Product created successfully!");
      // Reset form fields after successful submission
      setProduct({
        id: "",
        Name: "",
        Image: "",
        Description: "",
        Price: "",
        Category: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="navbar sticky-top" style={{ alignItems: "center" }}>
        <Link to="Order.html">
          <img style={{ width: "100px" }} src="images/logo EIPS.png" alt="" />
        </Link>
        <Link className="nav-link" to="/shoporder">
          <i className="bi-wallet me-2"></i>
          Shop Order
        </Link>
        <Link className="nav-link" to="/product">
          <i className="bi-wallet me-2"></i>
          Product
        </Link>
        <Link className="nav-link" to="/setting">
          <i className="bi-gear me-2"></i>
          Settings
        </Link>
        <Link className="nav-link" to="#">
          <i className="bi-box-arrow-left me-2"></i>
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

      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h1 className="h2 mb-0">CREATE PRODUCT</h1>
              <small className="text-muted"></small>
            </div>
            <div className="row my-4">
              <div className="col-lg-6 col-6">
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
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.map((products) => (
                            <tr key={products.id}>
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
                              <td className="text-danger" itemScope="row">
                                {products.Category}
                                <span className="me-1"></span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-6" style={{ paddingTop: "60px" }}>
                <form onSubmit={handleSubmit}>
                  <table className="account-table table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <th scope="row">1</th>
                        <td scope="row">
                          <input
                            className="form-control"
                            type="text"
                            name="Name"
                            value={product.Name}
                            onChange={(event) => handleChange(event, "Name")}
                          />
                        </td>
                        <td scope="row">
                          <input
                            className="form-control"
                            type="text"
                            name="Image"
                            value={product.Image}
                            onChange={(event) => handleChange(event, "Image")}
                          />
                        </td>
                        <td scope="row">
                          <input
                            className="form-control"
                            type="text"
                            name="Description"
                            value={product.Description}
                            onChange={(event) =>
                              handleChange(event, "Description")
                            }
                          />
                        </td>
                        <td scope="row">
                          <input
                            className="form-control"
                            type="text"
                            name="Price"
                            value={product.Price}
                            onChange={(event) => handleChange(event, "Price")}
                          />
                        </td>
                        <td scope="row">
                          <input
                            className="form-control"
                            type="text"
                            name="Category"
                            value={product.Category}
                            onChange={(event) =>
                              handleChange(event, "Category")
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-2" style={{position: "absolute", right: 0, width: "5%", transform: "translate(-25px, -1px ) "}}>
                    <button
                      className="nav-link form-control mb-3"
                      style={{ textAlign: "center" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
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

export default CreateProduct;
