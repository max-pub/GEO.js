// console.log("LOADING GOOGLE", GEO);

if (!GEO) GEO = {};


GEO.provider.search.google = { // using google maps api... implementing bing,OSM,nokia with same interface later
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

    parse: function(data) {
        var list = [];
        var types = GEO.provider.search.google.types;
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
            location.lat = dat.geometry.location.lat.toFixed(5) * 1;
            location.lon = dat.geometry.location.lng.toFixed(5) * 1;
            location.type = types[dat.types[0]];
            //        console.log("TYP:",dat.types[0],' -> ',location.type);
            list.push(location);
        }
        return list;
    },
    search: function(query, callback) { // call with "lat,lng,callback"   OR    "address,callback"
        GEO.ajax("https://maps.google.com/maps/api/geocode/json?sensor=true&address=" + query, function(result) { // &language=de
            var raw = JSON.parse(result);
            var places = GEO.provider.search.google.parse(raw);
            if (callback) callback(places, raw);
        });
    }
};

// console.log("LOADING GOOGLE", GEO.provider.search);