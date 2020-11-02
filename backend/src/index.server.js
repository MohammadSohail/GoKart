const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
//environment variable or you can say constant
env.config();

//mongodb connection:
//mongodb+srv://root:<password>@cluster0.cus53.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.cus53.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected');
});


app.use(express.json());
app.use('/api', authRoutes);
app.use('/api',adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});