const https = require('https');

https.get('https://raw.githubusercontent.com/pms-28/Body-Exercises-API/main/exercisedb.json', (res) => {
	let data = '';
	res.on('data', (chunk) => data += chunk);
	res.on('end', () => {
		try {
			const json = JSON.parse(data);
			console.log("Total:", json.length);
			console.log("First element:", json[0]);
		} catch (e) { console.error("Parse error:", e); }
	});
});
