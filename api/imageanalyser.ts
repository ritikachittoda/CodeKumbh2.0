// import PageLayout from "../client/src/components/layout/PageLayout";
// import PageHeader from "../client/src/components/shared/PageHeader";
// import { motion } from "framer-motion";
// import { MapPin, Star, Clock, Search } from "lucide-react";
// import { useState, useEffect } from "react";
// import TestMap from "../client/src/components/TestMap";

// interface Doctor {
//   _id: string
//   name: string
//   specialty: string
//   hospital: string
//   experience: number
//   rating: number
//   distance: number
//   available: boolean
//   website: string
//   location: {
//     lat: number
//     lng: number
//   }
// }

// const DoctorFinder = () => {

  
//   const [search, setSearch] = useState("");

// const [doctors, setDoctors] = useState<Doctor[]>([
//   {
//     _id: "1",
//     name: "Dr. Sonal Richhariya",
//     specialty: "Gynecologist",
//     hospital: "Richhariya Ortho & Gynaec Centre, Napier Town",
//     rating: 4.6,
//     experience: 12,
//     distance: 2.1,
//     available: true,
//     website: "https://www.google.com/maps/place/Dr.+Sonal+Richhariya/@23.1597543,79.9325636,17z/data=!3m1!4b1!4m6!3m5!1s0x3981afe9575a3ae1:0x2f4aba380862f129!8m2!3d23.1597543!4d79.9325636!16s%2Fg%2F11h7fm4smz?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D",
//     location: {
//       lat: 23.1632,
//       lng: 79.9335
//     }
//   },
//   {
//     _id: "2",
//     name: "Dr. Shruti S. Agrawal",
//     specialty: "Gynecologist",
//     hospital: "Rajul Landmark Clinic",
//     rating: 4.8,
//     experience: 10,
//     distance: 3.5,
//     available: true,
//     website: "https://www.eka.care/doctor/dr-shruti-obstetrics-and-gynecologist-jabalpur",
//     location: {
//       lat: 23.1702,
//       lng: 79.9495
//     }
//   },
//   {
//     _id: "3",
//     name: "Dr. Sonal Sahni",
//     specialty: "Infertility Specialist",
//     hospital: "BestCare Clinic",
//     rating: 4.4,
//     experience: 9,
//     distance: 4.2,
//     available: false,
//     website: "https://maps.google.com",
//     location: {
//       lat: 23.1685,
//       lng: 79.9389
//     }
//   },
//   {
//   _id: "4",
//   name: "Dr. Nafisa Hussain",
//   specialty: "Obstetrician and Gynaecologist",
//   hospital: "Global Hospital and Urology Research Center, New Adaresh Colony",
//   rating: 4.7,
//   experience: 15,
//   distance: 3.2,
//   available: true,
//   website: "https://globalurologyhospital.com/",
//   location: {
//     lat: 23.1810,
//     lng: 79.9485
//   }
// }
// ]);
//   const filtered = doctors.filter((d) =>
//     d.name.toLowerCase().includes(search.toLowerCase()) ||
//     d.specialty.toLowerCase().includes(search.toLowerCase()) ||
//     d.hospital.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <PageLayout>
//       <PageHeader
//         title="Find a Doctor"
//         subtitle="Locate gynecologists, safe clinics, and book appointments nearby"
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         <div className="lg:col-span-2 space-y-6">

//           {/* Search */}
//           <div className="relative">
//             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, specialty, or hospital..."
//               className="w-full bg-card rounded-xl pl-12 pr-4 py-4 text-sm shadow-card focus:outline-none"
//             />
//           </div>

//           {/* Doctor List */}
//           <div className="space-y-3">
//             {filtered.map((doc, i) => (

//               <motion.div
//                 key={doc._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="bg-card rounded-2xl p-5 shadow-card"
//               >

//                 <div className="flex items-start justify-between">

//                   <div>

//                     <h4 className="text-lg font-bold">
//                       {doc.name}
//                     </h4>

//                      <p className="text-sm text-muted-foreground">
//                       {doc.specialty} · {doc.hospital} · {doc.experience} yrs
//                     </p>

//                     <div className="flex items-center gap-4 mt-2">

//                       <span className="flex items-center gap-1 text-sm">
//                         <Star size={14}/> {doc.rating}
//                       </span>

//                       <span className="flex items-center gap-1 text-sm">
//                         <MapPin size={14}/> {doc.distance} km
//                       </span>

//                       <span className="flex items-center gap-1 text-sm">
//                         <Clock size={14}/>
//                         {doc.available ? "Available Today" : "Next week"}
//                       </span>

//                     </div>

//                   </div>

//                  <button
//   onClick={() => window.open(doc.website, "_blank")}
//   className={`px-5 py-2 rounded-xl text-sm font-bold ${
//     doc.available
//       ? "gradient-sage text-white"
//       : "bg-muted text-muted-foreground"
//   }`}
//   disabled={!doc.available}
// >
//   {doc.available ? "Book Now" : "Unavailable"}
// </button>
//                 </div>

//               </motion.div>

//             ))}
//           </div>

//         </div>

//         {/* Map */}
//      <div className="sticky top-24 h-[600px]">
//   <TestMap doctors={filtered} />
// </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default DoctorFinder;