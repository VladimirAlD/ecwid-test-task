import {handleImg} from '../services/services';

function handleDownload(data) {
  const dropArea = document.querySelector(data.dropArea),
    dropAreaBtn = document.querySelector(data.dropAreaBtn),
    urlInput = document.querySelector(data.urlInput),
    urlSubmit = document.querySelector(data.urlSubmit),
    masonry = data.masonry,
    events = ['dragenter', 'dragleave', 'dragover', 'drop'];

  function highlight() {
    dropArea.classList.add(data.highlightClass);
  }

  function unhighlight() {
    dropArea.classList.remove(data.highlightClass);
  }

  function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    files.forEach(previewFile);
  }

  function previewFile(file) {
    let reader = new FileReader();
    if (file.type.match('image/*')) {
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        // dndArea.getImg(reader.result);
        handleImg(reader.result, masonry.newImage);
      };
    } else {
      reader.readAsText(file);
      reader.onloadend = function () {
        try {
          let data = JSON.parse(reader.result);
          let gallery = data.galleryImages;
          for (let i = 0; i < gallery.length; i++) {
            // dndArea.getImg(gallery[i].url, gallery[i]);
            // dndArea.getImg(gallery[i].url);
            handleImg(gallery[i].url, masonry.newImage);
          }
        } catch (e) {
          alert('Файл должен быть изображением или json-файлом со структорой \n { "galleryImages" : [ {url: *, width: *, height: *}, ... ] }');
          console.log(e);
        }
      };
    }
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  events.forEach(function (eventName) {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  dropArea.addEventListener('drop', handleDrop, false);
  dropAreaBtn.addEventListener('change', e => handleFiles(e.target.files), false);

  urlSubmit.addEventListener('click', function (e) {
    preventDefaults(e);
    let imgUrl = urlInput.value;
    if (imgUrl) {
      handleImg(imgUrl, masonry.newImage);
    }
    urlInput.value = '';
    this.blur();
  }, false);
}

export default handleDownload;