export interface Doctor {
  _id: string
  name: string
  specialty: string
  hospital: string
  experience: number
  rating: number
  distance: number
  available: boolean
  website: string
  location: {
    lat: number
    lng: number
  }
}