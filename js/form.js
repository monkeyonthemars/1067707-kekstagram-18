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
  var scaleSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var effectValueElement = document.querySelector('.effect-level__value');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectsListRadio = document.querySelector('.effects__list');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
  var effectsClassName = 'effects__preview--';
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
    effectValueElement.value = effectLevelPinElement.style.left.replace('%', '');
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
    effectValueElement.value = '100';
  };

  var onEffectsListRadioClick = function (newEffect) {
    resetEffectLevel();
    imgUploadPreviewElement.classList.remove(effectsClassName + currentEffect);
    if (newEffect === 'none') {
      imgUploadEffectLevelElement.classList.add('hidden');
    } else {
      imgUploadEffectLevelElement.classList.remove('hidden');
      imgUploadPreviewElement.classList.add(effectsClassName + newEffect);
    }
    currentEffect = newEffect;
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

  effectsListRadio.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect' && evt.target.type === 'radio') {
      onEffectsListRadioClick(evt.target.value);
    }
  });

  window.form = {
    openImgUpload: function () {
      imgUploadCancelButton.addEventListener('click', onClickCloseImgUpload);
      scaleSmallerElement.addEventListener('click', onClickPreviewSmaller);
      scaleBiggerElement.addEventListener('click', onClickPreviewBigger);
      document.addEventListener('click', onImgUploadEscPress);
      imgUploadCancelButton.addEventListener('keydown', onImgUploadCancelEnterPress);
      effectLevelPinElement.addEventListener('mouseup', updateEffectLevel);
      hashtagsElement.addEventListener('input', checkHashtagsValidity);
      imgUploadElement.classList.remove('hidden');
      imgUploadEffectLevelElement.classList.add('hidden');
      resetScalePreview();
      resetEffectLevel();
    }
  };

})();
