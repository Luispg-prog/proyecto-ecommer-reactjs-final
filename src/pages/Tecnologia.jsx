import Productos from "../productos/Productos";


const Tecnologia = ({productos}) => {
    const productosTecnologia = productos ? productos.filter(producto => producto.category === "electronics") : [];
    return (
        <div className="nav-categoria">
            <h2>Tecnologia</h2>
            <Productos productos={productosTecnologia} />
        </div>
    );
}   

export default Tecnologia;