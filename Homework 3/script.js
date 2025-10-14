document.addEventListener('DOMContentLoaded', () => {
    // 1. Image Carousel Logic
    let slideIndex = 1; // Bắt đầu từ slide 1
    let slideInterval; // Biến để lưu ID của setInterval

    // Bắt đầu carousel tự động
    function startCarousel() {
        showSlides(slideIndex);
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000); // Tự động chuyển slide sau mỗi 5 giây
    }

    // Chức năng chuyển slide (tăng/giảm)
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Chức năng hiển thị slide cụ thể (được gọi bởi các chấm)
    window.currentSlide = function(n) {
        clearInterval(slideInterval); // Dừng tự động chuyển
        showSlides(slideIndex = n);
        startCarousel(); // Bắt đầu lại sau khi chọn thủ công
    }

    // Chức năng hiển thị slide chính
    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("carousel-slide");
        const dots = document.getElementsByClassName("dot");

        if (slides.length === 0) return;

        // Xử lý vòng lặp
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        // Ẩn tất cả slides và hủy active dots
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Hiển thị slide hiện tại và đánh dấu dot active
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    // 2. Scroll-triggered visibility (for highlight features)
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.highlight-features ul li').forEach(li => {
        observer.observe(li);
    });

    // 3. Navbar Opacity Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Simple Button Hover Animation (using JS for example)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize the carousel after all functions are defined
    startCarousel();
});