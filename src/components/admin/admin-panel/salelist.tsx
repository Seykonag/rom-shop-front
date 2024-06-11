import React from 'react';
import { List, Datagrid, TextField, NumberField, FunctionField } from 'react-admin';
import { format } from 'date-fns';

interface SaleRecord {
  id: string;
  categoryId: number;
  created: string;
  ended: string;
  sale: number;
}

const SaleList: React.FC = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <NumberField source="categoryId" />
      <FunctionField<SaleRecord>
        label="Дата и время начала"
        render={(record: SaleRecord) => format(new Date(record.created), "yyyy-MM-dd HH:mm:ss")}
      />
      <FunctionField<SaleRecord>
        label="Дата и время окончания"
        render={(record: SaleRecord) => format(new Date(record.ended), "yyyy-MM-dd HH:mm:ss")}
      />
      <NumberField source="sale" label="Процент скидки"/>
    </Datagrid>
  </List>
);

export { SaleList };
