import React, { useState } from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, ImageInput, ImageField, BooleanInput } from 'react-admin';
import { productDataProvider } from './productdataprovider'; // Путь к вашему провайдеру

const ProductEdit: React.FC = (props) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);

  // Функция для обработки загрузки изображения
  const handleImageChange = async (file: File) => {
    try {
      const base64String = await handleImageChangePromise(file);
      setImagePreview(URL.createObjectURL(file));
      setImageBase64(base64String);
    } catch (error) {
      console.error('Error handling image change:', error);
    }
  };

  // Функция для сброса изображения
  const handleImageRemove = () => {
    setImagePreview(undefined);
    setImageBase64(undefined);
  };

  // Функция для обработки загрузки изображения и возврата строки base64
  const handleImageChangePromise = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(file);
    });
  };

  // Функция для отправки данных на сервер
  const handleSubmit = async (values: any) => {
    try {
      // Передача строки base64 в провайдер
      values.realPhoto = imageBase64;
      const response = await productDataProvider.update('products', { id: values.id, data: values });


      // Очистка предварительного просмотра после успешного обновления
      setImagePreview(undefined);
      setImageBase64(undefined);

      // Оповещение пользователя об успешном обновлении
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Edit {...props} redirect="/admin/products">
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="title" label="Product Name" />
        <NumberInput source="price" label="Price" />
        <BooleanInput source="stock" label="В наличии" />
        <TextInput source="model" label="Model" />
        <TextInput source="developer" label="Developer" />
        <TextInput source="categoryId" label="Category ID" />
        {/* Поле для загрузки фотографии */}
        <ImageInput
          source="realPhoto"
          label="Photo"
          accept="image/*"
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        >
          <ImageField source="url" title="title" />
        </ImageInput>
        {/* Предварительный просмотр загруженной фотографии */}
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        )}
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
