import React, { useContext, useMemo, useEffect, useState } from "react";
import { YMaps, Map, TrafficControl } from "@pbe/react-yandex-maps";
import Mycontext from "../context";

import { Container } from "./style";

const Yandex = ({ center }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      if (window.ymaps && window.ymaps.TrafficLayer) {
        const trafficLayer = new window.ymaps.TrafficLayer();
        map.geoObjects.add(trafficLayer);
      } else {
        console.error("Yandex Maps API or TrafficLayer is not available.");
      }
    }
  }, [map]);

  return (
    <Container>
      <YMaps>
        <div className="map" style={{ height: "600px" }}>
          <Map
            defaultState={{ center, zoom: 13 }}
            instanceRef={ref => setMap(ref)}
          >
            <TrafficControl options={{ float: 'right' }} />
          </Map>
        </div>
      </YMaps>
    </Container>
  );
};

const ConditionalYandex = () => {
  const { data } = useContext(Mycontext);

  const lon = data?.coord?.lon || 0;
  const lat = data?.coord?.lat || 0;

  const mapKey = useMemo(() => `${lat}-${lon}`, [lat, lon]);

  return data ? <Yandex key={mapKey} center={[lat, lon]} /> :'';
};

export default ConditionalYandex;
