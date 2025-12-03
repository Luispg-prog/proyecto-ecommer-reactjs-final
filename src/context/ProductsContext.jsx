import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función de validación en el contexto
  const validarProducto = (producto) => {
    const errores = {};

    // title (nombre)
    if (!producto.title?.trim()) {
      errores.title = 'El nombre es obligatorio.';
    }

    // price (precio)
    if (!producto.price?.toString().trim()) {
      errores.price = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.price.toString().replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);
     
      if (!/^[\d.,]+$/.test(producto.price.toString().replace(/\./g, ''))) {
        errores.price = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.price = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.price = 'Debe ser mayor a 0.';
      }
    }

    // description (descripción)
    if (!producto.description?.trim()) {
      errores.description = 'La descripción es obligatoria.';
    } else if (producto.description.length < 10) {
      errores.description = 'Mínimo 10 caracteres.';
    } else if (producto.description.length > 200) {
      errores.description = 'Máximo 200 caracteres.';
    }

    return errores;
  };

  // Función para validar si el formulario es válido - nombre simplificado
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('https://6922851609df4a492322a1cd.mockapi.io/api/v1/fakestoreapi');
        
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch('https://6922851609df4a492322a1cd.mockapi.io/api/v1/fakestoreapi', {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      const data = await respuesta.json();
      setProductos(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`https://6922851609df4a492322a1cd.mockapi.io/api/v1/fakestoreapi/${productoActualizado.id}`, {
        
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar el producto');

      const data = await respuesta.json();
      setProductos(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        validarProducto,
        validar
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};


