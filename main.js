let cols, rows;
let numChars;
let differentCharIdx;
let showingAnswer = false;

let fontSize = 42;
let extraPadding = 6;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCharacter() {
    const unicodeRange = [0x1F600, 0x1F644];
    return String.fromCodePoint(randomInteger(unicodeRange[0], unicodeRange[1]));
}

function randomCharacterExceptX(x) {
    for (;;) {
        let char = randomCharacter();
        if (char != x ) { return char; }
    }
}

function generateContent()
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const effectiveSize = fontSize + extraPadding;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cols = Math.floor(canvas.width / effectiveSize);
    rows = Math.floor(canvas.height / effectiveSize);
    numChars = cols*rows;
    differentCharIdx = randomInteger(0, numChars-1);

    let mainChar = randomCharacter();
    let differentChar = randomCharacterExceptX(mainChar);

    console.log(rows);
    console.log(cols);

    //ctx.font = "64px";
    ctx.font = `${fontSize}px serif`;

    let itemIdx = 0;
    //ctx.strokeText(mainChar, 200, 200);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let char = (itemIdx == differentCharIdx) ? differentChar : mainChar;
            //ctx.fillText("\u{1F600}", row*effectiveSize, col*effectiveSize + effectiveSize);
            ctx.fillText(char, col*effectiveSize, row*effectiveSize + effectiveSize);
            itemIdx++;
        }
    }

    showingAnswer = false;
}

function showAnswer() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const effectiveSize = fontSize + extraPadding;

    let differentCharRow = Math.floor(differentCharIdx / cols);
    let differentCharCol = differentCharIdx % cols;
    let x = differentCharCol * effectiveSize + 0.75*fontSize;
    let y = differentCharRow * effectiveSize + 0.75*fontSize;
    console.log(`${x}, ${y}`);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(x, y, effectiveSize, 0, 2*Math.PI);
    ctx.stroke();

    showingAnswer = true;
}

function doNext() {
    if (showingAnswer) {
        generateContent();
    } else {
        showAnswer();
    }
}

function initCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
canvas.addEventListener('touchstart', doNext);

}

function changeSize(delta) {
    fontSize += delta;
    generateContent();
}


document.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        doNext();
    } else if (event.key == "ArrowUp") {
        changeSize(+4);
    } else if (event.key == "ArrowDown") {
        changeSize(-4);
    }
    console.log(event.key);
}, false);

initCanvas();

generateContent();
