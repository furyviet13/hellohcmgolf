// =======================
// NEWS RANDOM (Tin tức ngẫu nhiên)
// =======================

const newsData = [
  {
    img: "picter/blog_bai_viet/thum/05.JPG",
    title: "호치민에서 공항과 가장 가까운 골프장",
    desc: "탄손넛 골프장의 티타임 요금 및 베트남·한국 고객 전용 프로모션 업데이트.",
    link: "blog_1.html"
  },
  {
    img: "picter/blog_bai_viet/thum/01.JPG",
    title: "베트남 골프 여행 필수 코스! 각 골프장 특징·요금·예약 정보 총정리",
    desc: "베트남 남부의 인기 골프장을 한눈에 확인하세요. 각 코스의 특징, 티타임 요금, 예약 방법까지 모든 정보를 쉽게 정리했습니다.",
    link: "blog_2.html"

  },
  {
    img: "picter/blog_bai_viet/thum/bv3.PNG",
    title: "한국 골퍼가 사랑하는 베트남 골프장 – 코스 리뷰 & 그린피 안내",
    desc: "베트남 인기 골프장의 코스 특징과 그린피를 한눈에 확인하세요.",
    link: "blog_3"

  },
  {
    img: "picter/blog_bai_viet/thum/02.JPG",
    title: "Ưu đãi đặc biệt cho khách Hàn Quốc",
    desc: "Các chương trình giảm giá cuối tuần, giờ vàng.",
    link: "blog_4"
  }




];

// Hàm random mảng
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Render Tin tức ngẫu nhiên (Giới hạn 3 bài)
function renderRandomNews() {
  const shuffled = shuffle([...newsData]); // random danh sách
  const limit = shuffled.slice(0, 3);      // chỉ lấy 3 bài đầu
  const newsList = document.getElementById("newsList");

  if (!newsList) return;

  newsList.innerHTML = "";

  limit.forEach(item => {
    newsList.innerHTML += `
      <article class="news-card">
        <a href="${item.link}" class="news-link">
          <img src="${item.img}" alt="${item.title}" />
          <h3 class="news-title">${item.title}</h3>
          <p class="news-desc">${item.desc}</p>
        </a>
      </article>
    `;
  });
}

// chạy khi load trang
document.addEventListener("DOMContentLoaded", renderRandomNews);



