import './styles.scss'
import axios from "axios";
const ru = require('./lang/ru.json')
const en = require('./lang/en.json')
const ar = require('./lang/ar.json')



// Language settings
let initialState = {
    currentLanguage: "ru"
}

const switchBox = document.getElementById('language__selection')

switchBox.addEventListener('change', () => {
    initialState.currentLanguage = switchBox.value
    changeLang(initialState.currentLanguage)
})

// Switch languages
const changeLang = (lang) => {
    // Getting json
    const file = eval(lang)
    // Getting all of translatable elements
    const title = document.getElementById('title')

    // Getting translation
    const string = JSON.stringify(file)
    console.log(string)
}




// Submit button
const button = document.getElementById('send')
button.addEventListener('click', async () => {
    await sendRequest()
})
window.sendRequest = async () => {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const city = document.getElementById('city').value;
    const msg = document.getElementById('msg').value;

    await axios.post(`/api/saveUser`, {
        name: name,
        surname: surname,
        email: email,
        company: company,
        city: city,
        msg: msg
    })
}