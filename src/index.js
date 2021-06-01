import './scss/style.scss';

import handleDownload from './js/modules/handleDonwload';
import masonry from './js/modules/masonry';

window.addEventListener('DOMContentLoaded', () => {
  
  handleDownload({
    dropArea: '.drop-area',
    highlightClass: 'drop-area_hl',
    dropAreaBtn: '#upload',
    urlInput: '#uploadUrl',
    urlSubmit: '#uploadUrlSubmit',
    masonry: masonry
  });
  
  window.addEventListener("load", () => {
    masonry.initMasonry({
      imgsContainer: '.gallery',
      minH: 150,
      gap: 10,
      lastRowFill: false
    });
    // fix resize from navigation chrome bar
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    window.addEventListener('resize', () => {
      if (width != (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)) {
        width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        masonry.initLayout();
      }
    });
  });
});