import { Link, useNavigate, useParams } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();
  const { categoria } = useParams();

  const manejarEliminar = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    // Navegar al formulario de edición
    navigate('/formulario-producto', { state: { producto } });
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  // Si hay parámetro de categoría, filtrar
  // Mapeo de nombres legibles a categorías reales de la API
  const mapCategoriaAPIs = (cat) => {
    if (!cat) return null;
    const key = String(cat).toLowerCase().trim();
    switch (key) {
      case 'hombre':
      case 'men':
        return "men's clothing";
      case 'mujer':
      case 'women':
        return "women's clothing";
      case 'electronico':
      case 'tecnología':
      case 'tecnologia':
        return 'Electronics';
      case 'varios':
      case 'Varios':
      case 'otros':
        return 'Varios';
      default:
        // Usar el mismo valor proporcionado
        return cat;
    }
  };

  const categoriaAEncontrar = categoria ? mapCategoriaAPIs(categoria) : null;

  const productosMostrados = categoriaAEncontrar
    ? productos.filter(p => String(p.category).toLowerCase() === String(categoriaAEncontrar).toLowerCase())
    : productos;

  return (
    <>
      <div>
        <h2 className="text-center text-capitalize">{categoria}</h2>
        <ul id="lista-productos">
          {productosMostrados.map((producto) => (
            <ProductoItem
              key={producto.id}
              producto={producto}
              esAdmin={esAdmin}
              onEditar={() => manejarEditar(producto)}
              onEliminar={() => manejarEliminar(producto)}
              onAgregarCarrito={() => agregarAlCarrito(producto)}
            />
          ))}
          {productosMostrados.length === 0 && <p>No hay productos en esta categoría.</p>}
        </ul>
      </div>

      <CarritoCompras />
    </>
  );
}

const ProductoItem = ({ producto, esAdmin, onEditar, onEliminar, onAgregarCarrito }) => (
    <li>
    <p>Codigo:00{producto.id} -{producto.category}</p>
    <img src={producto.image} alt={producto.title} width="80%" />
    <h3>{producto.title}</h3>
    <p><strong>Precio: ${producto.price}</strong></p>

    <Link to={`/productos/${producto.id}`} state={{ producto }}>
      <button className="btn btn-outline-success m-2">Más detalles</button>
    </Link>

    <button className="btn btn-outline-success" onClick={onAgregarCarrito}>Comprar</button>

    {/* BOTONES ADMIN - Agregar contenedor */}
    {esAdmin && (
        <div className="btn-admin-container">

        <button type="button" className="btn btn-secondary m-1" onClick={onEditar} >Editar</button>
        <button type="button" className="btn btn-danger m-1" onClick={onEliminar} >Eliminar</button>
      </div>
    )
  }
  </li>


);



