<div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content />
  <meta name="author" content />
  <title>Settings</title>
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
  <main className="main-wrapper">
    <main style={{textAlign: 'center'}}>
      <div className="title-group mb-3 ">
        <h1 className="h2 py-4" style={{textAlign: 'center'}}>Profile</h1>
      </div>
      <div className="row">
        <div className="col-lg-9 col-9" style={{margin: 'auto'}}>
          <div className="custom-block custom-block-profile">
            <div className="row">
              <div className="col-lg-12 col-12 mb-3">
                <h6>General</h6>
              </div>
              <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                <div className="custom-block-profile-image-wrap">
                  <img src="images/medium-shot-happy-man-smiling.jpg" className="custom-block-profile-image img-fluid" alt />
                  <a href="setting.html" className="bi-pencil-square custom-block-edit-icon" />
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <p className="d-flex flex-wrap mb-2">
                  <strong>Name:</strong>
                  <span>Hao Phan</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Email:</strong>
                  <a href="#">
                    hphann.205@gmail.com
                  </a>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>Phone:</strong>
                  <a href="#">
                    0354019580
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="custom-block custom-block-profile bg-white">
            <h6 className="mb-4">Shop Information</h6>
            <p className="d-flex flex-wrap mb-2">
              <strong>ID Shop</strong>
              <span>1</span>
            </p>
            <p className="d-flex flex-wrap mb-2">
              <strong>Sales Revenue:</strong>
              <span>Personal</span>
            </p>
          </div>
        </div>
      </div>
    </main>
    <div className="title-group mb-3">
      <h1 className="h2" style={{textAlign: 'center'}}>Settings</h1>
    </div>
    <div className="row">
      <div className="col-lg-9 col-9" style={{margin: 'auto'}}>
        <div className="custom-block bg-white">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true">Profile</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification-tab-pane" type="button" role="tab" aria-controls="notification-tab-pane" aria-selected="false">Notification</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
              <h6 className="mb-4">User Profile</h6>
              <form className="custom-form profile-form" action="#" method="post" role="form">
                <input className="form-control" type="text" name="profile-name" id="profile-name" placeholder="Hao Phan" />
                <input className="form-control" type="email" name="profile-email" id="profile-email" placeholder="Hphann.205@gmail.com" />
                <div className="input-group mb-1">
                  <img src="images/profile/senior-man-white-sweater-eyeglasses.jpg" className="profile-image img-fluid" alt />
                  <input type="file" className="form-control" id="inputGroupFile02" />
                </div>
                <div className="d-flex">
                  <button type="button" className="form-control me-3">
                    Reset
                  </button>
                  <button type="submit" className="form-control ms-2">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>