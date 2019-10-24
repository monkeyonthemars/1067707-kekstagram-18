'use strict';

(function () {

  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var uploadFileInput = document.querySelector('.img-upload__start input[id=upload-file]');
  var imgUploadElement = document.querySelector('.img-upload__overlay');
  var imgUploadCancelButton = document.querySelector('.img-upload__cancel');
  var hashtagsElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');
  var scaleSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectsListRadio = document.querySelector('.effects__list');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
  var currentEffect = '';

  var scalePreviewSmaller = function () {
    var currentValue = Number(scaleControlInput.value.replace('%', '')) - SCALE_STEP;
    if (currentValue < MIN_SCALE) {
      currentValue = MIN_SCALE;
    }
    scaleControlInput.value = currentValue + '%';
    imgUploadPreviewElement.style.transform = 'scale(' + currentValue / MAX_SCALE + ')';
  };

  var scalePreviewBigger = function () {
    var currentValue = Number(scaleControlInput.value.replace('%', '')) + SCALE_STEP;
    if (currentValue > MAX_SCALE) {
      currentValue = MAX_SCALE;
    }
    scaleControlInput.value = currentValue + '%';
    imgUploadPreviewElement.style.transform = 'scale(' + currentValue / MAX_SCALE + ')';
  };

  var onClickPreviewSmaller = function () {
    scalePreviewSmaller();
  };

  var onClickPreviewBigger = function () {
    scalePreviewBigger();
  };

  var closeImgUpload = function () {
    imgUploadElement.classList.add('hidden');
    imgUploadCancelButton.removeEventListener('click', onClickCloseImgUpload);
    scaleSmallerElement.removeEventListener('click', onClickPreviewSmaller);
    scaleBiggerElement.removeEventListener('click', onClickPreviewBigger);
    imgUploadCancelButton.removeEventListener('keydown', onImgUploadCancelEnterPress);
    effectLevelPinElement.removeEventListener('mouseup', updateEffectLevel);
    hashtagsElement.removeEventListener('input', checkHashtagsValidity);
    effectLevelPinElement.removeEventListener('mousedown', onMouseDown);
    uploadFileInput.value = '';
  };

  var onImgUploadCancelEnterPress = function (evt) {
    if (evt.keyCode === KeyCode.ENTER && evt.target === imgUploadCancelButton) {
      closeImgUpload();
    }
  };

  var updateEffectLevel = function () {
    effectLevelPinElement.style.left = effectLevelPinElement.style.left;
    effectLevelDepthElement.style.width = effectLevelPinElement.style.left;
    effectLevelValueElement.value = effectLevelPinElement.style.left.replace('%', '');
  };

  var checkHashtagsValidity = function () {
    var hashtagsString = hashtagsElement.value.trim().replace(/\s\s+/g, ' ');

    hashtagsElement.setCustomValidity('');

    if (hashtagsString === '' || hashtagsString.length === 1) {
      return;
    }

    var hashtags = hashtagsString.split(' ');

    if (hashtags.length > 5) {
      hashtagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      return;
    }

    for (var j = 0; j < hashtags.length; j++) {
      hashtags[j] = hashtags[j].toLowerCase();
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        hashtagsElement.setCustomValidity('Хэш-тег начинается с символа # (решётка): ' + hashtags[i]);
        return;
      }

      if (hashtags[i].length === 1) {
        hashtagsElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      }

      if (hashtags[i].length > 20) {
        hashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку: ' + hashtags[i]);
        return;
      }

      if (hashtags[i].indexOf('#', 1) !== -1) {
        hashtagsElement.setCustomValidity('Хеш-тег не может содержать более одной решётки: ' + hashtags[i]);
        return;
      }

      hashtags.findIndex(function (elem, index) {
        if (elem === hashtags[i] && i !== index) {
          hashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды: ' + hashtags[i]);
          return;
        }
      });
    }
  };

  var onClickCloseImgUpload = function () {
    closeImgUpload();
  };

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      closeImgUpload();
    }
  };

  var resetEffectLevel = function () {
    effectLevelPinElement.style.left = '100%';
    effectLevelDepthElement.style.width = '100%';
    effectLevelValueElement.value = '100';
    imgUploadPreviewElement.style.filter = '';
    imgUploadPreviewElement.style.WebkitFilter = '';
  };

  var changeEffect = function (ratio) {
    if (currentEffect === 'none') {
      return;
    }
    if (ratio === undefined) {
      ratio = 1;
    }
    var effect = {
      chrome: {
        max: 1,
        min: 0,
        filter: 'grayscale',
        suffix: ''
      },
      sepia: {
        max: 1,
        min: 0,
        filter: 'sepia',
        suffix: ''
      },
      marvin: {
        max: 100,
        min: 0,
        filter: 'invert',
        suffix: '%'
      },
      phobos: {
        max: 5,
        min: 0,
        filter: 'blur',
        suffix: 'px'
      },
      heat: {
        max: 3,
        min: 1,
        filter: 'brightness',
        suffix: ''
      }
    };
    var effectProperties = effect[currentEffect];
    var effectValue = effectProperties.max * ratio;
    if (effectValue < effectProperties.min) {
      effectValue = effectProperties.min;
    }
    var filter = effectProperties.filter + '(' + effectValue + effectProperties.suffix + ')';

    imgUploadPreviewElement.style.filter = filter;
    imgUploadPreviewElement.style.WebkitFilter = filter;
  };

  var onEffectsListRadioClick = function (newEffect) {
    resetEffectLevel();
    if (newEffect === 'none') {
      imgUploadEffectLevelElement.classList.add('hidden');
    } else {
      imgUploadEffectLevelElement.classList.remove('hidden');
    }
    currentEffect = newEffect;
    changeEffect();
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var lineWidth = effectLevelLineElement.getBoundingClientRect().width;
    var startCoordX = evt.clientX;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftCoordX = startCoordX - moveEvt.clientX;
      var newCoordX = effectLevelPinElement.offsetLeft - shiftCoordX;
      dragged = true;
      startCoordX = moveEvt.clientX;
      if (newCoordX < 0) {
        newCoordX = 0;
      }
      if (newCoordX > lineWidth) {
        newCoordX = lineWidth;
      }
      var newInputValue = Math.round(100 * newCoordX / lineWidth);
      effectLevelPinElement.style.left = newCoordX + 'px';
      effectLevelDepthElement.style.width = newCoordX + 'px';
      effectLevelValueElement.value = newInputValue;
      changeEffect(newCoordX / lineWidth);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (defaultEvt) {
          defaultEvt.preventDefault();
          effectLevelPinElement.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPinElement.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetScalePreview = function () {
    scaleControlInput.value = '100%';
    imgUploadPreviewElement.style.transform = 'scale(1)';
  };

  hashtagsElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  hashtagsElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
  });

  descriptionElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  descriptionElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
  });

  effectsListRadio.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect' && evt.target.type === 'radio') {
      onEffectsListRadioClick(evt.target.value);
    }
  });

  window.form = {
    open: function () {
      imgUploadCancelButton.addEventListener('click', onClickCloseImgUpload);
      scaleSmallerElement.addEventListener('click', onClickPreviewSmaller);
      scaleBiggerElement.addEventListener('click', onClickPreviewBigger);
      document.addEventListener('click', onImgUploadEscPress);
      imgUploadCancelButton.addEventListener('keydown', onImgUploadCancelEnterPress);
      effectLevelPinElement.addEventListener('mouseup', updateEffectLevel);
      hashtagsElement.addEventListener('input', checkHashtagsValidity);
      effectLevelPinElement.addEventListener('mousedown', onMouseDown);
      imgUploadElement.classList.remove('hidden');
      imgUploadEffectLevelElement.classList.add('hidden');
      resetScalePreview();
      resetEffectLevel();
    }
  };

})();
