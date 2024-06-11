import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';

interface PaidOrder {
  id: number;  
  orderID: number;
  paymentID: string;
  payerId: string;
  email: string;
  firstName: string;
  lastName: string;
  transactionId: string;
  currency: string;
  total: string;
  href: string;
  created: Date;
  updated: Date;
}

const PaypalOrderList: React.FC = (props) => (
  <List {...props}>
    <Datagrid>
    <TextField source="id" />
      <TextField source="orderID" />
      <TextField source="paymentID" />
      <TextField source="payerId" />
      <TextField source="email" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="transactionId" />
      <TextField source="currency" />
      <TextField source="total" />
      <TextField source="href" />
      <DateField source="created" />
      <DateField source="updated" />
    </Datagrid>
  </List>
);

export { PaypalOrderList };
