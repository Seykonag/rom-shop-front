import { GetOneParams } from "react-admin";

interface Category {
    id: number;
    title: string;
}

export async function fetchcategoryData(): Promise<Category[]> {
    try {
      const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/category/all', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const categoryData: Category[] = await response.json();
      return categoryData;
    } catch (error) {
      console.error('Error fetching category data:', error);
      throw new Error('Failed to fetch category data');
    }
  }

  
  export const categoryDataProvider = {
    getList: async (resource: string, params: any) => {
      const categoryData: Category[] = await fetchcategoryData();
      if (resource === 'categorys') {
        return {
          data: categoryData,
          total: categoryData.length,
        };
      }
      return { data: [], total: 0 };

    },
    create: async (resource: string, params: any) => {
        if (resource === 'categorys') {
          const { data } = params;
          try {
            const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/new/category`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
              },
              body: JSON.stringify(data),
            });
    
            if (response.ok) {
                window.location.href = 'http://localhost:3000/admin/categorys';
              }
    
            return { data };
          } catch (error) {
            console.error('Error creating resource:', error);
            throw new Error('Failed to create resource');
          }
        }
        return { data: {} };
      },

      getOne: async (resource: string, params: GetOneParams) => {
        const { id } = params;
    
        try {
          const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/category/${id}`, {
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
        if (resource === 'categorys') {
          const { id, data } = params;
    
          const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/edit/category/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            body: JSON.stringify(data),
          });
    
          console.log(JSON.stringify(data));
    
          if (!response.ok) {
            throw new Error('Failed to update resource');
          }
    
          return { data };
        }
        return { data: {} };
      },
      deleteMany: async (resource: string, params: any) => {
        if (resource === 'categorys') {
            const { ids } = params;
            console.log(JSON.stringify( ids ))
            try {
                // Отправляем запрос на удаление нескольких ресурсов
                const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/admin/delete/category`, {
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
