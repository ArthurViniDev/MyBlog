const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`));
