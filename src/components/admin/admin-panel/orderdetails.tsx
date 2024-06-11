import React from 'react';
import { Show, SimpleShowLayout, TextField, NumberField, DateField, ArrayField, Datagrid, useNotify, useRedirect, useRefresh, useUpdate, useRecordContext } from 'react-admin';
import { Box, Button } from '@mui/material';

const ApproveRejectButtons: React.FC = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const [update] = useUpdate();

  const handleApprove = () => {
    update(
      'orders',
      { id: record.id, data: { [record.id]: true } },
      {
        onSuccess: () => {
          notify('Заказ одобрен', { type: 'success' });
          redirect('/orders');
          refresh();
        },
        onError: () => notify('Ошибка при одобрении заказа', { type: 'error' }),
      }
    );
  };

  const handleReject = () => {
    update(
      'orders',
      { id: record.id, data: { [record.id]: false } },
      {
        onSuccess: () => {
          notify('Заказ отменен', { type: 'success' });
          redirect('/orders');
          refresh();
        },
        onError: () => notify('Ошибка при отмене заказа', { type: 'error' }),
      }
    );
  };

  const handleComplete = async () => {
    const response = await fetch(`https://rom-shop-0c9c08d95305.herokuapp.com/order/closed/${record.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
      }
    });

    if (response.ok) {
      window.location.href = 'http://localhost:3000/admin/orders'
    }
  };

  if (!record || record.status === 'PAID') {
    return (
      <Button variant="contained" color="primary" onClick={handleComplete}>
        Завершить заказ
      </Button>
    )
  }

  if (!record || record.status !== 'NEW' ) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="space-between" marginTop={2}>
      <Button variant="contained" color="primary" onClick={handleApprove}>
        Одобрить
      </Button>
      <Button variant="contained" color="secondary" onClick={handleReject}>
        Отменить
      </Button>
    </Box>
  );
};

const OrderDetails: React.FC = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="username" label="Пользователь" />
        <TextField source="phone" label="Телефон" />
        <TextField source="address" label="Адрес" />
        <NumberField source="sum" label="Сумма" />
        <DateField source="created" label="Дата создания" />
        <DateField source="updated" label="Дата обновления" />
        <TextField source="status" label="Статус" />

        <ArrayField source="details">
          <Datagrid>
            <TextField source="title" label="Название" />
            <NumberField source="productId" label="ID продукта" />
            <NumberField source="price" label="Цена" />
            <NumberField source="salePrice" label="Скидочная цена" />
            <NumberField source="percentageSale" label="Процент скидки" />
            <NumberField source="amount" label="Количество" />
            <NumberField source="sum" label="Сумма" />
          </Datagrid>
        </ArrayField>

        <ApproveRejectButtons />
      </SimpleShowLayout>
    </Show>
  );
};

export default OrderDetails;
