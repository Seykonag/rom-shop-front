import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BonusPage.css'; // Импортируем файл стилей
import { number } from 'react-admin';

const BonusesPage = () => {
    const navigate = useNavigate();
    const [bonus, setBonus] = useState<number>(0);

    async function handleGet() {
        try {
            const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/bonus', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
            });

            if (res.ok) {
                const json = await res.json();
                setBonus(json);
                console.log(json); // Выводим объект JSON напрямую
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
            alert('Произошла ошибка при загрузке категорий');
        }
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className="bonuses-page-container"> {/* Добавляем класс для стилизации */}
            <div className='start-text'>
            <h2>Программа лояльности в интернет-магазине "РОМ"</h2>
            <p>Приветствуем вас в нашем интернет-магазине "РОМ"! Мы рады сообщить вам о запуске нашей программы лояльности.</p>
            <div className="bonus-info">Ваши бонусы: {bonus.toLocaleString()}</div>
            </div>
            <h3>Вопросы и ответы о программе лояльности "РОМ":</h3>
            <div className="faq-item">
                <h4>1. Как работает программа лояльности в интернет-магазине "РОМ"?</h4>
                <p>Наша программа лояльности предоставляет клиентам уникальные возможности экономии при каждой покупке.</p>
            </div>
            <div className="faq-item">
                <h4>2. Как я могу получить бонусы?</h4>
                <p>При каждой покупке вы получаете 10% бонусов от суммы заказа.</p>
            </div>
            <div className="faq-item">
                <h4>3. Как я могу использовать бонусы?</h4>
                <p>Бонусы можно использовать при следующей покупке в соотношении 1 бонус = 1 тенге.</p>
            </div>
            <div className="faq-item">
                <h4>4. Есть ли дополнительные преимущества для участников программы лояльности?</h4>
                <p>Да, участники программы лояльности получают доступ к эксклюзивным скидкам и акциям, а также другим преимуществам.</p>
            </div>
            <div className="faq-item">
                <h4>5. Есть ли какие-то ограничения на использование бонусов?</h4>
                <p>Бонусы могут использоваться только для оплаты товаров в нашем магазине. Они не могут быть обменены на деньги или переданы другим лицам.</p>
            </div>
            <div className="faq-item">
                <h4>6. Как часто обновляются бонусы на моем счете?</h4>
                <p>Бонусы обновляются на вашем счете после каждой успешной покупки и зачисляются автоматически.</p>
            </div>
             {/* Добавляем класс для стилизации */}
        </div>
    );
};

export default BonusesPage;
