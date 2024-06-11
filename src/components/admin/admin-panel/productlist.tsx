import React from 'react';
import { List, Datagrid, TextField, NumberField, BooleanField, FunctionField, ListProps } from 'react-admin';
import CustomEditButton from './editProductButton';

const ProductList: React.FC<ListProps> = (props) => {
  
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" label="Название" />
        <NumberField source="price" label="Цена" />
        <NumberField source="salePrice" label="Скидочная цена" />
        <NumberField source="percentageSale" label="Процент скидки" />
        <BooleanField source="stock" label="В наличии" />
        <TextField source="model" label="Модель" />
        <TextField source="developer" label="Разработчик" />
        <NumberField source="categoryId" label="Id категории" />
        {/* Поле для отображения фото в формате base64 */}
        <FunctionField
          label="Фото"
          render={(record: any) => <img src={`data:image/jpeg;base64,${record.photo}`} alt={record.title} style={{ maxWidth: 100 }} />}
        />
        {/* Кнопка для перехода к редактированию продукта */}
        <CustomEditButton />
      </Datagrid>
    </List>
  );
};

export { ProductList };
