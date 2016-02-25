if (!GEO) GEO = {};


GEO.provider.ip.ipinfo_io = function(callback) {
	GEO.ajax('http://ipinfo.io/json/', function(data) {
		data = JSON.parse(data);
		GEO.log('ipinfo ' + data);
		var latlon = data.loc.split(',');
		GEO.location.ip.provider = 'ipinfo.io';
		GEO.location.ip.lat = latlon[0];
		GEO.location.ip.lon = latlon[1];
		GEO.location.ip.raw = data;
		if (callback) callback(GEO.location.ip);
	});
};