import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";
import "../css/bootstrap.min.css";
import "../css/bootstrap-icons.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import Toggle from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel'
import { Switch } from "@mui/material";


const ComboProduct = () => {
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    Name: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://647097ab3de51400f72493f6.mockapi.io/product"
      );
      setProducts(response); // Update to response.data
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const handleAddProduct = (id, Name) => {
    const newAddedProduct = {
      id,
      Name,
      quantity: 1,
      Status: "Không bán",
    };
    setAddedProducts((prevProducts) => [...prevProducts, newAddedProduct]);
  };

  const handleDeleteProduct = (index) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  };

  // const handleProductChange = (event, index) => {
  //   const { name, value } = event.target; // Change Name to name (lowercase)
  //   setAddedProducts((prevProducts) => {
  //     const updatedProducts = [...prevProducts];
  //     updatedProducts[index][name] = value;
  //     return updatedProducts;
  //   });
  // };

  const handleProductChange = (event, index) => {
    const { name, value } = event.target;
    setAddedProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      if (name === "Status") {
        updatedProducts[index][name] = value ? "Đang bán" : "Không bán";
      } else {
        updatedProducts[index][name] = value;
      }
      return updatedProducts;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProductData = {
      Name: newProduct.Name,
      Image: newProduct.Image,
      Description: newProduct.Description,
      Price: newProduct.Price,
      Category: "COMBO",
    };

    try {
      const response = await axios.post(
        "https://647097ab3de51400f72493f6.mockapi.io/product",
        newProductData
      );
      const createProduct = response.data;
      setProducts((prevProducts) => [...prevProducts, createProduct]);

      setNewProduct({
        id: "",
        Name: "",
        quantity: 1,
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

      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h1 className="h2 mb-0">COMBO PRODUCT</h1>
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
                    placeholder="Search Name"
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
                          <th scope="col">No</th>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
                          <th scope="col">Catagory</th>
                          <th scope="col">Status</th>
                          <th scope="col">Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.id}</td>
                            <td>{product.Name}</td>
                            <td>
                              <img src={product.Image} alt={product.Name} />
                            </td>
                            <td>{product.Description}</td>
                            <td>{product.Price}</td>
                            <td>{product.Category}</td>
                            <td>
                              <FormControlLabel
                              control={
                                <Switch 
                                checked={product.Status === "Đang bán"}
                                onClick={(isChecked) => {
                                  const Status = isChecked
                                    ? "Đang bán"
                                    : "Không bán";
                                  handleProductChange(
                                    {
                                      target: { name: "Status", value: Status },
                                    },
                                    index
                                  );
                                }}

                                />
                              }
                              />
                            </td>
                            <td>
                              <button
                                className="form-control"
                                onClick={() =>
                                  handleAddProduct(product.id, product.Name)
                                }
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-6" style={{ paddingTop: "145px" }}>
                <div className="custom-block bg-white">
                  <h5 className="mb-4">COMBO</h5>
                  <form onSubmit={handleSubmit}>
                    <table
                      className="account-table table"
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
                          <th scope="col">Catagory</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ textAlign: "center" }}>
                          <td scope="row">
                            <input
                              className="form-control"
                              type="text"
                              name="Name"
                              value={newProduct.Name}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  Name: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td scope="row">
                            <input
                              className="form-control"
                              type="text"
                              name="Image"
                              value={newProduct.Image}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  Image: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td scope="row">
                            <input
                              className="form-control"
                              type="text"
                              name="Description"
                              value={newProduct.Description}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  Description: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td scope="row">
                            <input
                              className="form-control"
                              type="text"
                              name="Price"
                              value={newProduct.Price}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  Price: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td scope="row">
                            <input
                              className="form-control"
                              name="Category"
                              value="COMBO"
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      className="account-table table"
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">ID Make</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addedProducts.map((product, index) => (
                          <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.Name}</td>
                            <td>
                              <ArrowLeftIcon
                                onClick={() => {
                                  const newQuantity = product.quantity - 1;
                                  if (newQuantity >= 0) {
                                    handleProductChange(
                                      {
                                        target: {
                                          name: "quantity",
                                          value: newQuantity,
                                        },
                                      },
                                      index
                                    );
                                  }
                                }}
                              >
                                -
                              </ArrowLeftIcon>
                              {product.quantity}
                              <ArrowRightIcon
                                onClick={() =>
                                  handleProductChange(
                                    {
                                      target: {
                                        name: "quantity",
                                        value: product.quantity + 1,
                                      },
                                    },
                                    index
                                  )
                                }
                              >
                                +
                              </ArrowRightIcon>
                            </td>
                            <td>
                              <DeleteForeverIcon
                                onClick={() => handleDeleteProduct(index)}
                              >
                                Delete
                              </DeleteForeverIcon>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div
                      className="col-2"
                      style={{
                        position: "absolute",
                        right: 0,
                        width: "5%",
                        transform: "translate(-25px, -1px ) ",
                      }}
                    >
                      <button
                        className="nav-link form-control mb-3"
                        style={{
                          position: "absolute",
                          right: 0,
                          width: "140%",
                          transform: "translate(-10px, -1px )",
                          textAlign: "center",
                        }}
                        to=""
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ComboProduct;
