!(function() {
  var t = function() {
    (this.el = document.createElement("div")),
      this.el.classList.add("wa-mediabox-preloader"),
      (this.wrap = document.createElement("div")),
      this.wrap.classList.add("wa-mediabox-preloader-wrap"),
      (this.spinner = document.createElement("div")),
      this.spinner.classList.add("wa-mediabox-preloader-spinner"),
      (this.patch = document.createElement("div")),
      this.patch.classList.add("wa-mediabox-preloader-patch"),
      (this.clipperLeft = document.createElement("div")),
      this.clipperLeft.classList.add("wa-mediabox-preloader-clipper"),
      this.clipperLeft.classList.add("left"),
      (this.clipperRight = document.createElement("div")),
      this.clipperRight.classList.add("wa-mediabox-preloader-clipper"),
      this.clipperRight.classList.add("right");
    var t = document.createElement("div");
    t.classList.add("wa-mediabox-preloader-circle"),
      this.patch.appendChild(t),
      this.clipperLeft.appendChild(t.cloneNode(!0)),
      this.clipperRight.appendChild(t.cloneNode(!0)),
      this.spinner.appendChild(this.clipperLeft),
      this.spinner.appendChild(this.patch),
      this.spinner.appendChild(this.clipperRight),
      this.wrap.appendChild(this.spinner),
      this.el.appendChild(this.wrap);
  };
  (t.prototype.show = function() {
    this.el.classList.remove("hidden"), (this.el.style.display = "");
  }),
    (t.prototype.hide = function() {
      var t = this;
      this.el.classList.add("hidden"),
        setTimeout(function() {
          t.el.classList.contains("hidden") && (t.el.style.display = "none");
        }, 350);
    });
  var e = function(t) {
    (this.parent = t),
      (this.mediaList = []),
      (this.opened = !1),
      (this.loaded = !1),
      (this.current = null),
      (this.containerWidth = null),
      (this.containerHeight = null);
  };
  (e.prototype.addImage = function(t, e) {
    return (
      this.mediaList.push({ type: "image", src: t, title: e }),
      this.mediaList.length - 1
    );
  }),
    (e.prototype.addIframe = function(t, e, i, n) {
      return (
        this.mediaList.push({
          type: "iframe",
          src: t,
          title: e,
          width: i,
          height: n
        }),
        this.mediaList.length - 1
      );
    }),
    (e.prototype.open = function(e) {
      if (!this.opened) {
        var i = this;
        (this.current = -1),
          (this.loaded = !1),
          (this.overlay = document.createElement("div")),
          this.overlay.classList.add("wa-mediabox-overlay"),
          (this.frame = document.createElement("div")),
          this.frame.classList.add("wa-mediabox-frame"),
          (this.container = document.createElement("div")),
          this.container.classList.add("wa-mediabox-container"),
          (this.title = document.createElement("div")),
          this.title.classList.add("wa-mediabox-title"),
          (this.loading = new t()),
          (this.closeBtn = document.createElement("button")),
          this.closeBtn.classList.add("wa-mediabox-close"),
          (this.closeBtn.innerHTML =
            '<svg viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>'),
          this.closeBtn.setAttribute("title", this.parent.lang.close),
          (this.prevBtn = document.createElement("button")),
          this.prevBtn.classList.add("wa-mediabox-prev"),
          (this.prevBtn.innerHTML =
            '<svg viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>'),
          this.prevBtn.setAttribute("title", this.parent.lang.prev),
          (this.nextBtn = document.createElement("button")),
          this.nextBtn.classList.add("wa-mediabox-next"),
          (this.nextBtn.innerHTML =
            '<svg viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>'),
          this.nextBtn.setAttribute("title", this.parent.lang.next),
          (this.openBtn = document.createElement("button")),
          this.openBtn.classList.add("wa-mediabox-open"),
          (this.openBtn.innerHTML =
            '<svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>'),
          this.openBtn.setAttribute("title", this.parent.lang.openInNew),
          this.frame.appendChild(this.container),
          this.frame.appendChild(this.title),
          this.frame.appendChild(this.loading.el),
          this.frame.appendChild(this.closeBtn),
          this.frame.appendChild(this.prevBtn),
          this.frame.appendChild(this.nextBtn),
          this.frame.appendChild(this.openBtn),
          this.overlay.appendChild(this.frame),
          document.body.appendChild(this.overlay),
          this.overlay.addEventListener("click", function(t) {
            t.stopPropagation(), i.close();
          }),
          this.closeBtn.addEventListener("click", function(t) {
            t.stopPropagation(), i.close();
          }),
          this.prevBtn.addEventListener("click", function(t) {
            t.stopPropagation(), i.prev();
          }),
          this.nextBtn.addEventListener("click", function(t) {
            t.stopPropagation(), i.next();
          }),
          this.container.addEventListener("click", function(t) {
            t.stopPropagation(), i.next();
          }),
          this.openBtn.addEventListener("click", function(t) {
            t.stopPropagation(), i.openSource();
          }),
          (this.resizeHandler = function() {
            i.resizeContainer();
          }),
          (this.keyDownHandler = function(t) {
            return (
              t.preventDefault(),
              t.stopPropagation(),
              37 === t.keyCode
                ? i.prev()
                : 39 === t.keyCode ? i.next() : 27 === t.keyCode && i.close(),
              !1
            );
          }),
          window.addEventListener("resize", this.resizeHandler),
          document.body.addEventListener("keydown", this.keyDownHandler),
          setTimeout(function() {
            i.overlay.classList.add("opened"), i.loadMedia(e);
          }, 10),
          (this.opened = !0);
      }
    }),
    (e.prototype.close = function() {
      if (this.opened) {
        var t = this;
        this.overlay.classList.remove("opened"),
          window.removeEventListener("resize", this.resizeHandler),
          document.body.removeEventListener("keydown", this.keyDownHandler),
          setTimeout(function() {
            t.overlay.parentElement.removeChild(t.overlay),
              (t.opened = !1),
              (t.nextBtn = null),
              (t.prevBtn = null),
              (t.closeBtn = null),
              (t.openBtn = null),
              (t.loading = null),
              (t.container = null),
              (t.frame = null),
              (t.overlay = null),
              (t.current = null),
              (t.containerWidth = null),
              (t.containerHeight = null);
          }, 450);
      }
    }),
    (e.prototype.resizeContainer = function() {
      if (this.opened) {
        this.containerWidth ||
          (this.containerWidth = Math.round(0.7 * this.overlay.offsetWidth)),
          this.containerHeight ||
            (this.containerHeight = Math.round(0.7 * this.overlay.offsetWidth));
        var t = 160;
        this.overlay.offsetWidth < 480 && (t = 70);
        var e = Math.min(
            0.9 * this.overlay.offsetWidth,
            this.overlay.offsetWidth - t
          ),
          i = Math.min(
            0.9 * this.overlay.offsetHeight,
            this.overlay.offsetHeight - 64
          ),
          n = this.containerWidth,
          s = this.containerHeight,
          a = n / s;
        n > e && ((n = Math.round(e)), (s = n / a)),
          s > i && ((s = Math.round(i)), (n = s * a)),
          (this.frame.style.width = n + "px"),
          (this.frame.style.height = s + "px"),
          (this.frame.style.marginLeft = -Math.round(n / 2) + "px"),
          (this.frame.style.marginTop = -Math.round(s / 2) + "px");
      }
    }),
    (e.prototype.setMedia = function(t, e, i, n, s) {
      if (this.opened) {
        var a = this;
        (this.loaded = !1),
          this.frame.classList.remove("can-open-in-new"),
          a.frame.classList.remove("has-title"),
          (this.container.innerHTML = "");
        var r = null;
        "image" == t
          ? (n && (this.containerWidth = n),
            s && (this.containerHeight = s),
            this.resizeContainer(),
            (r = document.createElement("img")),
            r.addEventListener("load", function() {
              (a.containerWidth = r.width),
                (a.containerHeight = r.height),
                a.resizeContainer(),
                a.frame.classList.add("can-open-in-new"),
                a.container.appendChild(r);
            }),
            (r.src = e))
          : (n && (this.containerWidth = n),
            s && (this.containerHeight = s + (i ? 52 : 0)),
            this.resizeContainer(),
            (r = document.createElement("iframe")),
            (r.src = e),
            r.setAttribute("width", parseInt(this.frame.style.width)),
            r.setAttribute(
              "height",
              parseInt(this.frame.style.height) - (i ? 52 : 0)
            ),
            r.setAttribute("frameborder", "0"),
            r.setAttribute("allowfullscreen", "allowfullscreen"),
            this.container.appendChild(r)),
          r.addEventListener("load", function() {
            setTimeout(function() {
              i &&
                ((a.title.innerHTML = i), a.frame.classList.add("has-title")),
                a.frame.classList.add("loaded"),
                a.loading.hide(),
                (a.loaded = !0);
            }, 550);
          });
      }
    }),
    (e.prototype.loadMedia = function(t) {
      if (this.opened && t != this.current) {
        var e = this;
        if (!this.mediaList[t]) throw new Error("Undefined media");
        var i = function() {
          e.setMedia(
            e.mediaList[t].type,
            e.mediaList[t].src,
            e.mediaList[t].title,
            e.mediaList[t].width,
            e.mediaList[t].height
          );
        };
        this.loaded
          ? (this.frame.classList.remove("loaded"),
            this.loading.show(),
            setTimeout(i, 350))
          : i(),
          t > 0
            ? this.frame.classList.add("has-prev")
            : this.frame.classList.remove("has-prev"),
          t < this.mediaList.length - 1
            ? this.frame.classList.add("has-next")
            : this.frame.classList.remove("has-next"),
          (this.current = t);
      }
    }),
    (e.prototype.prev = function() {
      if (this.opened) {
        var t = Math.max(0, this.current - 1);
        this.loadMedia(t);
      }
    }),
    (e.prototype.next = function() {
      if (this.opened) {
        var t = Math.min(this.mediaList.length - 1, this.current + 1);
        this.loadMedia(t);
      }
    }),
    (e.prototype.openSource = function() {
      this.opened && window.open(this.mediaList[this.current].src);
    });
  var i = function() {
    (this.lang = {
      prev: "Previous",
      next: "Next",
      close: "Close",
      openInNew: "Open in new window"
    }),
      (this.galleries = {});
  };
  (i.prototype.openGallery = function(t, e) {
    if (!this.galleries[t]) throw new Error("Gallery not found");
    this.galleries[t].open(e);
  }),
    (i.prototype.addImage = function(t, i, n) {
      return (
        this.galleries[t] || (this.galleries[t] = new e(this)),
        this.galleries[t].addImage(i, n)
      );
    }),
    (i.prototype.addIframe = function(t, i, n, s, a) {
      return (
        this.galleries[t] || (this.galleries[t] = new e(this)),
        this.galleries[t].addIframe(i, n, s, a)
      );
    }),
    (i.prototype.bind = function(t) {
      if (!t._waMediaBoxBound) {
        t._waMediaBoxBound = !0;
        var e = this,
          i = t.getAttribute("data-mediabox") || "_",
          n = t.getAttribute("href") || t.getAttribute("data-src"),
          s = t.getAttribute("data-title"),
          a =
            t.hasAttribute("data-iframe") || n.indexOf("youtube") >= 0
              ? !0
              : !1,
          r = t.hasAttribute("data-width")
            ? parseInt(t.getAttribute("data-width"))
            : null,
          o = t.hasAttribute("data-height")
            ? parseInt(t.getAttribute("data-height"))
            : null,
          d = null;
        (d = a ? this.addIframe(i, n, s, r, o) : this.addImage(i, n, s)),
          t.addEventListener("click", function(t) {
            return (
              t.preventDefault(), t.stopPropagation(), e.openGallery(i, d), !1
            );
          });
      }
    }),
    (i.prototype.bindAll = function(t) {
      for (
        var e = t.querySelectorAll("a[data-mediabox]"), i = 0;
        i < e.length;
        i++
      )
        this.bind(e.item(i));
    }),
    (window.WAMediaBox = new i()),
    window.addEventListener("load", function() {
      window.WAMediaBox.bindAll(document.body);
    });
})();
var ready = function(fn) {
  if (typeof fn !== "function") return;
  if (document.readyState === "complete") {
    return fn();
  }
  document.addEventListener("DOMContentLoaded", fn, false);
};

