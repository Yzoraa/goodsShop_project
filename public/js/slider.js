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

    // 전체 이미지 사용
    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${imgSrc}" alt="슬라이드">`;
        slider.appendChild(slide);

        // 인디케이터 추가
        const indicator = document.createElement('button');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => moveSlide(index)); 
        indicators.appendChild(indicator);
    });

    let currentIndex = 0;

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
    
        indicatorButtons.forEach((button, idx) => {
            if (idx === index) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // 자동 슬라이드 (3초마다 한 장씩 이동)
    setInterval(() => {
        moveSlide(currentIndex + 1); // 다음 슬라이드로 이동
    }, 3000);
});
