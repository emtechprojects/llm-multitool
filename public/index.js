const userLogin = document.querySelector('.login-form')

userLogin ? userLogin.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const user = {
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
