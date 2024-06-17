import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bucket.css'; // Импортируем стили главной страницы
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    productId: number;
    price: number;
    salePrice?: number | null;
    percentageSale?: number;
    amount: number;
    sum: number;
    photo?: string | null; // Фотография в формате base64
}

interface ShoppingCartProps {
    amountProducts: number;
    sum: number;
    bucketDetails: Product[];
}

const BucketPage: React.FC = () => {
    const [cartData, setCartData] = useState<ShoppingCartProps | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);


    useEffect(() => {
        const handleGet = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/bucket', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setCartData(data);
                } else {
                    console.error('Failed to fetch cart data:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handleGet();
    }, []);

    const handleBuy = (productId: number) => {
        const data = {
            "idProducts": {
                [productId]: 1
            }
        };

        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/create', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    toast.success("Вы оформили товар, проверьте ваши заказы. Ожидайте одобрения заказа чтобы оплатить", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        handleRemove([productId]);
                    }, 3000);
                } else {
                    console.error('Failed to fetch cart data:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handlePost();
    };

    const handleRemove = (productId: number[]) => {
        const idList = productId;
        const data = idList;
        console.log(JSON.stringify(data))

        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/bucket/delete', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    window.location.reload();
                } else {
                    console.error('Failed to fetch cart data:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handlePost();
    };

    const handleBuyAll = () => {
        if (!cartData) return;

        const data = {
            "idProducts": cartData.bucketDetails.reduce((acc, product) => {
                acc[product.productId] = product.amount;
                return acc;
            }, {} as Record<number, number>)
        };

        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/create', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    toast.success("Вы оформили заказ, на все товары, проверьте заказы. Ожидайте одобрения заказа чтобы оплатить", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    handleRemoveAll();
                } else {
                    console.error('Failed to create order for all products:', res.status);
                }
            } catch (error) {
                console.error('Error creating order for all products:', error);
            }
        };

        handlePost();
    };

    const handleRemoveAll = () => {
        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/bucket/clear', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    window.location.reload();
                } else {
                    console.error('Failed to clear the cart:', res.status);
                }
            } catch (error) {
                console.error('Error clearing the cart:', error);
            }
        };

        handlePost();
    };

    const toggleProductSelection = (productId: number) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    useEffect(() => {
        console.log(selectedProducts);
    }, [selectedProducts]);

    const handleBuySelected = () => {
        if (!cartData) return;
    
        const data = {
            "idProducts": selectedProducts.reduce((acc, productId) => {
                const product = cartData.bucketDetails.find(p => p.productId === productId);
                if (product) {
                    acc[productId] = product.amount;
                }
                return acc;
            }, {} as Record<number, number>)
        };
    
        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/create', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });
    
                if (res.ok) {
                    toast.success("Вы оформили заказ на выбранные товары, проверьте заказы. Ожидайте одобрения заказа чтобы оплатить", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        handleRemove(selectedProducts);
                        setSelectedProducts([]);
                    }, 3000);// Сбросить выбранные продукты после успешной покупки
                } else {
                    console.error('Failed to create order for selected products:', res.status);
                }
            } catch (error) {
                console.error('Error creating order for selected products:', error);
            }
        };
    
        handlePost();
    };

    const handleRemoveSelected = () => {
        const handlePost = async () => {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/bucket/delete', {
                    method: "POST",
                    body: JSON.stringify(selectedProducts),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    window.location.reload();
                } else {
                    console.error('Failed to remove selected products:', res.status);
                }
            } catch (error) {
                console.error('Error removing selected products:', error);
            }
        };

        handlePost();
    }

    return (
        <div className="bucket-page" style={{backgroundColor: "white"}}>
            <ToastContainer />
            {cartData &&
                <div className="bucket-content">
                    <h1 style={{color:"black"}}>Корзина</h1>
                    {cartData.bucketDetails.length > 0 && (
                        <>
                            <h2 style={{color:"white"}}>Общая сумма: {cartData.sum.toLocaleString()} ₸</h2>
                        </>
                    )}
                    
                    <ul className="product-list">
                        {cartData.bucketDetails.map((product, index) => (
                            <li key={index} className="product-card-bucket">
                                <Link to={`/product/${product.id}`} className='link-style'>
                                <div className="product-image-container">
<img src={`data:image/jpeg;base64,${product.photo}`} alt={product.title} className="product-image-bucket"/>
{product.percentageSale !== 0 && (
<div className="product-discount-overlay">
<p className="product-discount-text">{product.percentageSale}%</p>
</div>
)}
</div>
                                <div className="product-details">
                                    <h3 className="product-title">{product.title}</h3>
                                    {product.salePrice ? (
<>
<p className="product-price discounted" style={{ fontSize: "20px"}}>{product.price.toLocaleString()} ₸</p>
<p className="product-saleprice counted" style={{ fontSize: "25px"}}>{product.salePrice.toLocaleString()} ₸</p>
</>
) : (
<p className="product-price" style={{color: "#b54848", fontSize: "25px"}}>{product.price.toLocaleString()} ₸</p>
)}
                                    <p style={{ fontSize: "17px"}}>Количество: {product.amount}</p>
                                    <p style={{ fontSize: "17px"}}>Общая стоимость: {product.sum.toLocaleString()} ₸</p>
                                </div>
                                </Link>
                                
                                <div className="product-actions">
                                    <button onClick={() => handleBuy(product.productId)} style={{ marginRight: '10px' }}>Купить</button>
                                    <input
className='product-checkbox'
    type="checkbox"
    checked={selectedProducts.includes(product.productId)}
    onChange={() => toggleProductSelection(product.productId)}
/>
                                    <button onClick={() => handleRemove([product.productId])}>Удалить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {cartData.bucketDetails.length > 0 && (
                       <div className="button-group">
                            <button type="button" onClick={handleBuyAll} className="button-buy-all">Купить все</button>
                            <button type="button" onClick={handleRemoveAll} className="button-remove-all">Удалить все</button>
                            {selectedProducts.length > 0 && (
                            <>
                            <button type="button" onClick={handleBuySelected} className="button-remove-all">Купить выбранные</button>
                            <button type="button" onClick={handleRemoveSelected} className="button-remove-all">Удалить выбранные</button>
                        </>
                        )}
                        </div>
                    )}
                    {cartData.bucketDetails.length === 0 && (
                        <div className="empty-bucket">
                        <p>Ваша корзина пуста.</p>
                        </div>
                    )

                    }
                </div>
}
        </div>
    );
};

export default BucketPage;
