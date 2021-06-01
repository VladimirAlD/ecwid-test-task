const masonry = {
  imgsData: [], // [i].width|height | recieve after ever upload file
  resizedImgsData: [], // [i].width|minH | with save aspect ratio

  initMasonry: function (data) {
    this.imgsContainer = document.querySelector(data.imgsContainer);
    this.minH = data.minH || 150; // min height image in row
    this.gap = data.gap || 10; // margin beetwen row and images
    this.lastRowFill = data.lastRowFill || false;
    this.items = this.imgsContainer.getElementsByTagName('li'); // return HTMLCollection, autoupdated
    if (this.items) {
      for (var i = 0; i < this.items.length; i++) {
        this.getSizes(this.items[i].querySelector('img'));
      }
      this.initLayout();
    }
  },

  newImage(img) {
    masonry.getSizes(img);
    masonry.imgInsert(img);
    masonry.initLayout();
  },

  getSizes: function (img) {
    let n = this.imgsData.length;
    this.imgsData[n] = {
      width: img.width,
      height: img.height
    };
    this.resizedImgsData[n] = {
      width: Math.floor(this.imgsData[n].width * (this.minH / this.imgsData[n].height)),
      height: this.minH,
    };
  },

  imgInsert: function (img) {
    let listItem = document.createElement('li');
    listItem.classList.add('gallery__item');
    listItem.appendChild(img);
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('gallery__delete-btn');
    deleteBtn.classList.add('delete-btn');
    listItem.appendChild(deleteBtn);
    this.imgsContainer.appendChild(listItem);
  },

  getLayout: function () {
    let layout = {
      imgsContainerWidth: parseFloat(window.getComputedStyle(this.imgsContainer).width) - 0.01, // fix FireFox,
      rowWidth: [], // width images in row
      avWidth: [],
      // available space in container for widening image 
      // ( containerWidth - ( (img + gap) * number ) )
      imgsInRow: []
      // index last image in row
      // last image in layout has last index in imgsInRow 
      // [3, 4] => firstRow: 0, 1, 2; secondRow(lastRow): 3, 4
    };
    let availableContainerWidth = layout.imgsContainerWidth;
    let totalRowWitdh = 0;
    for (let i = 0; i < Object.keys(this.imgsData).length; i++) {
      totalRowWitdh += this.resizedImgsData[i].width;
      if (totalRowWitdh < availableContainerWidth) {
        availableContainerWidth -= this.gap;
      } else if (totalRowWitdh == this.resizedImgsData[i].width) {
        // true if total consist one image
        layout.rowWidth.push(layout.imgsContainerWidth);
        layout.avWidth.push(layout.imgsContainerWidth);
        layout.imgsInRow.push(i + 1);
        totalRowWitdh = 0;
      } else {
        layout.rowWidth.push(totalRowWitdh - this.resizedImgsData[i].width);
        layout.avWidth.push(availableContainerWidth + this.gap);
        layout.imgsInRow.push(i);
        totalRowWitdh = 0;
        availableContainerWidth = layout.imgsContainerWidth;
        i--;
      }
      // last image
      if (i == this.imgsData.length - 1) {
        layout.rowWidth.push(totalRowWitdh);
        layout.avWidth.push(availableContainerWidth + this.gap);
        layout.imgsInRow.push(i);
      }
    }
    return layout;
  },

  setSizes: function (i, w, h, r) {
    this.items[i].style.height = h + 'px';
    this.items[i].style.width = w * r + 'px';
    this.items[i].style.marginBottom = this.gap + 'px';
    this.items[i].style.marginRight = this.gap + 'px';
    // height and objectFit for image that dont cover items[i]-container
    if (h == this.minH) {
      this.items[i].querySelector('img').style.height = 100 + '%';
      this.items[i].querySelector('img').style.objectFit = 'cover';
    }
    if (this.items[i].querySelector('img').height < parseFloat(window.getComputedStyle(this.items[i]).height)) {
      this.items[i].querySelector('img').style.height = 100 + '%';
      this.items[i].querySelector('img').style.objectFit = 'cover';
    }
  },

  setLayout: function (layout) {
    for (let i = 0; i < layout.imgsInRow.length - 1; i++) {
      let r = layout.avWidth[i] / layout.rowWidth[i];
      let ht = Math.floor(this.minH * r);
      for (let j = layout.imgsInRow[i - 1] ? layout.imgsInRow[i - 1] : 0; j <= layout.imgsInRow[i]; j++) {
        if (this.resizedImgsData[j].width >= layout.imgsContainerWidth) {
          this.setSizes(j, layout.imgsContainerWidth, this.minH, 1);
        } else {
          this.setSizes(j, this.resizedImgsData[j].width, ht, r);
        }
        if (j + 1 == layout.imgsInRow[i]) {
          this.items[j].style.marginRight = 0;
        }
      }
    }
    this.lastRow(layout);
  },

  lastRow: function (layout) {
    let lastIndex = layout.imgsInRow.length - 1;
    let r = layout.avWidth[lastIndex] / layout.rowWidth[lastIndex];
    let ht = Math.floor(masonry.minH * r);
    for (let j = layout.imgsInRow[lastIndex - 1] ?
        layout.imgsInRow[lastIndex - 1] : 0; j <= layout.imgsInRow[lastIndex]; j++) {
      if (this.lastRowFill) {
        this.setSizes(j, this.resizedImgsData[j].width, ht, r);
      } else {
        this.setSizes(j, this.resizedImgsData[j].width, this.minH, 1);
      }
      if (j == layout.imgsInRow[lastIndex]) {
        this.items[j].style.marginRight = 0;
      }
    }
  },

  deleteAndUpdate: function () {
    // Create Element.remove() function if not exist | IE fix
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }
    this.imgsContainer.addEventListener('click', (event) => {
      let deleteBtns = document.querySelectorAll('.delete-btn');
      let target = event.target;

      if (target && target.classList.contains('delete-btn')) {
        deleteBtns.forEach((v, i) => {
          if (target == v) {
            this.imgsData.splice(i, 1);
            this.resizedImgsData.splice(i, 1);
            v.parentNode.remove();
            this.initLayout();
          }
        });
      }
    });
  },

  initLayout: function () {
    this.setLayout(this.getLayout(), this.lastRowFill);
    this.deleteAndUpdate();
  }
};

export default masonry;