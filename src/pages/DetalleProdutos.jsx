import { Link, useParams, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import Productos from "../pages/Productos";

const ProductoDetalle = () => {

  const { id } = useParams();
  const location = useLocation();
  const producto = location.state?.producto;
  const { agregarAlCarrito } = useCartContext();

  if (!producto) {
    return (
      <div>
        <p>No se pudo cargar el producto</p>
        <Link to="/carrito">
          <button>Volver a Productos</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <img src={producto.image} alt={producto.title} width="80%" />
          </div>
          <div class="col-sm-9">
            <div class="row">
              <div class="col-8 col-sm-6">
                
                <h4>Codigo -00{id}</h4>
                <p><strong>Descripción: </strong>{producto.description}</p>
              </div>
              
                <h2>Precio: ${producto.price}</h2>
              
              <div>
                <Link  to={`/productos`}><button className="btn btn-outline-success m-2">Volver</button></Link>
                <button className="btn btn-outline-success m-2" onClick={() => agregarAlCarrito(producto)}>Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; export default ProductoDetalle;