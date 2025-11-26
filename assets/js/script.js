// Carrossel de Fotos
document.addEventListener('DOMContentLoaded', function() {
    // Menu Hambúrguer - estilo Angelette
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('show');
            
            if (isOpen) {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                if (menuIcon) menuIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
                if (menuIcon) menuIcon.classList.add('hidden');
                if (closeIcon) closeIcon.classList.remove('hidden');
            }
        });

        // Fechar menu ao clicar em um link
        const menuItems = mobileMenu.querySelectorAll('.mobile-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                if (menuIcon) menuIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    mobileMenu.classList.add('hidden');
                    if (menuIcon) menuIcon.classList.remove('hidden');
                    if (closeIcon) closeIcon.classList.add('hidden');
                }
            }
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                if (menuIcon) menuIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        });
    }

    // Carrossel de fotos (apenas se existir na página)
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselTrack && prevBtn && nextBtn && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Função para obter número de slides visíveis baseado na largura da tela
        function getSlidesPerView() {
            if (window.innerWidth <= 480) {
                return 1;
            } else if (window.innerWidth <= 768) {
                return 2;
            } else if (window.innerWidth <= 968) {
                return 3;
            }
            return 4;
        }

        // Função para atualizar a posição do carrossel
        function updateCarousel() {
            const slidesPerView = getSlidesPerView();
            const slideWidth = 100 / slidesPerView;
            const translateX = -currentIndex * slideWidth;
            carouselTrack.style.transform = `translateX(${translateX}%)`;
        }

        // Função para atualizar o índice máximo
        function updateMaxIndex() {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            return maxIndex;
        }

        // Botão Próximo
        nextBtn.addEventListener('click', function() {
            const slidesPerView = getSlidesPerView();
            const maxIndex = updateMaxIndex();
            currentIndex = Math.min(currentIndex + slidesPerView, maxIndex);
            updateCarousel();
        });

        // Botão Anterior
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(currentIndex - getSlidesPerView(), 0);
            updateCarousel();
        });

        // Atualiza ao redimensionar a janela
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateMaxIndex();
                updateCarousel();
            }, 250);
        });
    }

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

    // Botão "Fale com um especialista" do banner
    const bannerButtons = document.querySelectorAll('.banner-button');
    bannerButtons.forEach(bannerButton => {
        bannerButton.addEventListener('click', function() {
            // Tenta encontrar a seção de contato na mesma página primeiro
            const contatoSection = document.getElementById('contato');
            if (contatoSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contatoSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Se não encontrar, redireciona para a home na seção de contato
                window.location.href = 'index.html#contato';
            }
        });
    });

    // Botão "Fale com um especialista" da seção sobre
    const sobreButton = document.querySelector('.sobre-button');
    if (sobreButton) {
        sobreButton.addEventListener('click', function() {
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

    // Animação de contador decrescente nos cards informativos
    const infoCards = document.querySelectorAll('.info-card-number');
    
    if (infoCards.length > 0) {
        const duration = 2000; // 2 segundos para todos terminarem ao mesmo tempo
        let hasAnimated = false;
        
        function formatNumber(value, prefix, suffix) {
            let displayValue = Math.floor(value);
            
            if (prefix === 'R$') {
                // Formatação para valores monetários (198000 -> 198.000)
                const formatted = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return prefix + ' ' + formatted;
            } else if (suffix === 'm²') {
                return displayValue + suffix;
            } else if (suffix === '°' || suffix === '%' || suffix === 'x') {
                return displayValue + suffix;
            } else if (suffix === 'hrs') {
                return displayValue + ' ' + suffix;
            } else {
                return displayValue.toString();
            }
        }
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const prefix = element.getAttribute('data-prefix') || '';
            const suffix = element.getAttribute('data-suffix') || '';
            
            // Calcula valor inicial maior (do menor para o maior)
            let startValue;
            if (target < 100) {
                startValue = target + 50; // Para valores pequenos
            } else if (target < 1000) {
                startValue = target + 200; // Para valores médios
            } else {
                startValue = Math.floor(target * 1.3); // Para valores grandes
            }
            
            const steps = duration / 16; // 60 FPS
            const decrement = (startValue - target) / steps;
            let current = startValue;
            let step = 0;
            
            const timer = setInterval(() => {
                current -= decrement;
                step++;
                
                if (current <= target || step >= steps) {
                    current = target;
                    clearInterval(timer);
                }
                
                element.textContent = formatNumber(current, prefix, suffix);
            }, 16);
        }
        
        // Observa quando a seção entra na tela
        const infoCardsSection = document.querySelector('.info-cards');
        if (infoCardsSection) {
            const cardsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        // Inicia todas as animações simultaneamente
                        infoCards.forEach(card => {
                            animateCounter(card);
                        });
                        cardsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            cardsObserver.observe(infoCardsSection);
        }
    }
});

