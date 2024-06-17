import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.css';

interface Product {
    id: number;
    title: string;
    price: number;
    salePrice?: number;
    percentageSale?: number;
    model: string;
    developer: string;
    realPhoto?: string | null;
    photo?: string | null;
    stock: boolean;
    categoryId: number;
}

interface Category {
    id: number;
    title: string;
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Компьютерный сервис-РОМ';

        const fetchProductsAndCategories = async () => {
            try {
                const resProducts = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/products', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const resCategories = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/category/all', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (resProducts.ok && resCategories.ok) {
                    const productsData = await resProducts.json();
                    const categoriesData = await resCategories.json();
                    setProducts(productsData);
                    setCategories(categoriesData);
                } else {
                    console.error('Failed to fetch products or categories:', resProducts.status, resCategories.status);
                }
            } catch (error) {
                console.error('Error fetching products or categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const handleAddToCart = (productId: number) => {
        const token = localStorage.getItem("Token");
        if (!token) {
            navigate('/login');
            return;
        }

        const handleGet = async () => {
            try {
                const res = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/products/${productId}/bucket`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    toast.success("Вы оформили товар, проверьте вашу корзину", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    console.error('Failed to fetch cart data:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handleGet();
        console.log(`Product with ID ${productId} bought`);
    };

    const handleBuy = (productId: number) => {
        const token = localStorage.getItem("Token");
        if (!token) {
            navigate('/login');
            return;
        }

        const data = {
            "idProducts": {
                [productId]: 1
            }
        };

        console.log(data);

        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/create', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    toast.success("Вы оформили заказ, проверьте ваши заказы. Ожидайте одобрения заказа чтобы оплатить", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    console.error('Failed to fetch cart data:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handlePost();
        console.log(`Buying product with ID: ${productId}`);
        console.log(`Product with ID ${productId} added to cart`);
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }

    const groupedProducts = categories.map(category => ({
        ...category,
        products: products.filter(product => product.categoryId === category.id)
    }));

    return (
        <div className='maybe-container'>
        <ToastContainer />
        {groupedProducts.map(category => (
            <div key={category.id} className="product-container">
                <h2>
                    <Link to={`/category/${category.id}`} className="category-title">
                        {category.title}
                    </Link>
                </h2>
                <Slider
                    infinite={true}
                    slidesToShow={4}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={1500}
                >
                    {category.products.map(product => (
                        <div key={product.id} className="product-card">
                            <Link to={`/product/${product.id}`} className="link-style">
                                <div className="product-image-container">
                                    <img
                                        src={`data:image/jpeg;base64,${product.photo}`}
                                        alt={product.title}
                                        className="product-image"
                                    />
                                    {product.salePrice && (
                                        <div className="product-discount-overlay">
                                            <p className="product-discount-text">
                                                {product.percentageSale}%
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="product-details" style={{height: "300px"}}>
                                    <h3 className="product-title" style={{ color: '#0096f0' }}>
                                        {product.title}
                                    </h3>
                                    {product.salePrice ? (
                                        <>
                                            <p className="product-price discounted" style={{ fontSize: '20px' }}>
                                                {product.price.toLocaleString()} ₸
                                            </p>
                                            <p
                                                className="product-saleprice counted"
                                                style={{ fontSize: '25px' }}
                                            >
                                                {product.salePrice.toLocaleString()} ₸
                                            </p>
                                        </>
                                    ) : (
                                        <p className="product-price" style={{ color: '#b54848', fontSize: '25px' }}>
                                            {product.price.toLocaleString()} ₸
                                        </p>
                                    )}
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                        {product.stock ? 'В наличии' : 'Нет в наличии'}
                                    </p>
                                </div>
                            </Link>
                            <div className="product-actions">
                                <button onClick={() => handleAddToCart(product.id)}>Добавить в корзину</button>
                                <button onClick={() => handleBuy(product.id)}>Купить</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        ))}
    </div>
    );
};

export default HomePage;