// Carrossel de Fotos
document.addEventListener('DOMContentLoaded', function() {
    // Menu Hambúrguer
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Função para atualizar a posição do carrossel
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
    }

    // Botão Próximo
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    // Botão Anterior
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // Auto-play do carrossel (opcional - descomente se quiser)
    // setInterval(function() {
    //     currentIndex = (currentIndex + 1) % totalSlides;
    //     updateCarousel();
    // }, 5000);

    // Navegação suave para links internos
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora links vazios
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botão "Fale com um especialista"
    const bannerButton = document.querySelector('.banner-button');
    if (bannerButton) {
        bannerButton.addEventListener('click', function() {
            const contatoSection = document.getElementById('contato');
            if (contatoSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contatoSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Efeito de scroll no header (mantém efeito de vidro flutuante)
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const headerContainer = document.querySelector('.header .container');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            headerContainer.style.backgroundColor = 'rgba(53, 88, 72, 0.85)';
            headerContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
        } else {
            headerContainer.style.backgroundColor = 'rgba(53, 88, 72, 0.75)';
            headerContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
        }
        
        lastScroll = currentScroll;
    });

    // Adiciona animação de fade-in nas seções ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa todas as seções principais
    const sections = document.querySelectorAll('.sobre, .lotes, .fotos');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

