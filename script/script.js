document.addEventListener('DOMContentLoaded', function(){

    const body = document.body;
    const header = document.querySelector('header');
    const navIcon = document.querySelector('header .nav_icon');
    const navMenu = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header nav ul li a');

    // 헤더 높이 계산
    const setHeaderHeight = () => {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    };

    setHeaderHeight();

    // 카카오맵 변수를 밖으로 빼서 resize 이벤트에서도 쓸 수 있게 합니다.
    let map;
    let locPosition;

    window.addEventListener('resize', () => {
        // 헤더 높이 재계산
        setHeaderHeight();
        
        // 지도가 생성되어 있다면 중심을 다시 본사로 맞춤
        if (map && locPosition) {
            map.setCenter(locPosition);
        }
    });

    if(navIcon && navMenu){
        navIcon.addEventListener('click', () => {
            navIcon.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        })

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navIcon.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // 카카오맵 설정
    const mapContainer = document.getElementById('map'); 
    if (mapContainer) {
        // 산리오 코리아 본사 정확한 좌표
        const lat = 37.507833;
        const lng = 127.058207;
        locPosition = new kakao.maps.LatLng(lat, lng);

        const mapOption = { 
            center: locPosition, 
            level: 4 
        };
        map = new kakao.maps.Map(mapContainer, mapOption); 

        // 커스텀 마커(핀) 이미지 설정
        const imageSrc = 'images/Pin.png'; 
        const imageSize = new kakao.maps.Size(60, 65); // 가로, 세로 모두 지정하는 것이 안전합니다.
        const imageOption = {offset: new kakao.maps.Point(30, 60)}; // 60px 기준 중앙(30)과 바닥(60)

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new kakao.maps.Marker({
            position: locPosition,
            image: markerImage 
        });
        marker.setMap(map);

        // 지도 위 커서 변경
        map.setCursor('url(images/openhand.cur.ico), auto');
    }

    // TOP 버튼 등장 제어
    const topBtn = document.querySelector('.top_btn');
    const topBtnLink = document.querySelector('.top_btn a');

    if(topBtnLink) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                header.classList.add('active');
                topBtn.classList.add('active');
            } else {
                header.classList.remove('active');
                topBtn.classList.remove('active');
            }
        });

        topBtnLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})