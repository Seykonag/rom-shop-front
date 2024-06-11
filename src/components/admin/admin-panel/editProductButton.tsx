import React from 'react';
import { useRecordContext } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const CustomEditButton = () => {
  const record = useRecordContext();
  const history = useNavigate();

  const handleClick = () => {
    if (record && record.id) {
      history(`/admin/products/${record.id}`);
    }
  };

  return React.createElement('button', { onClick: handleClick }, 'Редактировать');
};

export default CustomEditButton;
