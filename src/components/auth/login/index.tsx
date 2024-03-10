import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameDirty, setusernamelDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [usernameError, setUsernameError] = useState('Логин не должен быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым')

    const [formValid, setFormValid] = useState(false)

    async function handle() {
        const request_data = {"username": username, "password": password}

        const res = await fetch('http://localhost:8080/auth/login', {
            method: "POST",
            body: JSON.stringify(request_data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.ok) {
            alert('Вы авторизованы')
            const json = await res.text()
            console.log(json)
            localStorage.setItem('Token', json)
            navigate('/')
        } else {
            alert('Произошла неизвестная ошибка')
            navigate('/login')
        }
    }

    const usernameHandler = (e: any) => {
        setUsername(e.target.value) 
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/
        if (e.target.value.length < 5) {
            setUsernameError('Логин не должен быть меньше 5 символов')
        } else {
            if (!usernameRegex.test(String(e.target.value).toLowerCase())) {
                setUsernameError('Не корректный логин')
            } else {
                setUsernameError('')
            }
        }
    }

    const passwordHandler = (e: any) => {
        setPassword(e.target.value)
        if(8 > e.target.value.length) {
            setPasswordError('Пароль не должен быть меньше 8 символов')
            if (!e.target.value) {
                setPasswordError('Пароль не должен быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'username':
                setusernamelDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    useEffect(() => {
        document.title='Войти';
        if (usernameError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [usernameError, passwordError]);

    return (
        <form onSubmit={handle}>
            <h1>Войти</h1>
            {(usernameDirty && usernameError) && <div style={{color: 'red'}}>{usernameError}</div>}
            <input onChange={e => usernameHandler(e)} value={username} onBlur={ e => blurHandler(e) } type="text" name="username" placeholder='Ваш логин' />
            {(passwordError && passwordDirty) && <div style={{color: 'red'}}>{passwordError}</div>}
            <input onChange={e => passwordHandler(e)} value={password} onBlur={ e => blurHandler(e) } type="password" name='password' placeholder='Ваш пароль' />
            <button onClick={e => { e.preventDefault(); handle(); }} disabled={!formValid} type='submit'>Войти</button>
        </form>
        
    );
};

export default LoginPage;