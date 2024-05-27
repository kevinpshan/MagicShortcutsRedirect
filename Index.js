// index.js

// Parse the URL parameters
function getQueryStringArray() {
    const assoc = {};
    const items = window.location.search.substring(1).split('&');
    for (let j = 0; j < items.length; j++) {
        const a = items[j].split('=');
        assoc[a[0]] = a[1];
    }
    return assoc;
}

// Get the value of the 'shortname' parameter
const queryParams = getQueryStringArray();
const shortname = queryParams.shortname;

// Google Sheets CSV URL
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSw3T04sJoEgs0uhYBahvTDJudayff8ZITrecVPwQqzjax98HHTFK98RHh8p1z9aaBhIr1pg2_KG_53/pub?gid=0&single=true&output=csv';

// Fetch the CSV data
fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        const csvRows = csvText.split('\n');
        const csvData = {};

        // Parse CSV rows into an object
        for (const row of csvRows) {
            const [short, url] = row.split(',');
            csvData[short] = url;
        }

        // Look up the URL based on the shortname
        const redirectUrl = csvData[shortname];

        if (redirectUrl) {
            // Redirect to the associated URL
            window.location.href = redirectUrl;
        } else {
            // Handle case when shortname is not found (e.g., show an error message)
            console.error(`Shortname "${shortname}" not found.`);
        }
    })
    .catch(error => {
        console.error('Error fetching CSV data:', error);
    });
