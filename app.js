const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
const ejs = require('ejs');
app.use(cors());

// 读取设备信息JSON文件
const devicesPath = path.join(__dirname, 'devices.json');
const devices = JSON.parse(fs.readFileSync(devicesPath, 'utf-8'));
// 读取操作说明JSON文件
const instructionsPath = path.join(__dirname, 'instructions.json');
const instructions = JSON.parse(fs.readFileSync(instructionsPath, 'utf-8'));

// 设置EJS为模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
// 定义/dhShow.asp接口
app.get('/dhShow.asp', (req, res) => {
    const mcid = req.query.MCID;
    if (devices[mcid]) {
        const device = devices[mcid];
        const deviceImageUrl = 'http://wxinfo.hzdh.com/dhwx/images/dhpnglogo.png'
        const instructionUrl = 'http://wxinfo.hzdh.com/dhwx/images/dhpnglogo.png';
        const videoUrl = 'http://wxinfo.hzdh.com/dhwx/images/dhpnglogo.png';
        const detail = "无"

        res.render('layout', { device, deviceImageUrl, instructionUrl, videoUrl, detail });
    } else {
        res.status(404).send('MCID not found');
    }
});

// 定义/MacInfo/Macinfo.asp接口
app.get('/Macinfo.asp', (req, res) => {
    const mcid = req.query.MCID;
    if (devices[mcid]) {
        res.json(devices[mcid]);
    } else {
        res.status(404).json({ error: 'MCID not found' });
    }
});

// 定义/instructions接口
app.get('/instructions', (req, res) => {
    const mcid = req.query.MCID;
    if (instructions[mcid]) {
        res.json(instructions[mcid]);
    } else {
        res.status(404).json({ error: 'MCID not found' });
    }
});
app.get('/', (req, res) => {
    const mcid = req.query.MCID;
    if (!mcid) {
        return res.status(400).send('MCID is required');
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});