// Animações de entrada para os elementos da página
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll('.certification-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(el);
    });

    // Animação especial para a logo
    const logo = document.querySelector('.certification-logo img');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transition = 'opacity 1s ease 0.5s, transform 1s ease 0.5s';
        
        observer.observe(logo);
    }

    // Animação para o botão
    const button = document.querySelector('.certificate-btn');
    if (button) {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.6s ease 1s, transform 0.6s ease 1s';
        
        observer.observe(button);
    }
});