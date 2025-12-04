import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';



function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, cantidadTotal } = useCartContext();
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    navigate("/productos");


    // Tiempo 1'' para asegurar la navegación
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Ecommer-LPG</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <li><Link to="/"> Inicio   </Link></li>
              </li>
              <li class="nav-item">
                <Link to="/servicios">Preguntas Frecuentes</Link>
              </li>
              <li class="nav-item">
                <Link to="/categoria">Categoria</Link>
              </li>

              <li >
                <Link to="#" className="carrito-link">
                  🛒 ({cantidadTotal})
                </Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <><div class="container">
                    <div class="row">
                      <div class="col">
                        <span>Hola, {usuario.nombre}</span>
                        <div class="col">
                          {/*ENLACE PARA ADMIN - Solo visible para admin*/}
                          {usuario?.nombre === "admin" && (
                            <li>
                              <Link to="/formulario-producto">Agregar Producto</Link>
                            </li>
                          )}
                        </div>
                        <div class="col">
                          {/* ENLACE DASHBOARD solo para admin */}
                          {usuario.nombre === "admin" && (
                            <Link to="/dashboard" style={{ margin: '0 10px' }}>
                              Admin Producto
                            </Link>
                          )}
                        </div>
                        <div class="col">
                          <button onClick={manejarCerrarSesion}>
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    </div>
                  </div></>
                ) : (
                  <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                )}
              </li>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar" />
                <button class="btn btn-success" type="submit">Buscar</button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;


