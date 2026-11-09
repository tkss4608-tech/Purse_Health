import { FormEvent, useEffect, useState } from "react";

const assetPath = "/assets";

type Program = {
  number: string;
  tag: string;
  title: string;
  description: string;
  detail: string;
  image: string;
};

const programs: Program[] = [
  {
    number: "01",
    tag: "STRENGTH",
    title: "웨이트 트레이닝",
    description: "기초 체력부터 탄탄하게, 나만의 근력 루틴 만들기",
    detail:
      "정확한 자세와 단계별 운동 강도를 바탕으로 기초 체력부터 근력 향상까지 돕는 프로그램입니다.",
    image: `${assetPath}/2d533.png`,
  },
  {
    number: "02",
    tag: "PERSONAL COACHING",
    title: "1:1 퍼스널 트레이닝",
    description: "목표와 컨디션에 맞춘 세심한 맞춤 코칭",
    detail:
      "현재 체력과 생활 패턴을 확인한 뒤, 전문 코치가 목표에 맞는 운동 루틴을 함께 설계합니다.",
    image: `${assetPath}/d3844.png`,
  },
  {
    number: "03",
    tag: "CONDITIONING",
    title: "체형 · 컨디셔닝",
    description: "균형 잡힌 움직임과 건강한 생활 습관 만들기",
    detail:
      "몸의 움직임을 세심하게 살피고 균형과 가동성을 개선해 일상에서도 편안한 움직임을 만듭니다.",
    image: `${assetPath}/ac97b.png`,
  },
];

const plans = [
  { label: "STARTER", period: "1개월", price: "₩80,000", suffix: "/ 월", ot: "기초 OT 1회" },
  { label: "BEST VALUE", period: "3개월", price: "₩210,000", suffix: "/ 3개월", ot: "기초 OT 2회" },
  { label: "COMMITMENT", period: "6개월", price: "₩360,000", suffix: "/ 6개월", ot: "기초 OT 2회" },
];

const heroSlides = [
  { image: `${assetPath}/ad9d6.png`, position: "center 53%" },
  { image: `${assetPath}/2d533.png`, position: "center 58%" },
  { image: `${assetPath}/ac97b.png`, position: "center 44%" },
];

