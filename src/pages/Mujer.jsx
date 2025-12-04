import Productos from "../productos/Productos";


const Mujer = ({productos}) => {
    const productosMujer = productos ? productos.filter(producto => producto.category === "women's clothing") : [];
    return (
        <div className="nav-categoria">
            <div>
                <h2>Mujer</h2>
            </div>
            <div>
                <Productos productos={productosMujer} />
            </div>
        </div>
    );
}   

export default Mujer;   