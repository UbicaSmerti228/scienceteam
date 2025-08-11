/*
/*
 * MAIN.JS (v2)
 * Логика для интерактивных элементов сайта Genesis Lab
 */

document.addEventListener('DOMContentLoaded', function () {

    // 1. КОНФИГУРАЦИЯ ФОНА С ЧАСТИЦАМИ (particles.js)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#0EA5A4" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#6C7AEE", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } } },
            "retina_detect": true
        });
    }

    // 2. ИНТЕРАКТИВНАЯ ДИАГРАММА (Chart.js)
    const chartCanvas = document.getElementById('kinsey-chart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        const chartData = {
            labels: ['0: Строго гетеро', '1', '2', '3: Би', '4', '5', '6: Строго гомо'],
            datasets: [{
                label: 'Распределение по шкале Кинси',
                data: [10, 15, 25, 30, 15, 10, 5],
                backgroundColor: ['rgba(110, 122, 238, 0.4)', 'rgba(110, 122, 238, 0.5)', 'rgba(110, 122, 238, 0.7)', 'rgba(14, 165, 164, 0.8)', 'rgba(14, 165, 164, 0.7)', 'rgba(14, 165, 164, 0.5)', 'rgba(14, 165, 164, 0.4)'],
                borderColor: '#0EA5A4',
                borderWidth: 1,
                hoverBorderColor: '#6C7AEE', // Цвет рамки при наведении
                hoverOffset: 10 // Насколько сегмент выдвигается при наведении
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                cutout: '70%', // Делаем "бублик" тоньше
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94A3B8', padding: 20 } },
                    title: { display: false }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    // 3. ПЛАВНЫЕ АНИМАЦИИ ПРИ СКРОЛЛЕ
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // 4. АНИМАЦИИ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('is-visible');
    });

    // 5. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO-БЛОКА
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroContent.style.opacity = `${1 - scrollPosition / 500}`;
        }
    });

    // 6. ИЗМЕНЕНИЕ ФОНА ШАПКИ ПРИ СКРОЛЛЕ
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});