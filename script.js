document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Menú Hamburguesa (Móviles)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar el menú al hacer click en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Animación de aparición (Fade-In) optimizada con IntersectionObserver
    const fadeElements = document.querySelectorAll('.skill-card, .project-card, .section-title');
    
    // Opciones del observador: se activa cuando el elemento está un 10% visible
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar estilos de aparición
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Dejar de observar el elemento una vez animado para ahorrar recursos
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 3. Resaltado Dinámico del Menú optimizado con IntersectionObserver
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: "-75px 0px -75px 0px" // Compensa la barra de navegación
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navItems.forEach(link => {
                    link.classList.remove('active');
                    link.style.color = 'var(--text-main)'; // Reseteo
                    
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                        link.style.color = 'var(--accent)'; // Resaltado
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));
    
    // Nota: El desplazamiento suave (smooth scroll) ahora está siendo manejado 
    // de manera nativa por CSS (html { scroll-behavior: smooth; }), lo que mejora el rendimiento.
});