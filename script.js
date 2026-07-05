const themeToggle = document.getElementById("theme-toggle");
const title = document.getElementById("title");
const profession = document.getElementById("profession");


const titles = ["MessyPrincy.dev", "MessyPrincy", "Messy", "Meßy", "3999"];
const professions = ["developer", "self-taught coder", "gamer", "writer"];
let titleCurrentIndex = 0;
let professionCurrentIndex = 0;
let isTitleAnimating = false;
let isProfessionAnimating = false;

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("light-mode");


    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

function eraseText(element, speed = 30) {
    return new Promise((resolve) => {
        const text = element.textContent;

        let i = text.length;

        const interval = setInterval(() => {
            element.textContent = text.substring(0, i - 1);
            i--;
            if (i <= 0) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

function writeText(element, text, speed = 60) {
    return new Promise((resolve) => {
        element.textContent = "";

        let i = 0;

        const interval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

async function cycleProfessions(pauseMs = 1500) {
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, pauseMs));
        professionCurrentIndex = (professionCurrentIndex + 1) % professions.length;
        await eraseText(profession);
        await writeText(profession, professions[professionCurrentIndex]);
    }
}

title.addEventListener("click", async function() {
    if (isTitleAnimating) return;
    isTitleAnimating = true;

    titleCurrentIndex = (titleCurrentIndex + 1) % titles.length;

    await eraseText(title)
    await writeText(title, titles[titleCurrentIndex]);

    isTitleAnimating = false;
});

cycleProfessions();
