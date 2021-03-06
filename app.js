window.onload = function () {
  // themeSettings();
  calcProgress();
  timelineScrolling();
  age();
  trainingYear();
  currentYear();
  intersectionObserver();
  // betaConfig();
  // currentItem();
  // openNav();
  // closeNav();
  expandTile();
};

/* ---------------------------------- Theme --------------------------------- */

function storeTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    storeTheme('light');
  } else {
    storeTheme('dark');
  }
}

function themeSettings() {
  const themeButton = document.getElementById('theme-id');
  if (localStorage.getItem('theme') === 'light') {
    storeTheme('light');
    themeButton.checked = false;
  } else {
    storeTheme('dark');
    themeButton.checked = true;
  }

  const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (preferedTheme.matches) {
    storeTheme('dark');
    themeButton.checked = true;
  } else {
    storeTheme('light');
    themeButton.checked = false;
  }

  themeButton.addEventListener('change', function () {
    const elementsAndClassNames = [
      {
        element: document.getElementById('ac-ln-background'),
        className: 'ac-ln-background-transition',
      },
      {
        element: document.getElementById('ribbon-content-wrapper'),
        className: 'ribbon-content-wrapper-animation',
      },
      {
        element: document.getElementById('ribbon-content'),
        className: 'ribbon-content-animation',
      },
      {
        element: document.getElementById('ribbon-link'),
        className: 'ribbon-link-animation',
      },
    ];

    forEach(elementsAndClassNames, (index, elementAndClassName) => {
      elementAndClassName.element.classList.remove(
        elementAndClassName.className
      );
    });

    setTimeout(() => {
      elementsAndClassNames[0].element.classList.add(
        elementsAndClassNames[0].className
      );
    }, 500);

    setTimeout(() => {
      forEach(elementsAndClassNames, (index, elementAndClassName) => {
        if (index !== 0) {
          elementAndClassName.element.classList.add(
            elementAndClassName.className
          );
        }
      });
    }, 1);
  });
}

/* ------------------------------- Easter Eggs ------------------------------ */

let egg = new Egg();
egg
  .addCode('up,up,down,down,left,right,left,right,b,a', function () {
    jQuery('#egggif').fadeIn(500, function () {
      window.setTimeout(function () {
        jQuery('#egggif').hide();
      }, 5000);
    });
  })
  .addCode('n,i,c,k', function () {
    console.log('Nick Zimmermann');
  })
  .addCode('j,o,n,a,s', function () {
    console.log('Jonas Marschall');
  })
  .addCode('a,w,e,s,o,m,e', function () {
    console.log('Awesome');
  })
  .addHook(function () {
    console.log('This is message is called if any easter egg is found!');
  })
  .listen();

/* -------------------------- IntersectionObserver -------------------------- */

function intersectionObserver() {
  const inViewport = (entries, observer) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
    });
  };

  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {};

  const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
  ELs_inViewport.forEach((EL) => {
    Obs.observe(EL, obsOptions);
  });
}

/* ---------------------------------- Menu ---------------------------------- */

