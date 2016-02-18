GEO = {


    ajax: function (url, callback) { // simple AJAX implementation
        var req = new XMLHttpRequest();
        if (!req) return;
        req.open('GET', url, true);
        req.onreadystatechange = function () {
            if (req.readyState == 4)
                if (callback) callback(req.responseText);
        };
        req.send();
    },


    google: { // using google maps api... implementing bing,OSM,nokia with same interface later
        types: {
            country: 'country',
            administrative_area_level_1: 'state',
            administrative_area_level_2: 'county',
            locality: 'city',
            sublocality: 'quarter',
            neighborhood: 'neighborhood',
            route: 'street',
            street_number: 'streetNumber',
            postal_code: 'zipCode',
            street_address: 'street',
            postal_town: 'city'
        },

        parse: function (data) {
            var list = [];
            var types = GEO.google.types;
            for (var i in data.results) {
                var dat = data.results[i];
                var location = {};
                var address = dat.address_components;
                for (var part in address) {
                    var typ = address[part].types[0];
                    //            console.log('part',address[part]);
                    if (types[typ]) location[types[typ]] = address[part].long_name;
                    if (types[typ]) location[types[typ] + 'Code'] = address[part].short_name;
                    if (location[types[typ]] == location[types[typ] + 'Code']) delete location[types[typ] + 'Code'];
                }
                location.string = dat.formatted_address;
                location.lat = dat.geometry.location.lat;
                location.lon = dat.geometry.location.lng;
                location.type = types[dat.types[0]];
                //        console.log("TYP:",dat.types[0],' -> ',location.type);
                list.push(location);
            }
            return list;
        },
        search: function (query, callback) { // call with "lat,lng,callback"   OR    "address,callback"
            GEO.ajax("google.test.data.json", function (result) { // &language=de
                //            GEO.ajax("http://maps.google.com/maps/api/geocode/json?sensor=true&address=" + query, function (result) { // &language=de
                var raw = JSON.parse(result);
                var places = GEO.google.parse(raw);
                if (callback) callback(places, raw);
            });
        }
    },


    filter: function (loc, filter) { // filter results e.g. {type:'city'} to see just cities...
        var ret = [];
        for (var i = 0; i < loc.length; i++) {
            var use = true;
            for (var f in filter)
                if (loc[i][f] != filter[f]) use = false;
            if (use) ret.push(loc[i]);
        }
        return ret;
    },


    search: function (query, callback, filter) {
        GEO.google.search(query, function (places) {
            if (filter) places = GEO.filter(places, filter);
            if (callback) callback(places);
        });
    },
    log: function (p) {
        console.log('GEO.js:', p);
    }


}
