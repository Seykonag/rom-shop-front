import React from 'react';
import { Edit, SimpleForm, TextInput} from 'react-admin';

const CategoryEdit: React.FC = (props) => {
  return (
    <Edit {...props} redirect="/admin/categorys">
      <SimpleForm>
        <TextInput source="title" label="Название" />
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;