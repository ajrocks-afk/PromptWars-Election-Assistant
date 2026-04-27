console.log("Voter Navigator Script Initializing...");

// Set current year in footer
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- Accordion Logic ---
function toggleStep(element) {
    console.log("Toggling step:", element);
    const allSteps = document.querySelectorAll('.step-card');
    const isActive = element.classList.contains('active');
    allSteps.forEach(step => step.classList.remove('active'));
    if (!isActive) {
        element.classList.add('active');
    }
}

// --- Countdown Timer Logic ---
function getNextElectionDate() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(`November 3, ${year} 00:00:00`);
    if (now > target) {
        target = new Date(`November 3, ${year + 1} 00:00:00`);
    }
    return target.getTime();
}

const countdownTarget = getNextElectionDate();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownTarget - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minsEl && secsEl) {
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = minutes.toString().padStart(2, '0');
        secsEl.textContent = seconds.toString().padStart(2, '0');
    }

    if (distance < 0) {
        clearInterval(timerInterval);
        const timerContainer = document.querySelector(".timer");
        if (timerContainer) {
            timerContainer.innerHTML = "<div class='time-box'><span class='number'>Today is Election Day!</span></div>";
        }
    }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

console.log("Voter Navigator Script Loaded Successfully");
