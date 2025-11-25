# Saathi: AI-Powered Group Travel Concierge 🌍✈️
Saathi (meaning "Companion" in Hindi) is a sophisticated, React-based travel planning application designed to create the perfect group travel blueprints. It balances diverse personalities, maximizes budgets with a "Desi" (local/smart) touch, and prioritizes safety without sacrificing authenticity.

# ✨ Key Features
🤖 AI-Generated Blueprints: Uses Google's Gemini AI to craft detailed, day-by-day itineraries based on your group's vibe, budget, and constraints.

💰 Smart Budgeting: Provides a realistic financial breakdown with two tiers:

"Paisa Vasool" (Budget-friendly)

"Thoda Luxury" (Moderate splurge)

⚖️ Group Harmony: Intelligently splits activities to balance the needs of "Relaxation" lovers and "Adventure" seekers.

🛡️ Safety & Scams: A dedicated "Safe & Smart" guide warning about local scams and unsafe areas specific to the destination.

🧳 Travel Tools:

Hisaab (Bill Splitter): Instantly calculate per-person costs.

Jhola (Packing List): Customized checklist based on the trip type.

Boli (Local Lingo): Essential phrases with pronunciation guides.

📡 Offline Mode: A robust fallback system that provides mock data if the AI connection fails or the quota is exceeded.

📤 Share & Download: Export your itinerary as a text file or copy it to your clipboard to share with friends.

🛠️ Tech Stack
Frontend: React.js

Styling: Tailwind CSS

Icons: Lucide React

AI Engine: Google Gemini API (gemini-1.5-flash)

🚀 Getting Started
Prerequisites
Node.js installed on your machine.

A Google Gemini API Key (Get one here).

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/Saathi_.git
cd Saathi_
Install dependencies:

Bash

npm install
npm install lucide-react autoprefixer postcss tailwindcss
Note: If you are setting up a fresh project using Vite:

Bash

npm create vite@latest saathi -- --template react
cd saathi
npm install
npm install lucide-react autoprefixer postcss tailwindcss
Run the application:

Bash

# If using Create React App
npm start

# If using Vite
npm run dev
🔑 Configuration (API Key)
Saathi works best with a valid API Key. You have two ways to configure it:

Option 1: For Local Development (Hardcoded)
Open src/SaathiApp.jsx.

Find the line: const SYSTEM_API_KEY = "";.

Paste your key:

JavaScript

const SYSTEM_API_KEY = "AIzaSy...";
⚠️ Warning: Never commit your API key to a public repository! Ensure your .gitignore is set up correctly.

Option 2: For Live Demos (Settings Menu)
Launch the app in your browser.

Click the Settings (Gear Icon) in the top-right corner of the Home screen.

Paste your API Key into the input box and click "Save".

The app will now use this key for all requests during your session.

📱 Usage Guide
Intake: Click "Start Planning Now" on the landing page.

Details: Enter your destination (e.g., "Jaipur"), travel dates, duration, group size, and budget.

Vibe Check: Select up to 3 vibes (e.g., "Foodie", "History", "Hidden Gems").

Generate: Click "Chalo! Plan My Trip".

Review: Explore your custom Itinerary, Budget Breakdown, and Safety Tips.

Tools: Use the Sidebar to access the Bill Splitter (Hisaab) or Packing List (Jhola).

Share: Click the Share or Download icons at the top to save your plan.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License
Distributed under the MIT License. See LICENSE for more information.

Designed with 🧡 by Saathi AI
