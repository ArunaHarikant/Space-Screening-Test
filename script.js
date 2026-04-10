// Simulated Database for Export Law Check (Based on Nationality)
const exportDatabase = {
    "US": {
        status: "pass",
        badge: "Unrestricted",
        regulations: "US Person",
        message: "As a US Person, you face minimal ITAR restrictions for domestic roles in the US. You have a significant advantage for cleared positions.",
        zones: "USA, UK, Australia (AUKUS), NATO Allies, Five Eyes Intelligence Alliance"
    },
    "CN": {
        status: "fail",
        badge: "Severely Restricted",
        regulations: "ITAR, EAR",
        message: "Subject to strict export controls under ITAR and EAR. US-based aerospace roles are generally prohibited without scarce Dept. of State waivers. Opportunities are primarily domestic.",
        zones: "China"
    },
    "IN": {
        status: "warn",
        badge: "Conditionally Restricted",
        regulations: "Wassenaar Arrangement, MTCR",
        message: "Non-US person. Will require export control licenses for most US jobs. However, strong ties through the Quad and Wassenaar Arrangement allow significant access to EU, UK, and Japanese markets.",
        zones: "India, UK, EU, UAE, Australia, Japan"
    },
    "FR": {
        status: "pass",
        badge: "Largely Unrestricted (EU)",
        regulations: "Wassenaar Arrangement, EU Dual-Use",
        message: "As an EU citizen, you have near-unrestricted access to the entire European Space Agency (ESA) and EU commercial space ecosystem. Some restrictions may apply for US-based ITAR-controlled projects.",
        zones: "EU/ESA Member States, Canada, UK"
    },
    "DE": {
        status: "pass",
        badge: "Largely Unrestricted (EU)",
        regulations: "Wassenaar Arrangement, EU Dual-Use",
        message: "As an EU citizen, you have near-unrestricted access to the entire European Space Agency (ESA) and EU commercial space ecosystem. Some restrictions may apply for US-based ITAR-controlled projects.",
        zones: "EU/ESA Member States, Canada, UK"
    },
    "UK": {
        status: "warn",
        badge: "Conditionally Unrestricted",
        regulations: "Wassenaar Arrangement, AUKUS",
        message: "Post-Brexit, UK nationals have a unique position with strong access to both US (via AUKUS) and European markets, though some EU roles may now require specific agreements.",
        zones: "UK, USA, Australia, Canada, select EU projects"
    },
    "Other": {
        status: "warn",
        badge: "Evaluation Required",
        regulations: "Varies by Country",
        message: "Subject to general dual-use restrictions. Opportunities are heavily dependent on your specific country of origin and its standing within international agreements like the Wassenaar Arrangement.",
        zones: "Varies widely"
    }
};

