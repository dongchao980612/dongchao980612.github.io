const QRCode = require('qrcode');

// 生成二维码的URL
// const url = '/index.html?MCID=SN015941';
// const url = 'http://localhost:3000/dhShow.asp?MCID=SN015949'
const url = "https://www.baidu.com/"
// 生成二维码并保存为图片
QRCode.toFile('qr_code.png', url, { color: { dark: '#000000', light: '#ffffff' } }, function (err) {
    if (err) throw err;
    console.log('二维码生成成功，保存为 qr_code.png');
});