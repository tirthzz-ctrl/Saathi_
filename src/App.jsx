import React, { useState } from 'react';
import { 
  MapPin, Calendar, Users, Wallet, Coffee, ShieldAlert, 
  Lightbulb, ChefHat, Music, Camera, Sun, Sparkles, Send, Globe, 
  ArrowRight, AlertTriangle, Map, CheckSquare, MessageCircle, 
  Calculator, Share2, Download
} from 'lucide-react';

// --- Color Palette Constants (Desi Theme) ---
const COLORS = {
  saffron: 'bg-orange-500',
  cream: 'bg-orange-50',
  teal: 'bg-teal-600',
};

// API Key managed by the environment for security and stability
// We stick to Gemini here as it's the supported model for this preview environment.
const API_KEY = "AIzaSyAXgSeuDX0bixOpWUS_9xzzVVfWjb4Z7N4"; 

const VIBES = [
  { id: 'foodie', label: 'Chattora (Foodie)', icon: <ChefHat size={18} /> },
  { id: 'nightlife', label: 'Party Sharty (Nightlife)', icon: <Music size={18} /> },
  { id: 'culture', label: 'History & Culture', icon: <Map size={18} /> },
  { id: 'relax', label: 'Sukoon (Relaxation)', icon: <Sun size={18} /> },
  { id: 'adventure', label: 'Toofani (Adventure)', icon: <Camera size={18} /> },
  { id: 'gems', label: 'Chupe Rustom (Hidden Gems)', icon: <Sparkles size={18} /> },
];