// Research Labs Database (Based on Target Country)
const labsDatabase = {
    "US": [
        { name: "NASA Jet Propulsion Laboratory (JPL)", type: "Space Agency", location: "Pasadena, CA", focus: "Robotic Exploration, Propulsion" },
        { name: "MIT Space Systems Laboratory", type: "Academic Lab", location: "Cambridge, MA", focus: "Astrodynamics, Microgravity" },
        { name: "SpaceX", type: "Commercial Enterprise", location: "Hawthorne, CA", focus: "Launch Vehicles, Spacecraft" },
        { name: "Caltech Space Solar Power Project", type: "Academic Lab", location: "Pasadena, CA", focus: "Space Solar Power, Structures" },
        { name: "Blue Origin", type: "Commercial Enterprise", location: "Kent, WA", focus: "Lunar Landers, Propulsion" },
        { name: "NASA Goddard Space Flight Center", type: "Space Agency", location: "Greenbelt, MD", focus: "Earth Observation, Space Science Instruments" },
        { name: "NASA Ames Research Center", type: "Space Agency", location: "Moffett Field, CA", focus: "Aerospace Systems, Entry Descent & Landing" },
        { name: "Johns Hopkins Applied Physics Laboratory (APL)", type: "Research Institute", location: "Laurel, MD", focus: "Space Missions, Defense & Space Systems" },
        { name: "Stanford Space Rendezvous Laboratory", type: "Academic Lab", location: "Stanford, CA", focus: "Guidance, Navigation & Control" },
        { name: "University of Colorado Boulder (LASP)", type: "Academic Lab", location: "Boulder, CO", focus: "Space Physics, Instrumentation" },
        { name: "Georgia Tech Space Systems Design Laboratory", type: "Academic Lab", location: "Atlanta, GA", focus: "Space Systems Engineering" },
        { name: "Purdue Space Systems Laboratory", type: "Academic Lab", location: "West Lafayette, IN", focus: "Small Satellites, Payloads" }
    ],
    "UK": [
        { name: "Surrey Space Centre (SSTL)", type: "Academic Lab", location: "Surrey, UK", focus: "Small Satellites, Comm Systems" },
        { name: "RAL Space", type: "Research Institute", location: "Didcot, UK", focus: "Instrumentation, Space Test Facility" },
        { name: "Oxford Robotics Institute", type: "Academic Lab", location: "Oxford, UK", focus: "Autonomy, Space Robotics" },
        { name: "Airbus Defence and Space UK", type: "Commercial Enterprise", location: "Stevenage, UK", focus: "Satellites, Rovers" },
        { name: "University of Leicester Space Research Centre", type: "Academic Lab", location: "Leicester, UK", focus: "Space Instrumentation, Remote Sensing" },
        { name: "University of Southampton Astronautics", type: "Academic Lab", location: "Southampton, UK", focus: "Spacecraft Dynamics, GNC" },
        { name: "University of Glasgow Space Technology", type: "Academic Lab", location: "Glasgow, UK", focus: "Small Satellite Platforms" },
        { name: "Imperial College SpaceLab", type: "Academic Lab", location: "London, UK", focus: "Space Systems, Payloads" },
        { name: "UK Astronomy Technology Centre (UKATC)", type: "Research Institute", location: "Edinburgh, UK", focus: "Space Telescopes, Cryogenic Instruments" }
    ],
    "IN": [
        { name: "ISRO Space Applications Centre", type: "Space Agency", location: "Ahmedabad, India", focus: "Payloads, Comm Satellites" },
        { name: "IIT Bombay Space Technology Cell", type: "Academic Lab", location: "Mumbai, India", focus: "Student Satellites, Subsystems" },
        { name: "Agnikul Cosmos", type: "Commercial Startup", location: "Chennai, India", focus: "Small Launch Vehicles, 3D Printing" },
        { name: "Skyroot Aerospace", type: "Commercial Startup", location: "Hyderabad, India", focus: "Launch Vehicles, Propulsion" },
        { name: "ISRO Vikram Sarabhai Space Centre (VSSC)", type: "Space Agency", location: "Thiruvananthapuram, India", focus: "Launch Vehicles, Propulsion" },
        { name: "ISRO U R Rao Satellite Centre (URSC)", type: "Space Agency", location: "Bengaluru, India", focus: "Satellite Systems, Integration" },
        { name: "ISRO Liquid Propulsion Systems Centre (LPSC)", type: "Space Agency", location: "Thiruvananthapuram, India", focus: "Liquid Engines, Propulsion" },
        { name: "IIT Madras Aerospace Laboratory", type: "Academic Lab", location: "Chennai, India", focus: "Aerospace Engineering, Propulsion" },
        { name: "IISc Aerospace Engineering", type: "Academic Lab", location: "Bengaluru, India", focus: "Aerospace Research, Fluid Mechanics" }
    ],
    "CN": [
        { name: "CNSA Deep Space Academic Hub", type: "Space Agency", location: "Beijing, China", focus: "Lunar & Deep Space Exploration" },
        { name: "Tsinghua University Aerospace Lab", type: "Academic Lab", location: "Beijing, China", focus: "Astrodynamics, Satellite Tech" },
        { name: "i-Space (Beijing Interstellar Glory)", type: "Commercial Startup", location: "Beijing, China", focus: "Reusable Launch Vehicles" },
        { name: "China Academy of Space Technology (CAST)", type: "Research Institute", location: "Beijing, China", focus: "Satellite Platforms, Spacecraft" },
        { name: "Beihang University Astronautics", type: "Academic Lab", location: "Beijing, China", focus: "Space Systems, Guidance" }
    ],
    "FR": [
        { name: "ISAE-SUPAERO Space Department", type: "Academic Lab", location: "Toulouse, France", focus: "Systems Engineering, Structures" },
        { name: "CNES (French Space Agency)", type: "Space Agency", location: "Paris/Toulouse, France", focus: "Space Missions, Ariane Series" },
        { name: "Thales Alenia Space", type: "Commercial Enterprise", location: "Cannes, France", focus: "Satellite Manufacturing, Payload" },
        { name: "ONERA (The French Aerospace Lab)", type: "Research Institute", location: "Paris/Toulouse, France", focus: "Aerodynamics, Space Systems" },
        { name: "ArianeGroup", type: "Commercial Enterprise", location: "Les Mureaux/Vernon, France", focus: "Launchers, Propulsion" },
        { name: "Airbus Defence and Space (France)", type: "Commercial Enterprise", location: "Toulouse, France", focus: "Satellites, Space Systems" },
        { name: "International Space University (ISU)", type: "Academic Institution", location: "Strasbourg, France", focus: "Space Studies, Policy, Management" },
        { name: "Observatoire de Paris (Space Science)", type: "Research Institute", location: "Paris, France", focus: "Astrophysics, Space Instrumentation" },
        { name: "Laboratoire d'Astrophysique de Marseille (LAM)", type: "Research Institute", location: "Marseille, France", focus: "Astronomy, Space Optics" }
    ],
    "DE": [
        { name: "DLR (German Aerospace Center)", type: "Space Agency", location: "Cologne/Bremen, Germany", focus: "Robotics, Missions" },
        { name: "TU Munich Space Systems", type: "Academic Lab", location: "Munich, Germany", focus: "CubeSats, Electric Propulsion" },
        { name: "Rocket Factory Augsburg (RFA)", type: "Commercial Startup", location: "Augsburg, Germany", focus: "Micro Launchers" },
        { name: "OHB System", type: "Commercial Enterprise", location: "Bremen, Germany", focus: "Satellites, Exploration" },
        { name: "Airbus Defence and Space (Germany)", type: "Commercial Enterprise", location: "Bremen, Germany", focus: "Spacecraft, Human Spaceflight" },
        { name: "University of Stuttgart Institute of Space Systems", type: "Academic Lab", location: "Stuttgart, Germany", focus: "Space Systems, Propulsion" }
    ],
    "JP": [
        { name: "JAXA Institute of Space and Astronautical Science", type: "Space Agency", location: "Sagamihara, Japan", focus: "Asteroid Missions, X-ray Astronomy" },
        { name: "University of Tokyo Space Lab", type: "Academic Lab", location: "Tokyo, Japan", focus: "Micro-satellites, Deep Space" },
        { name: "ispace", type: "Commercial Startup", location: "Tokyo, Japan", focus: "Lunar Exploration, Rovers" },
        { name: "Tokyo Institute of Technology Space Systems", type: "Academic Lab", location: "Tokyo, Japan", focus: "Spacecraft Systems, GNC" },
        { name: "Tohoku University Space Science", type: "Academic Lab", location: "Sendai, Japan", focus: "Space Plasma, Spacecraft Engineering" }
    ],
    "Other": [
        { name: "European Space Agency (ESA)", type: "Space Agency", location: "Various, EU", focus: "Multinational Space Strategy" },
        { name: "TU Delft Space Institute", type: "Academic Lab", location: "Delft, Netherlands", focus: "Micro-propulsion, Space Instruments" },
        { name: "GomSpace", type: "Commercial Enterprise", location: "Aalborg, Denmark", focus: "Nanosatellites, IoT" },
        { name: "University of Sydney Space Institute", type: "Academic Lab", location: "Sydney, Australia", focus: "Space Engineering, Astrodynamics" },
        { name: "University of Toronto Space Flight Laboratory", type: "Academic Lab", location: "Toronto, Canada", focus: "Small Satellites, Space Robotics" },
        { name: "JPL-style University CubeSat Programs", type: "Academic Lab", location: "Global", focus: "CubeSats, Payloads" }
    ]
};

