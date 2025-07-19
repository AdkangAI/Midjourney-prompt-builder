"use client";
import { useState, useMemo, useRef } from "react";

/* ------------------------------------------------------------
   1. Style Presets & Option Data
------------------------------------------------------------- */
const STYLE_PRESETS = [
  "Commercial","Cinematic","Editorial","Beauty","Macro","Aerial",
  "Documentary","Vintage Film","Minimal Product","Lifestyle","Tech Product"
];

const CAMERA_OPTIONS = [
  "Arri Alexa LF","Arri Alexa Mini","Arri Amira",
  "Blackmagic Pocket Cinema Camera 4K","Blackmagic Pocket Cinema Camera 6K",
  "Canon EOS C300 Mark III","Canon EOS R5","Canon EOS 5D Mark IV",
  "DJI Osmo Pocket","DJI Ronin 4D","Fujifilm GFX100","Fujifilm X-H2S",
  "GoPro Hero 11","GoPro Max","iPhone 14 Pro Max",
  "Leica M10","Leica SL2","Nikon D850","Nikon Z9",
  "Panasonic GH5","Panasonic S1H","Phase One XF IQ4",
  "RED Komodo","RED Monstro 8K","RED Raptor","RED V-Raptor XL",
  "Sony A7R V","Sony A7S III","Sony FX3","Sony FX6","Sony FX9","Sony Venice 2"
];

const LENS_OPTIONS = [
  { name:"Cooke S4/i", description:"Classic softness, 'Cooke Look', film & commercial favorite" },
  { name:"Cooke S7/i", description:"High-end cinema lens, smooth rendering" },
  { name:"Cooke Panchro/i", description:"Vintage softness, subtle flares" },
  { name:"ARRI Master Prime", description:"High-resolution, strong contrast, Netflix-level quality" },
  { name:"ARRI Ultra Prime", description:"Reliable, sharp cinema standard" },
  { name:"Leitz Summilux-C", description:"Premium creamy bokeh" },
  { name:"Leitz Thalia", description:"Organic texture, cinematic feel" },
  { name:"Canon CN-E Prime", description:"Natural color, broadcast & film" },
  { name:"Sigma Cine Prime", description:"Affordable, sharp cinema lens" },
  { name:"Tokina Vista Prime", description:"Modern look, large image circle" },
  { name:"ZEISS Supreme Prime", description:"Exceptional resolution hybrid" },
  { name:"ZEISS CP.3", description:"Compact, color-matched set" },
  { name:"Angénieux Optimo 28-76mm", description:"Cinema zoom, soft beautiful look" },
  { name:"Angénieux EZ Series", description:"Flexible zooms for docu/commercial" },
  { name:"Fujinon Premista", description:"Used in docs / music videos" },
  { name:"Fujinon Cabrio", description:"Broadcast + cinema hybrid zoom" },
  { name:"Canon CN-E Zoom", description:"ENG / studio / commercial ready" },
  { name:"Kowa Prominar Anamorphic", description:"Vintage anamorphic flares" },
  { name:"Atlas Orion Anamorphic", description:"Ad / music video favorite" },
  { name:"Lomo Anamorphic Round Front", description:"Strong vintage mood" },
  { name:"Helios 44-2", description:"Swirly bokeh portrait character" },
  { name:"Lensbaby Composer Pro", description:"Art ads, selective focus" },
  { name:"Hasselblad XCD 80mm", description:"Beauty / skin tone rendering" },
  { name:"Hasselblad XCD 135mm", description:"High-end stills & ads" },
  { name:"Schneider LS (Phase One)", description:"Product / beauty standard" },
  { name:"Fujifilm GF 110mm f/2", description:"Balanced bokeh + sharpness" },
  { name:"DJI DL 24mm", description:"Inspire 3 aerial lens" },
  { name:"Laowa 9mm f/2.8 Zero-D", description:"Ultra wide, low distortion (drone)" },
  { name:"Zeiss Touit 12mm", description:"Lightweight high-res wide" }
];

