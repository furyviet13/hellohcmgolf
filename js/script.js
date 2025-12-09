document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS Loaded");

  // ============================================================
  // 1) LỌC SÂN GOLF + PHÂN TRANG
  // ============================================================

  const locButtons = document.querySelectorAll(".loc-btn");
  const golfCards = Array.from(document.querySelectorAll(".golf-card"));
  const cardsPerPage = 10;

  let currentPage = 1;
  let filteredCards = [...golfCards];

  // --- Hiển thị theo trang ---
  function showPage(page) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    golfCards.forEach(card => card.style.display = "none");
    filteredCards.slice(start, end).forEach(card => card.style.display = "block");

    const pageInfo = document.getElementById("pageInfo");
    if (pageInfo) pageInfo.textContent = `Trang ${page}`;

    const prev = document.getElementById("prevPage");
    const next = document.getElementById("nextPage");
    if (prev && next) {
      prev.disabled = page === 1;
      next.disabled = end >= filteredCards.length;
    }
  }

  // --- Lọc theo khu vực ---
  function filterByLocation(location) {
    filteredCards = golfCards.filter(card => {
      const loc = card.dataset.location;
      return location === "all" || loc === location;
    });

    currentPage = 1;
    showPage(currentPage);

    console.log(`🔎 Hiển thị sân: ${location} (${filteredCards.length} thẻ)`);
  }

  // --- Click nút location ---
  locButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      const location = btn.dataset.location;

      locButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      filterByLocation(location);
    });
  });

  // --- Phân trang ---
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage * cardsPerPage < filteredCards.length) {
        currentPage++;
        showPage(currentPage);
      }
    });
  }

  // --- Khi load trang ---
  const defaultBtn = document.querySelector(".loc-btn.active");
  filterByLocation(defaultBtn ? defaultBtn.dataset.location : "all");

  // ============================================================
  // 2) BANNER SLIDER (auto + fade)
  // ============================================================

  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const slideInterval = 5000;

  if (slides.length > 0) {
    slides[0].classList.add("active");

    function nextSlide() {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }

    let timer = setInterval(nextSlide, slideInterval);

    const banner = document.querySelector(".banner");
    if (banner) {
      banner.addEventListener("mouseenter", () => clearInterval(timer));
      banner.addEventListener("mouseleave", () => {
        timer = setInterval(nextSlide, slideInterval);
      });
    }
  }

  // ============================================================
  // 3) POPUP SÂN GOLF (SLIDER + LINK ĐẶT SÂN + LINK CHI TIẾT)
  // ============================================================

  const popup = document.getElementById("golfPopup");
  const popupContent = document.querySelector(".popup-content");
  const popupTitle = document.getElementById("popupTitle");
  const popupDesc = document.getElementById("popupDesc");
  const popupSlider = document.getElementById("popupSlider");
  const sliderDots = document.getElementById("sliderDots");

  const popupBtn = document.getElementById("popupBtn"); // nút đặt sân
  const popupDetailBtn = document.getElementById("popupDetailBtn"); // nút xem chi tiết

  let currentSlide = 0;

  // --- NGĂN CLICK BÊN TRONG popup gây tắt popup ---
  popupContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // --- CLICK RA NGOÀI popup → tắt popup ---
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
      document.body.classList.remove("popup-open");
    }
  });
 
  
  // --- DANH SÁCH HÌNH ---
  const golfImages = {
    "투득cc": [
      "picter/golf-hcm/thuduc/1.jpg",
      "picter/golf-hcm/thuduc/2.jpg",
      "picter/golf-hcm/thuduc/3.jpg",
      "picter/golf-hcm/thuduc/4.png",
      "picter/golf-hcm/thuduc/5.jpg"
    ],

    "탄손넛 cc": [
      "picter/golf-hcm/tansonnhat/1.jpg",
      "picter/golf-hcm/tansonnhat/2.jpg",
      "picter/golf-hcm/tansonnhat/3.jpg",
      "picter/golf-hcm/tansonnhat/4.jpg",
      "picter/golf-hcm/tansonnhat/5.jpg"
    ],
    
    "태광정산cc": [
      "picter/golf-hcm/Taekwang Jeongsan/1.jpg",
      "picter/golf-hcm/Taekwang Jeongsan/2.jpg",
      "picter/golf-hcm/Taekwang Jeongsan/3.jpg",
      "picter/golf-hcm/Taekwang Jeongsan/4.jpg",
      "picter/golf-hcm/Taekwang Jeongsan/5.jpg"
    ],

    "롱탄cc": [
      "picter/golf-hcm/longthanh/1.jpg",
      "picter/golf-hcm/longthanh/2.jpg",
      "picter/golf-hcm/longthanh/3.jpg",
      "picter/golf-hcm/longthanh/4.jpg",
      "picter/golf-hcm/longthanh/5.jpg"
    ],

    "트윈도브cc": [
      "picter/golf-hcm/Twin Doves/1.jpg",
      "picter/golf-hcm/Twin Doves/2.jpg",
      "picter/golf-hcm/Twin Doves/3.jpg",
      "picter/golf-hcm/Twin Doves/4.jpg",
      "picter/golf-hcm/Twin Doves/5.jpg"
    ],

    "송베 골프 리조트": [
      "picter/golf-hcm/songbe/1.jpg",
      "picter/golf-hcm/songbe/2.jpg",
      "picter/golf-hcm/songbe/3.jpg",
      "picter/golf-hcm/songbe/4.jpg",
      "picter/golf-hcm/songbe/5.jpg"
    ],

    "동나이 골프 리조트": [
      "picter/golf-hcm/dongnai/1.jpg",
      "picter/golf-hcm/dongnai/2.jpg",
      "picter/golf-hcm/dongnai/3.jpg",
      "picter/golf-hcm/dongnai/4.jpg",
      "picter/golf-hcm/dongnai/5.jpg"
    ],

    "하모니cc": [
      "picter/golf-hcm/hamony/1.jpg",
      "picter/golf-hcm/hamony/2.jpg",
      "picter/golf-hcm/hamony/3.jpg",
      "picter/golf-hcm/hamony/4.jpg",
      "picter/golf-hcm/hamony/5.jpg"
    ],
    
    "빈펄 레만": [
      "picter/golf-hcm/vinperd/1.jpg",
      "picter/golf-hcm/vinperd/2.jpg",
      "picter/golf-hcm/vinperd/3.jpg",
      "picter/golf-hcm/vinperd/4.jpg",
      "picter/golf-hcm/vinperd/5.jpg"
    ]
  };

  // --- MÔ TẢ SÂN ---
  const golfDescriptions = {
  "투득cc": "투득 골프 클럽은 호치민 도심에서 가까운 투득 지역에 위치한 36홀 대형 골프장으로, East 코스와 West 코스 각각의 개성 있는 레이아웃이 조화를 이룹니다. 안정적인 코스 관리와 편안한 플레이 환경 덕분에 초보자부터 상급자까지 모두 만족할 수 있는 인기 코스로 꼽힙니다.",

  "탄손넛 cc": "탄손넛 골프 클럽은 호치민 공항 바로 옆에 위치한 베트남 대표 36홀 프리미엄 골프장으로, 국제 기준의 코스 설계와 최고의 접근성을 자랑합니다. 야간 라운딩 시설도 완비되어 짧은 일정이나 출장 중에도 편리하게 이용할 수 있습니다.",

  "태광정산cc": "태광 정산CC는 동나이의 정산섬에 조성된 풍경이 아름다운 18홀 리조트형 골프장으로, 사이공 강을 따라 펼쳐지는 탁 트인 자연경관이 큰 매력입니다. 조용하고 여유로운 분위기 속에서 힐링 라운딩을 즐기고 싶은 골퍼들에게 특히 인기 있습니다.",

  "롱탄cc": "롱탄 골프 클럽은 베트남 남부에서 가장 완성도 높은 프리미엄 36홀 골프장으로, Hill 코스와 Lake 코스 특유의 난이도와 조경이 조화를 이루는 것이 특징입니다. 접근성, 코스 퀄리티, 서비스 모든 면에서 높은 평가를 받는 인기 골프장입니다.",

  "트윈도브cc": "트윈도브 골프 클럽은 빈즈엉 지역의 27홀 멤버십 골프장으로, Luna·Stella·Sole 코스 각각 다른 전략적 요소를 갖추고 있어 방문할 때마다 색다른 라운딩을 경험할 수 있습니다. 최고급 시설과 안정적인 코스 관리로 호치민 근교 프리미엄 코스로 유명합니다.",

  "송베 골프 리조트": "송베 골프 리조트는 베트남 최초의 국제 규격 27홀 챔피언십 골프장으로, Palm·Lotus·Desert 코스 각각 개성 있는 플레이를 제공합니다. 다양한 난이도와 자연지형을 살린 코스로 가성비 높은 라운딩을 원하는 골퍼에게 많은 사랑을 받고 있습니다.",

  "동나이 골프 리조트": "동나이 골프 리조트는 자연 호수와 숲이 어우러진 천연 리조트형 27홀 골프장으로, 조용하고 평온한 분위기 속에서 힐링 라운딩을 즐길 수 있는 것이 특징입니다. 자연 친화적인 환경과 합리적인 그린피로 높은 만족도를 자랑합니다.",

  "하모니cc": "하모니CC는 빈즈엉 지역의 고급 18홀 프리미엄 코스로, 빠른 그린 속도와 정교하게 설계된 코스 레이아웃이 특징입니다. 클럽하우스 시설 또한 호텔급으로 평가되며, 중·상급 골퍼들에게 특히 높은 만족도를 제공합니다.",

  "빈펄 레만": "빈펄 레만 골프 클럽은 Vinpearl 브랜드가 운영하는 자연형 18홀 골프장으로, 리조트와 함께 구성된 편리한 환경과 완벽한 코스 관리가 돋보입니다. 휴양과 골프를 동시에 즐기고 싶은 골퍼들에게 최적의 선택입니다."
};


  // --- LINK ĐẶT SÂN ---
 const golfLinks = {
  "탄손넛 cc": "http://pf.kakao.com/_xdBALn/chat",
  "투득cc": "http://pf.kakao.com/_xdBALn/chat",
  "트윈도브cc": "http://pf.kakao.com/_xdBALn/chat",
  "태광정산cc": "http://pf.kakao.com/_xdBALn/chat",
  "롱탄cc": "http://pf.kakao.com/_xdBALn/chat",
  "송베 골프 리조트": "http://pf.kakao.com/_xdBALn/chat",
  "동나이 골프 리조트": "http://pf.kakao.com/_xdBALn/chat",
  "하모니cc": "http://pf.kakao.com/_xdBALn/chat",
  "빈펄 레만": "http://pf.kakao.com/_xdBALn/chat"
};


  // --- LINK XEM CHI TIẾT ---
