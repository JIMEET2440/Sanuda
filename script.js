// ===== FLOOR DATA =====
const TOTAL_FLOORS = 6;
const floorData = {
  1: {
    title: "Childhood",
    chapter: "Chapter One",
    emoji: "🧸",
    content: `
      <p>Remember when the world was made of pillow forts and ice cream dreams?</p>
      <p>Every scraped knee came with a band-aid and a hug. Every rainy day was an excuse to splash in puddles.</p>
      <div class="photo-placeholder">
        <img src="photos/childhood.jpg" alt="Childhood memory" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <span class="placeholder-text" style="display:none;">📷 Add childhood photo<br>photos/childhood.jpg</span>
      </div>
      <p>You were the tiniest human with the biggest laugh. Some things never change. 💕</p>
      <div>
        <span class="memory-tag">Pillow Forts</span>
        <span class="memory-tag">Ice Cream Runs</span>
        <span class="memory-tag">Cartoon Mornings</span>
        <span class="memory-tag">Bedtime Stories</span>
      </div>
    `,
  },
  2: {
    title: "Adventures",
    chapter: "Chapter Two",
    emoji: "🌍",
    content: `
      <p>Then came the adventures — the ones we planned and the ones that found us.</p>
      <p>Every trip, every new place, every "let's just go" moment became a story we'd retell forever.</p>
      <div class="photo-placeholder">
        <img src="photos/adventure.jpg" alt="Adventure memory" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <span class="placeholder-text" style="display:none;">📷 Add adventure photo<br>photos/adventure.jpg</span>
      </div>
      <p>With you, even getting lost felt like discovering something beautiful. 🗺️</p>
      <div>
        <span class="memory-tag">Road Trips</span>
        <span class="memory-tag">Late Night Talks</span>
        <span class="memory-tag">New Places</span>
        <span class="memory-tag">Inside Jokes</span>
      </div>
    `,
  },
  3: {
    title: "Chaos",
    chapter: "Chapter Three",
    emoji: "🌪️",
    content: `
      <p>Let's be honest — we've had our share of chaos, fights, and dramatic sighs.</p>
      <p>Doors may have been slammed. Words may have been… loud. But even in the mess, we always found our way back.</p>
      <p>Because that's what siblings do — we argue like enemies and protect each other like warriors. ⚡</p>
      <div>
        <span class="memory-tag">Epic Arguments</span>
        <span class="memory-tag">Silent Treatments</span>
        <span class="memory-tag">Making Up</span>
        <span class="memory-tag">Stealing Clothes</span>
        <span class="memory-tag">Covering For You</span>
      </div>
    `,
  },
  4: {
    title: "Growth",
    chapter: "Chapter Four",
    emoji: "🌱",
    content: `
      <p>Somewhere between the chaos and the calm, you grew into someone incredible.</p>
      <p>I watched you face things that would break most people — and you didn't just survive, you bloomed.</p>
      <div class="photo-placeholder">
        <img src="photos/growth.jpg" alt="Growth and milestones" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <span class="placeholder-text" style="display:none;">📷 Add a milestone photo<br>photos/growth.jpg</span>
      </div>
      <p>Your strength inspires me more than you'll ever know. 🌟</p>
      <div>
        <span class="memory-tag">Resilience</span>
        <span class="memory-tag">New Beginnings</span>
        <span class="memory-tag">Finding Yourself</span>
        <span class="memory-tag">Brave Moments</span>
      </div>
    `,
  },
  5: {
    title: "Today",
    chapter: "Chapter Five",
    emoji: "✨",
    content: `
      <p>And here we are — today. Your birthday. A day the world got a little brighter because you exist in it.</p>
      <p>You're not just my sister. You're my favorite person to laugh with, vent to, and share silence with.</p>
      <p>Today, I just want you to know: you are so deeply loved. Every version of you — past, present, and future. 💛</p>
      <div>
        <span class="memory-tag">This Moment</span>
        <span class="memory-tag">Gratitude</span>
        <span class="memory-tag">Unconditional Love</span>
        <span class="memory-tag">Always & Forever</span>
      </div>
    `,
  },
  6: {
    title: "The Future",
    chapter: "The Final Floor",
    emoji: "🎉",
    isCelebration: true,
    content: `
      <p class="glow-text">This floor is just for you.</p>
      <p>No matter where life takes us — different cities, different timezones, different chapters — know this:</p>
      <p class="glow-text" style="font-size:1.3rem; margin: 12px 0;">I will always be your biggest fan.</p>
      <p>Happy Birthday, Sanuda. 🎂🥂</p>
      <p style="font-size:0.85rem; color: var(--text-muted); margin-top:12px;">Thank you for being the most important part of my story.</p>
      <p style="font-size:1.5rem; margin-top:8px;">❤️</p>
    `,
  },
};