// France-only: curated internship targets for international space students
const franceInternshipOpportunities = [
    {
        name: "CNES (French Space Agency)",
        type: "Space Agency",
        location: "Paris / Toulouse, France",
        focus: "Space missions, flight dynamics, Earth observation, systems engineering",
        signals: ["Structured internship intakes", "Multiple mission directorates", "International collaborations"]
    },
    {
        name: "ONERA (The French Aerospace Lab)",
        type: "Research Institute",
        location: "Paris / Toulouse, France",
        focus: "Aerodynamics, space systems, guidance & control, simulation",
        signals: ["Large research teams", "Project-based internships", "Academic + industry links"]
    },
    {
        name: "ISAE-SUPAERO (Labs & Chair Programs)",
        type: "Academic Lab",
        location: "Toulouse, France",
        focus: "GNC, propulsion, structures, space systems engineering",
        signals: ["Lab internships", "Strong industry network", "Research-heavy projects"]
    },
    {
        name: "Airbus Defence and Space (France)",
        type: "Commercial Enterprise",
        location: "Toulouse, France",
        focus: "Satellites, mission engineering, AIT/AIV, avionics",
        signals: ["Large internship pipeline", "Many teams/roles", "Recurring student programs"]
    },
    {
        name: "Thales Alenia Space (France)",
        type: "Commercial Enterprise",
        location: "Cannes / Toulouse, France",
        focus: "Satellite payloads, telecom, Earth observation, systems",
        signals: ["Large project portfolio", "Multiple sites", "Regular internships"]
    },
    {
        name: "ArianeGroup",
        type: "Commercial Enterprise",
        location: "Les Mureaux / Vernon, France",
        focus: "Launchers, propulsion, cryogenics, test engineering",
        signals: ["Big engineering org", "Hands-on test roles", "Program continuity"]
    },
    {
        name: "Arianespace",
        type: "Commercial Enterprise",
        location: "Évry-Courcouronnes / Paris, France",
        focus: "Launch services, mission integration, operations",
        signals: ["Operations-focused internships", "Multi-mission exposure", "Cross-functional teams"]
    },
    {
        name: "Safran (Space & Propulsion Ecosystem)",
        type: "Commercial Enterprise",
        location: "Île-de-France, France",
        focus: "Propulsion, sensors, avionics, industrialization",
        signals: ["Large internship intake", "Many engineering domains", "Strong mentorship"]
    },
    {
        name: "Sodern",
        type: "Commercial Enterprise",
        location: "Limeil-Brévannes, France",
        focus: "Star trackers, space optics, attitude sensors",
        signals: ["Specialized teams", "Hardware + software roles", "Spaceflight heritage"]
    },
    {
        name: "Eutelsat",
        type: "Commercial Enterprise",
        location: "Paris, France",
        focus: "Satellite communications, operations, network engineering",
        signals: ["Ops + data roles", "Large org", "International environment"]
    },
    {
        name: "CLS (Collecte Localisation Satellites)",
        type: "Commercial Enterprise",
        location: "Toulouse, France",
        focus: "Earth observation, downstream analytics, maritime/land monitoring",
        signals: ["Data-heavy internships", "Applied EO projects", "Multiple product teams"]
    },
    {
        name: "LAAS-CNRS",
        type: "Research Institute",
        location: "Toulouse, France",
        focus: "Robotics, autonomy, embedded systems, multi-agent systems",
        signals: ["Research internships", "Strong publications", "Great for AI/robotics"]
    },
    {
        name: "LATMOS (CNRS / UVSQ / Sorbonne University)",
        type: "Research Institute",
        location: "Paris-Saclay, France",
        focus: "Atmospheres, planetary science, space instrumentation",
        signals: ["Space science internships", "Instrument/data roles", "Academic supervision"]
    },
    {
        name: "Observatoire de Paris",
        type: "Research Institute",
        location: "Paris, France",
        focus: "Astrophysics, space instrumentation, data analysis",
        signals: ["Research internships", "Science/data focus", "International collaborations"]
    },
    {
        name: "Exotrail",
        type: "Commercial Startup",
        location: "Paris, France",
        focus: "Electric propulsion, in-space mobility, mission analysis",
        signals: ["Niche-aligned roles", "Fast iteration", "Good for propulsion profiles"]
    },
    {
        name: "Unseenlabs",
        type: "Commercial Startup",
        location: "Rennes, France",
        focus: "RF remote sensing, maritime tracking, payload/data",
        signals: ["Applied space data", "Engineering + analysis", "High impact projects"]
    },
    {
        name: "Hemeria",
        type: "Commercial Enterprise",
        location: "Toulouse, France",
        focus: "Small satellites, payloads, AIT/AIV, mission ops",
        signals: ["Small-sat exposure", "Hands-on builds", "Cross-disciplinary"]
    },
    {
        name: "The Exploration Company",
        type: "Commercial Startup",
        location: "Bordeaux, France",
        focus: "Space transportation, cargo spacecraft, systems engineering",
        signals: ["Systems roles", "Startup pace", "Broad responsibility"]
    }
];

