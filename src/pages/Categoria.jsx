import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCartContext } from '../context/CartContext';
import Productos from './Productos';

const Categoria = () => {
    const { productos, cargando, error } = useProducts();

    const categorias = productos && productos.length > 0
        ? Array.from(new Set(productos.map(p => p.category)))
        : [];

    if (cargando) return <p>Cargando categorías...</p>;
    if (error) return <p>{error}</p>;

    const navRef = useRef(null);
    const location = useLocation();

    // Si llegamos a /categoria, hacer scroll suave hacia la lista de categorías
    useEffect(() => {
        if (location.pathname === '/categoria') {
            setTimeout(() => {
                navRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    }, [location]);

    const etiquetaCategoria = (cat) => {
        const key = String(cat).toLowerCase();
        // Comprobar 'women' antes que 'men' para evitar que 'women' coincida con 'men'
        if (key.includes("women") || key.includes("women's") || key.includes("mujer")) return 'Mujer';
        if (key.includes("men") || key.includes("men's") || key.includes("hombre") || key.includes("hombres")) return 'Hombre';
        if (key.includes("elect") || key.includes("tec")) return 'Tecnologia';
        if (key.includes("jewel") || key.includes("varios") || key.includes("other")) return 'Varios';
        return cat;
    };

    return (
        <>
        <div>
            <h2 className="text-center">Categorías</h2>
            <nav ref={navRef} className="d-flex justify-content-center flex-wrap mb-4">
                {categorias.map(cat => (
                    <button key={cat} className="btn btn-outline-primary m-2">
                        <Link to={`/productos/categoria/${encodeURIComponent(cat)}`}>{etiquetaCategoria(cat)}</Link>
                    </button>
                ))}
            </nav>

            {/* Mostrar todos los productos debajo de las categorías */}
            <section>
               <Productos />
                {productos.length === 0 ? (
                    <p className="text-center">Cargando productos...</p>
                ) : (
                    <p className="text-center">No hay productos disponibles.</p>
                )}
            </section>

        </div>

        </>
    );
};

export default Categoria;