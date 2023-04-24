const currentNumber = document.querySelector('.currentNumber');

const previousNumber = document.querySelector('.previousNumber p');

const mathSign = document.querySelector('.mathSign');

const numbersButtons = document.querySelectorAll('.number');

const operatorsButtons = document.querySelectorAll('.operator');

const equalsButton = document.querySelector('.equals');

const clearButton = document.querySelector('.clear');

const calculatorHistory  = document.querySelector('.history');

const historyBtn  = document.querySelector('.history-btn');

let result = "";




 const input = document.querySelector(".panel")
const s = Symbol();

input.addEventListener("keydown", e => {
    if(/^[123456789]+$/i.test(input.value)){
        input[s] = input.value;
    } 
    currentNumber.innerHTML = `${e.key}`
})
 
//nie dziala blokada alfabetu

  //document.addEventListener('keydown', function(event) {
  //  if (event.keydown >= 1 && event.keydown <= 9) {
  //    event.preventDefault();
  //  }
  // });







//Stałe  na gorze//
/* if(this.textContent === '.' && currentNumber.innerHTML === '')return 
currentNumber.innerHTML = '0.' jezeli zrobimy enter to logika siada nie wiadomo czemu i robi dla wszystich 0.*/
function displayNumbers(){
    if(this.textContent === '.' && currentNumber.innerHTML.includes('.'))return;
    if(this.textContent === '.' && currentNumber.innerHTML === '')
    return currentNumber.innerHTML = '0.';

    currentNumber.innerHTML += this.textContent;
}


function operate(){
    if(currentNumber.innerHTML === '' && this.textContent === '-'){
        currentNumber.innerHTML = '-';
        return;
    } 
    
     else if(currentNumber.innerHTML === ''){
        return;
    }

     if(mathSign.innerHTML !== '') {
        showResult();
    }
    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML ='';

}


function showResult(){
    if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operates = mathSign.innerHTML;

    

    switch(operates){
        case '+':
            result = a+b;
        break;
        case '-':
            result = b-a;
        break;
        case 'x':
            result = a * b;
        break;
        case ':':
            result = b /a;
        if(a === 0 ) return currentNumber.innerHTML = 'Błąd';
        // moja kombinacja :D 
        break;
        case '2^':
            result = b ** a;
        break;
        
    }
    
    //let wynik = typeof result.toPrecision(4);
    // warunek jakis jeszcze trzeba by skonstruowac .. 

    addToHistory();
    historyBtn.classList.add('active');
    currentNumber.innerHTML = result.toPrecision(4);
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
    

}

function addToHistory(){
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} 
    ${previousNumber.innerHTML} = ${result.toPrecision(4)}`
    newHistoryItem.classList.add('history-item');
    calculatorHistory.appendChild(newHistoryItem);
}



function clearScreen(){
    result ='';
    currentNumber.innerHTML= '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = ''; 
}





function clearHistory(){
    calculatorHistory.textContent = '';
    if(calculatorHistory.textContent === ''){
        historyBtn.classList.remove('active');
    }

}





// Nasluchwanie przyciskow 

operatorsButtons.forEach((button) => button.addEventListener('click', operate))

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers)
})

historyBtn.addEventListener('click', clearHistory);



const Dog = {
    name: 'spike',
    showThisDog: () => {
        console.log(this)
    }
}
Dog.showThisDog()