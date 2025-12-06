import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import '../styles/styleNavbar.css';



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
      <nav class="nav nav-pills nav-fill navbar navbar-expand-lg navbar-dark bg-success bg-gradient p-2">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Ecommer-LPG</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li class="nav-item">
                <button type="button" class="btn btn-outline-success m-1 "> <Link class="text-white text-decoration-none" to="/"> Inicio   </Link></button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-outline-success m-1"> <Link class="text-white text-decoration-none" to="/servicios">Preguntas Frecuentes</Link></button>
              </li>
              <li class="nav-item">
               <button type="button" class="btn btn-outline-success m-1"> <Link class="text-white text-decoration-none" to="/categoria">Categoria</Link></button>
              </li>
              <li >
                  <button type="button" class="btn btn-outline-success m-1 text-white text-decoration-none"> <Link class="text-white text-decoration-none" to="#" className="carrito-link">
                  🛒 ({cantidadTotal})
                </Link></button>
              </li>
              <li>
                <a>
                {isAuthenticated ? (
                  <><div class="container">
                    <div class="row">
                      <div class="col">
                        <span>Hola, {usuario.nombre}</span>
                        <div class="col">
                          {/*ENLACE PARA ADMIN - Solo visible para admin*/}
                          {usuario?.nombre === "admin" && (
                            <li>
                              <button type="button" class="btn btn-outline-success"> <Link class="text-white text-decoration-none" to="/formulario-producto">Agregar Producto</Link></button>
                            </li>
                          )}
                        </div>
                        <div class="col">
                          {/* ENLACE DASHBOARD solo para admin */}
                          {usuario.nombre === "admin" && (
                            <button type="button" class="btn btn-outline-success"> <Link class="text-white text-decoration-none" to="/dashboard" style={{ margin: '0 10px' }}>Admin Productos</Link></button>
                          )}
                          
                        </div>
                        <div class="col">
                           <button type="button" class="btn btn-outline-success" onClick={manejarCerrarSesion}> cerrar sesion</button>
                        </div>
                      </div>
                    </div>
                  </div></>
                ) : (
                  <Link class="text-white text-decoration-none" to="/iniciar-sesion">Iniciar Sesión</Link>
                )}
                </a>
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
