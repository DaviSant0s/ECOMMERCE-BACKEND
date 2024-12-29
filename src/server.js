const express = require('express');
const app = express();

app.use(express.json());

const { PORT } = require('./configs/env');

const conn = require('./database/conn');

const userRoutes = require('./routes/user');
const authenticateRoutes = require('./routes/authenticate');
const adminRoutes = require('./routes/admin/authenticate');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

app.use('/api', adminRoutes);
app.use('/api', authenticateRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

conn.sync()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });

})
.catch(err => {
  console.log(err);
});