import './styles.scss'
import axios from "axios";
const validator = require('email-validator')
import simLetValidator from './services/similarLetters'
const {popUpFailure, popUpSuccess} = require('./services/pop-up.js')

const ru = require('./lang/ru.json')
const en = require('./lang/en.json')
const ar = require('./lang/ar.json')

// Language settings
let initialState = {
    currentLanguage: "ru",
    counterLastTask: 0
}

const switchBox = document.getElementById('language__selection')

// checks if language switched
switchBox.addEventListener('change', () => {
    initialState.currentLanguage = switchBox.value
    changeLang(initialState.currentLanguage)
})

const body = document.getElementsByClassName('content')



// Switch languages
const changeLang = (lang) => {
    // Getting json
    const file = eval(lang)
    // Getting all of translatable elements

    //  Header
    document.getElementById('title').innerHTML = file.title

    //  Initials
    document.getElementById('name').placeholder = file.name
    document.getElementById('nameTitle').innerHTML = file.name + ':'

    document.getElementById('surname').placeholder = file.surname
    document.getElementById('surnameTitle').innerHTML = file.surname + ':'

    //  Data
    document.getElementById('email').placeholder = file.email
    document.getElementById('emailTitle').innerHTML = file.email + ':'

    document.getElementById('company').placeholder = file.company
    document.getElementById('companyTitle').innerHTML = file.company + ':'

    document.getElementById('city').placeholder = file.city
    document.getElementById('cityTitle').innerHTML = file.city + ':'

    document.getElementById('msg').placeholder = file.message
    document.getElementById('msgTitle').innerHTML = file.message + ':'

    // Button
    document.getElementById('send').innerHTML = file.send

    // Orientation
    if (initialState.currentLanguage === 'ar'){
        body[0].classList.add('ar')
    } else {
        body[0].classList.remove('ar')
    }
}




// Submit button
const button = document.getElementById('send')
button.addEventListener('click', async () => {
    await sendRequest()
})

const wordsValidation = (word) => {
    if (word.length < 5){
        return false
    }
    return true
}

window.sendRequest = async () => {
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const company = document.getElementById('company');
    const city = document.getElementById('city');
    const msg = document.getElementById('msg');

    const array = [name, surname, email, company, city, msg]

    // Checks every word
    array.forEach(elem => {
        // Length
        if (elem.value.length < 5){
            elem.style.border = "1px solid red"
            setTimeout(() => {
                elem.style.border = "1px solid #ddd"
            }, 3000)
            return 0
        }
        // Similar letters
        simLetValidator(elem)

    })

    // Checks email
     if (!validator.validate(email.value)) {
         email.style.border = "1px solid red"
         await setTimeout(() => {
            email.style.border = "1px solid #ddd"
         }, 3000)
         return 0
    }


    await axios.post(`/api/saveUser`, {
        name: name.value,
        surname: surname.value,
        email: email.value,
        company: company.value,
        city: city.value,
        msg: msg.value
    }).then(() => {
        array.forEach(elem => {elem.value = ''})
        initialState.counterLastTask += 1
    }).then(() => {
        if (initialState.counterLastTask % 2 === 0){
            popUpFailure(initialState.currentLanguage)
        } else {
            popUpSuccess(initialState.currentLanguage)
        }

    })
}