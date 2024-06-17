import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>ИНФОРМАЦИЯ</h3>
        <ul>
          <li><a href="/about">О нас</a></li>
          <li><a href="/privacy">Политика Безопасности</a></li>
          <li><a href="/terms">Условия соглашения</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>СОЦИАЛЬНЫЕ СЕТИ</h3>
        <ul className="list-unstyled">			
				<li>
									<a target="_blank" href="https://www.instagram.com/firmarom.kz/"><img src="https://firmarom.kz/image/cache/catalog/Logo/png-instagram-25x25.png" alt="" title="" /></a>
								</li>			
        </ul>
      </div>
      <div className="footer-section">
        <h3>ЛИЧНЫЙ КАБИНЕТ</h3>
        <ul>
          <li><a href="/profile">Личный Кабинет</a></li>
          <li><a href="/myorders">История заказов</a></li>
          <li><a href="/bucket">Корзина</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h3>НАШИ КОНТАКТЫ</h3>
        <p>+7(7182)53-27-93, 530-531</p>
        <p>support@firmarom.kz</p>
        <p>Пнд.- Птн.: с 9:00 до 18:00 Суб.: с 9:00 до 14:00 Вск.: выходной</p>
        <p>г. Павлодар, ул. Ак.Сатпаева 36</p>
      </div>
      <div className="footer-copy">
        <p>Интернет-магазин РОМ © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;