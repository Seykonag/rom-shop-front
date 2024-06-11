import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../home/HomePage.css'

interface Product {
  id: number;
  title: string;
  price: number;
  salePrice: number;
  percentageSale: number;
  model: string;
  developer: string;
  realPhoto: string | null;
  photo: string | null;
  stock: boolean;
  categoryId: number;
}

interface Category {
  id: number;
  title: string;
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/category/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        } else {
          console.error('Error fetching category data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/products/getCategory', {
          method: 'POST',
          body: JSON.stringify(Number(categoryId)),
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategory();
    fetchProducts();
  }, [categoryId]);

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

  return (
    <div>
      <ToastContainer />
      <h2>{category ? category.title : 'Loading...'}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} className='link-style'>
          <div className="product-image-container">
<img src={`data:image/jpeg;base64,${product.photo}`} alt={product.title} className="product-image"/>
{product.salePrice !== 0 && (
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
  );
};

export default CategoryPage;
