// =======================
// NEWS DATA (DÙNG CHUNG)
// =======================
const newsData = [
  {
    img: "/picter/blog_bai_viet/thum/05.jpg",
    title: "탄손낫 골프장 리뷰 – 호치민에서 가장 인기 많은 베트남 골프장",
    desc: "탄손넛 골프장의 티타임 요금 및 베트남·한국 고객 전용 프로모션 업데이트.",
    link: "/blog/blog_1.html"
  },
  {
    img: "/picter/blog_bai_viet/thum/01.jpg",
    title: "베트남 골프 여행 필수 코스! 각 골프장 특징·요금·예약 정보 총정리",
    desc: "베트남 남부 인기 골프장 정리.",
    link: "/blog/blog_2.html"
  },
  {
    img: "/picter/blog_bai_viet/thum/bv3.png",
    title: "베트남에서 가장 아름다운 골프장 Top 5",
    desc: "코스 리뷰 & 그린피 안내",
    link: "/blog/blog_3.html"
  },
  {
    img: "/picter/blog_bai_viet/thum/04.jpg",
    title: "베트남에서 꼭 가봐야 할 추천 골프장 3선 – 코스 품질 & 플레이 후기",
    desc: "코스 리뷰 & 그린피 안내",
    link: "/blog/blog_5.html"
  },
  {
    img: "/picter/blog_bai_viet/blog_5/1.jpg",
    title: "베트남 호치민 골프 여행 완벽 가이드 | 신짜오베트남골프",
    desc: "코스 리뷰 & 그린피 안내",
    link: "/blog/blog_6.html"
  },






  {
    img: "/picter/blog_bai_viet/blog_6/1.jpg",
    title: "베트남 골프 여행의 매력과 즐기는 방법",
    desc: "꼭 가봐야 할 골프장",
    link: "/blog/blog_4.html"
  }
];

// =======================
// HELPER
// =======================
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// =======================
// TRANG CHỦ – RANDOM 3 BÀI
// =======================
function renderRandomNews(limitCount = 3) {
  const newsList = document.getElementById("newsList");
  if (!newsList) return;

  const shuffled = shuffle([...newsData]).slice(0, limitCount);
  newsList.innerHTML = "";

  shuffled.forEach(item => {
    newsList.innerHTML += newsCardTemplate(item);
  });
}

// =======================
// BLOG.HTML – FULL BÀI
// =======================
function renderAllNews() {
  const blogList = document.getElementById("blogList");
  if (!blogList) return;

  blogList.innerHTML = "";
  newsData.forEach(item => {
    blogList.innerHTML += newsCardTemplate(item);
  });
}

// =======================
// CARD TEMPLATE (DÙNG CHUNG)
// =======================
function newsCardTemplate(item) {
  return `
    <article class="news-card">
      <a href="${item.link}" class="news-link">
        <img src="${item.img}" alt="${item.title}">
        <h3 class="news-title">${item.title}</h3>
        <p class="news-desc">${item.desc}</p>
      </a>
    </article>
  `;
}

// =======================
// AUTO RUN
// =======================
document.addEventListener("DOMContentLoaded", () => {
  renderRandomNews();   // index.html
  renderAllNews();      // blog.html (nếu tồn tại)
});
