import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PutAccountAsyncApi, accountAction } from '../services/account/accountSlice';
import Navbar from '../product/Navbar';
import { ShopAction, getShopByUsernameAsyncApi } from '../services/shop/shopSlice';
import { EventAction, getEventByShopAsyncApi } from '../services/event/eventSlice';
import { CardAction } from '../services/card/cardSlice';
import { ProductAction } from '../services/product/productSlice';
import { Button } from '@mui/material';
function parseTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  return formattedDate;
}

export default function Settings() {
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { shopByUsername } = useSelector((state) => state.shop)
  const { eventByShop } = useSelector((state) => state.event)
  useEffect(() => {
    dispatch(getShopByUsernameAsyncApi(userObject.username)).then((response) => {
      if (response.payload != undefined) {
        dispatch(getEventByShopAsyncApi(response.payload.id)).then((response) => {
          if (response.payload != undefined) {

          }
        }).catch((error) => {
        });
      }
    }).catch((error) => {
    });
    return () => {
      dispatch(accountAction.clearAccount())
      dispatch(CardAction.clearCard())
      dispatch(EventAction.clearEvent())
      dispatch(ProductAction.clearProduct())
      dispatch(ShopAction.clearShop())
    }

  }, []);

  const handleUpdateChange = () => {
    dispatch(PutAccountAsyncApi({ username: userObject.username, password: password, name: name, status: true })).then((response) => {
      if (response.payload != undefined) {
        //localStorage.clear();

      }
    }).catch((error) => {
      // Handle failure case
    });


  };
  const handleResetChange = () => {
    setName('');
    setPassword('');
  };

  return (
    <div>
      <Navbar />
      <main className="main-wrapper">
        <main style={{ textAlign: 'center' }}>
          <div className="title-group mb-3 ">
            <h1 className="h2 py-4" style={{ textAlign: 'center' }}>Profile</h1>
          </div>
          <div className="row">
            <div className="col-lg-9 col-9" style={{ margin: 'auto' }}>

              <div className="custom-block custom-block-profile bg-white">
                <h6 className="mb-4">Event Information</h6>
                <img src={eventByShop.img} className='w-32 h-32' alt="img" />
                <p className="d-flex flex-wrap mb-2">
                  <strong>Username</strong>
                  <span>{eventByShop.username}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Name</strong>
                  <span>{eventByShop.name}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Area</strong>
                  <span>{eventByShop.area}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Begin Date</strong>
                  <span>{eventByShop.beginDate && parseTimestamp(eventByShop.beginDate)}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>End Date</strong>
                  <span>{eventByShop.beginDate && parseTimestamp(eventByShop.endDate)}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>description</strong>
                  <span>{eventByShop.description}</span>
                </p>
                {/* <p className="d-flex flex-wrap mb-2">
                  <strong>Sales Revenue:</strong>
                  <span>Personal</span>
                </p> */}
              </div>
              <div className="custom-block custom-block-profile bg-white">
                <h6 className="mb-4">Shop Information</h6>
                <p className="d-flex flex-wrap mb-2">
                  <strong>ID Shop</strong>
                  <span>{shopByUsername.id}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Name</strong>
                  <span>{shopByUsername.name}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Area</strong>
                  <span>{shopByUsername.area}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>description</strong>
                  <span>{shopByUsername.des}</span>
                </p>
                {/* <p className="d-flex flex-wrap mb-2">
                  <strong>Sales Revenue:</strong>
                  <span>Personal</span>
                </p> */}
              </div>
              <div className="custom-block custom-block-profile bg-white">
                <h6 className="mb-4">Account Information</h6>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Name:</strong>
                  <span>{userObject.name}</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Username:</strong>
                  <span >
                    {userObject.username}
                  </span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Role:</strong>
                  <span >
                    {userObject.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </main>
        <div className="title-group mb-3">
          <h1 className="h2" style={{ textAlign: 'center' }}>Settings</h1>
        </div>
        <div className="row">
          <div className="col-lg-9 col-9 " style={{ margin: 'auto' }}>
            <div className="custom-block bg-white">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                  <h6 className="mb-4">User Profile</h6>
                  <input className="form-control mt-4" name="profile-email" id="profile-email" disabled placeholder={userObject.username} />
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mt-4" type="password" name="profile-email" id="profile-email" placeholder="New Password" />
                  <input value={name} onChange={(e) => setName(e.target.value)} className="form-control mt-4" type="text" name="profile-name" id="profile-name" placeholder="New Name" />

                  <div className="d-flex mt-4">
                    <Button variant='contained' color='inherit' onClick={handleResetChange} className="form-control me-3">
                      Reset
                    </Button>
                    <Button variant='contained' color='primary' disabled={name == '' || password == '' ? true : false} onClick={handleUpdateChange} className=" w-full rounded-md bg-blue-400">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main></div>
  )
}
