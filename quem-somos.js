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
    const animatedElements = document.querySelectorAll('.about-text, .about-image, .statistics-section');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
    });

    // Animação especial para os cards de estatísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${0.8 + index * 0.2}s, transform 0.6s ease ${0.8 + index * 0.2}s`;
        observer.observe(card);
    });

    // Animação de contagem para os números com limpeza de memória
    const intervals = [];
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            const finalValue = number.textContent;
            const numericValue = parseInt(finalValue.replace('MM', ''));
            
            // Validação para evitar NaN
            if (isNaN(numericValue)) return;
            
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    number.textContent = finalValue;
                    clearInterval(counter);
                    const index = intervals.indexOf(counter);
                    if (index > -1) intervals.splice(index, 1);
                } else {
                    number.textContent = Math.floor(currentValue) + 'MM';
                }
            }, 30);
            
            intervals.push(counter);
        });
    };
    
    // Limpar intervalos ao sair da página
    window.addEventListener('beforeunload', () => {
        intervals.forEach(timer => clearInterval(timer));
    });

    // Iniciar animação de números quando a seção de estatísticas aparecer
    const statsSection = document.querySelector('.statistics-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateNumbers, 500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});