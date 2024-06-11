import { Admin, Resource } from 'react-admin';
import { UserList } from './userlist';
import { useEffect, useState } from 'react';
import { productDataProvider } from './productdataprovider';
import { ProductList } from './productlist';
import ProductEdit from './productedit';
import ProductCreate from './createProduct';
import { OrderList } from './orderlist';
import { orderDataProvider } from './orderdataprovider';
import OrderDetails from './orderdetails';
import { CategoryList } from './categorylist';
import { categoryDataProvider } from './categorydataprovider';
import { saleDataProvider } from './saledataprovider';
import { SaleList } from './salelist';
import CategoryCreate from './createCategory';
import CategoryEdit from './categoryedit';
import SaleCreate from './createSale';
import { PaypalOrderList } from './paypalorderlist';
import { PaidOrderDataProvider } from './paypalorderdataprovider';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  fax: string;
  company: string;
  address: string;
  city: string | null;
  index: string;
  country: string;
  region: string;
  password: string | null;
  matchingPassword: string | null;
  newsletter: boolean;
}

const MyAdminPanel: React.FC = () => {
  const [dataProvider, setDataProvider] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/admin/users', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Token")}`
          }
        });
        const jsonData: User[] = await response.json();
        console.log(jsonData)

        const customDataProvider = {
          getList: async (resource: string, params: any) => {
            if (resource === 'users') {
              return {
                data: jsonData,
                total: jsonData.length
              };
            }
            
            return { data: [], total: 0 };
          },

          deleteMany: async (resource: string, params: any) => {
            if (resource === 'users') {
                const { ids } = params;
                console.log(JSON.stringify( ids ))
                try {
                    // Отправляем запрос на удаление нескольких ресурсов
                    const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/delete/user`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("Token")}`
                        },
                        body: JSON.stringify( ids ) // Передаем массив идентификаторов для удаления
                    });
                    // Проверяем, что запрос выполнен успешно
                    if (!response.ok) {
                        // В случае ошибки бросаем исключение
                        throw new Error('Failed to delete resources');
                    }
                    window.location.reload();
                    // Возвращаем пустой массив данных, как подтверждение успешного удаления
                    return { data: [] };
                } catch (error) {
                    console.error('Error deleting resources:', error);
                    // Бросаем исключение в случае ошибки
                    throw new Error('Failed to delete resources');
                }
            }
        }        
        };

        const combinedDataProvider = {
          getList: async (resource: string, params: any) => {
            if (resource === 'users') {
              return customDataProvider.getList(resource, params);
            }
            if (resource === 'products') {
              return productDataProvider.getList(resource, params);
            }
            if (resource === 'orders') {
              return orderDataProvider.getList(resource, params);
            }
            if (resource === 'categorys') {
              return categoryDataProvider.getList(resource, params);
            }
            if (resource === 'sales') {
              return saleDataProvider.getList(resource, params);
            }
            if (resource === 'paypalorders') {
              return PaidOrderDataProvider.getList(resource, params);
            }
            return { data: [], total: 0 };
          },
          deleteMany: async (resource: string, params: any) => {
            if (resource === 'users') {
              return customDataProvider.deleteMany(resource, params);
            }
            if (resource === 'products') {
              return productDataProvider.deleteMany(resource, params);
            }
            if (resource === 'categorys') {
              return categoryDataProvider.deleteMany(resource, params);
            }
            if (resource === 'sales') {
              return saleDataProvider.deleteMany(resource, params);
            }
            return { data: [] };
          },
          getOne: async (resource: string, params: any) => {
            if (resource === 'products') {
              return productDataProvider.getOne(resource, params);
            }
            if (resource === 'orders') {
              return orderDataProvider.getOne(resource, params);
            }
            if (resource === 'categorys') {
              return categoryDataProvider.getOne(resource, params);
            }
            return { data: {} };
          },
          update: async (resource: string, params: any) => {
            if (resource === 'products') {
              return productDataProvider.update(resource, params);
            }
            if (resource === 'categorys') {
              return categoryDataProvider.update(resource, params);
            }
            if (resource === 'orders') {
              return orderDataProvider.update(resource, params);
            }
            return { data: {} };
          },
          create: async (resource: string, params: any) => {
            if (resource === 'products') {
              return productDataProvider.create(resource, params);
            }
            if (resource === 'categorys') {
              return categoryDataProvider.create(resource, params);
            }
            if (resource === 'sales') {
              return saleDataProvider.create(resource, params);
            }
            return { data: {} };
          }

        };

        setDataProvider(() => combinedDataProvider);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dataProvider) {
    return <div>Loading...</div>;
  }

  return (
    <Admin dataProvider={dataProvider} >
      <Resource name="users" list={UserList} />
      <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate}/>
      <Resource name="orders" list={OrderList} show={OrderDetails}  />
      <Resource name="categorys" list={CategoryList} create={CategoryCreate}  edit={CategoryEdit}/>
      <Resource name="sales" list={SaleList} create={SaleCreate}  />
      <Resource name='paypalorders' list={PaypalOrderList} />
    </Admin>
  );
};

export default MyAdminPanel;
