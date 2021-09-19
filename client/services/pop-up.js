const popUp = document.getElementById('pop-up')
const ru = require('../lang/ru.json')
const en = require('../lang/en.json')
const ar = require('../lang/ar.json')

export const popUpSuccess = (lang) => {
    const file = eval(lang)
    popUp.innerHTML = file.success
    popUp.classList.add('success')
    setTimeout(() => {
        popUp.classList.remove('success')
    }, 5000)

}
export const popUpFailure = (lang) => {
    const file = eval(lang)
    popUp.innerHTML = file.failure
    popUp.classList.add('failure')
    setTimeout(() => {
        popUp.classList.remove('failure')
    }, 5000)

}