import React from 'react';
import { Button } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const OrderDetailsButton: React.FC<{ record?: any }> = ({ record }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/admin/orders/${record.id}/show`);
  };

  return (
    <Button onClick={handleClick} label="Подробнее" />
  );
};

export default OrderDetailsButton;
