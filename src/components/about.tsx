import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

const AboutPage = () => {
  return (
    <div className="container" style={{backgroundColor:"white"}}>
      <ul className="breadcrumb" >
        <li>
          <Link  to="/">
            <span ><i className="fa fa-home"></i></span>
          </Link>
        </li>
      </ul>
      <div className="row">
        <div id="content" className="col-sm-12">
          <h1>О нас</h1>
          <h2>ТОО "Компьютерный центр РОМ"</h2>
          <h3>
            <img src="https://firmarom.kz/image/catalog/About/number_20_c6a4z6t36ejm_32(1).png" alt="20 лет" />
            &nbsp;Более 20 лет на рынке
          </h3>
          <h3>
            <img src="https://firmarom.kz/image/catalog/About/dostavka_gpj2s2cwfgbo_32(1).png" alt="Доставка" />
            &nbsp;Доставка по всему Казахстану (в процессе разработки)
          </h3>
          <h3>
            <img src="https://firmarom.kz/image/catalog/About/kompyuter_07ed4y7izntg_32(1).png" alt="Компьютерная техника" />
            &nbsp;Компьютерная и оргтехника
            <img src="https://firmarom.kz/image/catalog/About/printer_vnm2r99t92ir_32(1).png" alt="Принтер" />
          </h3>
          <h3>
            <img src="https://firmarom.kz/image/catalog/About/klaviatura_5exjbygzn9l0_32(1).png" alt="Периферия" />
            &nbsp;Периферия
          </h3>
          <h3>
            <img src="https://firmarom.kz/image/catalog/About/servis_vtfo6i9otdww_32(1).png" alt="Сервисный центр" />
            &nbsp;Сервисный центр (ремонт и обслуживание компьютеров) (заправка и ремонт картриджей)
            <img src="https://firmarom.kz/image/catalog/About/toner_u1lwcz9jpad3_32(1).png" alt="Тонер" />
          </h3>
          <div className="requisites">
            <h3>Реквизиты:</h3>
            <div>140000, г. Павлодар, ул. Ак. Сатпаева 36 нп.4</div>
            <div>ИИК: KZ66998FTB0000673903 в АО "First Heartland Jusan Bank"</div>
            <div>БИК: TSESKZKA</div>
            <div>БИН: 0212400038312</div>
          </div>
          <h3>
            <img src="https://firmarom.kz/image/catalog/About/two_arrows_3s2oxkkvb1gw_32(1).png" alt="Схема проезда" />
            &nbsp;<a href="https://go.2gis.com/vjgm7" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", color:"blue"}}>Где нас найти? Схема проезда.</a>
            &nbsp;<img src="https://firmarom.kz/image/catalog/About/two_arrows_3s2oxkkvb1gw_32(1).png" alt="Схема проезда" />
          </h3>
          <div className="map">
            <img src="https://firmarom.kz/image/catalog/About/proezdpvl700.jpg" alt="Карта проезда" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
