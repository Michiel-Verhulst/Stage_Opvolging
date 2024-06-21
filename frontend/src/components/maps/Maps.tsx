import keys from "@/keys";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useCallback, useMemo } from "react";

const Maps = (MapsProps: { lat: number; lng: number }) => {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: MapsProps.lat, lng: MapsProps.lng }),
    [MapsProps.lat, MapsProps.lng]
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const onLoad = useCallback(() => {
    console.log("Map Component Loaded...");
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: keys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries as any,
  });

  const mapComponent = useMemo(() => {
    if (!isLoaded) {
      return null;
    }

    return (
      <GoogleMap
        mapContainerClassName="rounded-md"
        options={mapOptions}
        zoom={12}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "200px", height: "200px" }}
        onLoad={onLoad}
      >
        {/* <Marker
                    position={{ lat: MapsProps.lat, lng: MapsProps.lng }}
                    icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} */}
      </GoogleMap>
    );
  }, [isLoaded, mapOptions, mapCenter, onLoad]);

  return mapComponent;
};

export default Maps;
