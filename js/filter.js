'use strict';

(function () {

  var RANDOM_PICTURES_COUNT = 10;

  window.filter = {
    onPopularClick: window.debounce(function (pictures) {
      window.gallery.update(pictures);
    }),

    onRandomClick: window.debounce(function (pictures) {
      var sourcePictures = pictures.slice();
      var randomPictures = [];

      for (var i = 0; randomPictures.length < RANDOM_PICTURES_COUNT; i++) {
        var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
        var randomElement = sourcePictures[randomIndex];
        randomPictures.push(randomElement);
        sourcePictures.splice(randomIndex, 1);
      }

      window.gallery.update(randomPictures);
    }),

    onDiscussedClick: window.debounce(function (pictures) {
      var discussedPictures = pictures.slice();

      for (var i = 0; i < discussedPictures.length - 1; i++) {
        for (var j = 0; j < discussedPictures.length - 1 - i; j++) {
          if (discussedPictures[j].comments.length < discussedPictures[j + 1].comments.length) {
            var min = discussedPictures[j];
            discussedPictures[j] = discussedPictures[j + 1];
            discussedPictures[j + 1] = min;
          }
        }
      }

      window.gallery.update(discussedPictures);
    })
  };
})();
