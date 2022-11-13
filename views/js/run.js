const leftText = document.getElementById('code-left');
const rightText = document.getElementById('code-right');
const leftSound = document.getElementById('sound-left');
const rightSound = document.getElementById('sound-right');
const run = document.getElementById('run');
const clear = document.getElementById('clear-right');

const acc = new Accessibility();

run.addEventListener('click', () => {
  console.log("Clicked");
  runCode();
})

leftSound.addEventListener('click', () => {
  readText('left');
})

rightSound.addEventListener('click', () => {
  readText('right');
})

clear.addEventListener('click', () => {
  clearRight();
})

function clearRight() {
  rightText.value = "";
}

async function runCode() {
  let aburl = window.location.href;
  let parsedCode = leftText.value;

  const response = await fetch(`${aburl}python`, {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain"
    },
    body: parsedCode
  });

  let serverRes = await response.json();

  console.log(serverRes);
  rightText.value = serverRes;

  // acc.textToSpeech("Running code");
}

function readText(side) {
  if (side === "left") {
    acc.textToSpeech(leftText.value)
  }
  if (side === "right") {
    acc.textToSpeech(rightText.value)
  }
}