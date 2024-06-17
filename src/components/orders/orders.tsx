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
    address: string;
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
    const [showBonus, setShowBonus] = useState<boolean>(false);
    const [bonusId, setBonusId] = useState<number | null>(null);
    const [useBonus, setUseBonus] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [commentText, setCommentText] = useState<string>('');
    const [productId, setProductId] = useState<number | null>(null);
    const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
    const [editedAddress, setEditedAddress] = useState<string>('');
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
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
                setBonus(json); // Выводим объект JSON напрямую
            } else {
            }
        } catch (error) {
            
        }
    };


    useEffect(() => {
        handleGet();
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

    const handleCloseBonus = (order: Order) => {
        setShowBonus(false);
        setUseBonus(false);
    }

    const handleShowBonus = (order: Order) => {
        setBonusId(order.id);
        setShowBonus(true);
    };
    
    const handleBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseBonus(true);
    };

    const handlePay = async (orderId: number | null ) => {
        if (orderId === null) return;

        const data = {
            idOrder: orderId
        };

        console.log(data)

        try {
            const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/pay', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
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

    const handleEditAddress = (order: Order) => {
        setIsEditingAddress(true);
        setEditedAddress(order.address);
        setEditingOrderId(order.id);
    };
    
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedAddress(e.target.value);
    };
    
    const handleSaveAddress = async () => {
        if (editingOrderId === null) return;

        console.log(editedAddress)
    
        try {
            const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/order/editAddress/${editingOrderId}`, {
                method: 'POST',
                body: editedAddress,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
                }
            });
    
            if (response.ok) {
                setIsEditingAddress(false);
                setEditingOrderId(null);
                window.location.reload();
            } else {
                console.error('Failed to update address:', response.status);
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };
    

    return (
        <div>
            <h1 style={{color:"white"}}>Список заказов</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} className='order-card'>
                {orders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
                        <h2>Заказ #{order.id}</h2>
                        <p>Дата заказа: {new Date(order.updated).toLocaleString()}</p>
                        <p>Общая сумма: {order.sum}</p>
                        <p>Адрес: {order.address}</p>
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
                        {order.status !== 'CLOSED' && order.status !== 'CANCELED' && (
                            <button className='comment-btn' onClick={() => handleEditAddress(order)} style={{marginRight: 10}}>Изменить адрес</button>
                        )}

                        {order.status === 'APPROVED' && (
                            <button className='pay-btn' onClick={() => handleShowBonus(order)} style={{ marginTop: '10px' }}>
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
            {showBonus && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Хотите использовать бонусы для заказа #{bonusId}?</h2>
                        {bonus !== 0 && (
                            <input type="checkbox" />
                        )}
                        <h3>У вас {bonus !== 0 ? bonus.toLocaleString() : 'нет' } бонусов</h3>
                        <h4>При оплате бонусами они спишутся, если бонусов достаточно то покупка обойдется бесплатно</h4>
                        
                        <button style={{backgroundColor:"#28a745"}} onClick={() => handlePay(bonusId)}>Оплатить</button>
                        <button onClick={() => setShowBonus(false)} style={{"marginLeft": "10px"}}>Отмена</button>
                    </div>
                </div>
            )}
            {isEditingAddress && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Изменить адрес для заказа #{editingOrderId}</h2>
                        <input 
                            type="text" 
                            value={editedAddress} 
                            onChange={handleAddressChange}
                            placeholder="Введите новый адрес"
                        />
                        <div style={{marginTop: "15px"}}>
                        <button onClick={handleSaveAddress}>Сохранить</button>
                        <button onClick={() => setIsEditingAddress(false)} style={{"marginLeft": "10px"}}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}

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
