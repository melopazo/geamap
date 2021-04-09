	    ////////////////////////////////////////////////////////////////////////
	    //function

	    $('#modalOverlay').on('show.bs.modal', function (e) {
	    	if (before_overlays.getLayers().length != 0) $('#BasemapsCtrl-left').addClass('on');
	    	if (after_overlays.getLayers().length != 0) $('#BasemapsCtrl-right').addClass('on');
		});

		$('#modalOverlay').on('hide.bs.modal', function (e) {
			if (before_overlays.getLayers().length != 0){
				$("#BasemapsCtrl-left [class^='side-view-content']").scrollTop(0);
				$('#BasemapsCtrl-left').removeClass('on');
			};
			if (after_overlays.getLayers().length != 0){
	            $("#BasemapsCtrl-right [class^='side-view-content']").scrollTop(0);
	            $('#BasemapsCtrl-right').removeClass('on');
			};
        });

		function changeOverlay(side, lyr_name, lyr_desc){
			if (side === 'left'){
	            scope.left_data = lyr_name;
	            $("#left-id").text("Left: " + lyr_desc);

	            before_overlays.clearLayers();
				L.nonTiledLayer.wms('https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?TIME='+scope.left_date+'&', {
				attribution: '&copy; <a href="http://www.catastro.meh.es/esp/wms.asp"><b>Catastro, Direcci&oacute;n General del Catastro</b></a>',
				layers: 'catastro',
				transparent: true,
				format: 'image/png',
				srs: 4326,
				minZoom: 16,
				maxZoom: 21,
				tiled: false,	
				//tileSize: 512
				}).addTo(before_overlays);

			}else{
	            scope.right_data = lyr_name;
	            $("#right-id").text("Right: " + lyr_desc);

	            after_overlays.clearLayers();
				L.nonTiledLayer.wms('https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?TIME='+scope.right_date+'&', {
				attribution: '&copy; <a href="http://www.catastro.meh.es/esp/wms.asp"><b>Catastro, Direcci&oacute;n General del Catastro</b></a>',
				layers: 'catastro',
				transparent: true,
				format: 'image/png',
				srs: 4326,
				minZoom: 16,
				maxZoom: 21,
				tiled: false,	
				//tileSize: 512
				}).addTo(after_overlays);     
			};
		};

	    function resetmap(){
	    	scope.left_date = moment(utcDate.date).format('YYYY-MM-DD');;
    		scope.right_date = moment(utcDate.date).format('YYYY-MM-DD');;
    		scope.lyr_max_zoom = 9;
	    	scope.left_data = 'FECHA 1';
            scope.right_data = 'FECHA 2';

            before_overlays.clearLayers();
            after_overlays.clearLayers();
	        $("#map-container [id^='lt-text']").text('FECHA 1').css('text-transform','none');
	        $("#map-container [id^='rt-text']").text('FECHA 2').css('text-transform','none');

	        $("#left-id").text("FECHA 1");
	        $("#right-id").text("FECHA 2");
	    };
		
		////////////////////////////////////////////////////////////////////////
        //Init
        var scope = {
	    		lyr_max_zoom : 19,
	    		left_date : '',
	    		right_date: '',
	    		left_data: 'Fecha 1',
	    		right_data: 'Fecha 2',

	    }

        var mapbefore = L.map('map1', {
            zoom: 6,
            attributionControl: true,
            zoomControl: false,
            touchZoom: false,
            inertia: false,
            minZoom: 6,
            maxZoom: 21,
			tiled: false,	
			center: [39.4, -4.1]	
        });

        var mapafter = L.map('map2', {
            zoom: 6,
            attributionControl: true,
            zoomControl: false,
            touchZoom: false,
            inertia: false,
            minZoom: 6,
            maxZoom: 21,
			tiled: false,				
			center: [39.4, -4.1]
        });




			 
		var mapabaseA = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
			maxZoom: 20,
			foo: 'bar',
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});							
		   	
		var mapabaseB = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
			maxZoom: 20,
			foo: 'bar',
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});							
  
  
  
// Ortofoto -------------------------------------------------------------------------------------------------------
      
		var capaOrtoActualA = L.tileLayer('https://www.ign.es/wmts/pnoa-ma?layer=OI.OrthoimageCoverage&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&&TileMatrix={z}&TileCol={x}&TileRow={y}', {
			maxZoom: 22,
			minZoom: 1,
		    scheme: 'xyz',       			
			continuousWorld: true,
    		attribution: "© IGN PNOA"
    	});	    	

		var capaOrtoActualB = L.tileLayer('https://www.ign.es/wmts/pnoa-ma?layer=OI.OrthoimageCoverage&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&&TileMatrix={z}&TileCol={x}&TileRow={y}', {
			maxZoom: 22,
			minZoom: 1,
		    scheme: 'xyz',       			
			continuousWorld: true,
    		attribution: "© IGN PNOA"
    	});	      		
		