// --- Indian States Data ---
const INDIAN_STATES_DATA = {
  "Andhra Pradesh": ["Tirumala Venkateswara Temple", "Araku Valley", "Borra Caves", "Undavalli Caves"],
  "Arunachal Pradesh": ["Tawang Monastery", "Ziro Valley", "Sela Pass", "Namdapha National Park"],
  "Assam": ["Kaziranga National Park", "Kamakhya Temple", "Majuli Island", "Manas National Park"],
  "Bihar": ["Mahabodhi Temple", "Nalanda Ruins", "Vikramshila Gangetic Dolphin Sanctuary", "Rajgir"],
  "Chhattisgarh": ["Chitrakote Waterfalls", "Barnawapara Wildlife Sanctuary", "Bhoramdeo Temple", "Mainpat"],
  "Goa": ["Calangute Beach", "Basilica of Bom Jesus", "Dudhsagar Falls", "Fort Aguada"],
  "Gujarat": ["Statue of Unity", "Gir National Park", "Rann of Kutch", "Somnath Temple"],
  "Haryana": ["Sultanpur Bird Sanctuary", "Brahma Sarovar", "Yadavindra Gardens", "Morni Hills"],
  "Himachal Pradesh": ["Rohtang Pass", "Solang Valley", "Shimla Mall Road", "Spiti Valley"],
  "Jharkhand": ["Baidyanath Jyotirlinga", "Dassam Falls", "Betla National Park", "Jonha Falls"],
  "Karnataka": ["Hampi Ruins", "Mysore Palace", "Coorg Coffee Plantations", "Jog Falls"],
  "Kerala": ["Munnar Tea Gardens", "Alleppey Backwaters", "Fort Kochi", "Varkala Beach"],
  "Madhya Pradesh": ["Khajuraho Temples", "Bandhavgarh National Park", "Sanchi Stupa", "Gwalior Fort"],
  "Maharashtra": ["Gateway of India", "Ajanta & Ellora Caves", "Lonavala", "Shirdi"],
  "Manipur": ["Loktak Lake", "Kangla Fort", "Imphal War Cemetery", "Keibul Lamjao National Park"],
  "Meghalaya": ["Living Root Bridges", "Cherrapunji", "Dawki River", "Mawlynnong Village"],
  "Mizoram": ["Reiek", "Solomon's Temple", "Vantawng Falls", "Dampa Tiger Reserve"],
  "Nagaland": ["Kohima War Cemetery", "Dzukou Valley", "Hornbill Festival Site", "Mokokchung"],
  "Odisha": ["Jagannath Temple Puri", "Konark Sun Temple", "Chilika Lake", "Simlipal National Park"],
  "Punjab": ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Rock Garden Chandigarh"],
  "Rajasthan": ["Amber Fort", "City Palace Udaipur", "Jaisalmer Fort", "Hawa Mahal"],
  "Sikkim": ["Nathula Pass", "Tsomgo Lake", "Rumtek Monastery", "Gurudongmar Lake"],
  "Tamil Nadu": ["Meenakshi Temple", "Marina Beach", "Brihadeeswarar Temple", "Ooty Lake"],
  "Telangana": ["Charminar", "Golconda Fort", "Ramoji Film City", "Hussain Sagar Lake"],
  "Tripura": ["Neermahal Palace", "Unakoti", "Tripura Sundari Temple", "Sepahijala Wildlife Sanctuary"],
  "Uttar Pradesh": ["Taj Mahal", "Varanasi Ghats", "Bara Imambara", "Fatehpur Sikri"],
  "Uttarakhand": ["Jim Corbett National Park", "Nainital Lake", "Valley of Flowers", "Har Ki Pauri"],
  "West Bengal": ["Victoria Memorial", "Sundarbans National Park", "Darjeeling Himalayan Railway", "Howrah Bridge"],
  "Andaman and Nicobar Islands": ["Radhanagar Beach", "Cellular Jail", "Ross Island", "Elephant Beach"],
  "Chandigarh": ["Rock Garden", "Sukhna Lake", "Rose Garden", "Capitol Complex"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Diu Fort", "Nagoa Beach", "Jampore Beach", "Vanganga Lake Garden"],
  "Delhi": ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple"],
  "Jammu and Kashmir": ["Dal Lake", "Gulmarg Gondola", "Vaishno Devi Temple", "Shankaracharya Hill"],
  "Ladakh": ["Pangong Lake", "Nubra Valley", "Thiksey Monastery", "Magnetic Hill"],
  "Lakshadweep": ["Agatti Island", "Minicoy Island", "Bangaram Island", "Kavaratti Island"],
  "Puducherry": ["Promenade Beach", "Auroville", "Sri Aurobindo Ashram", "Paradise Beach"]
};

// --- AI GENERATION LOGIC ---

// 1. Fallback Mock Generator
const generateMockBlueprint = (formData) => {
  const cityInput = formData.destination;
  const duration = parseInt(formData.duration) || 3;
  const matchedStateKey = Object.keys(INDIAN_STATES_DATA).find(
    key => key.toLowerCase() === cityInput.toLowerCase()
  );
  const isIndianState = !!matchedStateKey;
  const city = matchedStateKey || cityInput || "The Destination";
  const spots = isIndianState ? INDIAN_STATES_DATA[matchedStateKey] : ["Central Square", "City Museum", "Local Park", "Scenic Viewpoint"];
  const getCycle = (arr, i) => arr[i % arr.length];

  const generatedItinerary = Array.from({ length: duration }, (_, i) => {
    const dayNum = i + 1;
    const spot = getCycle(spots, i);
    const themes = ["Arrival & Orientation", "History & Heritage", "Nature & Outdoors", "Local Life & Markets", "Relaxation & Leisure"];
    
    return {
      day: dayNum,
      theme: getCycle(themes, i),
      morning: `Visit ${spot}. (Tip: Reach early).`,
      lunch: "Local street food nearby.",
      afternoon: `Explore nearby markets or ${getCycle(spots, i+1)}.`,
      evening: "Dinner at a local favorite spot."
    };
  });

  return {
    summary: `(Offline Mode) A ${duration}-day trip to ${city} for ${formData.groupSize}. Focusing on ${formData.vibes.map(v => v.label.split(' (')[0]).join(', ')}.`,
    budget: {
      currency: isIndianState ? "₹" : "$",
      tiers: [
        { name: "Budget (Paisa Vasool)", accommodation: "Hostels/Homestays", food: 800, transport: 200, activities: 500, buffer: 300, total: 1800 },
        { name: "Moderate (Thoda Luxury)", accommodation: "3-Star Hotels", food: 2000, transport: 800, activities: 1500, buffer: 500, total: 4800 }
      ],
      tips: ["Use public transport.", "Eat where locals eat."]
    },
    itinerary: generatedItinerary,
    safety: { avoid: ["Dark alleys", "Unauthorized guides"], scams: [{name: "Taxi Meter", desc: "Broken meter scam"}], emergency: "112" },
    hacks: { transport: "Use apps like Uber/Ola where available.", food: "Look for places with long queues of locals.", tipping: "10% is standard." },
    packing_list: ["Comfortable walking shoes", "Power bank", "Sunscreen & Hat", "Light jacket (AC/Evening)", "Reusable water bottle"],
    local_phrases: [
      { phrase: "Hello", translation: "Namaste / Hello", pronunciation: "Na-mas-te" },
      { phrase: "Thank you", translation: "Dhanyavad / Thank you", pronunciation: "Dhan-ya-vad" },
      { phrase: "How much?", translation: "Kitna hua?", pronunciation: "Kit-na hua?" },
      { phrase: "Delicious", translation: "Swadisht", pronunciation: "Swa-disht" }
    ]
  };
};

// 2. Real AI Fetcher
const fetchGeminiBlueprint = async (formData) => {
  const duration = parseInt(formData.duration) || 3;
  const vibes = formData.vibes.map(v => v.label).join(", ");
  
  const prompt = `
    Act as Saathi, a local Indian travel expert. Plan a ${duration}-day trip to ${formData.destination} for ${formData.groupSize} people.
    Budget: ${formData.budget} per person.
    Vibes: ${vibes}.
    Constraints: ${formData.constraints || "None"}.

    Generate a detailed JSON response. Do not use markdown. STRICTLY follow this JSON structure. Ensure all property names are double-quoted:
    {
      "summary": "A warm, desi-style executive summary (max 30 words).",
      "budget": {
        "currency": "Currency Symbol (e.g. ₹ or $)",
        "tiers": [
          { "name": "Budget (Paisa Vasool)", "accommodation": "Specific area/type", "food": 800, "transport": 200, "activities": 500, "buffer": 300, "total": 1800 },
          { "name": "Moderate (Thoda Luxury)", "accommodation": "Specific area/type", "food": 2000, "transport": 800, "activities": 1500, "buffer": 500, "total": 4800 }
        ],
        "tips": ["Specific budget tip 1", "Specific budget tip 2"]
      },
      "itinerary": [
        { "day": 1, "theme": "Theme string", "morning": "Specific activity with practical tip", "lunch": "Specific restaurant/dish recommendation", "afternoon": "Activity", "evening": "Dinner/Nightlife spot" }
      ],
      "safety": {
        "avoid": ["Specific unsafe area 1", "Specific area 2"],
        "scams": [{ "name": "Scam Name", "desc": "How to avoid it" }],
        "emergency": "Local Emergency Number"
      },
      "hacks": {
        "transport": "Cheapest way to get around",
        "food": "How to eat cheap but good",
        "tipping": "Local tipping custom"
      },
      "packing_list": ["Item 1 (Specific to weather/activity)", "Item 2", "Item 3", "Item 4", "Item 5"],
      "local_phrases": [
        { "phrase": "Hello", "translation": "Local translation", "pronunciation": "Phonetic" },
        { "phrase": "Thank you", "translation": "Local translation", "pronunciation": "Phonetic" },
        { "phrase": "How much?", "translation": "Local translation", "pronunciation": "Phonetic" },
        { "phrase": "No spicy", "translation": "Local translation", "pronunciation": "Phonetic" }
      ]
    }
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) throw new Error("No AI response text found");

    // Improved cleaning logic for JSON
    textResponse = textResponse.trim();
    // Remove markdown code block wrappers if they exist
    if (textResponse.startsWith('```')) {
      textResponse = textResponse.replace(/^```json\s*|```\s*$/g, '');
    }
    
    // Extract the JSON object if there's extra text around it
    const jsonStart = textResponse.indexOf('{');
    const jsonEnd = textResponse.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      textResponse = textResponse.substring(jsonStart, jsonEnd + 1);
    }

    return JSON.parse(textResponse);

  } catch (error) {
    console.error("AI Failed, using fallback:", error);
    return generateMockBlueprint(formData);
  }
};

