import mongoose, { connect, Connection } from 'mongoose';

// Init function
async function init() {
    const uri = 'mongodb://localhost:27017/test';
    await connect(uri);
}

// Run function, catch errors
init().catch(err => {
    console.log(`Unable to connect: ${err}`)
})

// Error Handling
const db: Connection = mongoose.connection;
db.on('error', () => console.log(`MongoDB Error: `));
db.on('connecting', () => console.log(`Connecting to server...`));
db.on('open', () => console.log(`Connected to server...`));