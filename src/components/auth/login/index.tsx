import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../usercontext'; // Импортируйте хук useUser
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Получите функцию setUsername из контекста
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameDirty, setUsernameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [usernameError, setUsernameError] = useState('Логин не должен быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым');
  const [formValid, setFormValid] = useState(false);
  const { setUsername } = useUser();

  async function handle() {
    const requestData = { username, password };

    const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const json = await res.json();
      console.log(json);
      localStorage.setItem('Token', json.token);
      localStorage.setItem('Username', json.username);
      setUsername(json.username); 
      alert('Вы авторизованы'); // Обновляем имя пользователя в контексте
      navigate('/');
    } else {
      alert('Не верный логин или пароль');
      navigate('/login');
    }
  }

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUsername(e.target.value);
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (e.target.value.length < 5) {
      setUsernameError('Логин не должен быть меньше 5 символов');
    } else if (!usernameRegex.test(String(e.target.value).toLowerCase())) {
      setUsernameError('Некорректный логин');
    } else {
      setUsernameError('');
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 5) {
      setPasswordError('Пароль не должен быть меньше 5 символов');
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'username':
        setUsernameDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.title = 'Войти';
    setFormValid(!usernameError && !passwordError);
  }, [usernameError, passwordError]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handle(); }} sx={{ mt: 1 }}>
          {usernameDirty && usernameError && (
            <Alert severity="error">{usernameError}</Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Ваш логин"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={usernameHandler}
            onBlur={blurHandler}
            error={usernameDirty && Boolean(usernameError)}
          />
          {passwordDirty && passwordError && (
            <Alert severity="error">{passwordError}</Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Ваш пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={passwordHandler}
            onBlur={blurHandler}
            error={passwordDirty && Boolean(passwordError)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!formValid}
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>

          <Typography variant="body2" color="textSecondary" align="center">
            У вас нет аккаунта?{' '}
            <Link to={`/registration`}>
              Зарегистрируйтесь
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
