const fs = require('fs');
const faker = require('faker');

// 生成随机的设备信息
function generateDeviceInfo() {
    return {
        "产品名称": `产品${faker.random.alphaNumeric(1)}`,
        "产品型号": `型号${faker.random.alphaNumeric(3)}`,
        "产品编码": `编码${faker.random.alphaNumeric(5)}`,
        "出厂日期": faker.date.past().toISOString().split('T')[0]
    };
}

// 生成10个随机的设备信息
function generateDevices() {
    const devices = {};
    for (let i = 0; i < 10; i++) {
        const mcid = `SN${faker.random.alphaNumeric(6)}`;
        devices[mcid] = generateDeviceInfo();
    }
    return devices;
}

// 生成设备信息并写入到devices.json文件中
const devices = generateDevices();
fs.writeFileSync('devices.json', JSON.stringify(devices, null, 4), 'utf-8');

console.log('设备信息已写入到 devices.json 文件中');