const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/conn');
const Task = require('./models/Task');

const TaskRoutes = require('./routes/taskRoutes');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(express.static('public'));

//rotas
app.use('/tasks', TaskRoutes);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
