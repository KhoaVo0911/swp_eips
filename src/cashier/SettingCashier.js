import React, { useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { PutAccountAsyncApi } from '../services/account/accountSlice';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { PostSearchCardAsyncApi, PutCardAsyncApi, PutDepositAsyncApi, PutWithdrawAsyncApi } from '../services/card/cardSlice';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SouthIcon from '@mui/icons-material/South';
import DoneIcon from '@mui/icons-material/Done';

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

export default function SettingCashier() {
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [balance, setBalance] = useState('');
  const [money, setMoney] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { SearchCardList } = useSelector((state) => state.card);
  const handleChangeSearch = (item) => {
    setSearch(item)
    dispatch(PostSearchCardAsyncApi({ id: item })).then((response) => {
      if (response.payload != undefined) {
        setUsername(response.payload.username)
        setPhone(response.payload.phoneNumber)
        setBalance(response.payload.balance)
      }
    }).catch((error) => {
    });
  }
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
  const handleOpenUpdateCardChange = () => {
    setIsUpdate(true)
    setDeposit(0)
    setMoney('')
  };
  const handleUpdateCardChange = () => {
    dispatch(PutCardAsyncApi({
      id: SearchCardList.id,
      balance: balance,
      username: username,
      phoneNumber: phone,
      status: false,
    }))
    setIsUpdate(false)
  };
  const handleDeposit = () => {
    dispatch(PutDepositAsyncApi({
      id: SearchCardList.id,
      balance: money,
    })).then((response) => {
      setMoney('')
      setDeposit(0)
      if (response.payload != undefined) {
        dispatch(PostSearchCardAsyncApi({ id: search })).then((response) => {
          if (response.payload != undefined) {
            setUsername(response.payload.username)
            setPhone(response.payload.phoneNumber)
            setBalance(response.payload.balance)
          }
        }).catch((error) => {
        });
      }
    }).catch((error) => {
    });

  };
  const handleWithdraw = () => {
    dispatch(PutWithdrawAsyncApi({
      id: SearchCardList.id,
      balance: money,
    })).then((response) => {
      setMoney('')
      setDeposit(0)
      if (response.payload != undefined) {
        dispatch(PostSearchCardAsyncApi({ id: search })).then((response) => {
          if (response.payload != undefined) {
            setUsername(response.payload.username)
            setPhone(response.payload.phoneNumber)
            setBalance(response.payload.balance)
          }
        }).catch((error) => {
        });
      }
    }).catch((error) => {
    });
  };
  const handleDepositOpen = () => {
    if (isUpdate == false) {
      setDeposit(1)
    }
  }
  const handleWithDrawOpen = () => {
    if (isUpdate == false) {
      setDeposit(2)
    }
  }
  return (
    <div>
      <Navbar />
      <main className="main-wrapper">
        <div className="row">
          <div className="col-lg-9 col-9 mt-5 " style={{ margin: 'auto' }}>
            <div className="custom-block bg-white">
              <div className="tab-content" id="myTabContent">
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    value={search}
                    onChange={(e) => handleChangeSearch(e.target.value)}
                  />
                  <IconButton className='' sx={{ p: '10px', outline: "none" }} >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <table
                  className="account-table table mt-2"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">EventId</th>
                      <th scope="col">Username</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className='pt-4 text-xl'>{SearchCardList.eventId}</th>
                      <th className='pt-4 text-xl'>
                        {isUpdate == false ? username
                          : <input className="form-control" value={username}
                            onChange={(e) => setUsername(e.target.value)} />}
                      </th>
                      <th className='pt-4 text-xl'>
                        {isUpdate == false ? phone
                          : <input className="form-control" value={phone}
                            onChange={(e) => setPhone(e.target.value)} />}
                      </th>
                      <th className='pt-4 text-xl'>
                        {isUpdate == false ? parseToVND(balance)
                          : <input className="form-control" value={balance}
                            onChange={(e) => setBalance(e.target.value)} />}
                      </th>
                      <th className='pt-4 text-xl'>{SearchCardList.status == true ? "true" : SearchCardList.status == false ? "false" : null}</th>

                      <th component="div" className='pt-4 text-xl'>
                        {SearchCardList.id &&
                          <div className='flex justify-center '>
                            <div></div>
                            <div>
                              {isUpdate == false ?
                                <Tooltip onClick={handleOpenUpdateCardChange} title="Edit" className='h-10 w-10'>
                                  <IconButton  >
                                    <EditIcon className="" />
                                  </IconButton>
                                </Tooltip> : <Tooltip onClick={handleUpdateCardChange} title="Done" className='h-10 w-10'>
                                  <IconButton  >
                                    <DoneIcon className="" />
                                  </IconButton>
                                </Tooltip>}
                              {deposit == 1 ?
                                <Tooltip onClick={handleDeposit} title="Done" className='h-10 w-10'>
                                  <IconButton  >
                                    <DoneIcon className="" />
                                  </IconButton>
                                </Tooltip> : <Tooltip onClick={handleDepositOpen} handle title="Deposit" className='h-10 w-10'>
                                  <IconButton >
                                    <LocalAtmIcon className="" />
                                  </IconButton>
                                </Tooltip>}
                              {deposit == 2 ?
                                <Tooltip onClick={handleWithdraw} title="Done" className='h-10 w-10'>
                                  <IconButton  >
                                    <DoneIcon className="" />
                                  </IconButton>
                                </Tooltip> : <Tooltip onClick={handleWithDrawOpen} title="Withdraw" className='h-10 w-10'>
                                  <IconButton >
                                    <SouthIcon className="" />
                                  </IconButton>
                                </Tooltip>}

                            </div>
                            <div></div>

                          </div>
                        }
                      </th>
                    </tr>
                  </tbody>
                </table>
                {deposit != 0 &&
                  <div>
                    <h6>Money Deposit</h6>
                    <div className='w-48'>
                      <input value={money} onChange={(e) => setMoney(e.target.value)} className="form-control" placeholder='Money...' />
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <main style={{ textAlign: 'center' }}>
          <div className="title-group mb-3 ">
            <h1 className="h2 py-4" style={{ textAlign: 'center' }}>Profile</h1>
          </div>
          <div className="row">
            <div className="col-lg-9 col-9" style={{ margin: 'auto' }}>
              <div className="custom-block custom-block-profile">
                <div className="row">
                  <div className="col-lg-12 col-12 mb-3">
                    <h6>General</h6>
                  </div>

                  <div className="col-lg-9 col-12">
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
                    <button onClick={handleResetChange} className="form-control me-3">
                      Reset
                    </button>
                    <button onClick={handleUpdateChange} className=" w-full rounded-md bg-blue-400">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main></div>
  )
}

