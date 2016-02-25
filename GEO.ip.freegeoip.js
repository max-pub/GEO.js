if (!GEO) GEO = {};

GEO.provider.ip.freegeoip_net = function(callback) {
	GEO.ajax('http://freegeoip.net/json/', function(data) {
		data = JSON.parse(data);
		GEO._location.ip.lat = data.latitude;
		GEO._location.ip.lon = data.longitude;
		GEO._location.ip.raw = data;
		if (callback) callback(GEO._location.ip);
	});
};