// --- SUB-COMPONENTS ---

const HomePage = ({ setStep }) => (
  <div className="animate-fade-in text-center py-12 px-4">
    <div className="mb-6 flex justify-center">
       <div className="bg-orange-100 p-6 rounded-full border-4 border-orange-200 shadow-xl animate-bounce-slow">
        <Globe className="text-orange-600" size={64} />
      </div>
    </div>
    <h1 className="text-5xl font-bold text-gray-900 font-serif mb-4 leading-tight">
      Namaste, I am <span className="text-orange-600">Saathi</span>.
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
      The world's most sophisticated AI Group Travel Concierge. <br/>
      I bring <span className="font-bold text-teal-700">Desi Heart</span> to <span className="font-bold text-teal-700">Global Smarts</span>.
    </p>
    <button 
      onClick={() => setStep('intake')}
      className="bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-xl flex items-center justify-center gap-3 mx-auto"
    >
      Start Planning Now <ArrowRight size={24} />
    </button>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
        <Wallet className="text-orange-500 mb-4" size={32} />
        <h3 className="font-bold text-lg text-gray-800">Paisa Vasool</h3>
        <p className="text-gray-600 text-sm">Real-time cost estimates tailored to your budget.</p>
      </div>
      <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 hover:shadow-md transition-shadow">
        <Users className="text-teal-600 mb-4" size={32} />
        <h3 className="font-bold text-lg text-gray-800">Group Harmony</h3>
        <p className="text-gray-600 text-sm">Itineraries that keep everyone happy.</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
        <ShieldAlert className="text-blue-600 mb-4" size={32} />
        <h3 className="font-bold text-lg text-gray-800">Safe & Smart</h3>
        <p className="text-gray-600 text-sm">Local scam alerts and safety advice.</p>
      </div>
    </div>
  </div>
);