// Topográfico IGN --------------------------------------------------------------------------------------------------------
 
		
  		var capaTopoIGNA = L.tileLayer.wms("https://www.ign.es/wms-c/mapa-raster?", {
			layers: 'MTN',
			format: 'image/jpeg',
			transparent: true,
          	maxZoom: 22, 			
			attribution: "Cartografía del © Instituto Geográfico Nacional de España"
		}); 	

  		var capaTopoIGNB = L.tileLayer.wms("https://www.ign.es/wms-c/mapa-raster?", {
			layers: 'MTN',
			format: 'image/jpeg',
			transparent: true,
          	maxZoom: 22, 			
			attribution: "Cartografía del © Instituto Geográfico Nacional de España"
		}); 	 		

		var capaIGNBaseA = L.tileLayer('https://www.ign.es/wmts/ign-base?service=WMTS&request=GetTile&version=1.0.0&Format=image/jpeg&layer=IGNBaseTodo&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix={z}&TileRow={y}&TileCol={x}', {
			maxZoom: 18,
			minZoom: 1,
		    scheme: 'xyz',      			
			continuousWorld: true,
    		attribution: "© IGN"
    	}).addTo(mapbefore);	

		var capaIGNBaseB = L.tileLayer('https://www.ign.es/wmts/ign-base?service=WMTS&request=GetTile&version=1.0.0&Format=image/jpeg&layer=IGNBaseTodo&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix={z}&TileRow={y}&TileCol={x}', {
			maxZoom: 18,
			minZoom: 1,
		    scheme: 'xyz',      			
			continuousWorld: true,
    		attribution: "© IGN"
    	}).addTo(mapafter);	    	
		

		
        before_overlays = new L.layerGroup().addTo(mapbefore);
        after_overlays = new L.layerGroup().addTo(mapafter);

        $('#map-container').beforeAfter(mapbefore, mapafter);

        mapbefore.sync(mapafter);
        mapafter.sync(mapbefore);

        $("#map-container [id^='lt-text']").text('FECHA 1').css('text-transform','none');
        $("#map-container [id^='rt-text']").text('FECHA 2').css('text-transform','none');


	
        //$( document ).ready(function() {

            var locDate = new Date(),
                offset  = locDate.getTimezoneOffset() * 60000;
                utcDate = new Date(locDate.getTime() + offset); //Get UTC time set the maxomum date

            scope.left_date = moment(utcDate.date).format('YYYY-MM-DD');
            scope.right_date = moment(utcDate.date).format('YYYY-MM-DD');

            $("#map-container [id^='lt-text']").datepicker({
                format: 'mm/dd/yyyy',
                autoclose: true,
                todayHighlight: true,
                startDate: new Date('2002-01-01'),
                endDate: utcDate
            }).on('changeDate', function(e){
                scope.left_date = moment(e.date).format('YYYY-MM-DD');
                scope.left_data = moment(e.date).format('DD-MM-YYYY');
                $("#map-container [id^='lt-text']").text(scope.left_data).css('text-transform','none');
                before_overlays.clearLayers();
				L.nonTiledLayer.wms('https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?TIME='+scope.left_date+'&', {
				attribution: '&copy; <a href="http://www.catastro.meh.es/esp/wms.asp">Catastro, Direcci&oacute;n General del Catastro</a>',
				layers: 'catastro',
				transparent: true,
				format: 'image/png',
				srs: 4326,
				minZoom: 14,
				maxZoom: 21,
				tiled: false,	
				//tileSize: 512
				zIndex: 1
				}).addTo(before_overlays);
			});

            $("#map-container [id^='rt-text']").datepicker({
                format: 'mm/dd/yyyy',
                autoclose: true,
                todayHighlight: true,
                startDate: new Date('2002-01-01'),
                endDate: utcDate
            }).on('changeDate', function(e){
                scope.right_date = moment(e.date).format('YYYY-MM-DD');
                scope.right_data = moment(e.date).format('DD-MM-YYYY');
                $("#map-container [id^='rt-text']").text(scope.right_data).css('text-transform','none');
                after_overlays.clearLayers();
				L.nonTiledLayer.wms('https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?TIME='+scope.right_date+'&', {
				attribution: '&copy; <a href="http://www.catastro.meh.es/esp/wms.asp">Catastro, Direcci&oacute;n General del Catastro</a>',
				layers: 'catastro',
				transparent: true,
				format: 'image/png',
				srs: 4326,
				minZoom: 14,
				maxZoom: 21,
				tiled: false,	
				//tileSize: 512
				zIndex: 1
				}).addTo(after_overlays);        
			});
            $('#modalAbout').modal();
        //});

			// Control capes -----------------------------------------------------------------------------------------------------
		
	var baseLayers = {
		"Open Street Map": mapabaseA,
		"Ortofoto": capaOrtoActualA,
		"Topográfico": capaTopoIGNA,	
		"Mapa base": capaIGNBaseA,	
		};
		
	var overlays = {
		};

		L.control.layers(baseLayers, overlays, {collapsed: false, position: 'topleft', autoZIndex: false}).addTo(mapbefore);
		
	var baseLayers = {
		"Open Street Map": mapabaseB,
		"Ortofoto": capaOrtoActualB,
		"Topográfico": capaTopoIGNB,	
		"Mapa base": capaIGNBaseB,	

		};
		
	var overlays = {
		};

		L.control.layers(baseLayers, overlays, {collapsed: false, position: 'topright', autoZIndex: false}).addTo(mapafter);

		L.control.scale({position:'bottomright',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}).addTo(mapafter);
		

		
				L.Control.geocoder({
			collapsed:true,
			position:'topleft',
			showResultIcons: false,
			errorMessage: "Lugar no encontrado",
			placeholder: 'Buscar lugar',
		}).addTo(mapbefore);


		

		// EasyButton -----------------------------------------------------------------------------------------------------		
				
		L.easyButton('fa-eraser',
                function (){
                    resetmap();
                },
                'Limpia', mapbefore);		
