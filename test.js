const https = require('https');

https.get('https://api.dailymotion.com/videos?search=squat+exercise&fields=id,title,thumbnail_360_url,owner.username&limit=3', (res) => {
	let data = '';
	res.on('data', (chunk) => data += chunk);
	res.on('end', () => {
		console.log("Status:", res.statusCode);
		try {
			const json = JSON.parse(data);
			console.log(json.list[0].title);
			console.log(json.list[0].thumbnail_360_url);
		} catch (e) {
		  console.log("Body:", data.substring(0, 300));
		}
	});
}).on('error', (e) => {
	console.error("Request error:", e);
});