// ===== DOM ELEMENTS =====
const introScreen = document.getElementById("intro-screen");
const enterBtn = document.getElementById("enter-btn");
const elevatorWrapper = document.getElementById("elevator-wrapper");
const elevatorDoors = document.getElementById("elevator-doors");
const elevatorShaft = document.getElementById("elevator-shaft");
const floorNum = document.getElementById("floor-num");
const floorLabelDisplay = document.getElementById("floor-label-display");
const floorContentInner = document.getElementById("floor-content-inner");
const arrowUp = document.getElementById("arrow-up");
const arrowDown = document.getElementById("arrow-down");
const btnUp = document.getElementById("btn-up");
const btnDown = document.getElementById("btn-down");
const floorDots = document.querySelectorAll(".floor-dot");
const floorButtonsContainer = document.getElementById("floor-buttons");
const floorButtons = document.querySelectorAll(".floor-btn");
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

// ===== STATE =====
let currentFloor = 1; // Start at floor 1
let isMoving = false;
let visitedFloors = new Set();
let allFloorsUnlocked = false;

// ===== AMBIENT PARTICLES =====
function createParticles() {
  const container = document.getElementById("ambient-particles");
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 8 + "s";
    p.style.animationDuration = 6 + Math.random() * 6 + "s";
    p.style.width = p.style.height = 2 + Math.random() * 3 + "px";
    container.appendChild(p);
  }
}
createParticles();

// ===== UPDATE UI STATE =====
function updateNavButtons() {
  btnUp.disabled = isMoving || currentFloor >= TOTAL_FLOORS;
  btnDown.disabled = isMoving || currentFloor <= 1;
}

function updateFloorDots() {
  floorDots.forEach((dot) => {
    const f = parseInt(dot.dataset.f);
    dot.classList.remove("current", "visited");
    if (f === currentFloor) {
      dot.classList.add("current");
    } else if (visitedFloors.has(f)) {
      dot.classList.add("visited");
    }
  });
}

function updateFloorGridButtons() {
  floorButtons.forEach((btn) => {
    const f = parseInt(btn.dataset.floor);
    btn.classList.toggle("visited", visitedFloors.has(f));
    btn.classList.toggle("active", f === currentFloor);
  });
}

function checkAllFloorsVisited() {
  if (allFloorsUnlocked) return;
  if (visitedFloors.size >= TOTAL_FLOORS) {
    allFloorsUnlocked = true;
    floorButtonsContainer.classList.remove("locked");
    floorButtonsContainer.classList.add("unlocked", "just-unlocked");
    setTimeout(() => {
      floorButtonsContainer.classList.remove("just-unlocked");
    }, 1200);
  }
}

// ===== INTRO =====
enterBtn.addEventListener("click", () => {
  introScreen.classList.remove("active");
  setTimeout(() => {
    introScreen.style.display = "none";
    elevatorWrapper.classList.remove("hidden");

    // Start at floor 1 with doors open showing its content
    currentFloor = 1;
    floorNum.textContent = "1";
    floorLabelDisplay.textContent = floorData[1].title;
    visitedFloors.add(1);

    elevatorDoors.classList.add("doors-open");
    loadFloorContent(1);

    setTimeout(() => {
      floorContentInner.classList.add("visible");
    }, 300);

    updateNavButtons();
    updateFloorDots();
    updateFloorGridButtons();
    checkAllFloorsVisited();
  }, 800);
});

// ===== UP / DOWN BUTTON CLICKS =====
btnUp.addEventListener("click", () => {
  if (isMoving || currentFloor >= TOTAL_FLOORS) return;
  goToFloor(currentFloor + 1);
});

btnDown.addEventListener("click", () => {
  if (isMoving || currentFloor <= 1) return;
  goToFloor(currentFloor - 1);
});

// ===== FLOOR GRID BUTTON CLICKS (only work when unlocked) =====
floorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!allFloorsUnlocked || isMoving) return;
    const floor = parseInt(btn.dataset.floor);
    if (floor === currentFloor) return;
    goToFloor(floor);
  });
});

