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
