import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>ИНФОРМАЦИЯ</h3>
        <ul>
          <li><a href="/about">О нас</a></li>
          <li><a href="/delivery">Доставка</a></li>
          <li><a href="/privacy-policy">Политика Безопасности</a></li>
          <li><a href="/terms">Условия соглашения</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>СЛУЖБА ПОДДЕРЖКИ</h3>
        <ul>
          <li><a href="/contacts">Контакты</a></li>
          <li><a href="/return">Возврат товара</a></li>
          <li><a href="/sitemap">Карта сайта</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>ДОПОЛНИТЕЛЬНО</h3>
        <ul>
          <li><a href="/manufacturers">Производители</a></li>
          <li><a href="/promotions">Акции</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>СОЦИАЛЬНЫЕ СЕТИ</h3>
        {/* Добавьте здесь иконки для социальных сетей */}
      </div>
      <div className="footer-section">
        <h3>ЛИЧНЫЙ КАБИНЕТ</h3>
        <ul>
          <li><a href="/profile">Личный Кабинет</a></li>
          <li><a href="/orders">История заказов</a></li>
          <li><a href="/bookmarks">Закладки</a></li>
          <li><a href="/newsletter">Рассылка</a></li>
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