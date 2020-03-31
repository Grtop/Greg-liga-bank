'use strict';

(function () {
  ymaps.ready(function () {
    var mapObj = new ymaps.Map('map', {
        center: [56.82, 60.59],
        zoom: 5,
        controls: []
      }), objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 5
      });

    var setError = function () {
      // Need create error for this event
    };

    var update = function (list) {
      mapObj.geoObjects.add(objectManager.setFilter(function (item) {
        var param = item.properties.clusterCaption;
        if (item.properties.clusterCaption === param) {
          return list[param];
        }
      }));
    };

    window.data.load('http://localhost:3000/data.json', function (data) {
      objectManager.add(data);
    }, setError);

    window.map = {
      update: update
    };
  });
})();
