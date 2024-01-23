const imageList = document.querySelector(".img_box"); // 출력 할 img 태그 부모 요소(div)
const wrap2 = document.querySelector(".wrap2"); // showBtn 부모 요소(div)
const showBtn = document.querySelector(".btn2");

//하단 화면 높이 계산을 위한 변수
const footer = document.querySelector(".footer");
const container4 = document.querySelector(".container4");
const container5 = document.querySelector(".container5");

const stopBtn = document.querySelector(".stopBtn");
let pageToFetch = 1;
let imgNum = 0; // 랜덤 이미지 넘버링 변수

async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=12'); // 12개의 랜덤 이미지 불러오기
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();

        makeImageList(datas);

    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas){

    datas.forEach((item, index)=>{
        // img_box 내부에 랜덤 이미지 12개 출력
        imageList.innerHTML = imageList.innerHTML + "<img src="+ item.download_url +" alt='" + "random_img_" + ((index + 1) + imgNum) + "'>";
    });

    // 랜덤 이미지 넘버링 12개 단위로 증가
    imgNum += 12;
}

let chk = false; // showBtn 클릭 시 true, stopBtn 클릭 시 false

// show 버튼 클릭 시 stop 버튼 출력 및 showBtn 숨김 처리
showBtn.addEventListener('click', () => {
    chk = true;
    fetchImages(pageToFetch++);

    stopBtn.style.display = "block";
    wrap2.style.display = "none";
});

// stop 버튼 클릭 시 stop 버튼 숨김 처리 및 show 버튼 화면 출력
stopBtn.addEventListener('click', () => {
    chk = false;

    stopBtn.style.display = "none";
    wrap2.style.display = "flex";
});

function throttle(func, delay) {
    let isThrottled = false;

    return function() {
        if (!isThrottled) {
            func();
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
}
function handleScroll() {

    //showBtn 버튼 클릭 and 특정 스크롤 높이 도달 시
    if (chk === true && document.documentElement.scrollTop + 1100 >= document.documentElement.offsetHeight -
        (container4.offsetHeight + container5.offsetHeight + footer.offsetHeight)) {
        fetchImages(pageToFetch++);
    }
}

const throttledHandleScroll = throttle(handleScroll, 300); // 쓰로틀링 딜레이 0.3초

window.addEventListener('scroll', throttledHandleScroll);

// 모달창 관련 변수
const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelector(".btn3");
const btnCloseModal = document.querySelector(".btn4");


const loginForm = document.getElementById("login_form");

function onSubmit(event) {
    event.preventDefault();
}

loginForm.addEventListener("submit", (event) => {

    const value = document.getElementById('input').value;
    // 이메일 검사
    const emailCheck = (email) => {
        let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if (!reg_email.test(value))
            return false;
        else
            return true;
    };

    if (emailCheck(value)) {
        event.preventDefault(); // 새로고침 방지
        modal.style.display = "flex"; // 모달창 출력
    }

    }
);

// btnCloseModal 클릭 시 모달창 숨김
btnCloseModal.addEventListener('click', () => {
    modal.style.display = "none";
});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
