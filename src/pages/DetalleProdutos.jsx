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
 
  return(
    <>
    
    <h2>{producto.title} </h2>
    <ul>
        <li key={producto.id}>
            <h4>Codigo -{id}</h4>            
            <br />
            <img src={producto.image} alt={producto.title} width="30%" />
            <p><strong>Descripción: </strong>{producto.description}</p>
            <h2>Precio: ${producto.price}</h2>
            
        </li>
        <hr />
        <Link to={`/productos`}><button>Volver</button></Link>
        <button onClick={() => agregarAlCarrito(producto)}>Comprar</button>
    </ul>
    </>
  );
}; export default ProductoDetalle;