function rankLabsByNiche(labs, nicheText) {
    const nicheLower = (nicheText || '').toLowerCase().trim();
    if (!nicheLower) return labs;

    const tokenize = (value) => (value || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

    const nicheTokens = new Set(tokenize(nicheLower));

    const scoreLab = (lab) => {
        const focusTokens = tokenize(lab.focus);
        const nameTokens = tokenize(lab.name);
        let score = 0;

        focusTokens.forEach(t => { if (nicheTokens.has(t)) score += 3; });
        nameTokens.forEach(t => { if (nicheTokens.has(t)) score += 1; });

        // Bonus for common niche synonyms
        if (nicheLower.includes('electric') && (lab.focus || '').toLowerCase().includes('propulsion')) score += 2;
        if (nicheLower.includes('gnc') && (lab.focus || '').toLowerCase().includes('guidance')) score += 2;
        if (nicheLower.includes('ai') && (lab.focus || '').toLowerCase().includes('autonomy')) score += 2;

        return score;
    };

    return [...labs].
        map((lab, idx) => ({ lab, idx, score: scoreLab(lab) }))
        .sort((a, b) => (b.score - a.score) || (a.idx - b.idx))
        .map(x => x.lab);
}

function rankFranceOpportunitiesByProfile(opportunities, nicheText, degree) {
    const nicheLower = (nicheText || '').toLowerCase().trim();
    const degreeLower = (degree || '').toLowerCase().trim();

    const tokenize = (value) => (value || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

    const nicheTokens = new Set(tokenize(nicheLower));

    const typeBoost = (typeValue) => {
        const t = (typeValue || '').toLowerCase();
        if (degreeLower === 'phd' || degreeLower === 'postdoc') {
            if (t.includes('academic') || t.includes('research') || t.includes('institute')) return 3;
            return 1;
        }
        if (degreeLower === 'msc') {
            if (t.includes('commercial')) return 2;
            return 2;
        }
        if (degreeLower === 'bsc') {
            if (t.includes('commercial')) return 3;
            return 1;
        }
        return 1;
    };

    const scoreOpportunity = (opportunity) => {
        if (!nicheLower) {
            return (opportunity.signals || []).length + typeBoost(opportunity.type);
        }

        const focusTokens = tokenize(opportunity.focus);
        const nameTokens = tokenize(opportunity.name);
        let score = 0;

        focusTokens.forEach(t => { if (nicheTokens.has(t)) score += 3; });
        nameTokens.forEach(t => { if (nicheTokens.has(t)) score += 1; });

        // Bonus for common niche synonyms
        const focusLower = (opportunity.focus || '').toLowerCase();
        if (nicheLower.includes('electric') && focusLower.includes('propulsion')) score += 2;
        if (nicheLower.includes('propulsion') && (focusLower.includes('engine') || focusLower.includes('cryogenic'))) score += 1;
        if (nicheLower.includes('gnc') && (focusLower.includes('guidance') || focusLower.includes('control'))) score += 2;
        if ((nicheLower.includes('ai') || nicheLower.includes('ml')) && (focusLower.includes('autonomy') || focusLower.includes('robotics'))) score += 2;
        if (nicheLower.includes('remote') && (focusLower.includes('earth observation') || focusLower.includes('remote sensing'))) score += 2;
        if (nicheLower.includes('payload') && focusLower.includes('payload')) score += 2;

        score += typeBoost(opportunity.type);
        score += Math.min((opportunity.signals || []).length, 3);

        return score;
    };

    return [...opportunities]
        .map((opportunity, idx) => ({ opportunity, idx, score: scoreOpportunity(opportunity) }))
        .sort((a, b) => (b.score - a.score) || (a.idx - b.idx))
        .map(x => x.opportunity);
}

// Market Forecast Database (Based on Niche)
const marketDatabase = {
    "propulsion": {
        cagr: "22.1%",
        insight: "High demand driven by the boom in small satellite launches and deep space missions requiring efficient, next-gen engines.",
        drivers: ["LEO Constellation Deployment", "Reusable Rocket Development", "Interplanetary Missions"],
        demand: "Extremely High"
    },
    "astrodynamics": {
        cagr: "18.5%",
        insight: "Critical skill for mission design, satellite navigation, and space traffic management. Demand is steadily increasing with constellation density.",
        drivers: ["Space Debris Mitigation", "Satellite Constellation Management", "Cislunar Trajectory Design"],
        demand: "High"
    },
    "robotics": {
        cagr: "25.8%",
        insight: "Fueled by on-orbit servicing, lunar construction, and autonomous exploration. One of the fastest-growing sectors.",
        drivers: ["On-Orbit Assembly & Manufacturing", "Lunar & Mars Rover Missions", "Autonomous Spacecraft Operations"],
        demand: "Extremely High"
    },
    "isru": {
        cagr: "35.2%",
        insight: "Projected to be the backbone of the long-term lunar and Martian economy. Currently niche, but has the highest growth potential.",
        drivers: ["Lunar Ice Mining", "Mars Propellant Production", "Sustainable Off-World Habitats"],
        demand: "High (Future)"
    },
    "materials": {
        cagr: "15.3%",
        insight: "Constant demand for lighter, stronger, and more radiation-resistant materials for spacecraft and habitats.",
        drivers: ["Lightweight Composites", "3D Printing / Additive Manufacturing", "Radiation Shielding"],
        demand: "Medium-High"
    },
    "default": {
        cagr: "12.1%",
        insight: "The overall NewSpace economy is growing steadily, with opportunities across a wide range of subsystems and support roles.",
        drivers: ["General Commercialization of Space", "Downstream Data Applications", "Launch Cost Reduction"],
        demand: "Medium"
    }
};

// Default fallback
const defaultExportData = exportDatabase["Other"];
const defaultLabs = labsDatabase["Other"];

document.addEventListener('DOMContentLoaded', () => {
    const screeningForm = document.getElementById('screening-form');
    const analyzeBtn = document.getElementById('analyze-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const tabPanes = document.querySelectorAll('.tab-pane');

    screeningForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nationality = document.getElementById('nationality').value;
        const targetCountry = document.getElementById('target-country').value;
        const niche = document.getElementById('niche').value;
        const degree = document.getElementById('education').value;
        
        // Simulate loading state
        analyzeBtn.textContent = 'Running Export Compliance Check...';
        analyzeBtn.disabled = true;
        
        // Hide sections during "analysis"
        document.getElementById('legal-status').style.display = 'none';
        document.getElementById('lab-matches').style.display = 'none';
        document.getElementById('market-forecast').style.display = 'none';
        
        setTimeout(() => {
            // Restore button
            analyzeBtn.textContent = 'Run Legal Cross-Reference Scan';
            analyzeBtn.disabled = false;
            
            // Fetch simulated data
            const exportData = exportDatabase[nationality] || defaultExportData;
            const matchesData = labsDatabase[targetCountry] || defaultLabs;
            const rankedMatches = rankLabsByNiche(matchesData, niche);

            const rankedFranceOpportunities = rankFranceOpportunitiesByProfile(franceInternshipOpportunities, niche, degree);
            
            // Find the most relevant market forecast based on niche input
            const nicheLower = niche.toLowerCase();
            let marketData = marketDatabase.default;
            for (const key in marketDatabase) {
                if (nicheLower.includes(key)) {
                    marketData = marketDatabase[key];
                    break;
                }
            }
            
            // 1. Populate Status
            const badge = document.getElementById('status-badge');
            badge.className = `badge ${exportData.status}`;
            badge.textContent = exportData.badge;
            document.getElementById('limitation-text').textContent = exportData.message;
            document.getElementById('approved-zones').textContent = exportData.zones;
            
            // 2. Populate Dashboard Matches (top 3)
            const matchList = document.getElementById('match-list-ul');
            matchList.innerHTML = '';
            rankedMatches.slice(0, 3).forEach(match => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="match-name">${match.name}</span>
                    <span class="match-type">${match.type}</span>
                    <span class="match-location">📍 ${match.location} | 🔬 Focus: ${match.focus}</span>
                `;
                matchList.appendChild(li);
            });
            
            // 3. Populate Dashboard Forecast
            document.getElementById('forecast-niche-title').textContent = niche;
            document.getElementById('growth-val').textContent = marketData.cagr;
            document.getElementById('forecast-insights').textContent = marketData.insight;
            
            // 4. Populate Full Lab Matches Tab
            const fullLabMatchesContainer = document.getElementById('full-lab-matches-container');
            fullLabMatchesContainer.innerHTML = '';
            rankedMatches.forEach(match => {
                const div = document.createElement('div');
                div.className = 'lab-card';
                div.innerHTML = `
                    <h3 class="match-name">${match.name}</h3>
                    <p class="match-type">${match.type}</p>
                    <p class="match-location"><strong>Location:</strong> 📍 ${match.location}</p>
                    <p class="match-focus"><strong>Core Focus:</strong> 🔬 ${match.focus}</p>
                    <button class="btn-primary btn-small">View Opportunities</button>
                `;
                fullLabMatchesContainer.appendChild(div);
            });

            // 5. Populate Full Market Forecast Tab
            document.getElementById('full-forecast-niche-title').textContent = niche;
            document.getElementById('full-forecast-cagr').textContent = marketData.cagr;
            document.getElementById('full-forecast-demand').textContent = marketData.demand;
            document.getElementById('full-forecast-insight-text').textContent = marketData.insight;
            const driversList = document.getElementById('full-forecast-drivers-list');
            driversList.innerHTML = '';
            marketData.drivers.forEach(driver => {
                const li = document.createElement('li');
                li.textContent = driver;
                driversList.appendChild(li);
            });

            // 6. Populate Full Export Law Tab
            const nationalitySelect = document.getElementById('nationality');
            const nationalityTitleEl = document.getElementById('export-law-nationality-title');
            if (nationalityTitleEl && nationalitySelect && nationalitySelect.selectedIndex >= 0) {
                nationalityTitleEl.textContent = nationalitySelect.options[nationalitySelect.selectedIndex].text;
            }

            const fullStatusBadgeEl = document.getElementById('full-export-status-badge');
            if (fullStatusBadgeEl) {
                fullStatusBadgeEl.textContent = exportData.badge;
                fullStatusBadgeEl.className = `badge ${exportData.status}`;
            }

            const fullRegulationsEl = document.getElementById('full-export-regulations');
            if (fullRegulationsEl) {
                fullRegulationsEl.textContent = exportData.regulations || '—';
            }

            const fullZonesEl = document.getElementById('full-export-zones');
            if (fullZonesEl) {
                fullZonesEl.textContent = exportData.zones;
            }

            const fullSummaryEl = document.getElementById('full-export-summary');
            if (fullSummaryEl) {
                fullSummaryEl.textContent = exportData.message;
            }

            // Update Tab Info
            document.getElementById('lab-matches-country-title').textContent = targetCountry ? document.getElementById('target-country').options[document.getElementById('target-country').selectedIndex].text : "Global";

            // 7. Populate More Opportunities Tab (France-only internships)
            const moreOppNicheTitleEl = document.getElementById('more-opportunities-niche-title');
            if (moreOppNicheTitleEl) {
                moreOppNicheTitleEl.textContent = niche || '—';
            }

            const moreOppContainer = document.getElementById('more-opportunities-container');
            if (moreOppContainer) {
                moreOppContainer.innerHTML = '';
                rankedFranceOpportunities.forEach(opportunity => {
                    const div = document.createElement('div');
                    div.className = 'lab-card';

                    const signalsHtml = (opportunity.signals || [])
                        .slice(0, 3)
                        .map(s => `<li>${s}</li>`)
                        .join('');

                    div.innerHTML = `
                        <h3 class="match-name">${opportunity.name}</h3>
                        <p class="match-type">${opportunity.type}</p>
                        <p class="match-location"><strong>Location:</strong> 📍 ${opportunity.location}</p>
                        <p class="match-focus"><strong>Focus:</strong> 🔬 ${opportunity.focus}</p>
                        <div class="opportunity-signals">
                            <p style="margin: 10px 0 6px 0;"><strong>Higher-chance signals</strong></p>
                            <ul style="margin: 0; padding-left: 18px;">
                                ${signalsHtml || '<li>Run a targeted application for best results.</li>'}
                            </ul>
                        </div>
                        <button class="btn-primary btn-small">Application Checklist</button>
                    `;
                    moreOppContainer.appendChild(div);
                });
            }

            // Show sections in Dashboard
            document.getElementById('legal-status').style.display = 'block';
            document.getElementById('lab-matches').style.display = 'block';
            document.getElementById('market-forecast').style.display = 'block';
            
        }, 1500); // 1.5s simulated delay
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.getAttribute('data-tab');

            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');

            tabPanes.forEach(pane => {
                if (pane.id === tab) {
                    pane.style.display = 'block';
                    // Force a reflow to ensure transitions can fire
                    void pane.offsetWidth;
                    pane.classList.add('active');
                } else {
                    pane.style.display = 'none';
                    pane.classList.remove('active');
                }
            });
        });
    });
});