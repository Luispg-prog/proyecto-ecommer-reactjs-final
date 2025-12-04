import Productos from "../productos/Productos";

const Hombre = ({productos}) => {     

    const productosHombre = productos ? productos.filter(producto => producto.category === "men's clothing") : [];
    return (
        <div className="nav-categoria">
            <h2>Hombre</h2>
            <Productos productos={productosHombre} />
        </div>
    );
}

export default Hombre;