const ANGLE_OPTIONS = [
  "top-down","3/4 view","eye-level","low-angle","high-angle",
  "isometric view","aerial shot","close-up","macro close-up","wide shot"
];

const FIELD_LABEL = {
  style:"Photography Style",
  subject:"Main Product / Subject",
  background:"Background / Scene",
  angle:"Angle / View",
  setting:"Setting (Location + Time/Season)",
  camera:"Camera Type",
  lens:"Lens Type",
  director:"Director / Creator",
  rendering:"Rendering / Film Style",
  mood:"Mood / Emotion",
  lighting:"Lighting Style",
  color:"Color Palette",
  aspect:"Aspect Ratio",
  version:"Model Version"
};

/* ------------------------------------------------------------
   2. Style → Suggestion Mapping
------------------------------------------------------------- */
function getStyleSuggestions(style) {
  const map = {
    Commercial: {
      camera:"Sony A7R V",
      lens:"Cooke S4/i",
      angle:"3/4 view",
      lighting:"soft diffused key light + bounce fill",
      rendering:"high-end product photography, crisp detail",
      mood:"clean and aspirational",
      color:"balanced neutral palette with subtle warmth"
    },
    Cinematic: {
      camera:"Arri Alexa Mini",
      lens:"ARRI Master Prime",
      angle:"low-angle",
      lighting:"moody cinematic lighting with soft key + practicals",
      rendering:"cinematic filmic grading, subtle grain",
      mood:"dramatic and immersive",
      color:"teal & orange controlled palette"
    },
    Editorial: {
      camera:"Canon EOS R5",
      lens:"Leitz Summilux-C",
      angle:"eye-level",
      lighting:"soft magazine editorial lighting, large diffused source",
      rendering:"refined print-ready look",
      mood:"stylish and modern",
      color:"muted contemporary tones"
    },
    Beauty: {
      camera:"Fujifilm GFX100",
      lens:"Leitz Summilux-C",
      angle:"close-up",
      lighting:"feathered beauty dish + soft fill",
      rendering:"ultra clean skin detail",
      mood:"fresh and elegant",
      color:"soft pastel highlights"
    },
    Macro: {
      camera:"Phase One XF IQ4",
      lens:"ARRI Master Prime",
      angle:"macro close-up",
      lighting:"focused specular highlights + controlled fill",
      rendering:"extreme detail, shallow depth",
      mood:"precise and intimate",
      color:"rich micro contrast neutrals"
    },
    Aerial: {
      camera:"DJI Ronin 4D",
      lens:"Leitz Thalia",
      angle:"aerial shot",
      lighting:"golden hour directional sunlight",
      rendering:"wide cinematic aerial clarity",
      mood:"expansive and uplifting",
      color:"warm highlights, cool shadows"
    },
    Documentary: {
      camera:"Sony FX3",
      lens:"ZEISS Supreme Prime",
      angle:"eye-level",
      lighting:"natural available light",
      rendering:"true-to-life neutral grade",
      mood:"authentic and grounded",
      color:"natural muted palette"
    },
    "Vintage Film": {
      camera:"Arri Amira",
      lens:"Cooke Panchro/i",
      angle:"3/4 view",
      lighting:"soft wrap practical tungsten",
      rendering:"vintage film look, subtle halation, gentle grain",
      mood:"nostalgic and warm",
      color:"amber highlights & soft teal shadows"
    },
    "Minimal Product": {
      camera:"Sony A7S III",
      lens:"ZEISS Supreme Prime",
      angle:"top-down",
      lighting:"soft shadowless diffuse table top",
      rendering:"clean minimal staging",
      mood:"calm and precise",
      color:"light monochrome neutrals"
    },
    Lifestyle: {
      camera:"Canon EOS R5",
      lens:"Leitz Summilux-C",
      angle:"3/4 view",
      lighting:"natural window light + fill reflector",
      rendering:"soft organic lifestyle look",
      mood:"warm and inviting",
      color:"natural warm neutrals"
    },
    "Tech Product": {
      camera:"Sony A7R V",
      lens:"ZEISS Supreme Prime",
      angle:"isometric view",
      lighting:"gradient edge lighting + soft rim",
      rendering:"sleek high contrast product render style",
      mood:"futuristic and focused",
      color:"cool neutral palette with accent highlight"
    }
  };
  return map[style] || null;
}

