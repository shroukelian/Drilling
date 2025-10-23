document.addEventListener('DOMContentLoaded', function() {
    const langToggleBtn = document.getElementById('lang-toggle');
    const body = document.body;
    const htmlTag = document.documentElement;

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            const currentLang = this.getAttribute('data-lang');

            if (currentLang === 'en') {
                body.classList.add('en');
                htmlTag.setAttribute('lang', 'en');
                htmlTag.setAttribute('dir', 'ltr');
                this.setAttribute('data-lang', 'ar');
                this.textContent = 'العربية';
            } else {
                body.classList.remove('en');
                htmlTag.setAttribute('lang', 'ar');
                htmlTag.setAttribute('dir', 'rtl');
                this.setAttribute('data-lang', 'en');
                this.textContent = 'English';
            }
        });
    }

   
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }


    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const nextBtn = document.querySelector('.slider-nav.next');
    const prevBtn = document.querySelector('.slider-nav.prev');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active-slide');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active-slide');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide(); resetTimer();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide(); resetTimer();
        });

        function startTimer() {
            slideInterval = setInterval(nextSlide, 5000); 
        }
        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        startTimer();
    }

    const accHeaders = document.querySelectorAll('.accordion-header');

    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            accHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});