import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, FunctionField } from 'react-admin'; 
import CategoryEditButton from './categoryeditbutton';

const CategoryList: React.FC = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <FunctionField
        render={(record: any) => <CategoryEditButton record={record} />}
      />
    </Datagrid>
  </List>
);

export { CategoryList };
