import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './categoryStyle.css'

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
  const [sortMethod, setSortMethod] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
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

const applyFilters = () => {
  setPriceRange([Number(minPrice) || 0, Number(maxPrice) || 10000000]);
};

const resetFilters = () => {
  setMinPrice('');
  setMaxPrice('');
  setPriceRange([0, 10000000]);
};

const filteredProducts = products.filter(product => {
  const productPrice = product.salePrice || product.price;
  return productPrice >= priceRange[0] && productPrice <= priceRange[1];
});

const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setMinPrice(value);
};

const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setMaxPrice(value);
};

const sortedProducts = sortProducts(filteredProducts, sortMethod);


  return (
    <div>
      <ToastContainer />
      <h2 style={{color: "white"}}>{category ? category.title : 'Загрузка...'}</h2>
      
      <ul className='product-list' style={{ listStyleType: 'none', padding: 0 }}>
      <div className="util">
      <div className="sort-container">
        <label htmlFor="sort">Сортировка: </label>
        <select id="sort" value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="default">По умолчанию</option>
          <option value="priceAsc">Сначала дешевле</option>
          <option value="priceDesc">Сначала дороже</option>
          <option value="titleAsc">От А до Я</option>
          <option value="titleDesc">От Я до А</option>
        </select>
      </div>
      <div className="filter-container">
        <label>Фильтр по цене:</label>
        <div>
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="От"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="До"
        />
        </div>
        <button className='comment-btn' onClick={applyFilters}>Применить фильтр</button>
      <button className='comment-btn' onClick={resetFilters}>Сбросить фильтр</button>
      </div>
      
      </div>
      
        {sortedProducts.map(product => (
          <li key={product.id} className="product-card" style={{width: "250px"}}>
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
