import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/login';
import HomePage from './components/home';
import RegistrationPage from './components/auth/registration';
import './App.css';
import LogoutPage from './components/auth/logout';
import ProductPage from './components/products';
import Header from './components/Header';
import ProfilePage from './components/profle';
import BonusesPage from './components/Bonuses';
import BucketPage from './components/bucket';
import OrdersPage from './components/orders/orders';
import CategoryPage from './components/category';
import AdminPanel from './components/admin/admin-panel';
import SearchResults from './components/search/search';
import Footer from './components/Footer/footer';
import ProductEdit from './components/admin/admin-panel/productedit';

function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState<boolean>(true);

  return (
    <div className="App">
        {showHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/admin/*" element={<AdminPanelRoute setShowHeaderFooter={setShowHeaderFooter} />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/bonuses" element={<BonusesPage />} />
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="/myorders" element={<OrdersPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/users" element = {<Navigate to="/admin/users" />} />
          <Route path="/products" element = {<Navigate to="/admin/products" />} />
          <Route path="/orders" element = {<Navigate to="/admin/orders" />} />
          <Route path="/categorys" element = {<Navigate to="/admin/categorys" />} />
          <Route path="/sales" element = {<Navigate to="/admin/sales" />} />
          <Route path="/paypalorders" element = {<Navigate to="/admin/paypalorders" />} />
          <Route path="/products/create" element = {<Navigate to="/admin/products/create" />} />
          <Route path="/categorys/create" element = {<Navigate to="/admin/categorys/create" />} />
          <Route path="/sales/create" element = {<Navigate to="/admin/sales/create" />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      {/* Рендерим футер только если showHeaderFooter равен true */}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

const AdminPanelRoute = ({ setShowHeaderFooter }: { setShowHeaderFooter: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // Устанавливаем false для скрытия хедера и футера при открытии административной панели
  setShowHeaderFooter(false);
  return <AdminPanel />;
};

export default App;
