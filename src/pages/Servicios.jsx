import React from 'react'
import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <>
      <div class="card m-4 border-2 border-success" >
        <div class="card-body p-4"></div>
        <h1 class="text-start m-3">Preguntas Frecuentes</h1>
        <hr />
        <div class="text-start m-3">


          <p>Si tenes dudas podes despejarlas aca. Si no encontras las respuestas escribinos a hola@romahnas.com.ar</p>

          <h5>¿QUÉ FORMAS DE PAGO PUEDO UTILIZAR PARA ABONAR MI COMPRA?</h5>
          <p> ​Podés abonar a traves de Mercado Pago aprovechando las promociones bancarias vigentes y en 3 cuotas sin interés. También podés realizar tu pago a través de transferencia accediendo a un 20% de descuento. </p>

          <h5>¿CUÁL ES EL COSTO DE ENVÍO?</h5>
          <p>El costo de envío depende del tipo y forma elegida. Podés calcularlo en nuestra tienda online (ingresando a cualquier artículo) con tu código postal.  </p>

          <h5>¿CUÁL ES LA FORMA DE ENVÍO?</h5>
          <p>Los envíos los hacemos a todo el país a través de Correo Argentino a domicilio o sucursal en la modalidad Clásica o Expreso. Si vivís en CABA o GBA podés elegir también la opción de motomensajería. ​</p>

          <h5>¿CUÁNTO TARDA EN LLEGAR EL PEDIDO?</h5>
          <p>El tiempo de entrega dependerá del tipo de envío seleccionado y el tiempo de acreditación del pago. Una vez que lo abones en nuestra tienda podes calcular hasta 48 hs hábiles de acreditación del pago (aunque generalmente es inmediata) y sumarle el tiempo de entrega: si es por Correo una vez despachado, dependiendo el deestino suele llegar entre 3 y 7 dias hábils. Si es por moto una vez despachado, dependiendo la zona, el tiempo es de 1 a 3 días hábiles. IMPORTANTE: Tené en cuenta que si el artículo es personalizado, una vez abonado estará listo para ser despachado a partir de los 14 días de realizada la compra.</p>

          <h5>¿CUÁL ES EL PLAZO PARA REALIZAR UN CAMBIO?</h5>
          <p>Podes solicitar el cambio del producto dentro de los 7 días corridos de recibido el mismo. Debe encontrarse en excelente estado sin detalles de uso. Podés informarte acerca del tema más ingresando en nuestra página de Cambios y Devoluciones</p>

          <div class="text-center">
            <Link to="/"><button class="btn btn-outline-success m-2">Volver al Inicio</button></Link>
          </div>


        </div>
      </div>


    </>
  )
}

export default Servicios