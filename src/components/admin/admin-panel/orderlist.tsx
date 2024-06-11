import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, FunctionField } from 'react-admin';
import OrderDetailsButton from './ordersdetailbutton'; // Импорт новой кнопки

const OrderList: React.FC = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <DateField source="created" />
      <DateField source="updated" />
      <NumberField source="sum" />
      <TextField source="status" />
      <FunctionField
        render={(record: any) => <OrderDetailsButton record={record} />}
      />
      {/* For Map<Long, Integer> idProducts and List<OrderDetailsDTO> details, you'll need custom components */}
    </Datagrid>
  </List>
);

export { OrderList };