const golfDetailLinks = {
  "탄손넛 cc": "tan_son_nhat.html",
  "투득cc": "thu_duc.html",
  "태광정산cc": "Taekwang.html",
  "롱탄cc": "longthanh.html",
  "트윈도브cc": "Twin_Doves.html",
  "송베 골프 리조트": "song_be.html",
  "동나이 골프 리조트": "dong_nai.html",
  "하모니cc": "harmony.html",
  "빈펄 레만": "Vinperd_Lemmon.html"
};


  // --- TÁCH TÊN CHUẨN ---
  function normalizeName(title) {
    return title.includes("/")
      ? title.split("/")[0].trim()
      : title.trim();
  }

  // --- CLICK MỞ POPUP ---
  document.querySelectorAll(".golf-card").forEach(card => {
    card.addEventListener("click", () => {

      const rawTitle = card.querySelector("h3").innerText;
      const title = normalizeName(rawTitle);

      popupTitle.innerText = title;
      popupDesc.innerText = golfDescriptions[title] || "";

      const images = golfImages[title] || [card.querySelector("img").src];

      popupSlider.innerHTML = "";
      sliderDots.innerHTML = "";

      images.forEach((src, i) => {
        popupSlider.innerHTML += `<img src="${src}">`;
        sliderDots.innerHTML += `<div class="dot" data-index="${i}"></div>`;
      });

      // --- GÁN LINK ---
      popupBtn.href = golfLinks[title] || "#";
      popupDetailBtn.href = golfDetailLinks[title] || "#";

      // --- Reset slider ---
      currentSlide = 0;
      updateSlider();

      popup.style.display = "flex";
      document.body.classList.add("popup-open");
    });
  });

  // ============================================================
  // 4) SLIDER TRONG POPUP
  // ============================================================

  function updateSlider() {
    popupSlider.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
    const activeDot = document.querySelector(`.dot[data-index="${currentSlide}"]`);
    if (activeDot) activeDot.classList.add("active");
  }

  document.querySelector(".prev-btn").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + popupSlider.children.length) % popupSlider.children.length;
    updateSlider();
  });

  document.querySelector(".next-btn").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % popupSlider.children.length;
    updateSlider();
  });

  sliderDots.addEventListener("click", e => {
    if (e.target.classList.contains("dot")) {
      currentSlide = Number(e.target.dataset.index);
      updateSlider();
    }
  });

});
