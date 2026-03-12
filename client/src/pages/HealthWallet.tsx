import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { FileText, Lock, Plus, Download } from "lucide-react";

const API = "http://localhost:5000/api/health";

/* Demo records */
const sampleRecords = [
  { title: "Blood Test (CBC)", status: "Normal", date: "Feb 15, 2026", color: "bg-sage-light" },
  { title: "Pelvic Ultrasound", status: "Clear", date: "Jan 20, 2026", color: "bg-plum-light" },
  { title: "Thyroid Panel (TSH)", status: "Normal", date: "Dec 10, 2025", color: "bg-gold-light" }
];

const categories = [
  { name: "Menstrual History", count: 12, emoji: "🌸" },
  { name: "Pregnancy Records", count: 0, emoji: "🤰" },
  { name: "Lab Reports", count: 6, emoji: "🔬" },
  { name: "Prescriptions", count: 8, emoji: "💊" },
  { name: "Imaging & Scans", count: 2, emoji: "📸" },
  { name: "Vaccination Records", count: 4, emoji: "💉" }
];

const HealthWallet = () => {

  const [records, setRecords] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Lab Reports");
  const [file, setFile] = useState(null);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(API);
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const uploadRecord = async () => {

    if (!title || !file) {
      alert("Please add title and file");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("status", "Uploaded");
      formData.append("file", file);

      await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setTitle("");
      setFile(null);
      setShowUpload(false);

      fetchRecords();

    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <PageLayout>

      <PageHeader
        title="Health Wallet"
        subtitle="Your secure digital vault for medical records"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

        {/* Security Banner */}

        <div className="lg:col-span-3 gradient-sage rounded-2xl p-6 shadow-soft flex items-center gap-4">

          <Lock size={28} className="text-primary-foreground"/>

          <div>

            <h3 className="font-bold text-primary-foreground">
              Encrypted & Private
            </h3>

            <p className="text-sm text-primary-foreground/80">
              Your health records are secure and private.
            </p>

          </div>

        </div>

        {/* Categories */}

        <div>

          <h2 className="font-bold mb-4">Categories</h2>

          <div className="space-y-2">

            {categories.map(cat => (

              <div
                key={cat.name}
                className="bg-card rounded-xl p-4 flex gap-3"
              >

                <span>{cat.emoji}</span>

                <div>

                  <p className="font-bold">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.count} records</p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Records */}

        <div className="lg:col-span-2">

          <div className="flex justify-between mb-4">

            <h2 className="font-bold">Recent Records</h2>

            <button
              onClick={() => setShowUpload(!showUpload)}
              className="gradient-sage text-primary-foreground px-4 py-2 rounded-xl text-sm flex items-center gap-1"
            >
              <Plus size={14}/> Add Record
            </button>

          </div>

          {/* Upload Form */}

          {showUpload && (

            <div className="bg-card p-4 rounded-xl mb-4 flex flex-col gap-3">

              <input
                placeholder="Record Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="border rounded-lg p-2"
              />

              <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="border rounded-lg p-2"
              >

                <option>Lab Reports</option>
                <option>Prescriptions</option>
                <option>Imaging</option>
                <option>Vaccination</option>

              </select>

              <input
                type="file"
                onChange={(e)=>setFile(e.target.files[0])}
              />

              <button
                onClick={uploadRecord}
                className="bg-green-600 text-white px-4 py-2 rounded-lg w-fit"
              >
                Upload Record
              </button>

            </div>

          )}

          <div className="space-y-3">

            {/* Demo Records */}

            {sampleRecords.map((record,i)=>(

              <motion.div
                key={i}
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                className="bg-card rounded-xl p-5 flex items-center gap-4"
              >

                <div className={`w-12 h-12 rounded-xl ${record.color} flex items-center justify-center`}>
                  <FileText size={20}/>
                </div>

                <div className="flex-1">

                  <p className="font-bold">{record.title}</p>
                  <p className="text-xs">{record.date}</p>

                </div>

                <span className="text-xs px-3 py-1 rounded-lg bg-sage-light">
                  {record.status}
                </span>

              </motion.div>

            ))}

            {/* Uploaded Records */}

            {records.map((record)=>(
              <motion.div
                key={record._id}
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                className="bg-card rounded-xl p-5 flex items-center gap-4"
              >

                <div className="w-12 h-12 rounded-xl bg-ocean-light flex items-center justify-center">
                  <FileText size={20}/>
                </div>

                <div className="flex-1">

                  <p className="font-bold">{record.title}</p>

                  <p className="text-xs">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <a
                  href={`http://localhost:5000/uploads/${record.fileUrl}`}
                  target="_blank"
                >
                  <Download size={16}/>
                </a>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </PageLayout>
  );
};

export default HealthWallet;