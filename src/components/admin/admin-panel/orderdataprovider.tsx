import { GetOneParams } from "react-admin";

interface Order {
    id: number;
    username: string;
    created: Date;
    updated: Date;
    sum: number;
    status: string;
  }

  export async function fetchOrderData(): Promise<Order[]> {
    try {
      const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/order/all', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Token")}`
        }
      });
      const orderData: Order[] = await response.json();
      return orderData;
    } catch (error) {
      console.error('Error fetching order data:', error);
      throw new Error('Failed to fetch order data');
    }
  }

  
  export const orderDataProvider = {
    getList: async (resource: string, params: any) => {
      const orderData: Order[] = await fetchOrderData();
      if (resource === 'orders') {
        return {
          data: orderData,
          total: orderData.length,
        };
      }
      return { data: [], total: 0 };
    },
    getOne: async (resource: string, params: GetOneParams) => {
      const { id } = params;
  
      try {
        const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/order/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch resource');
        }
  
        const data = await response.json();
        console.log(data);
        return { data };
      } catch (error) {
        console.error('Error fetching resource:', error);
        throw new Error('Failed to fetch resource');
      }
    },
    update: async (resource: string, params: any) => {
      if (resource === 'orders') {
        const { id, data } = params;
        delete data.salePrice;
  
        const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/orders/newStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`,
          },
          body: JSON.stringify(data),
        });
  
        console.log(JSON.stringify(data));
  
        if (response.ok) {
          window.location.href = "http://195.133.198.25:3000/admin/orders";
        }
  
        return { data };
      }
      return { data: {} };
    },
    
    
  };
  
  