const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrape (url, conditionName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    console.log(`In progress...`);

    let data = await page.evaluate(({url, conditionName}) => {

        let $symptoms, $causes, $treatment;
        const h2 = document.querySelectorAll('h2');
        h2.forEach(e => {
            if (e.innerText.toLowerCase().includes('symptoms')) {
                $symptoms = e.parentElement.outerHTML;
            } else if (e.innerText.toLowerCase().includes('causes')) {
                $causes = e.parentElement.outerHTML;
            } else if (e.innerText.toLowerCase().includes('treatment')) {
                $treatment = e.parentElement.outerHTML;
            }
        })


        dataObj = {
            condition: conditionName,
            description: document.querySelectorAll('section')[0].outerHTML,
            symptoms: $symptoms,
            causes: $causes,
            treatment: $treatment,
            source: url,
        };

        return dataObj;
    }, {url, conditionName});
    
    browser.close()

    return data;
}

async function makeFile() {

    const conditionNames = [
        ["https://www.webmd.com/migraines-headaches/sinus-headaches", "Sinus Headache"],
        ["https://www.webmd.com/migraines-headaches/tension-headaches", "Tension Headache"],
        ["https://www.webmd.com/migraines-headaches/sinus-headaches", "Sinus Headache"],
        ["https://www.webmd.com/migraines-headaches/tension-headaches", "Tension Headache"],
        ["https://www.webmd.com/migraines-headaches/migraines-headaches-migraines", "Migraine Headache"],
        ["https://www.webmd.com/migraines-headaches/cluster-headaches", "Cluster Headache"],
        ["https://www.webmd.com/migraines-headaches/occipital-neuralgia-symptoms-causes-treatments", "Occipital Neuralgia"],
        ["https://www.webmd.com/migraines-headaches/altitude-headache-overview", "Altitude Headache"],
        ["https://www.webmd.com/migraines-headaches/low-high-pressure-headaches", "Low-Pressure and High-Pressure Headache"],
        ["https://www.webmd.com/migraines-headaches/cervicogenic-headache-facts_", "Cervicogenic Headache"],
        ["https://www.webmd.com/migraines-headaches/pain-management-spinal-headaches", "Spinal Headache"],
        ["https://www.webmd.com/migraines-headaches/new-daily-persistent", "New Daily Persistent Headache"],
        ["https://www.webmd.com/migraines-headaches/rebound-headaches", "Rebound Headache"],
        ["https://www.webmd.com/migraines-headaches/ice-pick-headaches", "Ice Pick Headache"],
        ["https://www.webmd.com/migraines-headaches/thunderclap-headaches", "Thunderclap Headache"],
        ["https://www.webmd.com/migraines-headaches/hemicrania-continua-symptoms-treatment", "Hemicrania Continua"]
    ];

    let data = {};

    for await (const [url, conditionName] of conditionNames) {
        data[conditionName] = await scrape(url, conditionName);
    }

    fs.writeFile("./conditions.json", JSON.stringify(data, null, 3), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log(`Success! File is created.`);
    });
}

makeFile();