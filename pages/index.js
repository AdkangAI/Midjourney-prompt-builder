import { useState } from "react";

export default function MidjourneyPromptBuilder() {
  const [prompt, setPrompt] = useState("");

  const [form, setForm] = useState({
    style: "Commercial",
    subject: "modern workspace setup with books, a warm mug, and a small plant",
    background: "a cozy minimalist Tokyo office",
    angle: "top-down",
    time: "Tokyo, morning",
    camera: "Nikon 802",
    director: "David LaChapelle",
    renderStyle: "Kodak Portra 160 film look",
    mood: "calm and focused",
    lighting: "soft natural daylight",
    color: "warm neutral palette",
    aspect: "16:9",
    version: "7"
  });

  const buildPrompt = () => {
    const result = `/imagine prompt: ${form.style} shot, ${form.subject} with ${form.background}, captured from a ${form.angle} view. Set in ${form.time}. Created using ${form.camera}, directed by ${form.director}, rendered in ${form.renderStyle}. The scene evokes a ${form.mood} feeling, with ${form.lighting} and ${form.color} tones. --ar ${form.aspect} --v ${form.version}`;
    setPrompt(result);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f9] py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">🛠 MidJourney Prompt Builder</h1>

        <div className="space-y-4">
          {[
            ["style", "Photography Style"],
            ["subject", "Main Product / Subject"],
            ["background", "Background / Scene"],
            ["angle", "Angle / View"],
            ["time", "Setting (Location + Time/Season)"],
            ["camera", "Camera Type or Lens"],
            ["director", "Director or Creator"],
            ["renderStyle", "Rendering or Film Style"],
            ["mood", "Mood / Emotion"],
            ["lighting", "Lighting Style"],
            ["color", "Color Palette"],
            ["aspect", "Aspect Ratio (ex: 16:9)"],
            ["version", "Model Version (ex: 7)"]
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block font-semibold text-sm mb-1">{label}</label>
              <input
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={buildPrompt}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Generate Prompt
          </button>
        </div>

        {prompt && (
          <div className="mt-8 bg-gray-50 p-4 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-medium mb-2">📝 Generated Prompt:</h3>
            <p className="whitespace-pre-wrap font-mono text-sm text-gray-700">{prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