function Header({
  open,
  onToggle,
  onNavigate,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="logo" href="#top" aria-label="PULSE FITNESS 홈" onClick={onNavigate}>
          <img src={`${assetPath}/6f68e.png`} alt="Pulse Fitness" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={onToggle}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="주요 메뉴">
          <a href="#about" onClick={onNavigate}>
            센터 소개
          </a>
          <a href="#programs" onClick={onNavigate}>
            프로그램
          </a>
          <a href="#membership" onClick={onNavigate}>
            멤버십
          </a>
          <a href="#contact" onClick={onNavigate}>
            오시는 길
          </a>
        </nav>
        <a className="header-cta" href="#contact">
          무료 상담 신청 <span>↗</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);

  // 일정 시간마다 다음 이미지로 전환하고, 컴포넌트가 사라지면 타이머를 정리합니다.
  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % heroSlides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top" aria-label="Pulse Fitness 소개 이미지 슬라이드">
      {heroSlides.map((item, index) => (
        <div
          className={index === slide ? "hero-image is-active" : "hero-image"}
          style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.position }}
          aria-hidden={index !== slide}
          key={item.image}
        />
      ))}
      <div className="hero-shade" />
      <div className="content hero-content">
        <p className="eyebrow hero-eyebrow">— YOUR BODY. YOUR PACE.</p>
        <h1>
          오늘의 움직임이
          <br />
          내일의 나를 만듭니다.
        </h1>
        <p className="hero-copy">
          목표는 달라도 괜찮아요. 당신만의 속도로
          <br />
          건강한 변화를 시작할 수 있도록 함께합니다.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            첫 방문 상담 예약 <span>↗</span>
          </a>
          <a className="text-link light" href="#about">
            PULSE 알아보기 <span>↓</span>
          </a>
        </div>
      </div>
      <div className="slide-controls" aria-label="슬라이드 선택">
        {heroSlides.map((_, index) => (
          <button
            type="button"
            className={index === slide ? "is-active" : ""}
            aria-label={`${index + 1}번 이미지 보기`}
            aria-current={index === slide}
            onClick={() => setSlide(index)}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

function Programs({ onOpen }: { onOpen: (program: Program) => void }) {
  return (
    <section className="section programs-section" id="programs">
      <div className="content">
        <p className="section-label">02 — OUR PROGRAMS</p>
        <h2>
          나에게 맞는
          <br />
          <em>운동을 찾아보세요.</em>
        </h2>
        <p className="section-intro">처음 시작하는 사람부터 새로운 목표에 도전하는 사람까지.</p>
        <div className="program-grid">
          {programs.map((program) => (
            <button
              className="program-card"
              type="button"
              onClick={() => onOpen(program)}
              key={program.number}
            >
              <img src={program.image} alt="" />
              <span className="program-overlay" />
              <span className="program-top">
                <b>{program.number}</b>
                {program.tag}
              </span>
              <strong>{program.title}</strong>
              <span className="program-description">{program.description}</span>
              <span className="program-more">자세히 보기 ↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Membership() {
  // 선택된 멤버십의 번호를 저장합니다. 처음에는 어떤 표도 선택하지 않습니다.
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <section className="section membership-section" id="membership">
      <div className="content">
        <p className="section-label">03 — MEMBERSHIP</p>
        <h2>
          꾸준함을 위한
          <br />
          합리적인 선택.
        </h2>
        <p className="section-intro">멤버십은 예시 요금이며, 실제 운영 시 변경할 수 있습니다.</p>
        <div className="plan-grid" role="radiogroup" aria-label="멤버십 선택">
          {plans.map((plan, index) => (
            <article
              className={selectedPlan === index ? "plan-card selected" : "plan-card"}
              key={plan.period}
              role="radio"
              aria-checked={selectedPlan === index}
              tabIndex={0}
              onClick={() => setSelectedPlan((current) => (current === index ? null : index))}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedPlan((current) => (current === index ? null : index));
                }
              }}
            >
              <p className="plan-label">{plan.label}</p>
              <h3>{plan.period}</h3>
              <div className="price">
                <strong>{plan.price}</strong>
                <span>{plan.suffix}</span>
              </div>
              <ul>
                <li>
                  <span className="plan-check">✓</span>헬스장 자유 이용
                </li>
                <li>
                  <span className="plan-check">✓</span>운동복 대여
                </li>
                <li>
                  <span className="plan-check">✓</span>
                  {plan.ot}
                </li>
              </ul>
              <a href="#contact">상담 신청 ↗</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ onComplete }: { onComplete: () => void }) {
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onComplete();
    event.currentTarget.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="content contact-inner">
        <div className="contact-message">
          <p className="section-label accent">04 — GET STARTED</p>
          <h2>
            변화의 시작,
            <br />
            지금 상담해 보세요.
          </h2>
          <p>
            운동 목표와 궁금한 점을 남겨주시면
            <br />
            확인 후 안내해 드릴게요.
          </p>
        </div>
        <form className="contact-form" onSubmit={submitForm}>
          <label>
            이름
            <input name="name" placeholder="이름을 입력해 주세요" required />
          </label>
          <label>
            연락처
            <input name="phone" type="tel" placeholder="010-0000-0000" required />
          </label>
          <label>
            관심 프로그램
            <select name="program" defaultValue="헬스 자유 이용">
              <option>헬스 자유 이용</option>
              <option>웨이트 트레이닝</option>
              <option>1:1 퍼스널 트레이닝</option>
              <option>체형 · 컨디셔닝</option>
            </select>
          </label>
          <button className="button button-primary submit-button" type="submit">
            상담 신청하기 <span>↗</span>
          </button>
          <small>※ 데모 페이지입니다. 입력 정보는 전송·저장되지 않습니다.</small>
        </form>
      </div>
    </section>
  );
}

function Modal({
  program,
  complete,
  onClose,
}: {
  program: Program | null;
  complete: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  if (!program && !complete) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="팝업 닫기" onClick={onClose}>
          ×
        </button>
        {complete ? (
          <div className="success-content">
            <span className="success-mark">✓</span>
            <p className="section-label">REQUEST COMPLETE</p>
            <h2 id="modal-title">상담 신청이 완료되었습니다.</h2>
            <p>
              데모 페이지이므로 정보는 저장되지 않습니다.
              <br />
              PULSE FITNESS에 관심을 가져주셔서 감사합니다.
            </p>
            <button className="button button-primary" type="button" onClick={onClose}>
              확인
            </button>
          </div>
        ) : (
          program && (
            <>
              <img className="modal-image" src={program.image} alt={`${program.title} 프로그램`} />
              <div className="modal-copy">
                <p className="section-label">
                  {program.number} — {program.tag}
                </p>
                <h2 id="modal-title">{program.title}</h2>
                <p>{program.detail}</p>
                <a className="button button-primary" href="#contact" onClick={onClose}>
                  이 프로그램 상담하기 ↗
                </a>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [complete, setComplete] = useState(false);
  const closeModal = () => {
    setSelectedProgram(null);
    setComplete(false);
  };

  return (
    <>
      <Header
        open={menuOpen}
        onToggle={() => setMenuOpen((value) => !value)}
        onNavigate={() => setMenuOpen(false)}
      />
      <main>
        <Hero />
        <section className="section about-section" id="about">
          <div className="content">
            <p className="section-label">01 — ABOUT PULSE</p>
            <h2>
              운동이 일상이 되는 곳,
              <br />
              <em>당신의 새로운 루틴.</em>
            </h2>
            <div className="stats">
              <div>
                <strong>1:1</strong>
                <span>맞춤형 트레이닝</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>운동 중심 라이프스타일</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>나에게 집중하는 시간</span>
              </div>
            </div>
            <div className="about-copy">
              <a className="text-link" href="#programs">
                센터 프로그램 보기 ↗
              </a>
              <p>
                PULSE FITNESS는 단순히 운동하는 공간을 넘어, 꾸준한 변화가 시작되는 라이프스타일
                공간입니다. 쾌적한 시설과 전문적인 코칭, 나에게 맞는 프로그램으로 운동의 즐거움을
                경험해 보세요.
              </p>
            </div>
          </div>
        </section>
        <Programs onOpen={setSelectedProgram} />
        <section className="brand-statement">
          <h2>“ SMALL STEPS. STRONGER YOU. ”</h2>
          <p>오늘 한 번의 운동이 충분히 멋진 시작입니다.</p>
        </section>
        <Membership />
        <Contact onComplete={() => setComplete(true)} />
      </main>
      <footer>
        <div className="content">
          <h2>PULSE.</h2>
          <p>나만의 페이스로, 더 강하게.</p>
          <address>서울특별시 ○○구 ○○로 123&nbsp;&nbsp;·&nbsp;&nbsp;02-000-0000</address>
          <small>© 2026 PULSE FITNESS. DEMO WEBSITE.</small>
        </div>
      </footer>
      <Modal program={selectedProgram} complete={complete} onClose={closeModal} />
    </>
  );
}
