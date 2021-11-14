import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];
      props.detail.images.map(img => {
        return images.push({
          original: `http://localhost:5000/${img}`,
          thumbnail: `http://localhost:5000/${img}`,
        });
      });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <React.Fragment>
      <ImageGallery items={Images} />
    </React.Fragment>
  );
}

export default ProductImage;
