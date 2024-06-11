import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const CategoryCreate: React.FC = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" label="Название" />
      </SimpleForm>
    </Create>
  );
};

export default CategoryCreate;
