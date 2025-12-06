import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total, cantidadTotal } = useCartContext();

  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  return (
    <div class="card m-4 border-2 border-success" >
      <div class="card-body p-4">
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            {carrito.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.title} width="3%" />
                {item.title} - ${Number(item.price).toFixed(3)}
                (Cantidad: {item.cantidad || 1})

                <button type="button" class="btn btn-success btn-sm m-2" onClick={() => quitarCantidad(item.id)}>-</button>
                <button type="button" class="btn btn-success btn-sm m-2" onClick={() => agregarCantidad(item.id)}>+</button>

              </div>
            ))}
            <div>
              Total: ${Number(total).toFixed(3)}
              cantidadTotal: {cantidadTotal}
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-success btn-sm m-2" onClick={vaciarCarrito}>Vaciar Carrito</button>
              <button type="button" class="btn btn-success btn-sm m-2" onClick={irAPagar}>Pagar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

