import React, { useEffect, useState } from 'react';
import { Create, SimpleForm, NumberInput, DateTimeInput, SelectInput } from 'react-admin';
import { parseISO, format } from 'date-fns';

interface Category {
  id: number;
  title: string;
}

const SaleCreate: React.FC = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/category/all', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const json = await res.json();
          setCategories(json);
        } else {
          alert('Произошла неизвестная ошибка');
        }
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        alert('Произошла ошибка при загрузке категорий');
      }
    };

    fetchCategories();
  }, []);

  const transformData = (data: any) => {
    return {
      ...data,
      created: format(new Date(data.created), "yyyy-MM-dd'T'HH:mm:ss"),
      ended: format(new Date(data.ended), "yyyy-MM-dd'T'HH:mm:ss"),
    };
  };

  return (
    <Create {...props} transform={transformData}>
      <SimpleForm>
        <NumberInput source="sale" label="Процент скидки" />
        <DateTimeInput source="created" label="Дата и время начала" />
        <DateTimeInput source="ended" label="Дата и время окончания" />
        <SelectInput source="categoryId" label="Категория" choices={categories.map((category: Category) => ({ id: category.id, name: category.title }))} />
      </SimpleForm>
    </Create>
  );
};

export default SaleCreate;
