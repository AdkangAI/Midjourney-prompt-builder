import { useState } from "react";

const cameraOptions = [
  "Arri Alexa LF", "Arri Alexa Mini", "Arri Amira", "Blackmagic Pocket Cinema Camera 4K", "Blackmagic Pocket Cinema Camera 6K",
  "Canon EOS C300 Mark III", "Canon EOS R5", "Canon EOS 5D Mark IV", "DJI Osmo Pocket", "DJI Ronin 4D",
  "Fujifilm GFX100", "Fujifilm X-H2S", "GoPro Hero 11", "GoPro Max", "iPhone 14 Pro Max",
  "Leica M10", "Leica SL2", "Nikon D850", "Nikon Z9", "Panasonic GH5", "Panasonic S1H",
  "Phase One XF IQ4", "RED Komodo", "RED Monstro 8K", "RED Raptor", "RED V-Raptor XL",
  "Sony A7R V", "Sony A7S III", "Sony FX3", "Sony FX6", "Sony FX9", "Sony Venice 2"
];

const lensOptions = [
  { name: "Cooke S4/i", description: "Classic softness, 'Cooke Look', popular in film & commercial" },
  { name: "Cooke S7/i", description: "High-end cinema lens, smooth rendering" },
  { name: "Cooke Panchro/i", description: "Vintage softness, subtle flares" },
  { name: "ARRI Master Prime", description: "High-resolution, strong contrast, Netflix-level quality" },
  { name: "ARRI Ultra Prime", description: "Reliable and sharp, cinema standard" },
  { name: "Leitz Summilux-C", description: "Premium, creamy bokeh" },
  { name: "Leitz Thalia", description: "Organic texture, cinematic feel" },
  { name: "Canon CN-E Prime", description: "Natural color, popular in broadcast & film" },
  { name: "Sigma Cine Prime", description: "Affordable sharp cinema lens" },
  { name: "Tokina Vista Prime", description: "Modern look, wide image circle" },
  { name: "ZEISS Supreme Prime", description: "Exceptional resolution, cinema + ad hybrid" },
  { name: "ZEISS CP.3", description: "Compact, color-matched cinema lens" },
  { name: "Angénieux Optimo 28-76mm", description: "Cinema zoom, soft and beautiful look" },
  { name: "Angénieux EZ Series", description: "Flexible zooms for docu/commercials" },
  { name: "Fujinon Premista", description: "Netflix docs, music videos" },
  { name: "Fujinon Cabrio", description: "Broadcast + cinema hybrid zoom" },
  { name: "Canon CN-E Zoom", description: "ENG/studio/commercial ready" },
  { name: "Kowa Prominar Anamorphic", description: "Cinematic flares, vintage look" },
  { name: "Atlas Orion Anamorphic", description: "Ad/music video favorite" },
  { name: "Lomo Anamorphic Round Front", description: "Strong vintage mood" },
  { name: "Helios 44-2", description: "Swirly bokeh, emotional portrait" },
  { name: "Lensbaby Composer Pro", description: "Art ads, strong distortion" },
  { name: "Hasselblad XCD 80mm", description: "Skin tone, beauty shots" },
  { name: "Hasselblad XCD 135mm", description: "High-end stills & ads" },
  { name: "Schneider LS (Phase One)", description: "Product/beauty standard" },
  { name: "Fujifilm GF 110mm f/2", description: "Balance of bokeh + sharpness" },
  { name: "DJI DL 24mm", description: "Inspire 3 aerial lens" },
  { name: "Laowa 9mm f/2.8 Zero-D", description: "Drone wide-angle, no distortion" },
  { name: "Zeiss Touit 12mm", description: "Lightweight high-res for drone" }
];

const angleOptions = [
  "top-down", "low-angle", "eye-level", "high-angle", "overhead",
  "bird’s-eye view", "worm’s-eye view", "tilted/dutch angle",
  "close-up", "extreme close-up", "medium shot", "wide shot", "extreme wide shot",
  "tracking shot", "aerial shot", "point-of-view", "3/4 view", "isometric view",
  "side profile", "rear view"
];