/* ------------------------------------------------------------
   3. Component
------------------------------------------------------------- */
export default function PromptBuilder() {
  const [form, setForm] = useState({
    style:"Commercial",
    subject:"modern workspace setup",
    background:"with books, a warm mug, and a small plant",
    angle:"",
    setting:"Tokyo office, morning",
    camera:"",
    lens:"",
    director:"",
    rendering:"",
    mood:"calm and focused",
    lighting:"soft natural daylight",
    color:"warm neutral palette",
    aspect:"16:9",
    version:"7"
  });

  const [lensPreview, setLensPreview] = useState("");
  const [pendingStyle, setPendingStyle] = useState(form.style);
  const [suggest, setSuggest] = useState(getStyleSuggestions(form.style));
  const [overwrite, setOverwrite] = useState(false);
  const dirtyFieldsRef = useRef(new Set());

  /* ------------ field change ------------ */
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      if (prev[name] !== value) dirtyFieldsRef.current.add(name);
      return { ...prev, [name]: value };
    });
    if (name === "lens") {
      const found = LENS_OPTIONS.find(l => l.name === value);
      setLensPreview(found ? found.description : "");
    }
  };

  /* ------------ style select (pending) ------------ */
  const handleStyleSelect = (e) => {
    const value = e.target.value;
    setPendingStyle(value);
    setSuggest(getStyleSuggestions(value));
  };

  /* ------------ apply suggestions ------------ */
  const applySuggestions = () => {
    if (!suggest) return;
    setForm(prev => {
      const next = { ...prev, style: pendingStyle };
      Object.entries(suggest).forEach(([k,v])=>{
        if (!v) return;
        if (k in next) {
          const isEmpty = next[k].trim() === "";
          if (overwrite || isEmpty) {
            next[k] = v;
            dirtyFieldsRef.current.delete(k);
          }
        }
      });
      return next;
    });
  };

  /* ------------ prompt build ------------ */
  const prompt = useMemo(() => {
    const parts = [
      form.style && `${form.style} shot`,
      form.subject,
      form.background,
      form.angle && `captured from a ${form.angle} view`,
      form.setting && `set in ${form.setting}`,
      (form.camera || form.lens) &&
        `using ${[form.camera, form.lens].filter(Boolean).join(" + ")}`,
      form.director && `directed by ${form.director}`,
      form.rendering,
      form.mood && `evoking a ${form.mood} feeling`,
      form.lighting,
      form.color
    ].filter(Boolean).join(", ");
    return parts
      ? `/imagine prompt: ${parts}. --ar ${form.aspect} --v ${form.version}`
      : "";
  }, [form]);

  const copyPrompt = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  };

  /* ------------ render ------------ */
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            🛠️ <span className="text-blue-600">MidJourney</span> Prompt Builder
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Choose a style → review suggestions → click Apply (empty fields skipped unless overwrite).
          </p>
        </header>

        {/* Style + Suggestions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Style */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {FIELD_LABEL.style}
                </label>
                <div className="flex gap-2">
                  <select
                    value={pendingStyle}
                    onChange={handleStyleSelect}
                    className="w-1/2 rounded-md border border-slate-300 bg-white px-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  >
                    {STYLE_PRESETS.map(s => <option key={s}>{s}</option>)}
                    <option value="(Custom)">Custom…</option>
                  </select>
                  <input
                    type="text"
                    value={pendingStyle}
                    onChange={(e)=>{
                      setPendingStyle(e.target.value);
                      setSuggest(getStyleSuggestions(e.target.value));
                    }}
                    className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Type custom style"
                  />
                </div>
                {suggest ? (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Suggestions ready → Apply to fill.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">
                    No mapped suggestions (custom style).
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <label className="flex items-center gap-1 text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={overwrite}
                      onChange={e=>setOverwrite(e.target.checked)}
                      className="rounded border-slate-400"
                    />
                    overwrite filled fields
                  </label>
                  <button
                    type="button"
                    onClick={applySuggestions}
                    disabled={!suggest}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Aspect / Version */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Aspect / Version
                </label>
                <div className="flex gap-2">
                  <input
                    name="aspect"
                    value={form.aspect}
                    onChange={handleFieldChange}
                    className="w-1/2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="16:9"
                  />
                  <input
                    name="version"
                    value={form.version}
                    onChange={handleFieldChange}
                    className="w-1/2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="7"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  MidJourney flags (e.g. --ar / --v)
                </p>
              </div>
            </div>
          </div>

            {/* Suggestions Preview */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-2">Style Suggestions Preview</h3>
            {suggest ? (
              <ul className="text-[12px] space-y-1 text-slate-600">
                {Object.entries(suggest).map(([k,v])=>(
                  <li key={k}>
                    <span className="font-medium">{k}:</span> {v}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[12px] text-slate-500">No mapped suggestions.</p>
            )}
            <p className="mt-3 text-[11px] text-slate-400">
              Apply fills empty fields (or all if overwrite).
            </p>
          </div>
        </div>

        {/* Main Form */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(form).map(([k,v])=>{
              if (["style","aspect","version"].includes(k)) return null;
              const dirty = dirtyFieldsRef.current.has(k);
              const baseProps = {
                name: k,
                value: v,
                onChange: handleFieldChange,
                className:"w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              };

              if (k === "camera") {
                return (
                  <div key={k} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {FIELD_LABEL[k]} {dirty && <span className="text-[10px] text-amber-600">(edited)</span>}
                    </label>
                    <input list="cameraList" placeholder="Select or type" {...baseProps} />
                    <datalist id="cameraList">
                      {CAMERA_OPTIONS.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                );
              }

              if (k === "lens") {
                return (
                  <div key={k} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {FIELD_LABEL[k]} {dirty && <span className="text-[10px] text-amber-600">(edited)</span>}
                    </label>
                    <input list="lensList" placeholder="Select or type" {...baseProps} />
                    <datalist id="lensList">
                      {LENS_OPTIONS.map(l => <option key={l.name} value={l.name} />)}
                    </datalist>
                    {lensPreview && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{lensPreview}</p>
                    )}
                  </div>
                );
              }

              if (k === "angle") {
                return (
                  <div key={k} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {FIELD_LABEL[k]} {dirty && <span className="text-[10px] text-amber-600">(edited)</span>}
                    </label>
                    <input list="angleList" placeholder="Select or type" {...baseProps} />
                    <datalist id="angleList">
                      {ANGLE_OPTIONS.map(a => <option key={a} value={a} />)}
                    </datalist>
                  </div>
                );
              }

              return (
                <div key={k} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {FIELD_LABEL[k]} {dirty && <span className="text-[10px] text-amber-600">(edited)</span>}
                  </label>
                  <input placeholder={FIELD_LABEL[k]} {...baseProps} />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={copyPrompt}
              disabled={!prompt}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md shadow-sm transition disabled:opacity-40"
            >
              Copy Prompt
            </button>
            <button
              type="button"
              onClick={()=>{
                setForm(p=>({
                  ...p,
                  director:"",
                  rendering:"",
                  mood:p.mood
                }));
                ["director","rendering"].forEach(f=>dirtyFieldsRef.current.delete(f));
              }}
              className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-medium rounded-md transition"
            >
              Lite Reset
            </button>
          </div>
        </section>

        {prompt && (
          <section className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-3">📄 Generated Prompt</h2>
            <pre className="text-sm whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded border border-slate-100 max-h-64 overflow-auto">
{prompt}
            </pre>
            <p className="mt-2 text-[11px] text-slate-500">
              Tip: For variations, adjust angle / lens / lighting for A/B tests.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
