const fs = require('fs');
const html = fs.readFileSync('www/index.html', 'utf8');
if (!html.includes('EasyBill')) throw new Error('EasyBill HTML entry point missing');
console.log('EasyBill web assets validated. Capacitor packages will be synced during the Android build.');