export default function MidjourneyPromptBuilder() {
  const [form, setForm] = useState({
    style: "Commercial",
    subject: "modern workspace setup",
    background: "with books, a warm mug, and a small plant",
    angle: "",
    setting: "Tokyo office, morning",
    camera: "",
    lens: "",
    director: "",
    rendering: "",
    mood: "calm and focused",
    lighting: "soft natural daylight",
    color: "warm neutral palette",
    aspect: "16:9",
    version: "7",
  });
  const [prompt, setPrompt] = useState("");
  const [lensPreview, setLensPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "lens") {
      const selected = lensOptions.find((l) => l.name === value);
      setLensPreview(selected ? selected.description : "");
    }
  };

  const handleGenerate = () => {
    const generatedPrompt = `/imagine prompt: ${form.style} shot, ${form.subject}, ${form.background}, captured from a ${form.angle} view. Set in ${form.setting}. Created using ${form.camera}, ${form.lens}, directed by ${form.director}, rendered in ${form.rendering}. The scene evokes a ${form.mood} feeling, with ${form.lighting} and ${form.color}. --ar ${form.aspect} --v ${form.version}`;
    setPrompt(generatedPrompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied to clipboard!");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white text-gray-900 shadow-xl rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">🛠️ MidJourney Prompt Builder</h1>

        <div className="bg-white text-gray-900 shadow-xl rounded-lg p-8 max-w-2xl w-full">
          </div>


        {Object.entries(form).map(([key, value]) => {
          if (key === "camera") {
            return (
              <div key={key} className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Camera Type</label>
                <input
                  list="cameraList"
                  name="camera"
                  value={form.camera}
                  onChange={handleChange}
                  placeholder="Select a camera"
                  className="w-full p-2 border border-gray-300 rounded text-sm placeholder-gray-700"
                />
                <datalist id="cameraList">
                  {cameraOptions.map((cam, index) => (
                    <option key={index} value={cam} />
                  ))}
                </datalist>
              </div>
            );
          }

          if (key === "lens") {
            return (
              <div key={key} className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Lens Type</label>
                <input
                  list="lensList"
                  name="lens"
                  value={form.lens}
                  onChange={handleChange}
                  placeholder="Select a lens"
                  className="w-full p-2 border border-gray-300 rounded text-sm placeholder-gray-700"
                />
                <datalist id="lensList">
                  {lensOptions.map((lens, index) => (
                    <option key={index} value={lens.name} />
                  ))}
                </datalist>
                {lensPreview && <p className="text-xs text-gray-500 mt-1">{lensPreview}</p>}
              </div>
            );
          }

          if (key === "angle") {
            return (
              <div key={key} className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Angle / View</label>
                <input
                  list="angleList"
                  name="angle"
                  value={form.angle}
                  onChange={handleChange}
                  placeholder="Select an angle"
                  className="w-full p-2 border border-gray-300 rounded text-sm placeholder-gray-700"
                />
                <datalist id="angleList">
                  {angleOptions.map((a, index) => (
                    <option key={index} value={a} />
                  ))}
                </datalist>
              </div>
            );
          }

          return (
            <div key={key} className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700 capitalize">
                {key.replace("version", "Model Version (ex: 7)").replace("aspect", "Aspect Ratio (ex: 16:9)").replace("color", "Color Palette").replace("lighting", "Lighting Style").replace("mood", "Mood / Emotion").replace("rendering", "Rendering or Film Style").replace("director", "Director or Creator").replace("setting", "Setting (Location + Time/Season)").replace("background", "Background / Scene").replace("subject", "Main Product / Subject").replace("style", "Photography Style")}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm placeholder-gray-700"
              />
            </div>
          );
        })}

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Generate Prompt
        </button>
      </div>

      {prompt && (
        <div className="mt-6 max-w-2xl w-full">
          <div className="border border-gray-300 bg-white text-gray-900 rounded p-4">
            <h2 className="font-semibold mb-2">📄 Generated Prompt:</h2>
            <div className="relative text-sm whitespace-pre-wrap mb-4">
              {prompt}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCopy}
                className="text-sm bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-700"
              >
                Copy Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
