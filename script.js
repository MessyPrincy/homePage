const themeToggle = document.getElementById("theme-toggle");
const title = document.getElementById("title");
const profession = document.getElementById("profession");
const terminalBody = document.getElementById("terminal-body");


const titles = ["MessyPrincy.dev", "MessyPrincy", "Messy", "Meßy", "3999"];
const professions = ["developer", "self-taught coder", "gamer", "writer"];
const responses = {
    help: `Commands:
    - about
    - skills
    - github`,
    about: `Hi, I'm Messy; a self-taught developer who enriches his skills through passion projects, work in online communities, and building hands-on solutions to real-world problems.`,
    skills: `    [Frontend]: HTML, CSS, Bootstrap
    [Backend]: Flask, SQLite, MariaDB, MySQL, Python
    [Other Skills]: Java, C, Linux, Git, APIs`,
    github: `Check out my work: https://github.com/MessyPrincy`
};
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

function createInputLine() {
  const wrapper = document.createElement('div');
  wrapper.className = 'text-start p-2 terminal-text';
  wrapper.innerHTML = `
    <div class="d-flex align-items-center">
      <span class="me-2">[~] $</span>
      <input type="text" class="terminal-input" autocomplete="off">
    </div>
  `;
  terminalBody.appendChild(wrapper);

  const input = wrapper.querySelector('.terminal-input');
  input.focus();
  input.addEventListener('keydown', handleKeydown);
  return input;
}

function handleKeydown(event) {
  if (event.key !== 'Enter') return;

  const input = event.target;
  const rawCommand = input.value.trim();
  const command = rawCommand.toLowerCase();

  input.disabled = true;

  if (command === 'clear') {
    terminalBody.innerHTML = '';
  } else if (rawCommand !== '') {
    const outputWrapper = document.createElement('div');
    outputWrapper.className = 'text-start p-2 terminal-text';

    if (responses[command]) {
      const pre = document.createElement('pre');
      pre.textContent = responses[command];
      outputWrapper.appendChild(pre);
    } else {
      const p = document.createElement('p');
      p.textContent = `Command not found: ${rawCommand}`;
      outputWrapper.appendChild(p);
    }

    terminalBody.appendChild(outputWrapper);
  }

  createInputLine();
  terminalBody.scrollTop = terminalBody.scrollHeight;
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
createInputLine();
