import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDropHandler = files => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    Axios.post('/api/product/image', formData, config).then(res => {
      if (res.data.success) {
        setImages([...Images, res.data.filePath]);
        props.refreshFunction([...Images, res.data.filePath]);
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
  };

  const deleteHandler = image => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);

    Axios.post('/api/product/deleteImage', { path: Images[currentIndex] });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: '300px',
                height: '240px',
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <PlusOutlined style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowY: 'hidden', overflowX: 'auto' }}>
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${image}`}
              alt="product"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
