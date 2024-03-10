import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    
    useEffect(() => {
        document.title='Компьютерный сервис-РОМ';
    }, []);

    return (
        <nav>
            <Link to="/">Главная</Link>  
            <Link to="/registration">Регистрация</Link>  
            <Link to="/login">Вход</Link>  
        </nav>
    );
};

export default HomePage;