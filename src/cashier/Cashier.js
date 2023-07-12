<div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content />
  <meta name="author" content />
  <title>Thu ngan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700&display=swap"
    rel="stylesheet"
  />
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/bootstrap-icons.css" rel="stylesheet" />
  <link href="css/styles.css" rel="stylesheet" />
  <header className="navbar sticky-top" style={{ alignItems: "center" }}>
    <a href="Cashier.html">
      <img style={{ width: 100 }} src="images/logo EIPS.png" alt />
    </a>
    <a className="nav-link" href="Cashier.html">
      <i className="bi-wallet me-2" />
      Cashier
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
        <img
          src="images/medium-shot-happy-man-smiling.jpg"
          className="profile-image"
          alt
        />
      </a>
    </div>
  </header>
  <div className="container-fluid">
    <div className="row">
      <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
        <div className="row my-4">
          <div className="col-lg-6 col-6">
            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h1 className="h2 mb-0">Hello Cashier</h1>
            </div>
          </div>
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
                placeholder="Search"
                aria-label="Search"
              />
              <button style={{ width: 100 }} type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="custom-block bg-white">
            <h5 className="mb-4" style={{ textAlign: "center" }}>
              Event List
            </h5>
            <div className="table-responsive">
              <table
                className="account-table table"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th scope="col">CardID</th>
                    <th scope="col">EventID</th>
                    <th scope="col">Name</th>
                    <th scope="col">PhoneNumber</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row">
                      <a
                        className="nav-link form-control mb-3"
                        style={{ textAlign: "center" }}
                        href
                      >
                        Update
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row">
                      <a
                        className="nav-link form-control mb-3"
                        style={{ textAlign: "center" }}
                        href
                      >
                        Update
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row" />
                    <td scope="row">
                      <a
                        className="nav-link form-control mb-3"
                        style={{ textAlign: "center" }}
                        href
                      >
                        Update
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-3">
          Deposit
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
              placeholder="Deposit"
              aria-label="Search"
            />
            <button style={{ width: 100 }} type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col-3">
          Withdraw
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
              placeholder="Withdraw"
              aria-label="Search"
            />
            <button style={{ width: 100 }} type="submit">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</div>;
