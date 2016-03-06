<!-- # Place Components -->
<!-- [WebComponents](http://webcomponents.org) to work with places / locations. -->

[Demo Page](http://git.max.pub/GEO.js)


## Search

#### JavaScript
```javascript
GEO.search(function(list){ 
	list = [ // list of places
		{
			country:'',
			city:'',
			state:'',
			lat:'',
			lon:'',
		}, 
		// ...
	]
	// list[0].city	
	// list[0].state
	// list[0].country
	// list[0].lat
	// list[0].lon
});
```
#### WebComponent
```html
<geo-search query="{{query}}" result="{{result}}"></geo-search>
```




## Location

#### JavaScript
tries GeoIP & GPS/WIFI locating, selects best result
```javascript
GEO.locate(function(location){ 
	// location.lat
	// location.lon
}, function(place){
	// place.city
	// place.state
	// place.country
	// place.lat
	// place.lon
});
```

#### WebComponent
```html
<lat-lon ip="{{ip}}" gps="{{gps}}" result="{{locationCoordinates}}" name="{{locationName}}" city="{{locationCity}}"></lat-lon>
```

