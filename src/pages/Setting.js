import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PutAccountAsyncApi, accountAction } from '../services/account/accountSlice';
import Navbar from '../product/Navbar';
import { ShopAction, getShopByUsernameAsyncApi } from '../services/shop/shopSlice';
import { EventAction, getEventByShopAsyncApi } from '../services/event/eventSlice';
import { CardAction } from '../services/card/cardSlice';
import { ProductAction } from '../services/product/productSlice';
import { Button } from '@mui/material';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from '../config/FireBaseConfig';


function parseTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  return formattedDate;
}

export default function Settings() {
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const [img, setImg] = useState("");
  const [click, SetClick] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState([]);
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
    const storageRef = ref(storage, `Package/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setImg(downloadURL)
          dispatch(PutAccountAsyncApi({ username: userObject.username, role: userObject.role, image: downloadURL, password: password, name: name, status: true })).then((response) => {
            if (response.payload != undefined) {
              localStorage.clear();
              localStorage.setItem('user', JSON.stringify(response.payload));
              window.location.reload();
            }
          }).catch((error) => {
            // Handle failure case
          });
        });
      }
    );
  }
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
                <div className='grid grid-cols-4'>
                  <div className="flex items-center justify-end">
                    <img src={eventByShop.img} className="h-48 w-48" />
                  </div>
                  <div>
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
                  </div>
                </div>

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
                <div className="grid grid-cols-4">
                  <div className="flex items-center justify-end">
                    <img src={userObject.image} className="h-48 w-48" />
                  </div>
                  <div className='mt-5'>
                    <p className="">
                      <strong>Name:</strong>
                      <span>{userObject.name}</span>
                    </p>
                    <p className="">
                      <strong>Username:</strong>
                      <span >
                        {userObject.username}
                      </span>
                    </p>
                    <p className="">
                      <strong>Role:</strong>
                      <span >
                        {userObject.role}
                      </span>
                    </p>
                  </div>
                </div>
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
                  <Button
                    variant="contained"
                    component="label"
                  >
                    New Avatar
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                        SetClick(true);
                      }}
                    />
                  </Button>
                  <div className='max-w-5xl my-5 mx-auto'>
                    {selectedImage == undefined ? <div></div> : <img alt="" className='mx-auto h-48 w-48 my-2' src={click == false ? selectedImage : window.URL.createObjectURL(selectedImage)} />}
                  </div>
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
