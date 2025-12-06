import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;
 
  const [cargando, setCargando] = useState(false);

  // Función para eliminar producto
  const eliminarProducto = async () => {
    if (!producto) return;
   
    setCargando(true);
    try {
      const respuesta = await
      fetch(`https://6922851609df4a492322a1cd.mockapi.io/api/v1/fakestoreapi/${producto.id}`, {
        method: 'DELETE',
      });
     
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto.');
      }


      alert('Producto eliminado correctamente.');
     
     navigate('/productos');
     setTimeout(() => {
      window.location.reload();
    }, 100);
     
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al eliminar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.title}"?\n\nEsta acción no se puede deshacer.`
    );
   
    if (confirmar) {
      eliminarProducto();
    }
  };


  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Eliminar Producto</h2>
     
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ color: '#dc3545' }}>¿Estás seguro de que deseas eliminar este producto?</h3>
       
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>Nombre:</strong> {producto.title}</p>
          <p><strong>Precio:</strong> ${producto.price}</p>
          <p><strong>Categoría:</strong> {producto.category || 'Sin categoría'}</p>
          <p><strong>Descripción:</strong> {producto.description}</p>
          {producto.image && (
            <img
              src={producto.image}
              alt="Producto a eliminar"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}
        </div>


        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Esta acción no se puede deshacer. El producto será eliminado permanentemente.
        </p>
      </div>


      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button type="button" class="btn btn-danger"
          onClick={manejarEliminar}
          disabled={cargando} >
          {cargando ? 'Eliminando...' : 'Sí, Eliminar'}
        </button>
       
        <button type="button" class="btn btn-secondary"
          onClick={() => navigate('/productos')}
          disabled={cargando} >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EliminarProducto;
