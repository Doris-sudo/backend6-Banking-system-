import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3300;

app.listen(PORT, () =>{
    console.log(`Bank server is running on port ${PORT}`);
    
});
