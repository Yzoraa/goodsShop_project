// 이미지 데이터 배열 (전체 사용)
const images = [
    '/img/banner1.jpg',
    '/img/banner2.jpg',
    '/img/banner3.jpg',
    '/img/banner4.jpg',
    '/img/banner5.jpg',
    '/img/banner6.jpg'
];

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const indicators = document.querySelector('.indicators');
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');

    // 첫번째 이미지부터 시작
    let currentIndex = 1;

    const slides = [...images];
    slides.unshift(images[images.length - 1]); // 마지막 이미지 복제 (앞에 추가)
    slides.push(images[0]); // 첫 번째 이미지 복제 (뒤에 추가)

    // 슬라이드 생성
    slides.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${imgSrc}" alt="슬라이드">`;
        slider.appendChild(slide);

        // 인디케이터 추가
        if (index > 0 && index < slides.length - 1) {
            const indicator = document.createElement('button');
            if (index === 1) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                moveSlide(index);
            }); 
            indicators.appendChild(indicator);
        }
    });

    // 기본 위치 설정
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    let autoSlide = setInterval(() => moveSlide(currentIndex + 1), 3000);
    
    // 슬라이드 이동
    function moveSlide(index) {
        const totalSlides = slides.length;
        slider.style.transition = "transform 0.5s ease-in-out"; // 기본 이동 애니메이션

        if (index >= totalSlides - 1) {
            // 마지막에서 첫 번째로 이동
            slider.style.transition = "transform 0.5s ease-in-out";
            currentIndex = totalSlides - 1;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;

            setTimeout(() => {
                slider.style.transition = "none"; // 애니메이션 OFF
                currentIndex = 1; // 1번으로 순간 이동
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateIndicators(); // 순간이동 후 인디케이터 즉시 갱신

                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease-in-out"; // 애니메이션 다시 ON
                }, 50);
            }, 500);
            return;
        }

        if (index <= 0) {
            // 첫 번째에서 마지막으로 이동 (순간 이동)
            slider.style.transition = "transform 0.5s ease-in-out";
            currentIndex = 0;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;

            setTimeout(() => {
                slider.style.transition = "none";
                currentIndex = totalSlides - 2;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateIndicators(); // 순간이동 후 인디케이터 즉시 갱신

                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease-in-out";
                }, 50);
            }, 500);
            return;
        }

        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        updateIndicators();
        resetAutoSlide();
    }

    function updateIndicators() {
        const indicatorButtons = document.querySelectorAll('.indicators button');
        indicatorButtons.forEach((btn, idx) => {
            btn.classList.toggle('active', idx + 1 === currentIndex);
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => moveSlide(currentIndex + 1), 3000);
    }

    // 버튼 클릭 이벤트 추가
    prevBtn.addEventListener('click', () => moveSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => moveSlide(currentIndex + 1));
});
