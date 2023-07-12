<div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content />
  <meta name="author" content />
  <title>Admin</title>
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
              <h1 className="h2 mb-0">Event Admin</h1>
              <small className="text-muted">Hello !!!</small>
            </div>
          </div>
          <div className="col-lg-6 col-6">
            <form className="custom-form input-group mb-3" action="#" method="get" role="form">
              <input className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
              <button style={{width: 100}} type="submit">
                Search
              </button>
            </form>
            <div>
              <a className="nav-link form-control mb-3" style={{textAlign: 'center'}} href="CreateEventAdmin.html">
                Create Event
              </a>
            </div>
          </div>
          <div className="custom-block bg-white">
            <h5 className="mb-4" style={{textAlign: 'center'}}>Event List</h5>
            <section className="slider-event-one">
              <div className="container">
                <div className="slider-event-one-content">
                  <div className="slider-event-one-content-items">
                    <div className="slider-event-one-content-item">
                      <a href="EventAdmin.html">
                        <img src="images/profile/senior-man-white-sweater-eyeglasses.jpg" alt /></a>
                      <div className="slider-event-one-content-item-text" href="EventAdmin.html">
                        <li>Status: </li>
                        <li>ID: </li>
                        <li>First Step</li>
                        <li>Description</li>
                        <li>Begin Date: </li>
                        <li>End Date: </li>
                        <li>Viet Nam</li>
                      </div>
                    </div>
                    <div className="slider-event-one-content-item">
                      <a href="EventAdmin.html">
                        <img src="images/profile/senior-man-white-sweater-eyeglasses.jpg" alt /></a>
                      <div className="slider-event-one-content-item-text" href="EventAdmin.html">
                        <li>Status: </li>
                        <li>ID: </li>
                        <li>First Step</li>
                        <li>Description</li>
                        <li>Begin Date: </li>
                        <li>End Date: </li>
                        <li>Viet Nam</li>
                      </div>
                    </div>
                    <div className="slider-event-one-content-item">
                      <a href="EventAdmin.html">
                        <img src="images/profile/senior-man-white-sweater-eyeglasses.jpg" alt /></a>
                      <div className="slider-event-one-content-item-text" href="EventAdmin.html">
                        <li>Status: </li>
                        <li>ID: </li>
                        <li>First Step</li>
                        <li>Description</li>
                        <li>Begin Date: </li>
                        <li>End Date: </li>
                        <li>Viet Nam</li>
                      </div>
                    </div>
                    <div className="slider-event-one-content-item">
                      <a href="EventAdmin.html">
                        <img src="images/profile/senior-man-white-sweater-eyeglasses.jpg" alt /></a>
                      <div className="slider-event-one-content-item-text" href="EventAdmin.html">
                        <li>Status: </li>
                        <li>ID: </li>
                        <li>First Step</li>
                        <li>Description</li>
                        <li>Begin Date: </li>
                        <li>End Date: </li>
                        <li>Viet Nam</li>
                      </div>
                    </div>
                    <div className="slider-event-one-content-item">
                      <a href="EventAdmin.html">
                        <img src="images/profile/senior-man-white-sweater-eyeglasses.jpg" alt /></a>
                      <div className="slider-event-one-content-item-text" href="EventAdmin.html">
                        <li>Status: </li>
                        <li>ID: </li>
                        <li>First Step</li>
                        <li>Description</li>
                        <li>Begin Date: </li>
                        <li>End Date: </li>
                        <li>Viet Nam</li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
