// --- Institutional Theme Engine ---
const themeToggle = document.getElementById('theme-toggle');
const themes = ['institutional', 'high-contrast', 'vision'];
let currentThemeIndex = themes.indexOf(localStorage.getItem('theme')) || 0;
if (currentThemeIndex === -1) currentThemeIndex = 0;

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const label = theme.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    if (themeToggle) themeToggle.textContent = `Theme: ${label}`;
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(themes[currentThemeIndex]);
    });
}
applyTheme(themes[currentThemeIndex]);

// --- Language Toggle Logic ---
const langToggle = document.getElementById('lang-toggle');
const mainTitle = document.getElementById('main-title');
const heroTitle = document.getElementById('hero-title');
let currentLang = 'EN';

const translations = {
    'EN': {
        main: 'Voter Navigator',
        hero: 'Empowering Every Indian Voter'
    },
    'HI': {
        main: 'मतदाता नेविगेटर',
        hero: 'प्रत्येक भारतीय मतदाता का सशक्तिकरण'
    }
};

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'EN' ? 'HI' : 'EN';
        mainTitle.textContent = translations[currentLang].main;
        heroTitle.textContent = translations[currentLang].hero;
        langToggle.textContent = currentLang === 'EN' ? 'HI | EN' : 'EN | HI';
    });
}

// --- Scroll Animations (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(section => observer.observe(section));

// --- Countdown Logic ---
function updateCountdown() {
    const target = new Date("November 3, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<h3>Election Day has Commenced</h3>";
        return;
    }

    document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- Civic AI Assistant Logic ---
const aiBubble = document.getElementById('ai-bubble');
const aiChat = document.getElementById('ai-chat');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

if (aiBubble) aiBubble.addEventListener('click', () => aiChat.style.display = 'flex');
if (closeChat) closeChat.addEventListener('click', () => aiChat.style.display = 'none');

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim().toLowerCase();
        if (!text) return;
        addMessage(userInput.value, 'user');
        userInput.value = '';

        const thinking = addMessage('Assistant is thinking', 'bot');
        thinking.classList.add('thinking-dots');

        setTimeout(() => {
            let response = "I'm here to help with voter information! Try asking about 'registration', 'eligibility', 'polling stations', or 'required documents'.";

            if (text.includes('register') || text.includes('registration')) {
                response = "Registration is simple! You can apply online at the National Voter's Service Portal (nvsp.in) or use the Voter Helpline App on your smartphone.";
            } else if (text.includes('age') || text.includes('18') || text.includes('eligible')) {
                response = "To be eligible, you must be an Indian citizen and 18 years old by January 1st of the registration year.";
            } else if (text.includes('id') || text.includes('epic') || text.includes('document')) {
                response = "You'll need your Voter ID (EPIC). If you don't have it, other valid IDs like Aadhaar, PAN card, or Driving License are usually accepted at the booth.";
            } else if (text.includes('station') || text.includes('booth') || text.includes('where')) {
                response = "You can find your designated polling station on your voter information slip or by using the 'Know Your Polling Station' tool on the official NVSP website.";
            } else if (text.includes('date') || text.includes('when')) {
                response = "The General Election polling day is scheduled for November 3rd, 2026. Mark your calendar!";
            } else if (text.includes('hello') || text.includes('hi')) {
                response = "Namaste! I am your Civic AI. How can I assist you with your voting preparations today?";
            }

            thinking.textContent = response;
            thinking.classList.remove('thinking-dots');
        }, 1500);
    });
}

// --- Live Poll Logic ---
function submitPoll(choice) {
    const pollOptions = document.getElementById('poll-options');
    const pollResults = document.getElementById('poll-results');
    
    pollOptions.style.display = 'none';
    pollResults.style.display = 'block';

    // Simulated real-time data
    const results = { 'Development': 45, 'Better Infrastructure': 30, 'Social Welfare': 25 };
    
    document.getElementById('bar-1').style.width = results['Development'] + '%';
    document.getElementById('bar-2').style.width = results['Better Infrastructure'] + '%';
    document.getElementById('bar-3').style.width = results['Social Welfare'] + '%';
    
    document.getElementById('val-1').textContent = results['Development'] + '%';
    document.getElementById('val-2').textContent = results['Better Infrastructure'] + '%';
    document.getElementById('val-3').textContent = results['Social Welfare'] + '%';
}

// --- Share My Badge Logic ---
const badgeBtn = document.getElementById('generate-badge');
if (badgeBtn) {
    badgeBtn.addEventListener('click', () => {
        const template = document.getElementById('badge-template');
        html2canvas(template).then(canvas => {
            const link = document.createElement('a');
            link.download = 'voter-champion-2026.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
}

// --- Voter Readiness Audit (Quiz) ---
const quizData = [
    { question: "Are you a registered voter?", options: ["Confirmed", "Uncertain", "Not Registered"], correct: 0, feedback: "Institutional requirement: Must be listed in the Roll." },
    { question: "Do you know your polling station?", options: ["Identified", "Seeking Station", "No Plan"], correct: 0, feedback: "Polling station verification is mandatory." },
    { question: "Is your EPIC (Voter ID) ready?", options: ["Ready", "Processing", "Lost/No ID"], correct: 0, feedback: "Valid ID is a prerequisite for entry." }
];

let currentQuestion = 0; let score = 0;
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizProgress = document.getElementById("quiz-progress");
const quizFeedback = document.getElementById("quiz-feedback");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    const data = quizData[currentQuestion];
    quizQuestion.textContent = data.question;
    quizOptions.innerHTML = "";
    quizFeedback.style.display = "none";
    nextBtn.style.display = "none";
    data.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt; btn.classList.add("option-btn");
        btn.onclick = () => handleAnswer(i);
        quizOptions.appendChild(btn);
    });
    quizProgress.style.width = `${(currentQuestion / quizData.length) * 100}%`;
}

function handleAnswer(idx) {
    const data = quizData[currentQuestion];
    const buttons = quizOptions.querySelectorAll(".option-btn");
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === data.correct) btn.classList.add('correct');
        else if (i === idx) btn.classList.add('incorrect');
    });
    if (idx === data.correct) score++;
    quizFeedback.textContent = data.feedback;
    quizFeedback.style.display = "block";
    quizFeedback.style.color = (idx === data.correct) ? "#16a34a" : "#dc2626";
    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) loadQuestion();
    else {
        document.getElementById("quiz-content").style.display = "none";
        document.getElementById("quiz-results").style.display = "block";
        document.getElementById("results-text").textContent = `Audit Score: ${score} / ${quizData.length}`;
    }
};

function resetQuiz() {
    currentQuestion = 0; score = 0;
    document.getElementById("quiz-content").style.display = "block";
    document.getElementById("quiz-results").style.display = "none";
    loadQuestion();
}

if (quizQuestion) loadQuestion();
