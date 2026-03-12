import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { Doctor } from "../types/Doctor";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})
// interface Doctor {
//   _id: string
//   name: string
//   location: {
//     lat: number
//     lng: number
//   }
// }

const jabalpur = {
  lat: 23.1815,
  lon: 79.9864
}

const TestMap = ({ doctors = [] }: { doctors?: Doctor[] }) => {

  return (

    <MapContainer
      center={[jabalpur.lat, jabalpur.lon]}
      zoom={13}
      style={{ height: "600px", width: "100%" }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    {doctors?.map((doc) => (

        <Marker
          key={doc._id}
          position={[doc.location.lat, doc.location.lng]}
        >
          <Popup>
            {doc.name}
          </Popup>
        </Marker>

      ))}

    </MapContainer>

  )

}

export default TestMap