// ===== GO TO FLOOR =====
function goToFloor(targetFloor) {
  isMoving = true;
  const data = floorData[targetFloor];
  const goingUp = targetFloor > currentFloor;

  // Disable nav buttons while moving
  updateNavButtons();

  // 1. Close doors
  elevatorDoors.classList.remove("doors-open");
  elevatorDoors.classList.add("doors-closed");
  floorContentInner.classList.remove("visible");

  // Direction arrows in the display panel
  arrowUp.classList.toggle("active", goingUp);
  arrowDown.classList.toggle("active", !goingUp);

  // 2. After doors close, simulate travel
  setTimeout(() => {
    elevatorShaft.classList.add("traveling");
    floorLabelDisplay.textContent = "Traveling...";

    // Animate floor numbers ticking during travel
    const floorsToTravel = Math.abs(targetFloor - currentFloor);
    const travelTime = 600 + floorsToTravel * 400;
    const stepTime = travelTime / floorsToTravel;
    let step = 0;
    const startFloor = currentFloor;

    const interval = setInterval(() => {
      step++;
      const displayFloor = goingUp ? startFloor + step : startFloor - step;
      floorNum.textContent = displayFloor;

      // Update dots during travel
      floorDots.forEach((dot) => {
        dot.classList.remove("current");
        if (parseInt(dot.dataset.f) === displayFloor) {
          dot.classList.add("current");
        }
      });

      if (step >= floorsToTravel) clearInterval(interval);
    }, stepTime);

    // 3. After travel completes, arrive
    setTimeout(() => {
      elevatorShaft.classList.remove("traveling");
      arrowUp.classList.remove("active");
      arrowDown.classList.remove("active");

      currentFloor = targetFloor;
      floorNum.textContent = targetFloor;
      floorLabelDisplay.textContent = data.title;

      // Set floor content
      loadFloorContent(targetFloor);

      // Mark visited
      visitedFloors.add(targetFloor);
      updateFloorDots();
      updateFloorGridButtons();
      checkAllFloorsVisited();

      // 4. Open doors
      setTimeout(() => {
        elevatorDoors.classList.remove("doors-closed");
        elevatorDoors.classList.add("doors-open");

        // Show content after doors open
        setTimeout(() => {
          floorContentInner.classList.add("visible");
          isMoving = false;
          updateNavButtons();

          // Celebration for floor 6
          if (targetFloor === 6) {
            launchConfetti();
          }
        }, 800);
      }, 400);
    }, travelTime);
  }, 1300);
}

// ===== LOAD FLOOR CONTENT =====
function loadFloorContent(floor) {
  const data = floorData[floor];
  const isCelebration = data.isCelebration;

  let heartsHtml = "";
  if (isCelebration) {
    const heartEmojis = ["❤️", "💛", "💖", "✨", "🎉", "🎂", "💕"];
    heartsHtml = '<div class="heart-rain">';
    for (let i = 0; i < 15; i++) {
      const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heartsHtml += `<span class="falling-heart" style="left:${Math.random() * 90}%; animation-delay:${Math.random() * 4}s; animation-duration:${3 + Math.random() * 3}s;">${emoji}</span>`;
    }
    heartsHtml += "</div>";
  }

  floorContentInner.innerHTML = `
    <div class="floor-card ${isCelebration ? "celebration-card" : ""} floor-${floor}">
      ${heartsHtml}
      <div class="floor-emoji">${data.emoji}</div>
      <div class="floor-chapter">${data.chapter}</div>
      <h2>${data.title}</h2>
      ${data.content}
    </div>
  `;
}

// ===== CONFETTI =====
let confettiPieces = [];
let confettiRunning = false;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
  confettiPieces = [];
  confettiRunning = true;

  const colors = [
    "#ffd700", "#ff69b4", "#da70d6", "#4de8c2",
    "#ff6a6a", "#7ee8fa", "#b993ff", "#f0d78c",
  ];

  for (let i = 0; i < 200; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      w: 4 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      speedX: (Math.random() - 0.5) * 4,
      speedY: 2 + Math.random() * 4,
      opacity: 1,
    });
  }
  animateConfetti();

  // Stop after 6 seconds
  setTimeout(() => {
    confettiRunning = false;
  }, 6000);
}

function animateConfetti() {
  if (!confettiRunning && confettiPieces.every((p) => p.opacity <= 0)) {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    return;
  }

  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach((p) => {
    if (p.opacity <= 0) return;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();

    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    if (!confettiRunning) {
      p.opacity -= 0.015;
    }

    if (confettiRunning && p.y > confettiCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * confettiCanvas.width;
    }
  });

  requestAnimationFrame(animateConfetti);
}
