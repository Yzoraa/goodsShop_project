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

    // 전체 이미지 사용
    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${imgSrc}" alt="슬라이드">`;
        slider.appendChild(slide);

        // 인디케이터 추가
        const indicator = document.createElement('button');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            moveSlide(index);
        }); 
        indicators.appendChild(indicator);
    });

    let currentIndex = 0;
    let autoSlide = setInterval(() => moveSlide(currentIndex + 1), 3000);
    
    // 슬라이드 이동
    function moveSlide(index) {
        const totalSlides = images.length;

        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }

        currentIndex = index;
    
        // 슬라이더를 왼쪽으로 이동
        const moveDistance = index * 100;
        slider.style.transform = `translateX(-${moveDistance}%)`;

        const indicatorButtons = document.querySelectorAll('.indicators button');
    
        indicatorButtons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            btn.classList.toggle('active', idx === index);
        });

        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => moveSlide(currentIndex + 1), 3000);
    }

    // 버튼 클릭 이벤트 추가
    prevBtn.addEventListener('click', () => moveSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => moveSlide(currentIndex + 1));
});
