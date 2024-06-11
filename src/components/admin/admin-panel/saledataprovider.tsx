import { GetOneParams } from "react-admin";

interface Sale {
    id: number;
    categoryId: number;
    created: Date;
    ended: Date;
    sale: number;
  }

  export async function fetchsaleData(): Promise<Sale[]> {
    try {
      const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/sale/all', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const saleData: Sale[] = await response.json();
      return saleData;
    } catch (error) {
      console.error('Error fetching sale data:', error);
      throw new Error('Failed to fetch sale data');
    }
  }

  
  export const saleDataProvider = {
    getList: async (resource: string, params: any) => {
      const saleData: Sale[] = await fetchsaleData();
      if (resource === 'sales') {
        return {
          data: saleData,
          total: saleData.length,
        };
      }
      return { data: [], total: 0 };
    },
    getOne: async (resource: string, params: GetOneParams) => {
      const { id } = params;
  
      try {
        const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/sale/${id}`, {
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

    create: async (resource: string, params: any) => {
      if (resource === 'sales') {
        const { data } = params;
        console.log(JSON.stringify(data))
        try {
          const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/new/sale`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
              window.location.href = 'http://localhost:3000/admin/sales';
            }
  
          return { data };
        } catch (error) {
          console.error('Error creating resource:', error);
          throw new Error('Failed to create resource');
        }
      }
      return { data: {} };
    },
    deleteMany: async (resource: string, params: any) => {
      if (resource === 'sales') {
          const { ids } = params;
          console.log(JSON.stringify( ids ))
          try {
              // Отправляем запрос на удаление нескольких ресурсов
              const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/delete/sale`, {
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
}