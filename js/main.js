'use strict';

var PICTURES_COUNT = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SCALE_STEP = 25;
var MIN_SCALE = 25;
var MAX_SCALE = 100;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Именно так выглядит совместное фото команды, когда её часть работает удалённо.',
  'Мы долго думали, как новичкам в веб-разработке оттачивать свои навыки и пополнять портфолио, пока они находятся в поиске работы.',
  'Пятничный привет от команды кураторов, скрывающихся под иконкой седовласого мудреца.',
  'Ещё не остыла новость о релизе первой главы курса «Основы PHP», как мы выпустили вторую — «Условия».',
  'Наша выпускница Татьяна специализировалась на металлургии и занималась внешней торговлей, а теперь работает фронтенд-разработчицей.',
  'Подвели итоги розыгрыша и показали в сторис.'
];

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

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
var picturesListElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var effectsClassName = 'effects__preview--';
var currentEffect = '';

var getRandomElementFromArray = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getRandomIntegerFromInterval = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getPictures = function () {
  var pictures = [];
  for (var i = 1; i <= PICTURES_COUNT; i++) {
    var photoComments = [];

    var commentsCount = getRandomIntegerFromInterval(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
    for (var n = 0; n < commentsCount; n++) {
      photoComments.push(
          {
            avatar: 'img/avatar-' + getRandomIntegerFromInterval(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
            message: getRandomElementFromArray(COMMENTS),
            name: getRandomElementFromArray(NAMES)
          }
      );
    }

    pictures.push(
        {
          url: 'photos/' + i + '.jpg',
          description: getRandomElementFromArray(DESCRIPTIONS),
          likes: getRandomIntegerFromInterval(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
          comments: photoComments
        }
    );
  }

  return pictures;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderListPictures = function (listPictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listPictures.length; i++) {
    fragment.appendChild(renderPicture(listPictures[i]));
  }

  return fragment;
};

var getCommentMarkup = function (comment) {
  var сommentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
  var commentAvatarElement = сommentElement.querySelector('.social__picture');
  commentAvatarElement.src = comment.avatar;
  commentAvatarElement.alt = comment.name;
  сommentElement.querySelector('.social__text').textContent = comment.message;

  return сommentElement;
};

var getCommentsMarkup = function (picture) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(getCommentMarkup(picture.comments[i]));
  }

  return fragment;
};

var renderBigPicture = function (picture) {
  var listComments = getCommentsMarkup(picture);
  var commentsListElement = bigPictureElement.querySelector('.social__comments');
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(listComments);
};

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
  if (evt.keyCode === ENTER_KEYCODE && evt.target === imgUploadCancelButton) {
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
  if (evt.keyCode === ESC_KEYCODE) {
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

uploadFileInput.addEventListener('change', function () {
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
});

effectsListRadio.addEventListener('change', function (evt) {
  if (evt.target.name === 'effect' && evt.target.type === 'radio') {
    onEffectsListRadioClick(evt.target.value);
  }
});

var listPictures = getPictures();
picturesListElement.appendChild(renderListPictures(listPictures));

renderBigPicture(listPictures[0]);
bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
