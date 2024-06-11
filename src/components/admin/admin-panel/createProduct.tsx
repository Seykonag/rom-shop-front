import React, { useState } from 'react';
import { Create, SimpleForm, TextInput, NumberInput, BooleanInput, ImageInput, ImageField } from 'react-admin';
import { productDataProvider } from './productdataprovider'; // Путь к вашему провайдеру

const ProductCreate: React.FC = (props) => {
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  // Функция для обработки загрузки изображения и возврата строки base64
  const handleImageChange = async (file: File) => {
    try {
      const base64String = await handleImageChangePromise(file);
      setImageBase64(base64String);
      setImagePreview(URL.createObjectURL(file)); // Предварительный просмотр
    } catch (error) {
      console.error('Error handling image change:', error);
    }
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
      const response = await productDataProvider.create('products', { data: values });

      // Очистка предварительного просмотра после успешного создания
      setImageBase64(undefined);
      setImagePreview(undefined);

      // Оповещение пользователя об успешном создании
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="title" label="Название" />
        <NumberInput source="price" label="Цена" />
        <BooleanInput source="stock" label="В наличии" />
        <TextInput source="model" label="Модель" />
        <TextInput source="developer" label="Разработчик" />
        <NumberInput source="categoryId" label="Id категории" />

        {/* Поле для загрузки фотографии */}
        <ImageInput
          source="realPhoto"
          label="Фотография"
          accept="image/*"
          onChange={handleImageChange}
        >
          <ImageField source="url" title="title" />
        </ImageInput>

        {/* Предварительный просмотр загруженной фотографии */}
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        )}
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
