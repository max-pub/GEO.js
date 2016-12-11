if (!GEO) GEO = {};

GEO.provider.ip.max_pub = function(callback) {
	GEO.ajax('https://api.max.pub/geoip/', function(data) {
		data = JSON.parse(data);
		GEO.location.ip = data;
		if (callback) callback(GEO.location.ip);
	});
};