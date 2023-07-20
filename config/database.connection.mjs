import mongoose from 'mongoose';

const DBConnection = () => {
    mongoose.connect(process.env.DB_URI).then((conn) => {
        console.log(`DB Connected ${conn.connection.host}`);
    })
}

export {DBConnection};