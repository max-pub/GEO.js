# Place Components
[WebComponents](http://webcomponents.org) to work with places / locations.

[Demo Page](http://max.pub/place-components)


## Place Input
```html
<place-input label='Select a place...'></place-input>
```


## Place Query
Use this component to submit a raw AJAX-query and get results as a JSON-list.
*query* accepts search-requests, e.g. "London"
*value* contains the search-results, e.g. [{"city":"London", "country":"UK".....
*on-load* accepts a callback-function, which is executed after the AJAX-requests completes.
```html
<place-query query="{{search}}" value="{{places}}" on-load="{{handleResponse}}"></place-query>
```