(function(root, smoothScroll) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(smoothScroll);
  } else if (typeof exports === "object" && typeof module === "object") {
    module.exports = smoothScroll();
  } else {
    root.smoothScroll = smoothScroll();
  }
})(this, function() {
  "use strict";
  if (typeof window !== "object") return;
  if (
    document.querySelectorAll === void 0 ||
    window.pageYOffset === void 0 ||
    history.pushState === void 0
  ) {
    return;
  }
  var getTop = function(element, start) {
    if (element.nodeName === "HTML") return -start;
    return element.getBoundingClientRect().top + start;
  };
  var easeInOutCubic = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  var position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration);
  };
  var smoothScroll = function(el, duration, offset, callback, context) {
    duration = duration || 500;
    context = context || window;
    var start = context.scrollTop || window.pageYOffset + offset;
    if (typeof el === "number") {
      var end = parseInt(el);
    } else {
      var end = getTop(el, start);
    }
    var clock = Date.now();
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(fn) {
        window.setTimeout(fn, 15);
      };
    var step = function() {
      var elapsed = Date.now() - clock;
      if (context !== window) {
        context.scrollTop = position(start, end, elapsed, duration);
      } else {
        window.scroll(0, position(start, end, elapsed, duration));
      }
      if (elapsed > duration) {
        if (typeof callback === "function") {
          callback(el);
        }
      } else {
        requestAnimationFrame(step);
      }
    };
    step();
  };
  var linkHandler = function(ev) {
    if (!ev.defaultPrevented) {
      ev.preventDefault();
      if (location.hash !== this.hash)
        window.history.pushState(null, null, this.hash);
      var node = document.getElementById(this.hash.substring(1));
      if (!node) return;
      smoothScroll(node, 500, function(el) {
        location.replace("#" + el.id);
      });
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
    var internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'),
      a;
    for (var i = internal.length; (a = internal[--i]); ) {
      a.addEventListener("click", linkHandler, false);
    }
  });
  return smoothScroll;
});

