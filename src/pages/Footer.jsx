import '../styles/styleFooter.css';


const Footer = () => {
  return (
    <>
<footer className="footer-distributed footer-custom bg-dark text-white p-4">

			<div class="footer-right rounded-social-buttons ">
                <a className="rounded-circle social-button facebook" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" aria-hidden="true"></i></a>
                <a className="rounded-circle social-button twitter" href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                <a className="rounded-circle social-button linkedin" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
                <a className="rounded-circle social-button tiktok" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok" aria-hidden="true"></i></a>
                <a className="rounded-circle social-button youtube" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" aria-hidden="true"></i></a>
                <a className="rounded-circle social-button instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" aria-hidden="true"></i></a>
			</div>

			<div class="footer-left">

				<p class="footer-links">
					<a class="link-1" href="./">Inicio</a>

					<a href="#">Hombre</a>

					<a href="#">Mujer</a>

					<a href="#">Tecnologia</a>

					<a href="#">Varios</a>

					<a href="./Servicio">Preguntas Frecuentes</a>
				</p>

				<p>Mi Aplicación React - Godoy Luis &copy; 2025</p>
			</div>

		</footer>    
				
	
			

		

    </>
  );
}

export default Footer;


/*

<p class="footer-links">
					<a class="link-1" href="/">Inicio</a>

					<a href="#">Hombre</a>

					<a href="#">Mujer</a>

					<a href="#">Tecnologia</a>

					<a href="#">Varios</a>

					<a href="#">Contacto</a>
				</p>
 */