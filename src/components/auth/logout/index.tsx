import React, { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../usercontext';

const LogoutPage = () => {
    const { setUsername } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Выход...';

        // Выполнение операций после завершения эффекта
        localStorage.removeItem('Token');
        setUsername(null);
        navigate('/'); // Переход на главную страницу
    }, [setUsername, navigate]);

    // Компонент возвращает null, так как он ничего не рендерит
    return null;
}

export default LogoutPage;
