const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const cartRoutes = require('./routes/cart');



//enviroment config
env.config();

//mongodb connection string
mongoose.connect(
    `mongodb+srv://owais:owaisdb@cluster0.enmcs.mongodb.net/auth?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => 
{
    console.log('database connected');

});



app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT} `);  
});