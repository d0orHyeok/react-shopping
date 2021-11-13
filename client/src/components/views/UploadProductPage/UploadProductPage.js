import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
];

function UploadProductPage() {
  const [Product, setProduct] = useState({
    title: '',
    desc: '',
    price: 0,
    continents: 3,
    // images: [],
  });
  const { title, desc, price, continents } = Product;

  const onChangeHandler = e => {
    const { value, name } = e.currentTarget;
    setProduct({
      ...Product,
      [name]: value,
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form>
        <FileUpload />
        <br />
        <br />
        <label>이름</label>
        <Input name="title" onChange={onChangeHandler} value={title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea name="desc" onChange={onChangeHandler} value={desc} />
        <br />
        <br />
        <label>가격($)</label>
        <Input name="price" onChange={onChangeHandler} value={price} />
        <br />
        <br />
        <select name="continents" onChange={onChangeHandler} value={continents}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
