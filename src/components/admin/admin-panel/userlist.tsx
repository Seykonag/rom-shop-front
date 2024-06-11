import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList: React.FC = (props) => (
  <List {...props}>
    <Datagrid >
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <TextField source="fax" />
      <TextField source="company" />
      <TextField source="phone" />
      <TextField source="address" />
      <TextField source="city" />
      <TextField source="country" />
      <TextField source="region" />
    </Datagrid>
  </List>
);

export { UserList };
