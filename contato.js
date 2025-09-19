// Validação e envio do formulário de contato
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');

    // Animações de entrada
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
    const animatedElements = document.querySelectorAll('.contact-form-section, .phone-section, .address-card, .map-container');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });

    // Função de validação de campo
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove erro anterior
        clearError(field);

        // Validação por tipo de campo
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Por favor, insira um email válido';
                    isValid = false;
                }
                break;
            case 'text':
                if (value.length < 2) {
                    errorMessage = 'Este campo deve ter pelo menos 2 caracteres';
                    isValid = false;
                }
                break;
            case 'select-one':
                if (!value) {
                    errorMessage = 'Por favor, selecione uma opção';
                    isValid = false;
                }
                break;
            default:
                if (field.tagName === 'TEXTAREA' && value.length < 10) {
                    errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
                    isValid = false;
                }
        }

        // Campos obrigatórios
        if (field.required && !value) {
            errorMessage = 'Este campo é obrigatório';
            isValid = false;
        }

        if (!isValid) {
            showError(field, errorMessage);
        }

        return isValid;
    }

    // Mostrar erro
    function showError(field, message) {
        field.classList.add('error');
        
        // Remove mensagem de erro anterior
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Adiciona nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    // Limpar erro
    function clearError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar todos os campos
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Desabilitar botão durante envio
        submitBtn.disabled = true;
        submitBtn.textContent = 'ENVIANDO...';

        // Simular envio (aqui você integraria com seu backend)
        try {
            await simulateFormSubmission();
            showSuccessMessage();
            form.reset();
        } catch (error) {
            showErrorMessage('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'ENVIAR MENSAGEM';
        }
    });

    // Simular envio do formulário
    function simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    // Mostrar mensagem de sucesso
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        
        form.parentNode.insertBefore(successDiv, form);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Mostrar mensagem de erro
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.textAlign = 'center';
        errorDiv.style.padding = '1rem';
        errorDiv.style.marginBottom = '1rem';
        
        form.parentNode.insertBefore(errorDiv, form);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});