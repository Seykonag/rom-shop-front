import { GetOneParams } from "react-admin";

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
    comments: string | null;
    categoryId: number;
  }

  export async function fetchProductData(): Promise<Product[]> {
    try {
      const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/products', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const productData: Product[] = await response.json();
      return productData;
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw new Error('Failed to fetch product data');
    }
  }

  
  export const productDataProvider = {
    getList: async (resource: string, params: any) => {
      const productData: Product[] = await fetchProductData();
      if (resource === 'products') {
        return {
          data: productData,
          total: productData.length,
        };
      }
      return { data: [], total: 0 };
    },
  
    deleteMany: async (resource: string, params: any) => {
      if (resource === 'products') {
        const { ids } = params;
        console.log(JSON.stringify(ids));
        try {
          const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/delete/product`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            body: JSON.stringify(ids),
          });
  
          if (!response.ok) {
            throw new Error('Failed to delete resources');
          }
          window.location.reload();
          return { data: [] };
        } catch (error) {
          console.error('Error deleting resources:', error);
          throw new Error('Failed to delete resources');
        }
      }
    },
  
    getOne: async (resource: string, params: GetOneParams) => {
      const { id } = params;
  
      try {
        const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/products/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`,
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
      if (resource === 'products') {
        const { id, data } = params;
        delete data.salePrice;
  
        const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/edit/product/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`,
          },
          body: JSON.stringify(data),
        });
  
        console.log(JSON.stringify(data));
  
        if (response.ok) {
          window.location.href = "http://195.133.198.25:3000/admin/products";
        }
  
        return { data };
      }
      return { data: {} };
    },

    create: async (resource: string, params: any) => {
      if (resource === 'products') {
        const { data } = params;
        try {
          const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/new/product`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            body: JSON.stringify(data),
          });
  
          if (response.ok) {
            window.location.href = "http://195.133.198.25:3000/admin/products";
          }
  
          return { data };
        } catch (error) {
          console.error('Error creating resource:', error);
          throw new Error('Failed to create resource');
        }
      }
      return { data: {} };
    },
  };
  
  const handleImageChange = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(file);
    });
  };
  
  