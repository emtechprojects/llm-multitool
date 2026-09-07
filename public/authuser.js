const manuID = document.querySelector('.manu-id')
const partNameForm = document.querySelector('.part-name')
const salesAssist = document.querySelector('.sales-assistant')
const textarea = document.querySelector('textarea')

const gotoManuID = manuID.querySelector('span')
const gotoPartName = partNameForm.querySelector('span')
const clrBtn = document.querySelector('.clr-btn')

const span1 = document.querySelector('.span-1')
const span2 = document.querySelector('.span-2')
const tool1 = document.querySelector('.tool-1')
const tool2 = document.querySelector('.tool-2')

span1.addEventListener('click', function () {
    tool1.style.display = 'block'
    tool2.style.display = 'none'
})
span2.addEventListener('click', function () {
    tool2.style.display = 'block'
    tool1.style.display = 'none'
})
gotoPartName.addEventListener('click', function () {
    manuID.style.display = 'block'
    partNameForm.style.display = 'none'
})
gotoManuID.addEventListener('click', function () {
    partNameForm.style.display = 'block'
    manuID.style.display = 'none'
})
clrBtn.addEventListener('click', function () {
    textarea.textContent = ''
})

salesAssist.addEventListener('submit', function (ev) {
    ev.preventDefault()
    const salesName = ev.target.querySelector('#sales-name')
    const salesArea = ev.target.querySelector('#sales-area')

    const obj = {
        name: salesName.value,
        area: salesArea.value
    }
    if (obj.name == "") {
        alert('Enter part name')
        salesName.style.borderColor = "red"
    }
    if (obj.area == "") {
        alert('Enter area to search')
        salesArea.style.borderColor = "red"
    }
    if (obj.name && obj.area) {
        manuID.reset()
        salesName.style.borderColor = "black"
        salesArea.style.borderColor = "black"
        fetch('/send-form', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ salesAssistant : obj })
        })
            .then(async res => {
                if (res.ok) return res.json()
                const json = await res.json()
                return await Promise.reject(json)
            })
            .then(({ Response }) => {
                textarea.textContent += `Part Name:\n${obj.name}\nPart Name:\n${obj.area}\n\n`
                textarea.textContent += `${Response}\n\n`
            })
            .catch(e => {
                console.log(`Error-\n${e}`)
            })
    }
})

manuID.addEventListener('submit', function (ev) {
    ev.preventDefault()
    const man = ev.target.querySelector('#manufacturer')
    const num = ev.target.querySelector('#part-id')

    const obj = {
        man: man.value,
        num: num.value
    }
    if (obj.man == "") {
        alert('Enter Maufacturer name')
        man.style.borderColor = "red"
    }
    if (obj.num == "") {
        alert('Enter part number')
        num.style.borderColor = "red"
    }
    if (obj.man && obj.num) {
        manuID.reset()
        man.style.borderColor = "black"
        num.style.borderColor = "black"
        fetch('/send-form', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ obj })
        })
            .then(async res => {
                if (res.ok) return res.json()
                const json = await res.json()
                return await Promise.reject(json)
            })
            .then(({ Response }) => {
                textarea.textContent += `Manufacturer:\n${obj.man}\nPart Name:\n${obj.num}\n\n`
                textarea.textContent += `${Response}\n\n`
            })
            .catch(e => {
                console.log(`Error-\n${e}`)
            })
    }
})

partNameForm.addEventListener('submit', function (ev) {
    ev.preventDefault()
    const partNameInput = ev.target.querySelector('#part-name')
    const partNameInputVal = partNameInput.value

    if (partNameInputVal == "") {
        alert('Enter a part name')
        partNameInput.style.borderColor = "red"
    }
    if (partNameInputVal) {
        partNameForm.reset()
        partNameInput.style.borderColor = "black"

        fetch('/send-form', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ partName: partNameInputVal })
        })
            .then(async res => {
                if (res.ok) return res.json()
                const json = await res.json()
                return await Promise.reject(json)
            })
            .then(({ Response }) => {
                textarea.textContent += `Part Name:\n${partNameInputVal}\n\n`
                textarea.textContent += `${Response}\n\n`

            })
            .catch(e => {
                console.log(`This is the script.js error ${e}`)
            })
    }
})
