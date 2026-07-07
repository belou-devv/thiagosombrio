// Micro-interações para os cards de vidro (efeito luminoso que segue o cursor)
document.querySelectorAll('.glass-card').forEach(card => {
    // Desktop: seguir cursor
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    // Mobile: remover efeito ao sair
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

// Rolagem suave para links internos de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Otimização de performance para animações em mobile
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// Esconder/mostrar botão de play sobre o vídeo principal
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('main-video');
    const playBtn = document.getElementById('main-play-btn');
    if (!video || !playBtn) return;

    const updateOverlay = () => {
        if (!video.paused && !video.ended) {
            playBtn.classList.add('opacity-0');
            playBtn.classList.remove('opacity-90');
        } else {
            playBtn.classList.add('opacity-90');
            playBtn.classList.remove('opacity-0');
        }
    };

    video.addEventListener('play', updateOverlay);
    video.addEventListener('pause', updateOverlay);
    video.addEventListener('ended', updateOverlay);
    // também atualiza no carregamento inicial
    updateOverlay();
});

// Carrossel de Mídias de Feedback (Depoimentos)
document.addEventListener('DOMContentLoaded', () => {
    const feedbackVideo = document.getElementById('feedback-video');
    const feedbackImage = document.getElementById('feedback-image');
    const prevBtn = document.getElementById('feedback-prev');
    const nextBtn = document.getElementById('feedback-next');

    if (!feedbackVideo || !feedbackImage || !prevBtn || !nextBtn) return;

    // Lista de mídias para alternar
    const mediaList = [
        { path: 'src/video experiencia.mp4', type: 'video' },
        { path: 'src/video experiencia 2.MOV', type: 'video' },
        { path: 'src/video experiencia 3.mp4', type: 'video' },
        { path: 'src/foto experiencia 1.jpg', type: 'image' }
    ];

    let currentIndex = 0;
    let isTransitioning = false;

    function updateFeedbackMedia(newIndex) {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentMedia = mediaList[currentIndex];
        const nextMedia = mediaList[newIndex];

        // Determinar elementos atuais e novos
        const currentEl = currentMedia.type === 'video' ? feedbackVideo : feedbackImage;
        const nextEl = nextMedia.type === 'video' ? feedbackVideo : feedbackImage;

        // Iniciar esmaecimento de saída (fade-out) da mídia atual
        currentEl.classList.remove('opacity-100');
        currentEl.classList.add('opacity-0');

        // Se a mídia atual for vídeo, pausar a reprodução
        if (currentMedia.type === 'video') {
            feedbackVideo.pause();
        }

        // Aguardar o término do fade-out (300ms conforme classe duration-300 no HTML)
        setTimeout(() => {
            // Ocultar elemento antigo e exibir o novo
            currentEl.classList.add('hidden');
            nextEl.classList.remove('hidden');

            // Carregar a nova mídia
            if (nextMedia.type === 'video') {
                feedbackVideo.src = nextMedia.path;
                feedbackVideo.load();
            } else {
                feedbackImage.src = nextMedia.path;
            }

            // Pequeno delay para garantir que o browser registrou a mudança de display antes de esmaecer
            setTimeout(() => {
                nextEl.classList.remove('opacity-0');
                nextEl.classList.add('opacity-100');
                currentIndex = newIndex;
                isTransitioning = false;
            }, 50);

        }, 300);
    }

    // Eventos de clique nas setas de navegação
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = mediaList.length - 1;
        }
        updateFeedbackMedia(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= mediaList.length) {
            newIndex = 0;
        }
        updateFeedbackMedia(newIndex);
    });
});

