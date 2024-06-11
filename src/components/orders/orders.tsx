import React, { useEffect, useState } from 'react';
import "./orders.css";

interface OrderDetail {
    title: string;
    productId: number;
    price: number;
    salePrice?: number;
    percentageSale?: number;
    amount: number;
    sum: number;
    photo?: string | null;
}

interface Order {
    id: number;
    username: string | null;
    created: string;
    updated: string;
    sum: number;
    status: string;
    idProducts: number[] | null;
    details: OrderDetail[];
}

const StarRating: React.FC<{ rating: number; onChange: (rating: number) => void }> = ({ rating, onChange }) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleStarHover = (index: number) => {
        setHoverRating(index + 1);
    };

    const handleStarClick = (index: number) => {
        onChange(index + 1);
    };

    const handleMouseLeave = () => {
        setHoverRating(null);
    };

    return (
        <div className="star-rating" onMouseLeave={handleMouseLeave}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className={`star ${ratingValue <= (hoverRating || rating) ? 'active' : ''}`}
                        onMouseEnter={() => handleStarHover(index)}
                        onClick={() => handleStarClick(index)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [showComments, setShowComments] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [commentText, setCommentText] = useState<string>('');
    const [productId, setProductId] = useState<number | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/myOrders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('Token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders:', response.status);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const translateStatus = (status: string) => {
        switch (status) {
            case 'NEW':
                return 'Новый';
            case 'APPROVED':
                return 'Одобрен';
            case 'CANCELED':
                return 'Отменен';
            case 'PAID':
                return 'Оплачен';
            case 'CLOSED':
                return 'Закрыт';
            default:
                return status;
        }
    };

    const handlePay = async (orderId: number) => {
        const data = {
            idOrder: orderId,
            currency: "RUB"
        };

        console.log(data)

        try {
            const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/pay', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
                }
            });
            if (response.ok) {
                const url = await response.text(); // Assuming the response is plain text
                window.location.href = url;
            } else {
                console.error('Failed to pay order:', response.status);
            }
        } catch (error) {
            console.error('Error paying order:', error);
        }
    };

    const handleShowComments = (order: Order, productId: number | null) => {
        setSelectedOrder(order);
        setShowComments(true);
        setProductId(productId);
    };

    const handleCloseComments = () => {
        setShowComments(false);
        setSelectedOrder(null);
    };

    const handleSaveComment = async (order: Order | null, rating: Number | null, commentText: String, id: number | null) => {
        const data = {
            "idProduct": id,
            "idOrder": order?.id,
            "rating": rating,
            "text": commentText
        }
        console.log(data)
        const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/comment/create', {
            

            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        });

        if (response.ok) {
            handleCloseComments()
        }
    }

    async function handleCancelOrder(id: number) {
        const data = {
            [id]: false
        }
        const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/cancel', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        });

        if (response.ok) {
            window.location.reload();
        }
    }

    return (
        <div>
            <h1>Список заказов</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} className='order-card'>
                {orders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
                        <h2>Заказ #{order.id}</h2>
                        <p>Дата создания: {new Date(order.created).toLocaleString()}</p>
                        <p>Общая сумма: {order.sum}</p>
                        <p>Статус: {translateStatus(order.status)}</p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {order.details.map((detail, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    {detail.photo && (
                                        <img src={`data:image/jpeg;base64,${detail.photo}`} alt={detail.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    )}
                                    <h3>{detail.title}</h3>
                                    {!detail.salePrice && <p>Цена: {detail.price}</p>}
                                    {detail.salePrice && <p>Цена со скидкой: {detail.salePrice}</p>}
                                    <p>Количество: {detail.amount}</p>
                                    <p>Сумма: {detail.sum}</p>
                                    {order.status === 'CLOSED' && (
                                        <button className="comment-btn" onClick={() => handleShowComments(order, detail.productId)} style={{ marginTop: '5px' }}>
                                        Оставить комментарий
                                    </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {order.status === 'APPROVED' && (
                            <button className='pay-btn' onClick={() => handlePay(order.id)} style={{ marginTop: '10px' }}>
                                Оплатить
                            </button>
                        )}
                        {order.status === 'NEW' && (
                            <button className="cancel-btn" onClick={() => handleCancelOrder(order.id)} style={{ marginTop: '10px' }}>
                            Отменить заказ
                        </button>
                        )}

                    </div>
                ))}
            </div>
            {showComments && (
                <div className="modal">
                    <div className="modal-content">
                    <h2>Комментарии для продукта {selectedOrder?.details.find(detail => detail.productId === productId)?.title}</h2>
                        <StarRating rating={rating || 0} onChange={setRating} />
                        <textarea placeholder="Введите комментарий" value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}/>
                        <button onClick={() => handleSaveComment(selectedOrder, rating, commentText, productId)} >Оставить комментарий</button>
                        <button onClick={handleCloseComments} style={{"marginLeft": "100px"}}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
