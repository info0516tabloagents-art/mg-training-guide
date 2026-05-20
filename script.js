document.addEventListener("DOMContentLoaded", () => {

    // スクロールアニメーション
    const sections = document.querySelectorAll(".section");
    const animateTargets = [];

    sections.forEach(section => {
        const children = section.querySelectorAll(
            ".card, .feature-item, .action-card, .risk-card, .step, .tip-item, " +
            ".settlement-card, .board-area, .timeline-period, .goal-box, .info-col, " +
            ".rule-card, .ruleb-card, .market-table-wrap, .tax-card, .other-rule-item"
        );
        children.forEach(el => {
            el.classList.add("fade-in");
            animateTargets.push(el);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    animateTargets.forEach(el => observer.observe(el));

    // ナビゲーション アクティブ状態
    const navLinks = document.querySelectorAll(".nav-inner a");
    const sectionEls = document.querySelectorAll("section[id]");

    const updateNav = () => {
        const scrollY = window.scrollY + 100;

        sectionEls.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", updateNav);
    updateNav();

    // ナビゲーション表示制御
    const nav = document.getElementById("nav");
    const hero = document.querySelector(".hero");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                nav.style.opacity = "0";
                nav.style.pointerEvents = "none";
            } else {
                nav.style.opacity = "1";
                nav.style.pointerEvents = "auto";
            }
        });
    }, { threshold: 0.1 });

    nav.style.transition = "opacity 0.3s ease";
    navObserver.observe(hero);
});
