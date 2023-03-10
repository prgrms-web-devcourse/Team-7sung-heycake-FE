import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function KakaoMaps({ address, title }: any) {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map') as HTMLElement;
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(`${address}`, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`,
          });
          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      });
    });
  }, []);

  return <Box id="map" w="100%" h="180px" />;
}