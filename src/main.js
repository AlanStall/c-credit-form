import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");


function setCardType(type) {
    const colors = {
        "visa": ["#436D99", "#2D57F2"],
        "mastercard": ["DF6F29", "#C69347"],
        "default": ["black", "gray"]
    }

    ccBgColor01.setAttribute("fill", colors[type] [0]);
    ccBgColor02.setAttribute("fill", colors[type] [1]);
    ccLogo.setAttribute("src", `cc-${type}.svg`);
};

//

const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
    mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern);

//

const dateExperation = document.querySelector("#expiration-date");
const dateExperationPattern = {
    mask: "MM {/} YY",
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
          },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        }       
    }
}
const dateExperationMasked = IMask(dateExperation, dateExperationPattern);

//

const cardNumber = document.querySelector('#card-number');

const cardNumberPatter = {
    mask: [
    {
        mask: '0000 0000 0000 0000',
        cardtype: 'visa',
        regex: /^4\d{0,15}/,
    },
    {
        mask: '0000 0000 0000 0000',
        cardtype: 'mastercard',
        regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
    },      
    {
        mask: '0000 0000 0000 0000',
        cardtype: 'default'
    },
    ],
    
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g,'');
        const foundMask = dynamicMasked.compiledMasks.find(function(item) {
            return number.match(item.regex);
        })
        
        return foundMask
    },    
}
const cardNumberMasked = IMask(cardNumber, cardNumberPatter);

//

const addButton = document.querySelector('#add-card');

addButton.addEventListener('click', () => {
    alert('cartão adicionado')
});

//

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
});

//

const cardHolder = document.querySelector('#card-holder');
cardHolder.addEventListener('input', () => {
    const ccHolder = document.querySelector('.cc-holder .value');
    ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value.substring(0, 30);
});

const input = document.querySelector('#card-holder');
input.addEventListener('input', () => {
    if (input.value.length < 30) {
                
    } else {
        input.value = input.value.substring(0, 30);
    }
})

//

securityCodeMasked.on("accept", () => {
    updateSecurityCode(securityCodeMasked.value);
})

function updateSecurityCode(code) {
    const ccSecurity = document.querySelector('.cc-security .value');
    ccSecurity.innerText = code.length === 0 ? "123" : code;
}

//

cardNumberMasked.on('accept', () => {
    const cardType = cardNumberMasked.masked.currentMask.cardtype    
    setCardType(cardType)
    updateCardNumber(cardNumberMasked.value)
    
})

function updateCardNumber(number) {
    const ccNumber = document.querySelector('.cc-number');
    ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;
}

//

dateExperationMasked.on("accept", () => {
    updateDateExperation(dateExperationMasked.value);
})

function updateDateExperation(date) {
    const experationDate = document.querySelector('.cc-expiration .value');
    experationDate.innerText = date.length === 0 ? "12/23" : date;
}
