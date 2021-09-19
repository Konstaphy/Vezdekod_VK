module.exports = (elem) => {
    let maxcounter = 0
    let counter = 1
    let letter = ''

    elem.value.split("").forEach(elem => {
        if (elem !== letter){
            letter = elem
            counter = 1
        } else {
            counter += 1
            if (maxcounter < counter){
                maxcounter = counter
            }
        }
    })

    if (maxcounter >= 3){
        elem.style.border = "1px solid red"
        setTimeout(() => {
            elem.style.border = "1px solid #ddd"
        }, 3000)
    }
}

