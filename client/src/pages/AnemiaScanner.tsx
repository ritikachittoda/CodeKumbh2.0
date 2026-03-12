import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { Camera, AlertCircle } from "lucide-react";
import { useState } from "react";

const anemiaSymptoms = [
  "Pale skin or nail beds",
  "Fatigue / weakness",
  "Shortness of breath",
  "Dizziness",
  "Cold hands or feet",
  "Brittle nails",
  "Frequent headaches",
  "Rapid heartbeat",
];

const dietSuggestions = [
  { food: "Beetroot Juice", benefit: "Rich in iron & folate", emoji: "🥤" },
  { food: "Spinach & Kale", benefit: "Non-heme iron source", emoji: "🥬" },
  { food: "Amla (Gooseberry)", benefit: "Vitamin C boosts absorption", emoji: "🍏" },
  { food: "Black Sesame Seeds", benefit: "High in iron & calcium", emoji: "⚫" },
  { food: "Organ Meats / Eggs", benefit: "Heme iron", emoji: "🥩" },
  { food: "Fortified Cereals", benefit: "Added iron & B vitamins", emoji: "🥣" },
  { food: "Jaggery", benefit: "Iron rich sweetener", emoji: "🍬" },
  { food: "Pomegranate", benefit: "Boosts hemoglobin", emoji: "🍎" },
];

  type ScanResult = {
  risk: string;
};

const AnemiaScanner = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

 
const [result, setResult] = useState<ScanResult | null>(null);

  const toggle = (symptom: string) => {
    setChecked((prev) =>
      prev.includes(symptom)
        ? prev.filter((x) => x !== symptom)
        : [...prev, symptom]
    );
  };

  const risk =
    checked.length >= 5 ? "High" : checked.length >= 3 ? "Moderate" : "Low";

const scanImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/anemia/scan", {
      method: "POST",
      body: formData,
    });

    const data: ScanResult = await res.json();

    console.log("API RESPONSE:", data);

    setResult(data);
    setScanResult(data.risk);

    setLoading(false);
  } catch (error) {
    console.error("Upload error:", error);
    setLoading(false);
  }
};

  return (
    <PageLayout>
      <PageHeader
        title="Anemia Risk Scanner"
        subtitle="Check symptoms and scan using camera"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

        {/* CAMERA */}
        <div className="bg-sage-light rounded-2xl p-8 text-center shadow-soft flex flex-col items-center">

          <Camera size={48} className="mb-4" />

          <h3 className="text-xl font-bold mb-2">
            AI Eyelid / Nail Scan
          </h3>

          <p className="text-sm mb-6 max-w-[260px]">
            Upload a photo of your eyelid or nail to estimate anemia risk.
          </p>

          <label className="bg-white px-6 py-3 rounded-xl cursor-pointer font-bold hover:bg-gray-100">
            Open Camera →

            <input
              type="file"
              accept="image/*"
              hidden
             onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setPreview(imageUrl);
  scanImage(file);
}}
            />
          </label>
{loading && (
  <div className="mt-4 text-sm text-gray-500">
    Analyzing image...
  </div>
)}
         {scanResult && (
  <div className="mt-4 p-3 bg-white rounded-lg">
    AI Scan Result: {scanResult} Risk
  </div>
)}

{preview && (
  <div className="mt-4">
    <img
      src={preview}
      alt="Uploaded"
      className="rounded-xl max-h-48"
    />
  </div>
)}

{result && (
  <div className="mt-4 p-4 bg-white rounded-xl shadow">
    <p className="font-bold mb-2">AI Analysis</p>

    <p>
      <strong>Risk Level:</strong> {result.risk}
    </p>

    <p className="text-sm text-gray-600 mt-2">
      The AI analyzes color patterns in the uploaded image.
      Lower redness in eyelid or nail beds may indicate reduced
      hemoglobin levels associated with anemia.
    </p>
  </div>
)}

</div>
        {/* SYMPTOMS */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-bold mb-4">
            Symptom Checker
          </h3>

          <div className="space-y-2">
            {anemiaSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggle(symptom)}
                className={`w-full text-left px-4 py-3 rounded-xl ${
                  checked.includes(symptom)
                    ? "bg-red-100 font-bold"
                    : "bg-gray-100"
                }`}
              >
                {checked.includes(symptom) ? "✓ " : "○ "}
                {symptom}
              </button>
            ))}
          </div>

          {checked.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-xl bg-yellow-100 flex gap-3"
            >
              <AlertCircle size={18} />
              <div>
                <p className="font-bold">{risk} Risk</p>
                <p className="text-sm">
                  {risk === "High"
                    ? "Consult a doctor immediately."
                    : risk === "Moderate"
                    ? "Consider checking hemoglobin levels."
                    : "Maintain a healthy iron diet."}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* DIET */}
        <div>
          <h3 className="text-lg font-bold mb-4">
            Iron-Rich Diet Plan
          </h3>

          <div className="space-y-3">
            {dietSuggestions.map((item, i) => (
              <motion.div
                key={item.food}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-green-100 rounded-xl p-3 flex items-center gap-3"
              >
                <span className="text-xl">{item.emoji}</span>

                <div>
                  <p className="font-bold">{item.food}</p>
                  <p className="text-xs">{item.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default AnemiaScanner;