var word_el = document.getElementById('word');
var popup = document.getElementById('popup-container');
var message_el = document.getElementById('success-message');
var wrongLetters_el = document.getElementById('wrong-letters');
var items = document.querySelectorAll('.item');
var message=document.getElementById('message');
var PlayAgainBtn = document.getElementById('play-again');

var corretLetters = [];
var wrongLetters = [];
var selectedWord = getRandomWord();



function getRandomWord() {

    // https://t03.performans.com/beyza/words.json
    var request = new XMLHttpRequest();
    request.open('GET','words.json',false);
    request.send();
    var response= request.responseText;
    var words = JSON.parse(response);


    console.log(words);
    var selectedWord = words[Math.floor(Math.random() * words.length)];
    console.log(selectedWord);
    return selectedWord;
}





function displayWord() {
    

    word_el.innerHTML=`
        ${selectedWord.split('').map(letter => letter==" " ? `
        <div class="letter letter-space">
            ${corretLetters.includes(letter) ? letter:''}
        </div>
    `: `
            <div class="letter">
                ${corretLetters.includes(letter.toLowerCase()) || corretLetters.includes(letter.toUpperCase()) ? letter:''}
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
    console.log(e);
        var letter = e.key;
        if (e.keyCode >= 65 && e.keyCode <= 90 ) {
            if(selectedWord.includes(letter)
             || selectedWord.includes(letter.toLowerCase())
            ||selectedWord.includes(letter.toUpperCase())) {

                if(!corretLetters.includes(letter)
                || selectedWord.includes(letter.toLowerCase())
                || selectedWord.includes(letter.toUpperCase())) {
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



