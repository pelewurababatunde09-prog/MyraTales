// Hamburger menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
}

// Theme toggle: system preference + manual override + persistence

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const newsSneakPeekTrack = document.getElementById('newsSneakPeekTrack');
const newsSneakPeekPrevious = document.querySelector('.news-sneak-peek-arrow-left');
const newsSneakPeekNext = document.querySelector('.news-sneak-peek-arrow-right');

if (newsSneakPeekTrack && newsSneakPeekPrevious && newsSneakPeekNext) {
  const updateNewsSneakPeekButtons = () => {
    const maxScroll = newsSneakPeekTrack.scrollWidth - newsSneakPeekTrack.clientWidth;
    newsSneakPeekPrevious.disabled = newsSneakPeekTrack.scrollLeft <= 1;
    newsSneakPeekNext.disabled = newsSneakPeekTrack.scrollLeft >= maxScroll - 1;
  };

  const getNewsSneakPeekScrollAmount = () => {
    const card = newsSneakPeekTrack.querySelector('.news-sneak-peek-card');
    const gap = Number.parseFloat(getComputedStyle(newsSneakPeekTrack).gap) || 18;
    return card ? card.getBoundingClientRect().width + gap : 238;
  };

  newsSneakPeekPrevious.addEventListener('click', () => {
    newsSneakPeekTrack.scrollBy({ left: -getNewsSneakPeekScrollAmount(), behavior: 'smooth' });
  });

  newsSneakPeekNext.addEventListener('click', () => {
    newsSneakPeekTrack.scrollBy({ left: getNewsSneakPeekScrollAmount(), behavior: 'smooth' });
  });

  newsSneakPeekTrack.addEventListener('scroll', updateNewsSneakPeekButtons, { passive: true });
  window.addEventListener('resize', updateNewsSneakPeekButtons);
  updateNewsSneakPeekButtons();
}


const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && heroVisual && !prefersReducedMotion) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();

    // Cursor position relative to the hero's center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Scale the movement down so it's a subtle drift, not a full follow
    const moveX = (deltaX / rect.width) * 20;
    const moveY = (deltaY / rect.height) * 20;

    heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    heroVisual.style.transform = 'translate(0, 0)';
  });
}

const heroFact = document.getElementById('heroFact');
const heroDescription = document.getElementById('heroDescription');
const heroFacts = [
  {
    fact: 'The first computer bug was an actual moth.',
    description: 'Explore the story behind a small mistake that gave computer debugging one of its most memorable names.'
  },
  {
    fact: 'The first webcam watched a coffee pot.',
    description: 'See how a simple office camera solved a very human problem: checking whether coffee was still available.'
  },
  {
    fact: 'Ancient Greeks built a computer from gears.',
    description: 'Meet the intricate mechanism that used astronomy and engineering to model the movement of the heavens.'
  },
  {
    fact: 'The first cars had no steering wheels.',
    description: 'Trace how early drivers guided their machines before the familiar steering wheel became standard.'
  },
  {
    fact: 'The Eiffel Tower was once meant to be temporary.',
    description: 'Discover why a landmark built for an exhibition survived its planned lifespan and became part of Paris.'
  },
  {
    fact: 'The first electric car predates the modern automobile.',
    description: 'Follow the early experiments that put electric power on the road before petrol cars took the lead.'
  },
  {
    fact: 'The first SMS message said “Merry Christmas.”',
    description: 'Read how a short holiday greeting became the beginning of a communication habit used billions of times.'
  },
  {
    fact: 'The first barcode scanned a pack of chewing gum.',
    description: 'Learn how an ordinary purchase became the first successful test of a system that changed retail forever.'
  },
  {
    fact: 'Ancient Romans used concrete that can heal itself.',
    description: 'Explore the volcanic ingredients and chemistry that helped some Roman structures withstand the centuries.'
  },
  {
    fact: 'The first 3D printer was invented in the 1980s.',
    description: 'Follow the early breakthrough that turned digital designs into physical objects one layer at a time.'
  },
  {
    fact: 'The first artificial satellite was smaller than a basketball.',
    description: 'See how a compact metal sphere marked the beginning of an era when human-made objects reached orbit.'
  },
  {
    fact: 'A medieval device predicted the tides with gears.',
    description: 'Discover how careful observation and mechanical craft helped people make sense of the changing sea.'
  },
  {
    fact: 'The first recorded robot was designed in ancient Greece.',
    description: 'Meet an early self-moving machine and the ancient imagination that made it possible.'
  },
  {
    fact: 'The first traffic light exploded after just one month.',
    description: 'Unpack the risky early experiment that revealed how difficult it would be to manage modern traffic.'
  },
  {
    fact: 'The first transatlantic cable took days to transmit a message.',
    description: 'Follow the fragile connection that changed communication from a journey into a signal.'
  }
];

if (heroFact && heroDescription && !prefersReducedMotion) {
  let heroFactIndex = 0;

  window.setInterval(() => {
    heroFact.classList.add('fact-changing');
    heroDescription.classList.add('fact-changing');

    window.setTimeout(() => {
      heroFactIndex = (heroFactIndex + 1) % heroFacts.length;
      heroFact.textContent = heroFacts[heroFactIndex].fact;
      heroDescription.textContent = heroFacts[heroFactIndex].description;
      heroFact.classList.remove('fact-changing');
      heroDescription.classList.remove('fact-changing');
    }, 250);
  }, 3000);
}

