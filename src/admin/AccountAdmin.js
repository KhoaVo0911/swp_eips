import React, { useEffect, useState } from 'react';
import '../css/styles.admin.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { PostShopAccountAsyncApi, PutAccountAsyncApi, accountAction, getAccountAsyncApi, getShopAccountAsyncApi } from '../services/account/accountSlice';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import EditAttributesOutlinedIcon from '@mui/icons-material/EditAttributesOutlined';
import { CardAction } from '../services/card/cardSlice';
import { EventAction } from '../services/event/eventSlice';
import { ProductAction } from '../services/product/productSlice';
import { ShopAction } from '../services/shop/shopSlice';



function AccountAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const { AccountList, AccountShopList } = useSelector((state) => state.acc)
  useEffect(() => {
    dispatch(getAccountAsyncApi()).then((response) => {
      if (response.payload != undefined) {
        setFilteredData(response.payload)
      }
    }).catch((error) => {
      // Handle failure case
    });
    dispatch(getShopAccountAsyncApi()).then((response) => {
      if (response.payload != undefined) {
      }
    }).catch((error) => {
      // Handle failure case
    });
    return () => {
      dispatch(accountAction.clearAccount())
      dispatch(CardAction.clearCard())
      dispatch(EventAction.clearEvent())
      dispatch(ProductAction.clearProduct())
      dispatch(ShopAction.clearShop())
    }
  }, []);
  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  console.log("hahaha", AccountList)

  function filterData(query) {
    const filteredResults = AccountList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleUpdateStatus = (item) => {
    let body
    body = {
      username: item.username,
      shopId: item.shopId,
      status: !item.status
    }
    dispatch(PostShopAccountAsyncApi(body)).then((response) => {
      if (response.payload != undefined) {
        dispatch(getShopAccountAsyncApi()).then((response) => {
          if (response.payload != undefined) {
          }
        }).catch((error) => {
          // Handle failure case
        });
      }
    }).catch((error) => {
      // Handle failure case
    });
  };
  const handleEdit = (index) => {
    if (editingIndex == -1) {
      setEditingIndex(index);
    }
  };

  const handleUpdate = (index) => {
    setEditingIndex(-1);
    dispatch(PutAccountAsyncApi(filteredData[index])).then((response) => {
      if (response.payload != undefined) {
        dispatch(getAccountAsyncApi()).then((response) => {
          if (response.payload != undefined) {
            setFilteredData(response.payload)
          }
        }).catch((error) => {
          // Handle failure case
        });
      }
    }).catch((error) => {
      // Handle failure case
    });
  };
  const handleChange = (e, index, field) => {
    const updatedData = [...filteredData];
    updatedData[index] = { ...updatedData[index] }; // Tạo bản sao của đối tượng dữ liệu
    updatedData[index][field] = e.target.value;
    setFilteredData(updatedData);
  };
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <div className="title-group mb-3" style={{ textAlign: 'center' }}>
                  <h1 className="h2 mb-0">Account Manager</h1>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <form className="custom-form input-group mb-3" action="#" method="get" role="form">
                  <input onChange={handleSearchInputChange} value={searchQuery} className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
                  <button style={{ width: '100px', marginRight: '130px' }} type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>

            <div className="row my-4 bg-white p-5 h-full">
              <div className="col-lg-6 col-6">
                <table className="account-table table" style={{ textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>
                            {item.username}
                          </th>
                          <th>
                            {editingIndex === index ? (
                              <input
                                className="form-control"
                                type="password"
                                value={item.password}
                                onChange={(e) => handleChange(e, index, 'password')}
                              />
                            ) : (
                              item.password
                            )}
                          </th>
                          <th>
                            {editingIndex === index ? (
                              <input
                                className="form-control"
                                type="text"
                                value={item.name}
                                onChange={(e) => handleChange(e, index, 'name')}
                              />
                            ) : (
                              item.name
                            )}
                          </th>
                          <th>
                            {item.role}
                          </th>
                          <th>
                            {editingIndex === index ? (
                              <DoneIcon
                                onClick={() => handleUpdate(index)}
                                className="cursor-pointer"
                              />
                            ) : (
                              <EditIcon
                                onClick={() => handleEdit(index)}
                                className="cursor-pointer"
                              />
                            )}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="col-lg-6 col-6">
                <table className="account-table table" style={{ textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">ShopID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AccountShopList.map((item, index) => {
                      return (
                        <tr key={index} style={{}}>
                          <th scope="col">{item.username}</th>
                          <th scope="col">{item.shopId}</th>
                          <th scope="col">{item.status == true ? <button className='border-2 cursor-none bg-blue-400 px-3 py-1 -mt-2'>True</button>
                            : <button className='border-2 cursor-none bg-yellow-400 px-3 py-2'>False</button>}</th>
                          <th scope="col" onClick={() => handleUpdateStatus(item)} ><EditIcon className='cursor-pointer' /></th>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountAdmin;
