(function() {

    this.initmap = function() {
	L.Icon.Default.imagePath = "./leaflet-0.6.4/images";
	var osm, osmAttrib, osmUrl;
	this.map = new L.Map('map');
	osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	osmAttrib = 'Map data © OpenStreetMap contributors';
	osm = new L.TileLayer(osmUrl, {
	    minZoom: 8,
	    maxZoom: 20,
	    attribution: osmAttrib
	});
	map.setView(new L.LatLng(35.9113, 139.7887), 12);
	map.addLayer(osm);
    };
    
    var proxy = "./php-simple-proxy/ba-simple-proxy.php";

    this.readdata = function(layer) {
	var url = "http://nagareyama.ecom-plat.jp/map/api/feature/8?layers=" + layer + "&pagenum=" + 60;
	$.getJSON(
	    proxy,
	    {
		"mode": "native",
		"url": url,
	    })
	.done(function(json) {
	    console.log("test1");
	    $.each(json.results, function(i, item) {
		console.log("test!");
		var marker;
		marker = L.marker([item.attrs.attr7, item.attrs.attr8]).addTo(map);
		marker.bindPopup(item.attrs.attr0);
	    });
	})
	.fail(function( jqxhr, textStatus, error ) {
	    console.log("test2");
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
    };

    this.readAll = function() {
	
    };
    
}).call(this);
