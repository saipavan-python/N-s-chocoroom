

    /* =========================================
       PRELOADER
    ========================================== */

    document.getElementById("copyrightYear").textContent = new Date().getFullYear();

    window.addEventListener("load", () => {

      setTimeout(() => {

        document
          .getElementById("preloader")
          .classList.add("is-hidden");

      }, 1000);

    });


    /* =========================================
       NAVBAR
    ========================================== */

    const navbar =
      document.getElementById("navbar");

    function updateNavbar() {

      if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

      } else {

        navbar.classList.remove("scrolled");

      }

    }

    window.addEventListener(
      "scroll",
      updateNavbar,
      { passive: true }
    );

    updateNavbar();

    const menuButton = document.getElementById("menuButton");
    const siteNavigation = document.getElementById("siteNavigation");
    function setMenuOpen(open) {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      siteNavigation.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    }
    menuButton.addEventListener("click", () => {
      setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });
    siteNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    });


    /* =========================================
       HERO PARALLAX
    ========================================== */

    const hero =
      document.getElementById("hero");

    const heroMedia =
      document.getElementById("heroMedia");

    const heroContent =
      document.getElementById("heroContent");

    function updateHero() {

      const rect =
        hero.getBoundingClientRect();

      const height =
        window.innerHeight;

      const progress =
        Math.min(
          Math.max(
            -rect.top / height,
            0
          ),
          1
        );

      heroMedia.style.transform =
        `
        scale(${1.08 + progress * .07})
        translate3d(
          0,
          ${progress * 8}%,
          0
        )
        `;

      heroContent.style.transform =
        `
        translate3d(
          0,
          ${progress * -80}px,
          0
        )
        rotateX(${progress * 5}deg)
        `;

      heroContent.style.opacity =
        Math.max(
          1 - progress * 1.7,
          0
        );

    }

    window.addEventListener(
      "scroll",
      updateHero,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateHero
    );

    updateHero();


    /* =========================================
       POINTER TILT
    ========================================== */

    if (
      window.matchMedia(
        "(pointer: fine)"
      ).matches
    ) {

      window.addEventListener(
        "mousemove",
        (event) => {

          const x =
            event.clientX /
            window.innerWidth -
            .5;

          const y =
            event.clientY /
            window.innerHeight -
            .5;

          heroContent.style.setProperty(
            "--mouse-x",
            `${x * 5}deg`
          );

          heroContent.style.setProperty(
            "--mouse-y",
            `${y * -4}deg`
          );

        }
      );

    }


    /* =========================================
       REVEAL OBSERVER
    ========================================== */

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

              }

            }
          );

        },
        {
          threshold: .15,
          rootMargin: "0px 0px -8% 0px"
        }
      );

    revealElements.forEach(
      (element) => {

        revealObserver.observe(element);

      }
    );


    /* =========================================
       STORY CHOCOLATE BREAK
    ========================================== */

    const story =
      document.querySelector(".story");

    const storyObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                story.classList.add(
                  "is-visible"
                );

              }

            }
          );

        },
        {
          threshold: .35
        }
      );

    storyObserver.observe(story);


    /* =========================================
       INTRO TEXT TRANSFORMATION
    ========================================== */

    const introTransition =
      document.querySelector(
        ".intro-transition"
      );

    const introWords =
      document.querySelectorAll(
        ".intro-word"
      );

    const introObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                introTransition.classList.add(
                  "is-visible"
                );

              }

            }
          );

        },
        {
          threshold: .2
        }
      );

    introObserver.observe(introTransition);


    function updateIntroWords() {

      if (reduceMotion) {
        return;
      }

      const height =
        window.innerHeight;

      introWords.forEach(
        (word) => {

          const rect =
            word.getBoundingClientRect();

          if (
            rect.bottom < -200 ||
            rect.top > height + 200
          ) {
            return;
          }

          const offset =
            (rect.top + rect.height / 2 - height / 2) /
            height;

          const shift =
            Math.min(
              Math.max(offset, -1),
              1
            );

          const distance =
            Math.abs(shift);

          word.style.transform =
            `
            rotateX(${shift * -48}deg)
            scale(${1 - distance * .16})
            translateY(${shift * 22}px)
            `;

          word.style.opacity =
            1 - distance * .8;

          word.style.filter =
            `blur(${distance * 5}px)`;

        }
      );

    }


    /* =========================================
       PRODUCT FILM PARALLAX
    ========================================== */

    const productFilm =
      document.querySelector(
        ".product-film"
      );

    const filmMedia =
      productFilm.querySelector(
        ".film-media"
      );

    const filmVideo =
      productFilm.querySelector(
        "video"
      );

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const filmObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                productFilm.classList.add(
                  "in-view"
                );

                if (!reduceMotion && !window.matchMedia("(max-width: 600px)").matches) {
                  filmVideo.play().catch(() => {});
                }

              } else {

                filmVideo.pause();

              }

            }
          );

        },
        {
          threshold: .2
        }
      );

    filmObserver.observe(productFilm);


    function updateFilm() {

      if (reduceMotion) {
        return;
      }

      const rect =
        productFilm.getBoundingClientRect();

      const height =
        window.innerHeight;

      const progress =
        Math.min(
          Math.max(
            (height - rect.top) /
              (height + rect.height),
            0
          ),
          1
        );

      filmMedia.style.transform =
        `translate3d(0, ${(progress - .5) * 18}%, 0)`;

    }


    let scrollQueued = false;

    function updateScrollEffects() {

      if (scrollQueued) {
        return;
      }

      scrollQueued = true;

      requestAnimationFrame(() => {

        updateIntroWords();
        updateFilm();

        scrollQueued = false;

      });

    }

    window.addEventListener(
      "scroll",
      updateScrollEffects,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScrollEffects
    );

    updateScrollEffects();


    /* =========================================
       CART
    ========================================== */

    const collectionsTrack = document.getElementById("collectionsTrack");
    const carouselProgress = document.getElementById("carouselProgress");
    const collectionSection = document.getElementById("collections");
    const collectionCards = [...collectionsTrack.querySelectorAll(".collection-card")];
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const COLLECTION_SPEED = 900;
    let loopWidth = 0;
    let runFrame = null;
    let lastFrameTime = 0;
    let collectionHovered = false;
    let collectionInView = true;
    let resumeTimer = null;
    function measureCollectionLoop() {
      const gap = parseFloat(getComputedStyle(collectionsTrack).columnGap) || 20;
      const cardWidth = collectionCards[0] ? collectionCards[0].getBoundingClientRect().width : 0;
      loopWidth = (cardWidth + gap) * collectionCards.length;
      if (loopWidth > 0) collectionsTrack.scrollLeft = ((collectionsTrack.scrollLeft % loopWidth) + loopWidth) % loopWidth;
    }
    collectionCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a,button").forEach((node) => node.setAttribute("tabindex", "-1"));
      collectionsTrack.append(clone);
    });
    function updateCarouselProgress() {
      if (!carouselProgress || !loopWidth) return;
      const visibleRatio = Math.min(1, collectionsTrack.clientWidth / loopWidth);
      const travel = Math.max(1, loopWidth - collectionsTrack.clientWidth);
      const progress = Math.min(1, ((collectionsTrack.scrollLeft % loopWidth) + loopWidth) % loopWidth / travel);
      const offset = visibleRatio < 1 ? ((1 - visibleRatio) / visibleRatio) * progress * 100 : 0;
      carouselProgress.style.width = `${visibleRatio * 100}%`;
      carouselProgress.style.transform = `translateX(${offset}%)`;
    }
    function collectionFrame(timestamp) {
      if (!lastFrameTime) lastFrameTime = timestamp;
      const delta = Math.min(0.1, (timestamp - lastFrameTime) / 1000);
      lastFrameTime = timestamp;
      let next = collectionsTrack.scrollLeft + COLLECTION_SPEED * delta;
      if (next >= loopWidth) next -= loopWidth;
      collectionsTrack.scrollLeft = next;
      updateCarouselProgress();
      runFrame = window.requestAnimationFrame(collectionFrame);
    }
    function startCollectionRun() {
      window.cancelAnimationFrame(runFrame);
      runFrame = null;
      lastFrameTime = 0;
      if (reducedMotionQuery.matches || collectionHovered || !collectionInView || document.hidden || collectionCards.length < 2) return;
      collectionsTrack.classList.add("is-running");
      runFrame = window.requestAnimationFrame(collectionFrame);
    }
    function stopCollectionRun() {
      window.cancelAnimationFrame(runFrame);
      runFrame = null;
      collectionsTrack.classList.remove("is-running");
    }
    function stepCollections(direction) {
      const gap = parseFloat(getComputedStyle(collectionsTrack).columnGap) || 20;
      const cardWidth = collectionCards[0] ? collectionCards[0].getBoundingClientRect().width : collectionsTrack.clientWidth * .82;
      const next = (collectionsTrack.scrollLeft + (cardWidth + gap) * direction + loopWidth) % loopWidth;
      collectionsTrack.scrollTo({left:next,behavior:reducedMotionQuery.matches ? "instant" : "smooth"});
    }
    function resumeCollectionRun(delay) {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startCollectionRun, delay);
    }
    document.getElementById("collectionsPrev").addEventListener("click", () => { stepCollections(-1); resumeCollectionRun(600); });
    document.getElementById("collectionsNext").addEventListener("click", () => { stepCollections(1); resumeCollectionRun(600); });
    collectionsTrack.addEventListener("scroll", updateCarouselProgress, {passive:true});
    collectionsTrack.addEventListener("wheel", () => { stopCollectionRun(); resumeCollectionRun(1200); }, {passive:true});
    collectionsTrack.addEventListener("touchstart", () => { stopCollectionRun(); resumeCollectionRun(1200); }, {passive:true});
    collectionsTrack.addEventListener("pointerenter", () => { collectionHovered = true; stopCollectionRun(); });
    collectionsTrack.addEventListener("pointerleave", () => { collectionHovered = false; startCollectionRun(); });
    collectionsTrack.addEventListener("focusin", () => { stopCollectionRun(); });
    collectionsTrack.addEventListener("focusout", startCollectionRun);
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopCollectionRun(); else startCollectionRun(); });
    reducedMotionQuery.addEventListener("change", startCollectionRun);
    window.addEventListener("resize", () => { measureCollectionLoop(); updateCarouselProgress(); startCollectionRun(); });
    if (collectionSection && "IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        collectionInView = entries[0].isIntersecting;
        if (collectionInView) startCollectionRun(); else stopCollectionRun();
      }, {threshold:0.15}).observe(collectionSection);
    }
    measureCollectionLoop();
    updateCarouselProgress();
    startCollectionRun();

    let cartItems = [];
    try { cartItems = JSON.parse(sessionStorage.getItem("nsChocoroomSelection") || "[]"); } catch (_) { cartItems = []; }
    const addToCart = document.getElementById("addToCart");
    const getChocolateChoice = () => document.querySelector('input[name="chocolateChoice"]:checked')?.value || "";
    const storeImage = document.getElementById("storeImage");
    const storeImageDefault = { src: storeImage.getAttribute("src"), alt: storeImage.alt };
    document.querySelectorAll('input[name="chocolateChoice"]').forEach((option) => {
      option.addEventListener("change", () => {
        if (!option.checked) return;
        const nextSrc = option.dataset.image || storeImageDefault.src;
        if (storeImage.getAttribute("src") === nextSrc) return;
        storeImage.animate([{opacity:1},{opacity:.15},{opacity:1}], {duration:460,easing:"cubic-bezier(.16,1,.3,1)"});
        storeImage.src = nextSrc;
        storeImage.alt = option.dataset.alt || storeImageDefault.alt;
      });
    });
    const cartToast = document.getElementById("cartToast");
    const cartToastText = document.getElementById("cartToastText");
    let toastTimer;
    function showCartToast(message) {
      window.clearTimeout(toastTimer);
      cartToastText.textContent = message;
      cartToast.hidden = false;
      requestAnimationFrame(() => cartToast.classList.add("is-visible"));
      toastTimer = window.setTimeout(() => dismissCartToast(), 4200);
    }
    function dismissCartToast() {
      cartToast.classList.remove("is-visible");
      window.clearTimeout(toastTimer);
      window.setTimeout(() => { if (!cartToast.classList.contains("is-visible")) cartToast.hidden = true; }, 240);
    }
    document.getElementById("toastViewCart").addEventListener("click", () => { dismissCartToast(); openCart(); });
    document.getElementById("toastDismiss").addEventListener("click", dismissCartToast);
    const storeMessage = document.getElementById("storeMessage");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartScrim = document.getElementById("cartScrim");
    const cartItemsElement = document.getElementById("cartItems");
    const cartCountNodes = [document.getElementById("navCartCount"), document.getElementById("storeCartCount"), document.getElementById("drawerCartCount")];
    function saveCart() { try { sessionStorage.setItem("nsChocoroomSelection", JSON.stringify(cartItems)); } catch (_) {} }
    function renderCart() {
      const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartCountNodes.forEach((node) => { if (node) node.textContent = node.id === "drawerCartCount" ? `(${total})` : total; });
      if (!cartItems.length) { cartItemsElement.innerHTML = '<p class="cart-empty">Your tasting list is empty. Choose a chocolate to begin.</p>'; return; }
      cartItemsElement.replaceChildren(...cartItems.map((item, index) => {
        const row = document.createElement("div"); row.className = "cart-item";
        const details = document.createElement("div"); const name = document.createElement("strong"); name.textContent = item.name;
        const qty = document.createElement("span"); qty.textContent = `Quantity ${item.quantity}`; details.append(name, qty);
        const actions = document.createElement("div"); actions.className = "cart-item-actions";
        [["−", "Decrease quantity"], ["+", "Increase quantity"], ["×", "Remove item"]].forEach(([label, aria], actionIndex) => {
          const button = document.createElement("button"); button.type = "button"; button.textContent = label; button.setAttribute("aria-label", `${aria}: ${item.name}`);
          button.addEventListener("click", () => { if (actionIndex === 0) item.quantity--; else if (actionIndex === 1) item.quantity++; else item.quantity = 0; if (item.quantity <= 0) cartItems.splice(index, 1); saveCart(); renderCart(); }); actions.append(button);
        }); row.append(details, actions); return row;
      }));
    }
    function openCart() { dismissCartToast(); cartScrim.hidden = false; cartDrawer.inert = false; cartDrawer.setAttribute("aria-hidden", "false"); requestAnimationFrame(() => { cartScrim.classList.add("is-open"); cartDrawer.classList.add("is-open"); document.getElementById("closeCart").focus(); }); document.body.classList.add("cart-open"); }
    function closeCart() { cartScrim.classList.remove("is-open"); cartDrawer.classList.remove("is-open"); cartDrawer.setAttribute("aria-hidden", "true"); cartDrawer.inert = true; document.body.classList.remove("cart-open"); setTimeout(() => { if (!cartDrawer.classList.contains("is-open")) cartScrim.hidden = true; }, 320); }
    document.getElementById("openCart").addEventListener("click", openCart);
    document.getElementById("openCartSecondary").addEventListener("click", openCart);
    document.getElementById("closeCart").addEventListener("click", closeCart);
    cartScrim.addEventListener("click", closeCart);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) { closeCart(); document.getElementById("openCart").focus(); } });
    addToCart.addEventListener("click", () => {
      const name = getChocolateChoice(); const existing = cartItems.find((item) => item.name === name);
      if (!name) return;
      if (existing) existing.quantity++; else cartItems.push({ name, quantity: 1 });
      saveCart(); renderCart(); storeMessage.textContent = `${name} added to your tasting list.`;
      showCartToast(`${name} saved to your tasting list.`);
      addToCart.animate([{transform:"translateY(0) scale(1)"},{transform:"translateY(-3px) scale(1.02)"},{transform:"translateY(0) scale(1)"}], {duration:380,easing:"cubic-bezier(.16,1,.3,1)"});
    });
    renderCart();

    /* =========================================
       CUSTOM CURSOR
    ========================================== */

    const cursor =
      document.getElementById(
        "cursor"
      );

    if (
      window.matchMedia(
        "(pointer: fine)"
      ).matches
    ) {

      let mouseX = 0;
      let mouseY = 0;

      let cursorX = 0;
      let cursorY = 0;

      window.addEventListener(
        "mousemove",
        (event) => {

          mouseX = event.clientX;
          mouseY = event.clientY;

        }
      );

      function renderCursor() {

        cursorX +=
          (mouseX - cursorX) * .18;

        cursorY +=
          (mouseY - cursorY) * .18;

        cursor.style.left =
          `${cursorX}px`;

        cursor.style.top =
          `${cursorY}px`;

        requestAnimationFrame(
          renderCursor
        );

      }

      renderCursor();


      const interactiveElements =
        document.querySelectorAll(
          "a, button, select"
        );

      interactiveElements.forEach(
        (element) => {

          element.addEventListener(
            "mouseenter",
            () => {

              cursor.classList.add(
                "large"
              );

            }
          );

          element.addEventListener(
            "mouseleave",
            () => {

              cursor.classList.remove(
                "large"
              );

            }
          );

        }
      );

    }


    /* =========================================
       SMOOTH ANCHOR OFFSET
    ========================================== */

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            (event) => {

              const targetId =
                link.getAttribute("href");

              if (
                targetId === "#"
              ) {
                return;
              }

              const target =
                document.querySelector(
                  targetId
                );

              if (!target) {
                return;
              }

              event.preventDefault();

              const fixedHeader = document.querySelector(".navbar");
              const offset = fixedHeader
                ? fixedHeader.getBoundingClientRect().height + 8
                : 8;

              const top = Math.max(
                0,
                target.getBoundingClientRect().top + window.scrollY - offset
              );

              window.scrollTo({
                top,
                behavior: "smooth"
              });

            }
          );

        }
      );

  