function betaConfig() {
  const Configs = [
    {
      colorVar: 'var(--color-figure-orange)',
      colorHex: 'f56300',
      touchIconPath: 'media/img/beta/favicon-beta-orange.png',
    },
    {
      colorVar: 'var(--color-figure-teal)',
      colorHex: '00c2bb',
      touchIconPath: 'media/img/beta/favicon-beta-teal.png',
    },
    {
      colorVar: 'var(--color-figure-purple)',
      colorHex: 'a95ed2',
      touchIconPath: 'media/img/beta/favicon-beta-purple.png',
    },
  ];
  const betaConfig = random(Configs);
  document.getElementById('beta-badge').style.color = betaConfig.colorVar;
  document
    .getElementById('beta-touch-icon')
    .setAttribute('href', betaConfig.touchIconPath);
  document
    .getElementById('beta-favicon')
    .setAttribute(
      'href',
      `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23${betaConfig.colorHex}%22></rect><path fill=%22%23ffffff%22 d=%22M26.30 69.58Q21.90 69.58 18.71 68.09Q15.52 66.61 13.76 63.80L13.76 63.80L19.64 58.20Q22.17 62.27 26.41 62.27L26.41 62.27Q31.58 62.27 32.79 56.27L32.79 56.27L36.47 37.57L23.00 37.57L24.43 30.42L46.76 30.42L41.64 55.83Q40.21 63.20 36.47 66.39Q32.73 69.58 26.30 69.58L26.30 69.58ZM86.25 42.36Q86.25 47.75 83.33 51.59Q80.41 55.45 75.25 57.04L75.25 57.04L81.95 68.92L72.55 68.92L66.50 58.14L58.91 58.14L56.77 68.92L47.80 68.92L55.50 30.42L71.17 30.42Q78.32 30.42 82.28 33.55Q86.25 36.69 86.25 42.36L86.25 42.36ZM67.88 51.05Q72.33 51.05 74.78 49.01Q77.22 46.98 77.22 43.18L77.22 43.18Q77.22 40.43 75.35 39.06Q73.48 37.68 70.02 37.68L70.02 37.68L62.98 37.68L60.28 51.05L67.88 51.05Z%22></path></svg>`
    );
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function currentItem() {
  const items = document.getElementsByClassName('ac-ln-menu-link');
  for (let i = 0; i < 6; i++) {
    items[i].addEventListener('click', function () {
      // closeNav();
      const current = document.getElementsByClassName('current');
      if (current.length > 0) {
        current[0].className = current[0].className.replace(' current', '');
      }
      this.className += ' current';
    });
  }
}

function openNav() {
  const menuState = document.getElementById('ac-ln-menustate');
  if (menuState.checked) {
    document.getElementById('ac-localnav').classList.add('nav-open');
  }
  menuState.addEventListener('change', function () {
    if (this.checked) {
      document.getElementById('ac-localnav').classList.add('nav-open');
    } else {
      document.getElementById('ac-localnav').classList.remove('nav-open');
    }
  });
}

function closeNav() {
  window.addEventListener('scroll', function () {
    if (
      document.getElementById('ac-localnav').classList.contains('nav-open') &&
      window.scrollY > 0
    ) {
      document.getElementById('ac-localnav').classList.remove('nav-open');
      document.getElementById('ac-ln-menustate').checked = false;
    }
  });
}

function isIntoView(elem) {
  const documentViewTop = $(window).scrollTop();
  const documentViewBottom = documentViewTop + $(window).height();

  const elementTop = $(elem).offset().top;
  const elementBottom = elementTop + $(elem).height();

  return elementBottom <= documentViewBottom && elementTop >= documentViewTop;
}

let lastItertionInView = true;

$(window).scroll(function () {
  const scrollTop = $(window).scrollTop();
  const sections = $('section');
  const navbarLinks = $('nav ul li a');
  let currentId = '';
  sections.each(function () {
    const section = $(this);
    const sectionId = section.attr('id');
    const sectionTop = section.offset().top - 52;
    const sectionBottom = sectionTop + section.height();
    if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
      currentId = sectionId;
    }
  });

  navbarLinks.each(function () {
    const link = $(this);
    const linkId = link.attr('href').split('#')[1];
    if (currentId === linkId) {
      link.addClass('current');
    } else {
      link.removeClass('current');
      lastItertionInView = false;
    }
  });
});

/* ---------------------------------- Modal --------------------------------- */

const eventListener = (event) => {
  if (!document.getElementById('modalBox').contains(event.target)) {
    toggleModal();
  }
};

function toggleModal() {
  if (modal.style.opacity === '1') {
    window.removeEventListener('click', eventListener);

    $('body').css('overflow', 'auto');
    $('body').attr('scroll', 'yes');

    modal.style.opacity = '0';
    // position modal off screen
    modal.style.position = 'absolute';
    modal.style.right = '100%';
  } else {
    // position modal on screen
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.opacity = '1';

    $('body').css('overflow', 'hidden');
    $('body').attr('scroll', 'no');

    setTimeout(() => {
      window.addEventListener('click', eventListener);
    }, 100);
  }
}

/* ----------------------------------- Age ---------------------------------- */