const IntakeForm = ({ formData, setFormData, handleSubmit, handleVibeToggle }) => (
  <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Where to?</label>
        <input 
          required type="text" list="indian-states" value={formData.destination}
          placeholder="e.g. Jaipur, Tokyo, Paris..." 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          onChange={e => setFormData({...formData, destination: e.target.value})}
        />
        <datalist id="indian-states">{Object.keys(INDIAN_STATES_DATA).map(s => <option key={s} value={s}/>)}</datalist>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">When?</label>
          <input 
            required type="text" value={formData.dates} placeholder="e.g. Oct 10" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={e => setFormData({...formData, dates: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Days?</label>
          <input 
            required type="number" min="1" max="30" value={formData.duration} placeholder="3" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={e => setFormData({...formData, duration: e.target.value})}
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Who's going?</label>
        <input 
          required type="text" value={formData.groupSize} placeholder="e.g. 4 friends, Family of 3..." 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          onChange={e => setFormData({...formData, groupSize: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Budget (Per Person)</label>
        <input 
          required type="text" value={formData.budget} placeholder="e.g. ₹20,000 or $500..." 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          onChange={e => setFormData({...formData, budget: e.target.value})}
        />
      </div>
    </div>

    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">Trip Vibe</label>
      <div className="flex flex-wrap gap-3">
        {VIBES.map((vibe) => (
          <button
            key={vibe.id} type="button" onClick={() => handleVibeToggle(vibe)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${formData.vibes.find(v => v.id === vibe.id) ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-gray-600 border-gray-300'}`}
          >
            {vibe.icon}<span className="text-sm">{vibe.label}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">Must-Haves / Constraints</label>
      <textarea 
        value={formData.constraints} placeholder="e.g. Veg food only, No much walking..." 
        className="w-full p-3 border rounded-lg h-24 outline-none focus:ring-2 focus:ring-orange-500"
        onChange={e => setFormData({...formData, constraints: e.target.value})}
      />
    </div>

    <button type="submit" className="w-full bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-900 flex items-center justify-center gap-2 text-lg">
      <Send size={20} /> Chalo! Plan My Trip
    </button>
  </form>
);

// --- NEW COMPONENT: BILL SPLITTER ---
const BillSplitter = ({ currency }) => {
  const [amount, setAmount] = useState('');
  const [people, setPeople] = useState('');
  const result = amount && people ? (amount / people).toFixed(2) : 0;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-4">
      <h4 className="font-bold text-teal-700 flex items-center gap-2 mb-3">
        <Calculator size={18} /> Hisaab (Split Bill)
      </h4>
      <div className="flex gap-2 mb-2">
        <input type="number" placeholder="Total" className="w-1/2 p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-teal-500 outline-none" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="number" placeholder="People" className="w-1/2 p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-teal-500 outline-none" value={people} onChange={e => setPeople(e.target.value)} />
      </div>
      <div className="text-right text-sm font-bold text-gray-700">
        Per Person: <span className="text-teal-600 text-lg">{currency}{result}</span>
      </div>
    </div>
  );
};

const BlueprintDisplay = ({ blueprint, formData, setStep }) => {
  
  // --- SHARE FUNCTIONALITY ---
  const handleShare = async () => {
    const text = `Check out my ${formData.destination} trip plan by Saathi!\n\nSummary: ${blueprint.summary}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert("Trip summary copied to clipboard!");
    } catch (err) {
      // Fallback for iframes/older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert("Trip summary copied to clipboard!");
    }
  };

  // --- DOWNLOAD FUNCTIONALITY ---
  const handleDownload = () => {
    // Create a formatted string of the itinerary
    const element = document.createElement("a");
    const fileContent = `
SAATHI TRAVEL BLUEPRINT: ${formData.destination}
Group: ${formData.groupSize} | Duration: ${formData.duration} Days
Budget: ${blueprint.budget.currency}

SUMMARY
${blueprint.summary}

ITINERARY
${blueprint.itinerary.map(day => `Day ${day.day}: ${day.theme}\n- Morning: ${day.morning}\n- Lunch: ${day.lunch}\n- Afternoon: ${day.afternoon}\n- Evening: ${day.evening}`).join('\n\n')}

ESTIMATED BUDGET
${blueprint.budget.tiers[0].name}: ${blueprint.budget.currency}${blueprint.budget.tiers[0].total}
${blueprint.budget.tiers[1].name}: ${blueprint.budget.currency}${blueprint.budget.tiers[1].total}

PACKING LIST
- ${blueprint.packing_list ? blueprint.packing_list.join('\n- ') : 'N/A'}

Safe Travels! - Saathi AI
    `;

    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Saathi_Trip_${formData.destination}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="animate-slide-up space-y-8 pb-12">
      <div className="bg-teal-700 text-white p-6 -mx-6 -mt-6 md:rounded-t-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10"><Map size={200} /></div>
        <div className="flex justify-between items-start">
          <button onClick={() => setStep('intake')} className="text-teal-100 text-sm hover:text-white underline mb-4 inline-block">&larr; Edit</button>
          <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 bg-white/20 rounded-full hover:bg-white/30 text-white transition-colors" title="Share Summary"><Share2 size={18} /></button>
            <button onClick={handleDownload} className="p-2 bg-white/20 rounded-full hover:bg-white/30 text-white transition-colors" title="Download Text"><Download size={18} /></button>
          </div>
        </div>
        <h2 className="text-3xl font-bold font-serif">Saathi Blueprint: {formData.destination}</h2>
        <p className="opacity-90 mt-2 flex items-center gap-2"><Users size={16} /> {formData.groupSize} &bull; {formData.duration} Days</p>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg shadow-sm">
        <h3 className="text-orange-800 font-bold uppercase tracking-wider text-xs mb-2">The Vibe Check</h3>
        <p className="text-gray-800 text-lg leading-relaxed italic">"{blueprint.summary}"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4"><Calendar className="text-teal-600" /> Itinerary</h3>
            <div className="space-y-4">
              {blueprint.itinerary.map((day) => (
                <div key={day.day} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 px-5 py-3 border-b flex justify-between items-center">
                    <span className="font-bold text-teal-700">Day {day.day}</span>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{day.theme}</span>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex gap-3"><div><Sun size={18} className="text-orange-400" /></div><div><span className="block text-xs font-bold text-gray-400 uppercase">Morning</span><p className="text-gray-700">{day.morning}</p></div></div>
                    <div className="flex gap-3"><div><Coffee size={18} className="text-brown-400" /></div><div><span className="block text-xs font-bold text-gray-400 uppercase">Lunch</span><p className="text-gray-700 italic">{day.lunch}</p></div></div>
                    <div className="flex gap-3"><div><Camera size={18} className="text-blue-400" /></div><div><span className="block text-xs font-bold text-gray-400 uppercase">Afternoon</span><p className="text-gray-700">{day.afternoon}</p></div></div>
                    <div className="flex gap-3"><div><Music size={18} className="text-purple-400" /></div><div><span className="block text-xs font-bold text-gray-400 uppercase">Evening</span><p className="text-gray-700">{day.evening}</p></div></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6"><ShieldAlert className="text-red-600" /> Safe & Smart Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                  <p className="text-sm font-bold text-gray-700 mb-1">🚫 Areas to Avoid:</p>
                  <ul className="list-disc pl-4 text-sm text-gray-600">{blueprint.safety.avoid.map((a, i) => <li key={i}>{a}</li>)}</ul>
                </div>
                <div className="bg-red-50 p-3 rounded text-red-800 text-sm font-mono">🚑 Emergency: {blueprint.safety.emergency}</div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm space-y-3">
                  <div><span className="block text-xs font-bold text-green-600 uppercase">Transport</span><p className="text-sm text-gray-700">{blueprint.hacks.transport}</p></div>
                  <hr />
                  <div><span className="block text-xs font-bold text-green-600 uppercase">Food</span><p className="text-sm text-gray-700">{blueprint.hacks.food}</p></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar with New Tools */}
        <div className="space-y-6">
          <section>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4"><Wallet className="text-green-600" /> Budget</h3>
            {blueprint.budget.tiers.map((tier, idx) => (
              <div key={idx} className={`border rounded-xl p-4 mb-3 ${idx === 0 ? 'bg-white border-green-200 shadow-md' : 'bg-gray-50 opacity-70'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm text-gray-800">{tier.name}</h4>
                  <span className="font-bold text-green-700">{blueprint.budget.currency}{tier.total}</span>
                </div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Stay: {tier.accommodation}</span>
                </div>
              </div>
            ))}
            <BillSplitter currency={blueprint.budget.currency} />
          </section>

          <section className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-800 mb-3"><CheckSquare size={18} /> Jhola (Packing)</h3>
            <ul className="space-y-2">
              {blueprint.packing_list && blueprint.packing_list.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="accent-orange-500 w-4 h-4" /> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
            <h3 className="flex items-center gap-2 text-lg font-bold text-indigo-800 mb-3"><MessageCircle size={18} /> Boli (Lingo)</h3>
            <div className="space-y-3">
              {blueprint.local_phrases && blueprint.local_phrases.map((p, i) => (
                <div key={i} className="bg-white p-2 rounded border border-indigo-100">
                  <p className="font-bold text-sm text-gray-800">{p.phrase}</p>
                  <p className="text-xs text-indigo-600">{p.translation}</p>
                  <p className="text-xs text-gray-400 italic">{p.pronunciation}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="text-center pt-8 border-t"><p className="text-gray-500 italic">Designed by Saathi AI 🧡 Safe Travels!</p></div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function SaathiApp() {
  const [step, setStep] = useState('home'); 
  const [formData, setFormData] = useState({ destination: '', dates: '', duration: '', groupSize: '', budget: '', vibes: [], constraints: '' });
  const [blueprint, setBlueprint] = useState(null);

  const handleVibeToggle = (vibe) => {
    setFormData(prev => {
      const exists = prev.vibes.find(v => v.id === vibe.id);
      if (exists) return { ...prev, vibes: prev.vibes.filter(v => v.id !== vibe.id) };
      if (prev.vibes.length >= 3) return prev;
      return { ...prev, vibes: [...prev.vibes, vibe] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('loading');
    const result = await fetchGeminiBlueprint(formData);
    setBlueprint(result);
    setStep('blueprint');
  };

  return (
    <div className={`min-h-screen ${COLORS.cream} font-sans text-gray-800`}>
      <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-2xl md:my-8 md:min-h-0 md:rounded-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {step === 'home' && <HomePage setStep={setStep} />}
          {step === 'intake' && <IntakeForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleVibeToggle={handleVibeToggle} />}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
              <div className="bg-orange-500 text-white p-6 rounded-full relative z-10"><Coffee size={48} className="animate-bounce" /></div>
              <h2 className="text-2xl font-bold text-gray-700">Consulting the AI Experts...</h2>
              <p className="text-gray-500">Finding the best prices and hidden gems just for you.</p>
            </div>
          )}
          {step === 'blueprint' && blueprint && <BlueprintDisplay blueprint={blueprint} formData={formData} setStep={setStep} />}
        </div>
      </div>
    </div>
  );
}