ready(function() {
  //swiper
  var mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom"
    }
  });

  //smoothScroll
  function scrollTo(element, offset) {
    offset = offset * -1 || 0;
    window.smoothScroll(element, 700, offset);
  }
  var navbar = document.querySelector(".nav");
  var navContainerHeight = 72;

  //navigation
  var scrollDownButton = document.querySelector(".header button");
  scrollDownButton.addEventListener("click", function() {
    scrollTo(document.getElementById("news"), navContainerHeight);
  });

  //menu
  var navLinkContainer = document.querySelector(".nav__link-container");
  var hamburgerIcon = document.querySelector(".nav__hamburger-icon");
  hamburgerIcon.addEventListener("click", function() {
    navLinkContainer.classList.toggle("open");
  });

  var navLinks = document.querySelectorAll(".nav__link");

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function(e) {
      navLinkContainer.classList.toggle("open");
      var id = e.target.getAttribute("data-src");
      scrollTo(document.getElementById(id), navContainerHeight);
    });
  }

  var contactLinks = document.querySelectorAll(".contactButton");
  console.dir(contactLinks);

  for (var i = 0; i < contactLinks.length; i++) {
    contactLinks[i].addEventListener("click", function(e) {
      var id = e.target.getAttribute("data-src");
      scrollTo(document.getElementById(id), navContainerHeight);
      console.log('asd');
    });
  }


  //sticky navbar
  //todo throttling?
  var newsSectionOffset = document.getElementById("news").offsetTop;
  document.addEventListener("scroll", function() {
    if (window.pageYOffset >= newsSectionOffset - 200) {
      navbar.classList.add("visible");
    } else {
      navbar.classList.remove("visible");
    }
  });

  //card
  var cardButtons = document.querySelectorAll(".card .card__button");
  var cardFronts = document.querySelectorAll(".card__front");

  for (var i = 0; i < cardButtons.length; i++) {
    cardButtons[i].addEventListener("click", function(e) {
      var parentNode = e.target.parentNode;
      parentNode.classList.toggle("open");
      if (parentNode.classList.contains("open")) {
        this.innerText = "\u25BC";
      } else {
        this.innerText = this.getAttribute("data-text");
      }
    });
  }

  for (var i = 0; i < cardFronts.length; i++){
    cardFronts[i].addEventListener('click', function(e){
      e.target.classList.toggle('open');
      var cardButton = e.target.querySelector('.card__button');
      if (e.target.classList.contains("open")) {
        cardButton.innerText = "\u25BC";
      } else {
        cardButton.innerText = this.getAttribute("data-text");
      }
    });
  }
});