function age() {
  let d1 = 12;
  let m1 = 12;
  let y1 = 2005;

  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }
  let d = d2 - d1;
  let m = m2 - m1;
  let y = y2 - y1;

  document.getElementById('age').textContent = y;
}

/* ------------------------- Training Year ------------------------- */

function trainingYear() {
  let d1 = 01;
  let m1 = 08;
  let y1 = 2021;

  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  let d = 01 - d1;
  let m = 01 - m1;
  let y = 2021 - y1 + 1;

  if (y > 4) {
    y = 4;
  }

  document.getElementById('training-year').textContent = y;
}

/* ------------------------------ Current Year ------------------------------ */

function currentYear() {
  document.getElementById('current-year').textContent =
    new Date().getFullYear();
}

/* ------------------------------ Vintage Mode ------------------------------ */

let count = 0;
const text = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span, button');

function countToggles() {
  count++;

  if (count >= 100) {
    document.getElementById('vintageModeContainer').style.display = 'block';
    text.style.fontFamily = 'VT323, monospace';
    text.style.color = 'rgb(235, 235, 235)';
    text.style.textShadow = 'var(--green-glow)';
    text.style.lineHeight = '1';
    text.style.transform = 'translateZ(100px)';
    text.style.backfaceVisibility = 'hidden';
  }
}

/* -------------------------- Hexagon Progressbars -------------------------- */

function calcProgress() {
  const max = 2160;
  forEach(document.querySelectorAll('.hex-progress'), function (index, value) {
    percent = value.getAttribute('data-progress');
    value
      .querySelector('.fill')
      .setAttribute(
        'style',
        'stroke-dashoffset: ' + ((100 - percent) / 100) * max
      );
    value.querySelector('.card-text').innerHTML = percent + '%';
  });
}

function expandTile() {
  const tileOverlayToggle = document.querySelectorAll('.tile-overlay-toggle');
  forEach(tileOverlayToggle, function (index, value) {
    value.addEventListener('change', function () {
      if (this.checked) {
        value.parentElement.classList.add('expanded');
      } else {
        value.parentElement.classList.remove('expanded');
      }
    });
  });
}

let forEach = function (array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

/* -------------------------------- Timeline -------------------------------- */

function timelineScrolling() {
  let ticking = false;
  let last_known_scroll_position = 0;
  let updatePath = false;

  const element = document.getElementById('svg-timeline');
  const path = element.querySelector('path');
  let totalLength = 0;

  let timelineHeight = 0;

  setTimeout(() => {
    timelineHeight = document.getElementById('timeline-id').offsetHeight;
    // console.log(Math.ceil(timelineHeight));
    const size = parseInt(Math.ceil(timelineHeight));
    // console.log(size);

    element.setAttribute('viewBox', `0 0 8 ${size}`);
    element.setAttribute('height', size);
    element.setAttribute('xmlns', `http://www.w3.org/${size}/svg`);

    path.setAttribute('d', `M 4 0 L 4 ${size}`);

    path.setAttribute('stroke-dasharray', totalLength);

    initPath(path);

    function initPath(path) {
      totalLength = path.getTotalLength();
      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = totalLength;
    }

    function handleEntries(entries) {
      console.log(entries);
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log(entry.target);
        }
      });
    }

    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log(entry);
            updatePath = true;
          } else {
            updatePath = false;
          }
        });
      },
      { rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(element);

    function doSomething(scroll_pos) {
      if (!updatePath) {
        return;
      }
      window.requestAnimationFrame(() => {
        const center = window.innerHeight / 2;
        const boundaries = path.getBoundingClientRect();
        const top = boundaries.top;
        const height = boundaries.height;
        const percentage = (center - top) / height;
        const drawLength = percentage > 0 ? totalLength * percentage : 0;
        path.style.strokeDashoffset =
          drawLength < totalLength ? totalLength - drawLength : 0;
      });
    }

    window.addEventListener('scroll', function (e) {
      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(last_known_scroll_position);
          ticking = false;
        });

        ticking = true;
      }
    });
  }, 500);
}

if (document.getElementById('timeline') === true) {
  const timelineHeight = document.getElementById('timeline-id').offsetHeight;
  console.log(timelineHeight);
}
