// Define levels, study points, and questions
const levels = [
    {
        title: "Level 5:Notable Exoplanets.",
        studyPoints: [
            "Proxima Centauri b is the closest known exoplanet to Earth.",
            "HD 209458 b, known as Osiris, was the first exoplanet detected via transit",
            "Kepler-186f is the first Earth-sized planet found in the habitable zone of another star.",
            "TRAPPIST-1 system contains seven Earth-sized planets, three of which are in the habitable zone.",
            "WASP-12b is known for its extreme heat and is a hot Jupiter.",

        ],
        questions: [
            {
                question: "Which exoplanet is the closest known to Earth?",
                options: ["HD 209458 b", "Kepler-186f", "Proxima Centauri b", " TRAPPIST-1 d"],
                answer: 2
            },
            {
                question: "What is notable about HD 209458 b?",
                options: ["It has multiple moons.", "It was the first detected via transit.", "It is the largest exoplanet.", "It is located in the habitable zone."],
                answer: 1
            },
            {
                question: "What is special about Kepler-186f?",
                options: ["It is a gas giant.", "It is the first Earth-sized planet in the habitable zone of another star ", "It has no atmosphere.", "It is the hottest known exoplanet."],
                answer: 1
            },
            {
                question: "How many Earth-sized planets are in the TRAPPIST-1 system?",
                options: ["Five", "Seven", "Ten", "Three"],
                answer: 1
            },
            {
                question: "What type of exoplanet is WASP-12b?",
                options: ["A cold gas giant.", "A hot Jupiter", "A terrestrial planet", "A super-Earth"],
                answer: 1
            }
        ]
    }
];

// Initialize variables
let currentLevel = 0;
let currentQuestion = 0;
let score = 0;

// Start game button event listener
document.getElementById("start-button").addEventListener("click", startGame);

// Start game function
function startGame() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("level-container").style.display = "block";
    showStudyMode();
}

// Show study mode function
function showStudyMode() {
    document.getElementById("study-mode").style.display = "block";
    document.getElementById("quiz-mode").style.display = "none";
    document.getElementById("level-title").innerHTML = levels[currentLevel].title;
    const studyPoints = document.getElementById("study-points");
    studyPoints.innerHTML = "";
    levels[currentLevel].studyPoints.forEach(point => {
        const li = document.createElement("li");
        li.innerHTML = point;
        studyPoints.appendChild(li);
    });
    document.getElementById("quiz-button").addEventListener("click", showQuizMode);
}

// Show quiz mode function
function showQuizMode() {
    document.getElementById("study-mode").style.display = "none";
    document.getElementById("quiz-mode").style.display = "block";
    showQuestion();
}

// Show question function
function showQuestion() {
    const question = document.getElementById("question");
    const options = document.getElementById("options");
    question.innerHTML = levels[currentLevel].questions[currentQuestion].question;
    options.innerHTML = "";
    levels[currentLevel].questions[currentQuestion].options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = option;
        li.addEventListener("click", () => {
            checkAnswer(index);
        });
        options.appendChild(li);
    });
}

// Check answer function
function checkAnswer(answer) {
    if (answer === levels[currentLevel].questions[currentQuestion].answer) {
        score++;
        document.getElementById("result").innerHTML = "Correct!";
    } else {
        document.getElementById("result").innerHTML = "Incorrect.";
    }
    currentQuestion++;
    if (currentQuestion >= levels[currentLevel].questions.length) {
        endLevel();
    } else {
        showQuestion();
    }
}

// End level function
function endLevel() {
    document.getElementById("quiz-mode").style.display = "none";
    document.getElementById("end-button-container").style.display = "block";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").innerHTML = `Level ${currentLevel + 1} Score: ${score}/${levels[currentLevel].questions.length}`;
    document.getElementById("end-button").addEventListener("click", nextLevel);
}

// Next level function
function nextLevel() {
    currentLevel++;
    currentQuestion = 0;
    score = 0;
    if (currentLevel >= levels.length) {
        alert("Congratulations, you've completed all levels!");
    } else {
        document.getElementById("end-button-container").style.display = "none";
        document.getElementById("score-container").style.display = "none";
        showStudyMode();
    }
}