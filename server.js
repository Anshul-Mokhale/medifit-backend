const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
// this is for testing on wifi ip address
const os = require('os');
dotenv.config();

const app = express();

// Allow CORS only from specific frontend origin (replace with your IP if testing on mobile)
app.use(cors({
    origin: '*', // or: 'http://192.168.1.x:4200',
    credentials: true
}));

app.use(bodyParser.json());
app.use('/api', routes);

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1';
}

const PORT = process.env.PORT || 3000;
//const HOST = '192.168.1.21'; // <- makes it accessible from LAN/mobile
const HOST = getLocalIP();
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});

// this is for testing on localhost
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

