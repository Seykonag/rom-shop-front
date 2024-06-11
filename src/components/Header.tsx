import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import avatar from '../images/avatarka.png';
import { useUser } from './usercontext';
import './header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: number, title: string }[]>([]);
  const { username } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchCategories();
    }, 1000)
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/category/all', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const json = await res.json();
        setCategories(json);
      } else {
        alert('Произошла неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
      alert('Произошла ошибка при загрузке категорий');
    }
  };

  const handleSearch = () => {
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoriesToggle = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <header className="header">
      <div className="avatar-container">
        <a href="/"><img src={avatar} alt="Avatar" className="avatar" /></a>
      </div>
      <div className="category-container">
        <button onClick={handleCategoriesToggle} className="category-button">
          Категории <FontAwesomeIcon icon={faAngleDown} />
        </button>
        {isCategoriesOpen && (
          <ul className="category-list">
            {categories.map((category, index) => (
              <li key={index}>
                <NavLink style={{textDecoration: "none", color: "black"}} to={`/category/${category.id}`} onClick={() => setIsCategoriesOpen(false)}>
                  {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Поиск товаров"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleEnterPress} // Добавляем обработчик нажатия клавиши Enter
            className="search-input"
          />
          <FontAwesomeIcon icon={faSearch} onClick={handleSearch} className="search-icon" />
        </div>
      </div>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/bonuses">Бонусная программа</NavLink></li>
          {username && (
            <>
              <li><NavLink to="/bucket">Корзина</NavLink></li>
              <li><NavLink to="/myorders">Заказы</NavLink></li>
              <li className="dropdown">
                <button className="dropbtn">{username}</button>
                <div className="dropdown-content">
                  <NavLink to="/profile">Профиль</NavLink>
                  <NavLink to="/logout">Выход</NavLink>
                </div>
              </li>
            </>
          )}
          {!username && (
            <li><NavLink to="/login">Войти</NavLink></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
