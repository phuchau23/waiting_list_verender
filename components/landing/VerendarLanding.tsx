"use client";

import Image from "next/image";
import { useEffect } from "react";
import "./verendar.css";

function formatCountValue(value: number, el: Element): string {
  const format = el.getAttribute("data-count-format");
  const suffix = el.getAttribute("data-count-suffix") || "";
  if (format === "vn") {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  if (format === "vnd") {
    return `${value}đ`;
  }
  return `${value}${suffix}`;
}

function runCountUp(el: HTMLElement) {
  if (el.dataset.counted === "true") return;
  const target = Number(el.dataset.count);
  if (Number.isNaN(target)) return;
  el.dataset.counted = "true";

  const duration = 1300;
  const start = performance.now();

  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = formatCountValue(Math.round(target * eased), el);
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 4.8L20 8l-4 3.9.9 5.6L12 15l-4.9 2.5.9-5.6L4 8l5.6-1.2z" />
    </svg>
  );
}

export default function VerendarLanding() {
  useEffect(() => {
    const root = document.querySelector(".verendar-landing");
    if (!root) return;

    const items = document.querySelectorAll(".verendar-landing .faq-item");
    const cleanups: (() => void)[] = [];

    items.forEach((item) => {
      const q = item.querySelector(".faq-q") as HTMLButtonElement | null;
      const a = item.querySelector(".faq-a") as HTMLElement | null;
      if (!q || !a) return;

      if (item.classList.contains("open")) {
        a.style.maxHeight = `${a.scrollHeight}px`;
      }

      const handler = () => {
        const isOpen = item.classList.contains("open");
        items.forEach((other) => {
          other.classList.remove("open");
          const otherA = other.querySelector(".faq-a") as HTMLElement | null;
          if (otherA) otherA.style.maxHeight = "";
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = `${a.scrollHeight}px`;
        }
      };

      q.addEventListener("click", handler);
      cleanups.push(() => q.removeEventListener("click", handler));
    });

    const toggle = document.querySelector(".verendar-landing .mobile-toggle");
    const links = document.querySelector(".verendar-landing .nav-links");
    let toggleHandler: (() => void) | undefined;

    if (toggle && links) {
      toggleHandler = () => links.classList.toggle("is-open");
      toggle.addEventListener("click", toggleHandler);
    }

    const header = root.querySelector("header");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealEls = root.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    revealEls.forEach((el) => {
      revealObserver.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
    });

    const progressFill = root.querySelector(".progress-fill");
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-animated");
        });
      },
      { threshold: 0.4 }
    );
    if (progressFill) progressObserver.observe(progressFill);

    const countEls = root.querySelectorAll<HTMLElement>("[data-count]");
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCountUp(entry.target as HTMLElement);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countEls.forEach((el) => countObserver.observe(el));

    return () => {
      cleanups.forEach((fn) => fn());
      if (toggle && toggleHandler) toggle.removeEventListener("click", toggleHandler);
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      progressObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return (
    <div className="verendar-landing">
      <header>
        <nav className="nav">
          <a href="#top" className="logo">
            <Image
              src="/images/logo.png"
              alt="Verendar"
              width={160}
              height={90}
              className="logo-img"
              priority
            />
          </a>
          <div className="nav-links">
            <a href="#tinh-nang">Tính năng</a>
            <a href="#cach-hoat-dong">Cách hoạt động</a>
            <a href="#danh-gia">Đánh giá</a>
            <a href="#faq">Câu hỏi</a>
          </div>
          <a href="#dat-lich" className="btn btn-primary btn-sm">
            Đặt lịch miễn phí
          </a>
          <button type="button" className="mobile-toggle" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
          </div>
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy hero-enter">
                <span className="eyebrow">Ra mắt tại Hồ Chí Minh · 100 suất Thành viên sáng lập</span>
                <h1 className="display">
                  Sửa xe máy,
                  <br />
                  không còn phải <em>đoán giá</em>.
                </h1>
                <p className="lead">
                  Verendar cho bạn xem báo giá từng hạng mục trước khi garage mở cốp xe — không phụ phí phát sinh,
                  không &quot;hên xui&quot; khi mang xe đi sửa.
                </p>
                <div className="hero-cta">
                  <a href="#dat-lich" className="btn btn-red">
                    Đặt lịch miễn phí →
                  </a>
                  <a href="#cach-hoat-dong" className="btn btn-ghost">
                    Xem cách hoạt động
                  </a>
                </div>
                <ul className="hero-trust">
                  <li>
                    <CheckIcon />
                    Garage được kiểm định
                  </li>
                  <li>
                    <CheckIcon />
                    Không cần tải app
                  </li>
                  <li>
                    <CheckIcon />
                    Miễn phí đặt lịch
                  </li>
                </ul>
              </div>

              <div className="hero-visual hero-enter-visual">
                <div className="hero-banner">
                  <Image
                    src="/images/banner.png"
                    alt="Verendar — Take care your bike, like your wallet"
                    width={2659}
                    height={984}
                    priority
                  />
                </div>
                <div className="ticket-wrap">
                  <div className="float-chip chip-1">
                    <CheckIcon />
                    Đã kiểm định
                  </div>
                  <div className="ticket">
                    <div className="ticket-head">
                      <div>
                        <div className="t-title">Phiếu dịch vụ</div>
                        <div className="t-num">#VRD-0847 · Garage Thành Phát</div>
                      </div>
                      <span className="t-badge">
                        <StarIcon />
                        4.9/5
                      </span>
                    </div>
                    <div className="t-line">
                      <span>Thay nhớt máy Motul 3000</span>
                      <span className="price">90.000đ</span>
                    </div>
                    <div className="t-line">
                      <span>Kiểm tra hệ thống phanh</span>
                      <span className="free">Miễn phí</span>
                    </div>
                    <div className="t-line">
                      <span>Vệ sinh lọc gió</span>
                      <span className="price">40.000đ</span>
                    </div>
                    <div className="t-line">
                      <span>Công thợ</span>
                      <span className="price">30.000đ</span>
                    </div>
                    <div className="ticket-notch" />
                    <div className="t-total">
                      <span className="lbl">Tổng cộng</span>
                      <span className="amt">160.000đ</span>
                    </div>
                    <div className="ticket-foot">
                      <span>Báo giá trước khi sửa</span>
                      <span>Hồ Chí Minh, 14:20</span>
                    </div>
                  </div>
                  <div className="float-chip chip-2">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21c-4.4-3-8-6.3-8-10.5A5.5 5.5 0 0112 7a5.5 5.5 0 018 3.5c0 4.2-3.6 7.5-8 10.5z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    2.480 chủ xe tin dùng
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-strip reveal">
            <div className="wrap">
              <div className="strip-grid reveal-stagger">
                <div className="strip-card">
                  <div className="strip-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M5 9h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="strip-value" data-count="0" data-count-format="vnd">
                    0đ
                  </div>
                  <div className="strip-label">Phí đặt lịch</div>
                </div>
                <div className="strip-card">
                  <div className="strip-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 9l9-6 9 6v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <div className="strip-value" data-count="120" data-count-suffix="+">
                    120+
                  </div>
                  <div className="strip-label">Garage đối tác</div>
                </div>
                <div className="strip-card">
                  <div className="strip-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="strip-value strip-value-text">15 phút</div>
                  <div className="strip-label">Nhận báo giá</div>
                </div>
                <div className="strip-card">
                  <div className="strip-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21c-4.4-3-8-6.3-8-10.5A5.5 5.5 0 0112 7a5.5 5.5 0 018 3.5c0 4.2-3.6 7.5-8 10.5z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                  <div className="strip-value" data-count="2480" data-count-format="vn">
                    2.480
                  </div>
                  <div className="strip-label">Chủ xe đang dùng</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Vấn đề</span>
              <h2 className="display">Đi sửa xe, ai cũng từng thấy bất an.</h2>
              <p>
                Không phải vì garage nào cũng xấu — mà vì chủ xe không có cách nào biết trước mình sẽ trả bao nhiêu,
                cho việc gì.
              </p>
            </div>
            <div className="pain-grid reveal-stagger">
              <div className="pain-card">
                <div className="pain-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 8v5m0 3h.01M10.3 3.9L2.7 17.5A1.8 1.8 0 004.3 20h15.4a1.8 1.8 0 001.6-2.5L13.7 3.9a1.8 1.8 0 00-3.4 0z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Không biết giá trước</h3>
                <p>Mang xe đến rồi mới nghe báo giá — không còn đường để so sánh hay từ chối.</p>
              </div>
              <div className="pain-card">
                <div className="pain-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Không rõ garage nào uy tín</h3>
                <p>Chọn đại một tiệm gần nhà vì không có cách nào kiểm chứng tay nghề hay đánh giá thật.</p>
              </div>
              <div className="pain-card">
                <div className="pain-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </div>
                <h3>Quên lịch bảo dưỡng</h3>
                <p>Nhớ mang máng &quot;hình như tháng trước mới thay nhớt&quot; — rồi để xe hỏng nặng hơn mới đi sửa.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section how reveal" id="cach-hoat-dong">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Cách hoạt động</span>
              <h2 className="display">Ba bước, một lần đặt lịch.</h2>
            </div>
            <div className="how-list">
              <div className="how-step">
                <div className="how-num">01</div>
                <h3>Chọn dịch vụ &amp; garage</h3>
                <p>Nói cho Verendar biết xe bạn đang gặp vấn đề gì, chọn garage đối tác gần bạn nhất.</p>
              </div>
              <div className="how-step">
                <div className="how-num">02</div>
                <h3>Nhận báo giá minh bạch</h3>
                <p>Garage gửi báo giá từng hạng mục trong vòng 15 phút — trước khi bạn mang xe đến.</p>
              </div>
              <div className="how-step">
                <div className="how-num">03</div>
                <h3>Xác nhận &amp; đánh giá</h3>
                <p>Đồng ý giá, mang xe đến sửa, rồi để lại đánh giá thật giúp cộng đồng chọn đúng garage.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="tinh-nang">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Tính năng</span>
              <h2 className="display">Mọi thứ để bạn yên tâm giao xe.</h2>
            </div>
            <div className="feat-grid reveal-stagger">
              <div className="feat-card">
                <CheckIcon />
                <div>
                  <h3>Báo giá minh bạch</h3>
                  <p>Từng hạng mục, từng con số — trước khi thợ chạm vào xe.</p>
                </div>
              </div>
              <div className="feat-card">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3l7 3v5c0 5-3.4 7.7-7 9-3.6-1.3-7-4-7-9V6l7-3z"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3>Garage được kiểm định</h3>
                  <p>Đối tác trải qua đánh giá tay nghề và cam kết giá trước khi lên nền tảng.</p>
                </div>
              </div>
              <div className="feat-card">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="16" rx="2" stroke="#fff" strokeWidth="1.6" />
                  <path d="M4 9h16M8 3v4M16 3v4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <div>
                  <h3>Nhắc lịch bảo dưỡng</h3>
                  <p>Verendar tự nhắc khi đến hạn thay nhớt, lốp, hoặc kiểm tra định kỳ.</p>
                </div>
              </div>
              <div className="feat-card">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21c-4.4-3-8-6.3-8-10.5A5.5 5.5 0 0112 7a5.5 5.5 0 018 3.5c0 4.2-3.6 7.5-8 10.5z"
                    stroke="#fff"
                    strokeWidth="1.6"
                  />
                </svg>
                <div>
                  <h3>Đánh giá thật</h3>
                  <p>Chỉ người từng sửa xe qua Verendar mới được đánh giá garage.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="danh-gia" style={{ background: "var(--paper-2)" }}>
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Cảm nhận</span>
              <h2 className="display">Chủ xe nói gì về Verendar?</h2>
            </div>
            <div className="testi-grid reveal-stagger">
              {[
                {
                  initial: "H",
                  color: "#e31e24",
                  name: "Trần Minh Huy",
                  role: "Tài xế công nghệ, Hồ Chí Minh",
                  quote:
                    "Lần đầu tiên tôi biết chính xác mình trả tiền cho việc gì trước khi để xe lại garage. Không còn cảm giác hồi hộp lúc lấy xe.",
                },
                {
                  initial: "L",
                  color: "#c81e1e",
                  name: "Lê Quốc Bảo",
                  role: "Chủ Garage Bảo Long",
                  quote:
                    "Là chủ garage, tôi thích việc khách đến đã đồng ý giá từ trước. Ít cãi vã hơn, khách quay lại nhiều hơn.",
                },
                {
                  initial: "A",
                  color: "#f87171",
                  name: "Ngô Thảo An",
                  role: "Nhân viên văn phòng",
                  quote:
                    "Nhắc lịch bảo dưỡng đúng lúc xe tôi cần thay nhớt. Nhỏ thôi nhưng đỡ phải nhớ mấy chuyện lặt vặt.",
                },
              ].map((t) => (
                <div key={t.name} className="testi-card">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testi-who">
                    <div className="avatar" style={{ background: t.color }}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="name">{t.name}</div>
                      <div className="role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section founding reveal" id="dat-lich">
          <div className="wrap">
            <div className="founding-grid">
              <div>
                <span className="eyebrow">Thành viên sáng lập</span>
                <h2 className="display">Là một trong 100 chủ xe đầu tiên.</h2>
                <p className="lead">
                  Verendar đang trong giai đoạn ra mắt tại Hồ Chí Minh. 100 chủ xe đăng ký sớm nhất sẽ giữ những quyền lợi
                  này vĩnh viễn — kể cả sau khi ra mắt chính thức.
                </p>
                <ul className="perk-list">
                  <li>
                    <CheckIcon />
                    Miễn phí đặt lịch trọn đời, không giới hạn số lần
                  </li>
                  <li>
                    <CheckIcon />
                    Ưu tiên xếp lịch tại garage đối tác trong giờ cao điểm
                  </li>
                  <li>
                    <CheckIcon />
                    Huy hiệu &quot;Founding Rider&quot; trên hồ sơ cộng đồng
                  </li>
                  <li>
                    <CheckIcon />
                    Đường dây góp ý trực tiếp với đội ngũ sáng lập
                  </li>
                </ul>
              </div>

              <div className="founding-ticket">
                <div className="ft-top">
                  <span className="ft-eyebrow">Vé thành viên sáng lập</span>
                  <div className="ft-title">Founding Rider Pass</div>
                </div>
                <div className="ft-bottom">
                  <div className="progress-track">
                    <div className="progress-fill" />
                  </div>
                  <div className="progress-label">
                    <span>37 suất đã đăng ký</span>
                    <span>100 suất</span>
                  </div>
                  <a href="#dat-lich" className="btn btn-red">
                    Giữ suất của tôi →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="faq">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="section-head" style={{ maxWidth: "100%" }}>
              <span className="eyebrow">Câu hỏi thường gặp</span>
              <h2 className="display">Còn thắc mắc gì trước khi bắt đầu?</h2>
            </div>
            <div className="faq-list">
              {[
                {
                  q: "Verendar có tính phí sử dụng không?",
                  a: "Không. Đặt lịch, nhận báo giá và nhắc bảo dưỡng đều miễn phí cho chủ xe. Verendar thu phí từ garage đối tác, không thu phí người dùng.",
                },
                {
                  q: "Tôi có thể chọn garage bất kỳ không?",
                  a: "Hiện tại bạn chọn trong danh sách garage đối tác đã được Verendar kiểm định. Chúng tôi đang mở rộng thêm garage mới mỗi tuần theo khu vực.",
                },
                {
                  q: "Nếu báo giá thay đổi sau khi kiểm tra thực tế thì sao?",
                  a: "Garage phải xin xác nhận của bạn trước khi thực hiện bất kỳ hạng mục nào ngoài báo giá ban đầu. Bạn luôn có quyền từ chối.",
                },
                {
                  q: "Verendar có ở khu vực của tôi không?",
                  a: "Verendar đang triển khai tại Hồ Chí Minh trong giai đoạn ra mắt. Đăng ký Thành viên sáng lập để được ưu tiên khi mở rộng sang thành phố của bạn.",
                },
                {
                  q: "Tôi cần tải app hay dùng trên web?",
                  a: "Chỉ cần trình duyệt trên điện thoại — không cần tải app. Ứng dụng riêng đang được phát triển cho giai đoạn tiếp theo.",
                },
              ].map((item, i) => (
                <div key={item.q} className={`faq-item${i === 0 ? " open" : ""}`}>
                  <button type="button" className="faq-q">
                    {item.q}
                    <span className="icon" />
                  </button>
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="final-cta">
              <div className="final-cta-main">
                <span className="eyebrow">Bắt đầu ngay</span>
                <h2 className="display">
                  Xe bạn xứng đáng được sửa <em>đúng giá</em>.
                </h2>
                <p>Đặt lịch đầu tiên trong 2 phút, không cần thẻ, không ràng buộc.</p>
              </div>
              <div className="final-cta-side">
                <a href="#dat-lich" className="btn btn-primary final-cta-btn">
                  Đặt lịch miễn phí →
                </a>
                <span className="final-cta-note">Miễn phí · Không ràng buộc</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#top" className="logo foot-logo">
                <Image
                  src="/images/logo.png"
                  alt="Verendar"
                  width={180}
                  height={101}
                  className="logo-img foot-logo-img"
                />
              </a>
              <p>Chăm sóc xe máy của bạn, minh bạch như ví tiền của bạn.</p>
            </div>
            <div className="foot-links">
              <div className="foot-col">
                <h4>Sản phẩm</h4>
                <ul>
                  <li>
                    <a href="#tinh-nang">Tính năng</a>
                  </li>
                  <li>
                    <a href="#cach-hoat-dong">Cách hoạt động</a>
                  </li>
                  <li>
                    <a href="#dat-lich">Thành viên sáng lập</a>
                  </li>
                </ul>
              </div>
              <div className="foot-col">
                <h4>Công ty</h4>
                <ul>
                  <li>
                    <a href="#top">Về Verendar</a>
                  </li>
                  <li>
                    <a href="#dat-lich">Garage đối tác</a>
                  </li>
                  <li>
                    <a href="#faq">Liên hệ</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Verendar. Đã đăng ký bản quyền.</span>
            <span>
              Powered by{" "}
              <a href="https://dream-lab.ai" target="_blank" rel="noopener noreferrer">
                Dream Lab AI
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
