var resultDump = {};

function buildQuery(chars) {
	return `live-video /sk_[a-z]{2}-[a-z]+-[${chars}]+_[A-Za-z0-9]{9,17}_[0-9][A-Za-z0-9]{20,30}/`;
}
var QUERIES = [buildQuery("1-9"), buildQuery("a-f"), buildQuery("g-m"), buildQuery("n-r"), buildQuery("s-z")];

console.log("Running...");
for (var query of QUERIES) {
	var pageCount = 5;
	for (var i = 1; i <= pageCount; ) {
		var url = `https://github.com/search?q=${encodeURIComponent(query)}&ref=opensearch&type=code&p=${i}`;
		var response = await fetch(url, {
			headers: {
				accept: "application/json",
				"accept-language": "en-GB,en;q=0.9,es;q=0.8",
				priority: "u=1, i",
				"sec-ch-ua": '"Not)A;Brand";v="8", "Chromium";v="138"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"Windows"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"sec-gpc": "1",
				"x-github-target": "dotcom",
				"x-react-router": "json",
				"x-requested-with": "XMLHttpRequest",
			},
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		});

		if (response.status == 429) {
			alert("Rate limited; wait ~120 seconds and progress will resume once this alert is closed.");
			continue;
		}

		var j = await response.json();
		pageCount = j.payload.page_count;

		for (var result of j.payload.results) {
			var resultData = result.snippets
				.flatMap((e) => e.lines)
				.join("\n")
				.replaceAll(/<\/?mark>/g, "");

			var domainMatches = Array.from(resultData.matchAll("[0-9a-f]{12}\.global-contribute\.live-video\.net").map((e) => e[0]));
			var keyMatches = Array.from(resultData.matchAll("sk_[A-Za-z0-9_-]+").map((e) => e[0]));

			var keyDomainMatches = keyMatches.flatMap((k) => domainMatches.map((d) => `rtmp://${d}/app/${k}`));
			Object.assign(resultDump, Object.fromEntries(keyDomainMatches.map((k) => [`${result.repo_nwo},${k}`, true])));
		}

		i++;
	}
}
console.log("Finished!");
