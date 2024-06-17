import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../home/HomePage.css'; // Importing styles from HomePage.css

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

const SearchResults: React.FC = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortMethod, setSortMethod] = useState<string>('default');
    const navigate = useNavigate();

    const searchQuery = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/search/${encodeURIComponent(searchQuery)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const json = await res.json();
                    setSearchResults(json);
                } else {
                    alert('Произошла неизвестная ошибка');
                }
            } catch (error) {
                console.error('Ошибка при выполнении поиска:', error);
                alert('Произошла ошибка при выполнении поиска');
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery]);

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

    const sortProducts = (products: Product[], method: string) => {
        switch (method) {
          case 'priceAsc':
            return [...products].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
          case 'priceDesc':
            return [...products].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
          case 'titleAsc':
            return [...products].sort((a, b) => a.title.localeCompare(b.title));
          case 'titleDesc':
            return [...products].sort((a, b) => b.title.localeCompare(a.title));
          default:
            return products;
        }
      };
      
      const sortedProducts = sortProducts(searchResults, sortMethod);

    return (
        <div>
            <ToastContainer />
            <h1 style={{color: "white"}}>Результаты поиска</h1>
      
            <div className="product-container">
                <ul className="product-list">
                    {sortedProducts.map(product => (
                        <li key={product.id} className="product-card" style={{width: "250px"}}>
                        <Link to={`/product/${product.id}`} className='link-style'>
                        <div className="product-image-container">
    <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.title} className="product-image"/>
    {product.salePrice && (
        <div className="product-discount-overlay">
            <p className="product-discount-text">{product.percentageSale}%</p>
        </div>
    )}
</div>
                                <div className="product-details">
                                    <h3 className="product-title" style={{color: "#0096f0"}}>{product.title}</h3>
                                    {product.salePrice ? (
    <>
        <p className="product-price discounted" style={{ fontSize: "20px"}}>{product.price.toLocaleString()} ₸</p>
        <p className="product-saleprice counted" style={{ fontSize: "25px"}}>{product.salePrice.toLocaleString()} ₸</p>
    </>
) : (
    <p className="product-price" style={{color: "#b54848", fontSize: "25px"}}>{product.price.toLocaleString()} ₸</p>
)}
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.stock ? 'В наличии' : 'Нет в наличии'}</p>
                                </div>
                            </Link>
                            <div className="product-actions">
                                <button onClick={() => handleAddToCart(product.id)}>Добавить в корзину</button>
                                <button onClick={() => handleBuy(product.id)}>Купить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchResults;
