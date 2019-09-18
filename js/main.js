var COUNTER = 25;
var LIKE_MIN = 15;
var LIKE_MAX = 200;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getPictures = function () {
  var pictures = [];

  for (i = 1; i <= COUNTER; i++) {

    var photoComments = [];
    var countComment = Math.round(Math.random()) + 1;
    for (n = 0; n < countComment; n++) {
      photoComments.push(getRandomElement(COMMENTS));
    }

    pictures.push(
      {
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии',
        likes: Math.round(Math.random() * (LIKE_MAX - LIKE_MIN + 1)) + LIKE_MIN,
        comments: photoComments,
        name: getRandomElement(NAMES)
      }
    );
  }

  return pictures;
}

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

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = getPictures();

var picturesListElement = document.querySelector('.pictures');
picturesListElement.appendChild(renderListPictures(pictures));
