// import React from 'react';
// import '../css/styles.admin.css';

// function ShopAdmin() {
//     return (
//       <div>
//         <header className="navbar sticky-top" style={{ alignItems: 'center' }}>
//           <a href="Admin.html">
//             <img style={{ width: '100px' }} src="images/logo EIPS.png" alt="" />
//           </a>
//           <a className="nav-link" href="Admin.html">
//             <i className="bi-wallet me-2"></i>
//             Event
//           </a>
//           <a className="nav-link" href="AccountAdmin.html">
//             <i className="bi bi-person-circle"></i>
//             Account
//           </a>
//           <a className="nav-link" href="setting.html">
//             <i className="bi-gear me-2"></i>
//             Setting
//           </a>
//           <a className="nav-link" href="#">
//             <i className="bi-box-arrow-left me-2"></i>
//             Logout
//           </a>
//           <div className="px-3">
//             <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//               <img src="images/medium-shot-happy-man-smiling.jpg" className="profile-image" alt="" />
//             </a>
//           </div>
//         </header>


//         <div className="container-fluid">
//           <div className="row">
//             <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
//               <div className="row my-4">
//                 <div className="col-lg-6 col-6">
//                   <div className="title-group mb-3" style={{ textAlign: 'center' }}>
//                     <h1 className="h2 mb-0">Name Shop</h1>
//                     <small className="text-muted"></small>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-6" style={{ paddingRight: '300px' }}>
//                   <form className="custom-form input-group mb-3" action="#" method="get" role="form">
//                     <input className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
//                     <button style={{ width: '100px' }} type="submit">
//                       Search
//                     </button>
//                   </form>
//                   <div>
//                     <a className="nav-link form-control mb-3" style={{ textAlign: 'center' }} href="CreateAccount.html">
//                       Create Account
//                     </a>
//                   </div>
//                   <div>
//                     <a className="nav-link form-control mb-3" style={{ textAlign: 'center' }} href="CreateAccount.html">
//                       Set Account Shop
//                     </a>
//                   </div>
//                 </div>
//               </div>
//               <div className="row my-4">
//                 <div className="custom-block bg-white">
//                   <h5 className="mb-4" style={{ textAlign: 'center' }}>Product</h5>

//                   <div className="table-responsive">
//                     <table className="account-table table" style={{ textAlign: 'center' }}>
//                       <thead>
//                         <tr>
//                           <th scope="col">ID</th>
//                           <th scope="col">Name</th>
//                           <th scope="col">Image</th>
//                           <th scope="col">Description</th>
//                           <th scope="col">Price</th>
//                           <th scope="col">Category</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td scope="row">1</td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td className="text-danger" scope="row">
//                             <span className="me-1">-</span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td scope="row">2</td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td className="text-success" scope="row">
//                             <span className="me-2"></span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td scope="row">3</td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td scope="row"></td>
//                           <td className="text-danger" scope="row">
//                             <span className="me-2"></span>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                   <li style={{ listStyle: 'none' }}>Total Revenue: 123</li>
//                 </div>
//               </div>
//               <div className="col-2">
//                 <a className="nav-link form-control mb-3" style={{ textAlign: 'center' }} href="EventAdmin.html">
//                   Previous
//                 </a>
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default ShopAdmin;


<div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content />
  <meta name="author" content />
  <title>ShopAdmin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
  <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700&display=swap" rel="stylesheet" />
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/bootstrap-icons.css" rel="stylesheet" />
  <link href="css/styles.admin.css" rel="stylesheet" />
  <header className="navbar sticky-top" style={{alignItems: 'center'}}>
    <a href="Admin.html">
      <img style={{width: 100}} src="images/logo EIPS.png" alt />
    </a>
    <a className="nav-link" href="Admin.html">
      <i className="bi-wallet me-2" />
      Event
    </a>
    <a className="nav-link" href="AccountAdmin.html">
      <i className="bi bi-person-circle" />
      Account
    </a>
    <a className="nav-link" href="setting.html">
      <i className="bi-gear me-2" />
      Setting
    </a>
    <a className="nav-link" href="#">
      <i className="bi-box-arrow-left me-2" />
      Logout
    </a>
    <div className="px-3">
      <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="images/medium-shot-happy-man-smiling.jpg" className="profile-image" alt />
      </a>
    </div>
  </header>
  <div className="container-fluid">
    <div className="row">
      <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
        <div className="row my-4">
          <div className="col-lg-6 col-6">
            <div className="title-group mb-3" style={{textAlign: 'center'}}>
              <h1 className="h2 mb-0">Name Shop</h1>
              <small className="text-muted" />
            </div>
          </div>
          <div className="col-lg-6 col-6" style={{paddingRight: 300}}>
            <form className="custom-form input-group mb-3" action="#" method="get" role="form">
              <input className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
              <button style={{width: 100}} type="submit">
                Search
              </button>
            </form>
            <div>
              <a className="nav-link form-control mb-3" style={{textAlign: 'center'}} href="CreateAccount.html">
                Create Account
              </a>
            </div>
          </div>
          <div className="row my-4">
            <div className="custom-block bg-white">
              <h5 className="mb-4" style={{textAlign: 'center'}}>Product</h5>
              <div className="table-responsive">
                <table className="account-table table" style={{textAlign: 'center'}}>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Catagory</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">1</td>
                      <td scope="row" />
                      <td scope="row" />
                      <td scope="row" />
                      <td scope="row" />
                      <td className="text-danger" scope="row">
                        <span className="me-1">-</span>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">2</td>
                      <td scope="row" />
                      <td scope="row" />
                      <td scope="row" />
                      <td scope="row" />
                      <td className="text-success" scope="row">
                        <span className="me-2" />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">3</td>
                      <td scope="row" />
                      <td scope="row" />
                      <td scope="row" />
                      <td scope="row" />
                      <td className="text-danger" scope="row">
                        <span className="me-2" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <li style={{listStyle: 'none'}}>Total Revenue: 123</li>
            </div>
          </div>
          <div className="col-2">
            <a className="nav-link form-control mb-3" style={{textAlign: 'center'}} href="EventAdmin.html">
              Previous
            </a>
          </div>
        </div></main>
    </div>
  </div>
</div>
