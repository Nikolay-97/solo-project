const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dotenv = require('dotenv');
const http = require('http');
const socketIOServer = require('socket.io');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const regRouter = require('./routes/reg');
const profileRouter = require('./routes/profile');
const profileChangeRouter = require('./routes/profileChange');
const chatRouter = require('./routes/chat');
const postsRouter = require('./routes/posts');
const createpostRouter = require('./routes/createpost');

dotenv.config();
const PORT = process.env.PORT || 80;

const app = express();

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: 'my_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};
// Middlewares
app.set('view engine', 'hbs'); // для того чтобы юзать ХБС без расширения (явно указали)
app.use(express.urlencoded({ extended: true })); // для того чтобы парсить body из запросов
app.use(express.static(path.join(__dirname, 'public'))); // указали путь до статики
app.use(express.json()); // для распаршивания JSON с фронта
app.use(session(sessionConfig)); // задали конфиг для сессий
app.use(cookieParser()); // для распаршивания кукисов

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/reg', regRouter);
app.use('/profile', profileRouter);
app.use('/profileChange', profileChangeRouter);
app.use('/posts', postsRouter);
app.use('/createpost', createpostRouter);
app.use('/chat', chatRouter);

const httpServer = http.createServer(app);
const io = socketIOServer(httpServer);

io.on('connection', (socket) => {
  socket.on('chat:send', (nickname, message) => {
    const fullMessage = ` ${nickname}: ${message}`;
    io.emit('chat:newMessage', fullMessage);
  });
});

// слушаем порт на порту 3000
httpServer.listen(PORT, () => {
  console.log('Port started...');
});
