const regForm = document.getElementById('regForm');
const loginForm = document.getElementById('loginForm');
const emailCheck = document.getElementById('emailCheck');
const usernameLoginCheck = document.getElementById('usernameLoginCheck');
const changeForm = document.getElementById('changeForm');
const emailChangeCheck = document.getElementById('emailChangeCheck');
const createPostForm = document.getElementById('createPostForm');
const createPostCheck = document.getElementById('createPostCheck');
const editPostForm = document.getElementById('editPostForm');
const editPostCheck = document.getElementById('editPostCheck');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('select');
const weatherButton = document.getElementById('weatherButton');
const getWeather = document.getElementById('getWeather');
const yandexBtn = document.querySelectorAll('.yandexBtn');
const unauthText = document.getElementById('unauthText');
const map = document.getElementById('map');
const img = document.createElement('img');
const kTigram = document.getElementById('kTigram');

if (regForm) {
  regForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action,
      emailReg: { value: emailReg },
      usernameReg: { value: usernameReg },
      passwordReg: { value: passwordReg },
      method,
    } = event.target;
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailReg,
        usernameReg,
        passwordReg,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.message) {
      window.location = '/';
    } else {
      emailCheck.innerText = jsonResponse.reason;
      // window.location = '/reg';
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action,
      emailLogin: { value: emailLogin },
      passwordLogin: { value: passwordLogin },
      method,
    } = event.target;
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailLogin,
        passwordLogin,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.message) {
      window.location = '/';
    } else {
      usernameLoginCheck.innerText = jsonResponse.reason;
      // window.location = '/reg';
    }
  });
}

if (changeForm) {
  changeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action,
      emailChange: { value: emailChange },
      usernameChange: { value: usernameChange },
    } = event.target;
    const response = await fetch(action, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailChange,
        usernameChange,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.message) {
      window.location = '/profile';
    } else {
      emailChangeCheck.innerText = jsonResponse.reason;
      // window.location = '/reg';
    }
  });
}

if (createPostForm) {
  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action,
      method,
      title: { value: title },
      description: { value: description },
    } = event.target;
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.message) {
      window.location = '/posts';
    } else {
      createPostCheck.innerText = jsonResponse.reason;
    }
  });
}

if (editPostForm) {
  editPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action,
      title: { value: title },
      description: { value: description },
    } = event.target;
    const response = await fetch(action, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.message) {
      window.location = '/posts';
    } else {
      editPostCheck.innerText = jsonResponse.reason;
    }
  });
}

if (yandexBtn) {
  yandexBtn.forEach((el) => {
    el.addEventListener('click', () => {
      const arrMap = document.querySelectorAll('.ymaps-2-1-79-map');
      arrMap.forEach((el) => el.remove());
      img.remove();
      ymaps.ready(() => {
        const myMap = new ymaps.Map('map', {
          center: [55.753994, 37.622093],
          zoom: 9,
          // Добавим панель маршрутизации.
          controls: ['routePanelControl'],
        });
        const control = myMap.controls.get('routePanelControl');
        // Зададим состояние панели для построения машрутов.
        if (el.id === 'naHatu') {
          control.routePanel.state.set({
            // Тип маршрутизации.
            type: 'taxi',
            // Выключим возможность задавать пункт отправления в поле ввода.
            fromEnabled: false,
            // Адрес или координаты пункта отправления.
            from: 'Санкт-Петербург, Кирочная 19',
            // Включим возможность задавать пункт назначения в поле ввода.
            toEnabled: true,
            // Адрес или координаты пункта назначения.
            to: 'Санкт-Петербург, Купчино',
          });
        }
        if (el.id === 'nablatHatu') {
          control.routePanel.state.set({
            // Тип маршрутизации.
            type: 'masstransit',
            // Выключим возможность задавать пункт отправления в поле ввода.
            fromEnabled: false,
            // Адрес или координаты пункта отправления.
            from: 'Санкт-Петербург, Кирочная 19',
            // Включим возможность задавать пункт назначения в поле ввода.
            toEnabled: true,
            // Адрес или координаты пункта назначения.
            to: 'Колпино, Колпинская 9',
          });
        }
        if (el.id === 'vKlub') {
          control.routePanel.state.set({
            // Тип маршрутизации.
            type: 'taxi',
            // Выключим возможность задавать пункт отправления в поле ввода.
            fromEnabled: false,
            // Адрес или координаты пункта отправления.
            from: 'Санкт-Петербург, Кирочная 19',
            // Включим возможность задавать пункт назначения в поле ввода.
            toEnabled: true,
            // Адрес или координаты пункта назначения.
            to: 'Санкт-Петербург, Эрмитаж',
          });
        }
        if (el.id === 'vSochi') {
          control.routePanel.state.set({
            // Тип маршрутизации.
            type: 'taxi',
            // Выключим возможность задавать пункт отправления в поле ввода.
            fromEnabled: false,
            // Адрес или координаты пункта отправления.
            from: 'Санкт-Петербург, Кирочная 19',
            // Включим возможность задавать пункт назначения в поле ввода.
            toEnabled: true,
            // Адрес или координаты пункта назначения.
            to: 'город Сочи',
          });
        }
        // Зададим опции панели для построения машрутов.
        control.routePanel.options.set({
          // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
          allowSwitch: false,
          // Включим определение адреса по координатам клика.
          // Адрес будет автоматически подставляться в поле ввода на панели, а также в
          // подпись метки маршрута.
          reverseGeocoding: true,
          // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
          types: { masstransit: true, pedestrian: true, taxi: true },
        });

        // eslint-disable-next-line max-len
        // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
        const switchPointsButton = new ymaps.control.Button({
          data: { content: 'Поменять местами', title: 'Поменять точки местами' },
          options: { selectOnClick: false, maxWidth: 160 },
        });
          // Объявляем обработчик для кнопки.
        switchPointsButton.events.add('click', () => {
          // Меняет местами начальную и конечную точки маршрута.
          control.routePanel.switchPoints();
        });
        myMap.controls.add(switchPointsButton);
      });
    });
  });
}

if (weatherButton) {
  getWeather.addEventListener('submit', async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-shadow
    async function getWeather() {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=4353d1bea3408a614e24131951ec730c&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDescription.textContent = data.weather[0].description;
    }
    document.addEventListener('DOMContentLoaded', getWeather());
  });
}

const phrases = [
  'Для начала братан надо зарегистрироваться',
  'Э, тормози, ты же недоаутентифицированный 🐶 ',
  'Так ты далеко не уедешь... регистрация!!!',
  'Может хватит уже? 🐓',
  'Зарегистрируйтесь пожалуйста!',
  '🐯 АЛИ 🐯 ТИГР! 🐯',
];

const unauthBtnArray = document.querySelectorAll('.unauthBtn');
if (unauthBtnArray) {
  unauthBtnArray.forEach((el) => {
    el.addEventListener('click', async () => {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      unauthText.innerText = phrase;
    });
  });
}

const seeTigr = document.getElementById('seeTigr');
if (seeTigr) {
  seeTigr.addEventListener('click', async () => {
    const arrMap = document.querySelectorAll('.ymaps-2-1-79-map');
    arrMap.forEach((el) => el.remove());
    const response = await fetch('https://some-random-api.ml/img/cat');
    const result = await response.json();
    img.src = result.link;
    map.append(img);
  });
}

if (kTigram) {
  kTigram.addEventListener('click', async () => {
    window.location.href = '/chat';
  });
}
