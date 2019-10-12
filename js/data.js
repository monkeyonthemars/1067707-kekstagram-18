'use strict';

(function () {

  var PICTURES_COUNT = 25;
  var MIN_COMMENTS_COUNT = 1;
  var MAX_COMMENTS_COUNT = 4;
  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;

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

  var getRandomElementFromArray = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  var getRandomIntegerFromInterval = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  window.data = {
    getPictures: function () {
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
    }
  };

})();
