const fs = require('fs'); 
const { resolve } = require('path');
const puppeteer = require('puppeteer'); 

// make sure you have nodeJS installed ion yourncomputer
// create a folder on your desktop 
// create file in folder called screenshotAutomation.js
// copy and paste this code in the javascript file 
// In your terminal run the3 following commands 
// npm init 
// npm install --save puppeteer

// tp start the program open terminal and run node + filename ie node screenshotAutomation.js
// pree Ctrl + C to stop screenshotting 

// replace the website link you want to screenshot here
const url = [    
    'https://www.google.com/'
]; 

// 1000 * 60 = every minute
// 1000 * 60 * 60 = every hour
const takeScreenShotInterval = 10000; 
var timeNow = Date.now(); 

(async () => {  
        try {

        const launchOptions = {
        headless: false,                
        args: [
            "--start-maximized",
            "--no-sandbox",
            "--disable-gpu",
            ],
        devtools: true,
        defaultViewport: null,
        // slowMo: 100, // slow down 100 seconds
        };  

        const pageLoadOptions = {            
            timeout: 0,
            waitUntil: ["domcontentloaded", "networkidle2"],
          };
        
        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });      
        await page.goto(`${url[0]}`, pageLoadOptions);   

        async function takeScreenShot(page) {
            return new Promise(async (resolve, reject) => {
                // goes to your website link to take screenshots                   
                const screenData = await page.screenshot({
                    encoding: 'binary', 
                    type: 'jpeg', 
                    quality: 30,
                    fullPage: true
                });
                fs.writeFileSync(`./${screenshot}-of-${url}-${timeNow}.jpg`, screenData);                            
                resolve(console.log(screenData)); 
            });                             
        };         

        async function takeScreenShotsInterval(page, takeScreenShotInterval) {            
                try{                    
                    setInterval(() => {                                                                                             
                        takeScreenShot(page)            
                    }, takeScreenShotInterval);                 
                } catch(err) {
                    console.log(`err: ${err} takeScreenShotsInterval`); 
                }
        };         

        takeScreenShotsInterval(page, takeScreenShotInterval);                        

        } catch(err) {
            console.log(`err with launching chrome ${err}`)
        }; 
})(); 