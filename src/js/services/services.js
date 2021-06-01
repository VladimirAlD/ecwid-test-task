function handleImg(url, cb) {
  function loadImg(url) {
    return new Promise(resolve => {
      let image = new Image();
      image.decoding = 'async';
      image.src = url;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        alert('Ошибка во время загрузки, попробуйте другое изображение');
      };
    });
  }

  loadImg(url).then(img => {
    cb(img);
  });
}

export {handleImg};