var word_el = document.getElementById('word');
var popup = document.getElementById('popup-container');
var message_el = document.getElementById('success-message');
var wrongLetters_el = document.getElementById('wrong-letters');
var items = document.querySelectorAll('.item');
var message=document.getElementById('message');
var PlayAgainBtn = document.getElementById('play-again');

var corretLetters = [];
var wrongLetters = [];
let selectedWord = getRandomWord();



function getRandomWord() {
    var words = ["javascript","java","phyton","css","html","c#","c"];

    return words[Math.floor(Math.random() * words.length)];
}





function displayWord() {
    

    word_el.innerHTML=`
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${corretLetters.includes(letter) ? letter:''}
            </div>
        `).join('')}

    `;


    const w = word_el.innerText.replace(/\n/g,'');
    if(w === selectedWord) {
       popup.style.display='flex';
       message_el.innerText ='Tebrikler kazandınız';
    }
    
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0? '<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `

    items.forEach((item,index)=> {
        const erroCount = wrongLetters.length;
        if(index<erroCount) {
            item.style.display='block';
        } else {
            item.style.display='none';
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display='flex';
        message_el.innerText = 'Kaybettiniz';
    }
}

function displayMessage () {
    message.classList.add('show');
    setTimeout(function() {
        message.classList.remove('show');
    },2000)
}

PlayAgainBtn.addEventListener('click', function() {
    corretLetters.splice(0);
    wrongLetters.splice(0);


    selectedWord=getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display='none';
});


window.addEventListener('keydown', function(e) {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        var letter = e.key;
        if(selectedWord.includes(letter)) {

            if(!corretLetters.includes(letter)) {
                corretLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
                message.classList.add('show');
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
});

displayWord();



