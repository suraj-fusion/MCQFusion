const generateBtn = document.getElementById('generateBtn');
const quizContainer = document.getElementById('quiz');
const resultDiv = document.getElementById('result');

let mcqs = [];
let currentQuestion = 0;
let score = 0;

generateBtn.addEventListener('click', startQuiz);

async function startQuiz() {
  if(generateBtn)
  {
      generateBtn.remove();
     generateBtn.disabled = true;
  }

  quizContainer.innerHTML = '<p>Loading quiz...</p>';
  resultDiv.classList.add('hidden');
  resultDiv.innerHTML = '';
  score = 0;
  currentQuestion = 0;

  const videoId = await getCurrentYouTubeVideoId();
  if (!videoId) {
    quizContainer.innerHTML = '<p>Not a YouTube video.</p>';
    return;
  }

  try {
    const res = await fetch(`https://youtubequizapi.suraj-fusion.workers.dev/generate-mcqs?videoId=${videoId}`);
    const data = await res.json();
    mcqs = parseMCQs(data.mcqs);
    if (mcqs.length === 0) {
      quizContainer.innerHTML = '<p>Failed to parse MCQs.</p>';
    } else {
      showQuestion();
    }
  } catch (err) {
    console.error("MCQ Fetch Error:", err);
    quizContainer.innerHTML = `<p>Failed to load MCQs. ${err.message}</p>`;;
  }
}

function parseMCQs(text) {
  const questions = text.trim().split(/\n(?=\d+\.\s)/);
  return questions.map(q => {
    const lines = q.split('\n');
    const question = lines[0].replace(/^\d+\.\s*/, '');
    const options = lines.slice(1, 5).map(opt => opt.slice(3));
    const answer = lines[5]?.split(':')[1]?.trim();
    return { question, options, answer };
  }).filter(q => q.question && q.options.length === 4 && q.answer);
}

function showQuestion() {
  const { question, options, answer } = mcqs[currentQuestion];
  quizContainer.innerHTML = `
    <div class="fade">
      <p><strong>Q${currentQuestion + 1}:</strong> ${question}</p>
      ${options.map((opt, i) =>
        `<div class="option" data-option="${String.fromCharCode(97 + i)}">${opt}</div>`
      ).join('')}
    </div>
  `;

  document.querySelectorAll('.option').forEach(optEl => {
    optEl.addEventListener('click', () => {
      const selected = optEl.dataset.option;
      const isCorrect = selected === answer.toLowerCase();
      if (isCorrect) {
        optEl.classList.add('correct');
        score++;
      } else {
        optEl.classList.add('incorrect');
        const correctEl = document.querySelector(`.option[data-option="${answer.toLowerCase()}"]`);
        if (correctEl) correctEl.classList.add('correct');
      }

      document.querySelectorAll('.option').forEach(btn => btn.style.pointerEvents = 'none');

      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < mcqs.length) {
          showQuestion();
        } else {
          showScore();
        }
      }, 1200);
    });
  });
}

function showScore() {
  quizContainer.innerHTML = '';
  resultDiv.classList.remove('hidden');
  resultDiv.innerHTML = `
    <div class="fade">
      <h2>Quiz Completed!</h2>
      <p>Your score: <strong>${score} / ${mcqs.length}</strong></p>
      <button id="retryBtn">Try Again</button>
    </div>
  `;

  // Enable retry
  document.getElementById('retryBtn').addEventListener('click', () => {
    resultDiv.classList.add('hidden');
    quizContainer.innerHTML = '';
    startQuiz();
  });
}

async function getCurrentYouTubeVideoId() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url;
      if (url) {
        const match = url.match(/[?&]v=([^&]+)/);
        resolve(match ? match[1] : null);
      } else {
        resolve(null);
      }
    });
  });
}
