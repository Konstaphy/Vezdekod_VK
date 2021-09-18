import './styles.scss'
import axios from "axios";

let currentLanguage = 'Russian'

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