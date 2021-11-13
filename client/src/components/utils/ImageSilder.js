import React from 'react';
import { Carousel } from 'antd';

function ImageSilder(props) {
  return (
    <Carousel autoplay>
      {props.images.map((image, index) => (
        <div key={index}>
          <img style={{ width: '100%', maxHeight: '150px' }} src={`http://localhost:5000/${image}`} alt="product" />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSilder;
