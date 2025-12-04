import Productos from "../productos/Productos";


const Varios = ({productos}) => {
    const productosVarios = productos ? productos.filter(producto => producto.category === "jewelery") : [];
    return (
        <div className="nav-categoria">
            
            <Productos productos={productosVarios} />
        </div>
    );
}   

export default Varios;