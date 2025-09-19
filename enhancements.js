// Melhorias de UX e Performance
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 300);
    });
    
    // 2. Breadcrumbs
    function createBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbsContainer = document.createElement('section');
        breadcrumbsContainer.className = 'breadcrumbs';
        
        const breadcrumbsHTML = `
            <div class="container">
                <nav class="breadcrumb-nav">
                    <a href="index.html">Home</a>
                    ${getBreadcrumbPath(path)}
                </nav>
            </div>
        `;
        
        breadcrumbsContainer.innerHTML = breadcrumbsHTML;
        
        const header = document.querySelector('.header');
        if (header && path !== '/' && !path.includes('index.html')) {
            header.insertAdjacentElement('afterend', breadcrumbsContainer);
        }
    }
    
    function getBreadcrumbPath(path) {
        const pages = {
            '/servicos.html': 'Serviços',
            '/quem-somos.html': 'Quem Somos', 
            '/contato.html': 'Contato',
            '/certificacoes.html': 'Certificações'
        };
        
        const currentPage = pages[path];
        return currentPage ? `<span class="breadcrumb-separator">></span><span>${currentPage}</span>` : '';
    }
    
    // 3. Botão Voltar ao Topo
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopBtn);
    
    // Throttle para scroll do botão
    const throttleBackToTop = throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100);
    
    window.addEventListener('scroll', throttleBackToTop);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 4. Transição de Página
    document.body.classList.add('page-transition');
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // 5. Melhorar Links de Navegação
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== window.location.pathname) {
                e.preventDefault();
                
                // Animação de saída
                document.body.style.opacity = '0.7';
                document.body.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
    
    // Inicializar breadcrumbs
    createBreadcrumbs();
});

// Função throttle reutilizável
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}