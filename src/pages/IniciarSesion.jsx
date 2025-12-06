import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import '../styles/styleLogin.css';

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();

    // Verificar credenciales (admin/1234@admin)
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin");
      navigate("/dashboard");
    }
    // Lógica para usuarios normales - SOLO si NO es admin
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
      // Guarda el email ingresado y pasa nombre para el token user
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre);

      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      alert(
        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"
      );
    }
  };

  return (

    <>
      <div class="container">
        <div class="wrapper d-flex align-items-center justify-content-center h-100">
          <div class="card login-form">
            <div class="card-body">
              <h5 class="card-title text-center">Login</h5>
              <form onSubmit={manejarEnvio}>
                <div class="mb-3">

                  <label for="nombreCompleto" class="form-label">Nombre Completo</label>
                  <input type="text" class="form-control" aria-describedby="emailHelp"
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ'.- ]+"
                    value={formulario.nombre}
                    onChange={(e) =>
                      setFormulario({ ...formulario, nombre: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email</label>
                  <input type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={formulario.email}
                    onChange={(e) =>
                      setFormulario({ ...formulario, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="boton">
                  <button className="buton" type="submit" class="btn btn-success w-100">Ingresar</button>
                </div>
                <div className="boton">
                  <button type="button" class="btn btn-success w-100" onClick={() => navigate("/productos")}>
                    Ver sin Ingresar
                  </button>
                </div>
                <div class="sign-up mt-4">
                  No posee una cuenta? <a href="#">Registrar</a>
                </div>

                <div class="alert alert-secondary" role="alert">
                  Datos prueba admin <br />
                  Nombre: admin <br />
                  Email: 1234@admin
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
