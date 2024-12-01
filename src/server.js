const express = require('express');
const app = express();

app.use(express.json());

const { PORT } = require('./configs/env');

const conn = require('./database/conn');

const userRoutes = require('./routes/user');
const authenticateRoutes = require('./routes/authenticate');

app.use('/api', authenticateRoutes);
app.use('/api', userRoutes);

conn.sync()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });

})
.catch(err => {
  console.log(err);
});