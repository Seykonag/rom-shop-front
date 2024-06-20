import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ProductPage.css"

interface Product {
    id: number;
    title: string;
    price: number;
    salePrice: number | null;
    percentageSale: number;
    model: string;
    developer: string;
    realPhoto: string | null;
    photo: string | null;
    stock: boolean;
    comments: Comment[];
    categoryId: number;
}

interface Comment {
    firstName: string;
    lastName: string;
    idOrder: number | null;
    idProduct: number | null;
    rating: number;
    text: string;
    username: string;
    data: string; // Добавляем поле data
}

const formatDateWithoutSeconds = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const ProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('none');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/products/${productId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                } else {
                    console.error('Failed to fetch product:', res.statusText);
                    alert('Произошла ошибка при загрузке продукта');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Произошла ошибка при загрузке продукта');
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const calculateAverageRating = () => {
        if (product && product.comments.length > 0) {
            const totalRating = product.comments.reduce((acc, comment) => acc + comment.rating, 0);
            return (totalRating / product.comments.length).toFixed(1); // Округляем до одного знака после запятой
        }
        return "Нет оценок"; // Если комментариев нет
    };

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
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
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
    
        handleGet()
    
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
      }
    
      console.log(data)
    
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
    
      handlePost()
      console.log(`Buying product with ID: ${productId}`);
      console.log(`Product with ID ${productId} added to cart`);
    };

    const getInitial = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + '.';
    };

    const capitalizeFirstLetter = (string: string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    

    const sortedComments = [...product.comments].sort((a, b) => {
        switch (sortOrder) {
            case 'dateAsc':
                return new Date(a.data).getTime() - new Date(b.data).getTime();
            case 'dateDesc':
                return new Date(b.data).getTime() - new Date(a.data).getTime();
            case 'ratingAsc':
                return a.rating - b.rating;
            case 'ratingDesc':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className='container-neobyc' style={{backgroundColor: "white", borderRadius: "50px"}}>
            <ToastContainer />
            <h1>{product.title}</h1>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Цена: {product.price.toLocaleString()} ₸</p>
            {product.salePrice && <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Скидочная цена: Т{product.salePrice}</p>}
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Модель: {product.model}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Разработчик: {product.developer}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.stock ? 'В наличии' : 'Нет в наличии'}</p>
            <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.title} style={{width: "300px", height: "300px"}}/>
            <div style={{ marginTop: '10px' }}>
                <button className="product-button" onClick={() => handleAddToCart(product.id)} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px' }}>Добавить в корзину</button>
                <button className="product-button" onClick={() => handleBuy(product.id)} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginLeft: '70px'}}>Купить</button>
            </div>
            <div>
                <h2>Средняя оценка товара: {calculateAverageRating()} <span style={{ color: '#007bff', display: 'inline-block' }}>★</span></h2>
            </div>
            <div className="sort-container">
    <label htmlFor="sortOrder" className="sort-label">Отсортировать:</label>
    <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
        <option value="none">Без сортировки</option>
        <option value="dateAsc">По дате(сначала старые)</option>
        <option value="dateDesc">По дате(сначала новые)</option>
        <option value="ratingAsc">По рейтингу(сначала отрицательные)</option>
        <option value="ratingDesc">По рейтингу(сначала положительные)</option>
    </select>
</div>

            <ul style={{ listStyleType: 'none' }}>
                {sortedComments.map((comment: Comment, index: number) => (
                    <li key={index} className="comment-container">
                    <div className="comment-details">
                        <div className="comment-rating" style={{color: "#007bff"}}>
                            {[...Array(comment.rating)].map((_, index) => (
                                <span key={index}>★</span>
                            ))}
                        </div>
                        <p style={{marginTop: 0}}>{capitalizeFirstLetter(comment.firstName)} {getInitial(comment.lastName)}</p>
                        <p style={{marginTop: 0}}>{formatDateWithoutSeconds(comment.data)}</p>
                    </div>
                    <div className="comment-text">
                        <p>{comment.text}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;
