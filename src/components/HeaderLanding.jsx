import logo from "../assets/Isologo.png";

function HeaderLanding() {
  return (
    <div className="container-fluid headerBg">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-2 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <div>
            <a href="/Register">
              <img className="logo" src={logo} alt="logo" />
            </a>
          </div>

          <use />
        </div>
      </header>
    </div>
  );
}

export default HeaderLanding;
