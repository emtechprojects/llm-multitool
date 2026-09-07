const userLogin = document.querySelector('.login-form')
const userSignup = document.querySelector('.signup-form')


const goToUserSignup = document.querySelector('.login-form').querySelector('span')
const goToUserLogin = document.querySelector('.signup-form').querySelector('span')
goToUserLogin.addEventListener('click', () => {
    userSignup.style.display = 'none'
    userLogin.style.display = 'block'
})
goToUserSignup.addEventListener('click', () => {
    userLogin.style.display = 'none'
    userSignup.style.display = 'block'
})


userLogin ? userLogin.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const user = {
        name: ev.target.querySelector('#login-name').value,
        pwd: ev.target.querySelector('#login-pw').value
    }
    fetch('/user-login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    })
        .then(async res => {
            if (res.ok) return res.json()
            const json = await res.json()
            return await Promise.reject(json)
        })
        .then(({ validationError, url }) => {
            if (validationError) {
                alert(validationError)
            } else {
                window.location = url
            }
        })
        .catch(err => console.log(err))
}) : null

userSignup ? userSignup.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const user = {
        name: ev.target.querySelector('#signup-name').value,
        pwd: ev.target.querySelector('#signup-pw').value
    }
    console.log(user)
    fetch('/user-signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    })
        .then(async res => {
            if (res.ok) return res.json()
            const json = await res.json()
            return await Promise.reject(json)
        })
        .then(({ validationError, success }) => {
            if (validationError) {
                alert(validationError)
            } else {
                window.location = url
            }
        })
        .catch(err => console.log(err))
}) : null