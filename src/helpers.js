import {nativeImage, clipboard} from 'electron';

const getDataUri = (url, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = "blob";
  xhr.onload = () => {
    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(xhr.response);
  }

  xhr.open('GET', url);
  xhr.send();
};

export const copyImageToClipboard = (url, callback) => {
  getDataUri(url, (uri) => {
    const img = nativeImage.createFromDataURL(uri);

    clipboard.writeImage(img);
  });
};

export const imageExists = (url, callback) => {
  const img = new Image();

  img.onload = () => callback(true);
  img.onerror = () => callback(false);

  img.src = url;
};