const storyData = {
  ancient: {
    era: "The Beginning",
    title: "The First Spark",
    paragraphs: [
      "Long before anything electronic existed, the same instinct that drives every startup founder today already existed: a problem, and someone too stubborn to leave it unsolved.",
      "The wheel wasn't invented by a committee chasing a deadline. It was refined, slowly, by countless unnamed people solving the same small problem again and again — how to move something heavy without breaking your back doing it.",
      "Fire, tools, irrigation, the printing press — none of these arrived as finished products. Each one was someone's rough draft, improved by whoever came next, exactly the same way a struggling startup today ships something rough, watches it fail in small ways, and fixes it one version at a time.",
      "The pattern that built modern technology didn't start with computers. It started the first time a person looked at a broken tool and decided fixing it was worth their time, even with no guarantee it would work.",
      "Every 'overnight success' company you've ever heard of has this same origin, just compressed into a shorter timeline — someone staring at a small, annoying problem, refusing to accept that it had to stay that way."
    ]
  },
  atomic: {
    era: "1940s",
    title: "The Race Against Time",
    paragraphs: [
      "By the 1940s, invention had stopped being a slow, patient hobby. War made it urgent. Entire governments poured resources into solving problems in months that would normally take decades — radar, cryptography, and yes, the atomic bomb.",
      "This is the era that proved something uncomfortable: humanity's biggest technological leaps often come from pressure, not comfort. The Manhattan Project brought together physicists who, a few years earlier, had no reason to believe their work would matter outside a university lecture hall.",
      "It's also the era of the actual first computer bug — a moth, caught in a relay of the Harvard Mark II in 1947. Beneath the weight of world-changing invention, someone still had to debug a machine by hand, one dead insect at a time.",
      "Struggling tech companies today talk about 'moving fast.' The 1940s is the origin of that pressure — a time when the gap between an idea and its real-world consequences shrank from generations to months.",
      "The uncomfortable truth this era leaves behind: some of the most important technological progress in history came from people who were terrified, rushed, and unsure if they were doing the right thing at all — and did it anyway."
    ]
  },
  present: {
    era: "Now",
    title: "The Bet Before the Proof",
    paragraphs: [
      "Right now, the same pattern from every previous era is repeating itself, just with different tools. AI companies are making the same bet Toyota made on patience, the same bet Jobs made on taste, the same bet a wartime physicist made on an untested theory.",
      "Most struggling tech startups today will never be written about. They'll quietly fail, pivot, or get bought for parts. But a small number of them are, right now, in the exact position every company in this site's history once stood — betting years of effort on something the rest of the world hasn't agreed to believe in yet.",
      "That's the uncomfortable part of being 'present tense' history: nobody currently living through it knows yet which bets were the wheel, the moth in the relay, or the wrong turn nobody remembers.",
      "MyraTales isn't trying to predict which current bet wins. It's just pointing at the pattern — the same one that's been true since long before electricity — and trusting that whoever's stubborn enough, and lucky enough, will look obvious in hindsight, the same way all the others eventually did."
    ]
  }
};

const patternCards = document.querySelectorAll('.pattern-card');
const storyModal = document.getElementById('storyModal');
const storyModalOverlay = document.getElementById('storyModalOverlay');
const storyModalClose = document.getElementById('storyModalClose');
const storyModalEra = document.getElementById('storyModalEra');
const storyModalTitle = document.getElementById('storyModalTitle');
const storyModalBody = document.getElementById('storyModalBody');
let lastFocusedElement = null;

function openStoryModal(eraKey) {
  const data = storyData[eraKey];
  if (!data || !storyModal) return;

  lastFocusedElement = document.activeElement;
  storyModalEra.textContent = data.era;
  storyModalTitle.textContent = data.title;
  storyModalBody.replaceChildren(
    ...data.paragraphs.map(paragraph => {
      const element = document.createElement('p');
      element.textContent = paragraph;
      return element;
    })
  );

  storyModal.classList.add('open');
  storyModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  storyModalClose.focus();
}

function closeStoryModal() {
  if (!storyModal) return;
  storyModal.classList.remove('open');
  storyModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

patternCards.forEach(card => {
  card.addEventListener('click', () => {
    openStoryModal(card.dataset.era);
  });
});

if (storyModalClose && storyModalOverlay) {
  storyModalClose.addEventListener('click', closeStoryModal);
  storyModalOverlay.addEventListener('click', closeStoryModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && storyModal && storyModal.classList.contains('open')) {
    closeStoryModal();
  }
});
// ===== Featured accordion =====
const featuredItems = document.querySelectorAll('.featured-item');

featuredItems.forEach(item => {
  const trigger = item.querySelector('.featured-trigger');

  if (!trigger) return;

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close any other open item first — single active accordion
    featuredItems.forEach(i => {
      i.classList.remove('open');
      const itemTrigger = i.querySelector('.featured-trigger');
      if (itemTrigger) itemTrigger.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});
/* ===== Early access notice modal ===== */
(function () {
  const KEY = 'myratales_notice_seen';
  const modal = document.getElementById('noticeModal');
  const overlay = document.getElementById('noticeOverlay');
  const closeBtn = document.getElementById('noticeClose');

  if (!modal) return;

  // If they've already seen it, never show again
  if (localStorage.getItem(KEY)) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('notice-open');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('notice-open');
    localStorage.setItem(KEY, '1');
  }

  // Wait 3 seconds after load
  window.addEventListener('load', () => {
    setTimeout(openModal, 3000);
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();
