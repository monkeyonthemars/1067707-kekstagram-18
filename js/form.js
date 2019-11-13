'use strict';

(function () {

  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var HashtagsErrorText = {
    MAX_COUNT: 'Нельзя указать больше пяти хэш-тегов',
    FIRST_SHARP: 'Хэш-тег начинается с символа # (решётка): ',
    SHARP_ONLY: 'Хеш-тег не может состоять только из одной решётки',
    MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку: ',
    MORE_THAN_ONE_SHARP: 'Хеш-тег не может содержать более одной решётки: ',
    DUBLICATE: 'Один и тот же хэш-тег не может быть использован дважды: '
  };
  var HashtagsLimitValue = {
    MAX_COUNT: 5,
    MAX_LENGTH: 20
  };

  var imgUploadElement = document.querySelector('.img-upload__overlay');
  var imgUploadCancelButtonElement = document.querySelector('.img-upload__cancel');
  var scaleSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleBiggerElement = document.querySelector('.scale__control--bigger');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectsListRadio = document.querySelector('.effects__list');
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');

  var scaleControlInputElement = document.querySelector('.scale__control--value');
  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectElement = imgUploadFormElement.querySelector('.effects__radio');
  var hashtagsElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');
  var currentEffect = '';

  var imgUploadInput = document.querySelector('.img-upload__input');
  var lineWidth = 0;

  var scalePreviewSmaller = function () {
    var currentValue = Number(scaleControlInputElement.value.replace('%', '')) - SCALE_STEP;
    if (currentValue < MIN_SCALE) {
      currentValue = MIN_SCALE;
    }
    scaleControlInputElement.value = currentValue + '%';
    imgUploadPreviewElement.style.transform = 'scale(' + currentValue / MAX_SCALE + ')';
  };

  var scalePreviewBigger = function () {
    var currentValue = Number(scaleControlInputElement.value.replace('%', '')) + SCALE_STEP;
    if (currentValue > MAX_SCALE) {
      currentValue = MAX_SCALE;
    }
    scaleControlInputElement.value = currentValue + '%';
    imgUploadPreviewElement.style.transform = 'scale(' + currentValue / MAX_SCALE + ')';
  };

  var onZoomOutClick = function () {
    scalePreviewSmaller();
  };

  var onZoomInClick = function () {
    scalePreviewBigger();
  };

  var closeImgUpload = function () {
    imgUploadElement.classList.add('hidden');
    imgUploadCancelButtonElement.removeEventListener('click', onCloseImgUploadClick);
    scaleSmallerElement.removeEventListener('click', onZoomOutClick);
    scaleBiggerElement.removeEventListener('click', onZoomInClick);
    imgUploadCancelButtonElement.removeEventListener('keydown', onImgUploadCancelEnterPress);
    effectLevelPinElement.removeEventListener('mouseup', updateEffectLevel);
    hashtagsElement.removeEventListener('input', checkHashtagsValidity);
    effectLevelPinElement.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('keydown', onImgUploadEscPress);

    imgUploadFormElement.reset();
  };

  var onImgUploadCancelEnterPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ENTER && evt.target === imgUploadCancelButtonElement) {
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

    if (hashtags.length > HashtagsLimitValue.MAX_COUNT) {
      hashtagsElement.setCustomValidity(HashtagsErrorText.MAX_COUNT);
      return;
    }

    hashtags.forEach(function (el, i, arr) {
      arr[i] = el.toLowerCase();
    });

    hashtags.forEach(function (el, i) {
      if (el[0] !== '#') {
        hashtagsElement.setCustomValidity(HashtagsErrorText.FIRST_SHARP + el);
        return;
      }

      if (el.length === 1) {
        hashtagsElement.setCustomValidity(HashtagsErrorText.SHARP_ONLY);
        return;
      }

      if (el.length > HashtagsLimitValue.MAX_LENGTH) {
        hashtagsElement.setCustomValidity(HashtagsErrorText.MAX_LENGTH + el);
        return;
      }

      if (el.indexOf('#', 1) !== -1) {
        hashtagsElement.setCustomValidity(HashtagsErrorText.MORE_THAN_ONE_SHARP + el);
        return;
      }

      hashtags.findIndex(function (elem, index) {
        if (elem === el && i !== index) {
          hashtagsElement.setCustomValidity(HashtagsErrorText.DUBLICATE + el);
          return;
        }
      });
    });
  };

  var onCloseImgUploadClick = function () {
    closeImgUpload();
  };

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      closeImgUpload();
    }
  };

  var changeEffectValue = function (ratio) {
    if (currentEffect === 'none') {
      return;
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
        max: 3,
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
    var effectValue = ratio !== undefined ? effectProperties.max * ratio : effectProperties.max;
    effectValue = currentEffect === 'marvin' ? Math.round(effectValue) : effectValue.toFixed(2);
    if (effectValue < effectProperties.min) {
      effectValue = effectProperties.min;
    }
    var filter = effectProperties.filter + '(' + effectValue + effectProperties.suffix + ')';
    imgUploadPreviewElement.style.filter = filter;
    imgUploadPreviewElement.style.WebkitFilter = filter;
  };

  var resetEffectLevel = function () {
    effectLevelPinElement.style.left = '100%';
    effectLevelDepthElement.style.width = '100%';
    imgUploadPreviewElement.style.filter = '';
    imgUploadPreviewElement.style.WebkitFilter = '';
  };

  var onEffectsListRadioClick = function (newEffect) {
    resetEffectLevel();
    if (newEffect === 'none') {
      imgUploadEffectLevelElement.classList.add('hidden');
    } else {
      imgUploadEffectLevelElement.classList.remove('hidden');
    }
    currentEffect = newEffect;
    changeEffectValue();

    lineWidth = document.querySelector('.effect-level__line').clientWidth;
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;
    var dragged = false;
    var newInputValue;

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
      newInputValue = Math.round(100 * newCoordX / lineWidth);
      effectLevelPinElement.style.left = newCoordX + 'px';
      effectLevelDepthElement.style.width = newCoordX + 'px';
      changeEffectValue(newCoordX / lineWidth);
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
        effectLevelValueElement.value = newInputValue;
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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

  var resetForm = function () {
    scaleControlInputElement.value = '100%';
    effectLevelValueElement.value = '100';
    effectElement.value = 'none';
    currentEffect = 'none';
    hashtagsElement.value = '';
    descriptionElement.value = '';
    imgUploadPreviewElement.style.transform = 'scale(1)';
    hashtagsElement.setCustomValidity('');
    resetEffectLevel();
  };

  var onLoad = function () {
    closeImgUpload();
    window.message.open('success');
  };

  var onError = function () {
    closeImgUpload();
    window.message.open('error');
  };

  imgUploadFormElement.addEventListener('submit', function (evt) {
    effectElement.value = currentEffect;
    window.backend.save(new FormData(imgUploadFormElement), onLoad, onError);
    evt.preventDefault();
  });

  window.form = {
    open: function () {
      if (imgUploadInput.files.length > 0) {
        imgUploadPreviewElement.src = URL.createObjectURL(imgUploadInput.files[0]);
      }

      imgUploadCancelButtonElement.addEventListener('click', onCloseImgUploadClick);
      imgUploadCancelButtonElement.addEventListener('keydown', onImgUploadCancelEnterPress);
      document.addEventListener('keydown', onImgUploadEscPress);

      scaleSmallerElement.addEventListener('click', onZoomOutClick);
      scaleBiggerElement.addEventListener('click', onZoomInClick);

      effectLevelPinElement.addEventListener('mouseup', updateEffectLevel);
      effectLevelPinElement.addEventListener('mousedown', onMouseDown);

      hashtagsElement.addEventListener('input', checkHashtagsValidity);

      imgUploadElement.classList.remove('hidden');
      imgUploadEffectLevelElement.classList.add('hidden');

      resetForm();
    }
  };

})();
