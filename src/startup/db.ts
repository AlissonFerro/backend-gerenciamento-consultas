import mongoose from 'mongoose';
import config from 'config';

export default function(){
    const db = config.get('db');
    mongoose.connect(String(db))
        .then(() => console.log(`connected to ${db}`))
}