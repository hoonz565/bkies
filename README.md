# 🚲 BKies - Smart Campus Mobility (HCMUT)

**BKies** is a specialized bike-sharing platform designed to solve the "mobility gap" at **Ho Chi Minh City University of Technology (Bach Khoa)**. This project focuses on a requirement-driven solution using RFID authentication and smart sensing technology.

---

## 🛠 Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS (Mobile-first design)
- **Animations:** Framer Motion
- **Icons:** Lucide React / Emoji
- **Version Control:** Git & GitHub

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Prerequisites
Make sure you have **Node.js** installed on your machine.
- [Download Node.js](https://nodejs.org/) (LTS version recommended)

### 2. Installation
Clone the repository to your local machine:
```bash
git clone [https://github.com/hoonz565/bkies.git](https://github.com/hoonz565/bkies.git)
Move into the project directory:

Bash
cd bkies
Install all dependencies (This will read package.json and install everything needed):

Bash
npm install
3. Run the Project
Start the development server:

Bash
npm run dev
Once the server starts, open your browser and go to http://localhost:5173 to see the result.

📁 Project Structure
Plaintext
bkies/
├── src/
│   ├── assets/             # Images, icons, and static files
│   ├── components/         # Reusable UI components (Hero, Features, Auth...)
│   ├── App.jsx             # Main application logic
│   └── main.jsx            # Entry point
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies and scripts
🤝 How to Contribute
We welcome all contributions! To join the project:

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📝 Project Engineering Specs
Unlock Time: ≤ 3 seconds via RFID Student ID.

Billing: Pay-per-distance (calculated by wheel sensors).

Lightweight: 18kg bike frame for easy maneuverability.