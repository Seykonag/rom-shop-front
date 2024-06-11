import React from 'react';
import { Button } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const CategoryEditButton: React.FC<{ record?: any }> = ({ record }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/admin/categorys/${record.id}`);
  };

  return (
    <Button onClick={handleClick} label="Изменить" />
  );
};

export default CategoryEditButton;
