document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. نظام تبديل اللغة (Language Switcher)
    // ==========================================
    const langToggleBtn = document.getElementById('lang-toggle');
    const body = document.body;
    const htmlTag = document.documentElement;

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            const currentLang = this.getAttribute('data-lang');

            if (currentLang === 'en') {
                // ----- التحويل إلى الإنجليزية -----
                body.classList.add('en');
                htmlTag.setAttribute('lang', 'en');
                htmlTag.setAttribute('dir', 'ltr');
                // تحديث الزر للعودة للعربية
                this.setAttribute('data-lang', 'ar');
                this.textContent = 'العربية';
            } else {
                // ----- التحويل إلى العربية -----
                body.classList.remove('en');
                htmlTag.setAttribute('lang', 'ar');
                htmlTag.setAttribute('dir', 'rtl');
                // تحديث الزر للذهاب للإنجليزية
                this.setAttribute('data-lang', 'en');
                this.textContent = 'English';
            }
        });
    }

    // ==========================================
    // 2. قائمة الجوال (Mobile Menu)
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    if (menuToggle && mainNav) {
        // فتح/إغلاق القائمة
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // تغيير أيقونة الهامبرغر إلى X (اختياري)
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // ==========================================
    // 3. السلايدر الرئيسي (Hero Slider)
    // ==========================================
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const nextBtn = document.querySelector('.slider-nav.next');
    const prevBtn = document.querySelector('.slider-nav.prev');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        // إنشاء نقاط المؤشر
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

        // ربط الأزرار
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide(); resetTimer();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide(); resetTimer();
        });

        // التشغيل التلقائي
        function startTimer() {
            slideInterval = setInterval(nextSlide, 5000); // كل 5 ثواني
        }
        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        startTimer();
    }

    // ==========================================
    // 4. الأكورديون (الإنجازات)
    // ==========================================
    const accHeaders = document.querySelectorAll('.accordion-header');

    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // إغلاق جميع العناصر الأخرى
            accHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            // إذا لم يكن العنصر مفتوحاً، افتحه
            if (!isActive) {
                header.classList.add('active');
                // تعيين الارتفاع ديناميكياً للمحتوى الداخلي
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});