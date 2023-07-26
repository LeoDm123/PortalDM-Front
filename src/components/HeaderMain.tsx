import logo from "../assets/Isologo.png";

function HeaderMain() {
  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <div>
              <img className="logo" src={logo} alt="logo" />
            </div>

            <use />
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="#" className="nav-link px-2 link-secondary">
              Pedidos
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2">
              Cuentas de clientes
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2">
              Inventario
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2">
              Obras
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2">
              About
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default HeaderMain;
