// Simulated Database for Export Law Check (Based on Nationality)
const exportDatabase = {
    "US": {
        status: "pass",
        badge: "Unrestricted",
        message: "As a US Person, you face minimal ITAR restrictions for domestic roles in the US.",
        zones: "USA, UK, Australia (AUKUS), NATO Allies",
        cagr: "14.5%",
        insight: "Extreme domestic growth. High demand for engineers with unrestricted clearance."
    },
    "CN": {
        status: "fail",
        badge: "Severely Restricted",
        message: "Subject to strict export controls under ITAR and EAR. US-based aerospace roles are generally prohibited without scarce Dept. of State waivers.",
        zones: "China, Restricted access to EU/US",
        cagr: "21.2%",
        insight: "Rapid domestic sector growth driven by state funding, mitigating international restrictions."
    },
    "IN": {
        status: "warn",
        badge: "Conditionally Restricted",
        message: "Non-US person. Will require export control licenses for US jobs. However, strong ties through Quad/Wassenaar allow significant access to EU/UK markets.",
        zones: "India, UK, EU, UAE, Australia",
        cagr: "18.7%",
        insight: "High demand internationally, particularly in the UK and European space sectors where ITAR is not a factor."
    },
    "Other": {
        status: "warn",
        badge: "Evaluation Required",
        message: "Subject to general dual-use restrictions. Opportunities heavily dependent on specific country of origin and current Wassenaar Arrangement standing.",
        zones: "EU (ESA Member States), Canada, Japan",
        cagr: "12.1%",
        insight: "Steady growth across the global 'NewSpace' economy outside of the US defense perimeter."
    }
};

// Research Labs Database (Based on Target Country)
const labsDatabase = {
    "US": [
        { name: "NASA Jet Propulsion Laboratory (JPL)", type: "Space Agency", location: "Pasadena, CA", focus: "Robotic Exploration, Propulsion" },
        { name: "MIT Space Systems Laboratory", type: "Academic Lab", location: "Cambridge, MA", focus: "Astrodynamics, Microgravity" },
        { name: "SpaceX", type: "Commercial Enterprise", location: "Hawthorne, CA", focus: "Launch Vehicles, Spacecraft" },
        { name: "Caltech Space Solar Power Project", type: "Academic Lab", location: "Pasadena, CA", focus: "Space Solar Power, Structures" },
        { name: "Blue Origin", type: "Commercial Enterprise", location: "Kent, WA", focus: "Lunar Landers, Propulsion" }
    ],
    "UK": [
        { name: "Surrey Space Centre (SSTL)", type: "Academic Lab", location: "Surrey, UK", focus: "Small Satellites, Comm Systems" },
        { name: "RAL Space", type: "Research Institute", location: "Didcot, UK", focus: "Instrumentation, Space Test Facility" },
        { name: "Oxford Robotics Institute", type: "Academic Lab", location: "Oxford, UK", focus: "Autonomy, Space Robotics" },
        { name: "Airbus Defence and Space UK", type: "Commercial Enterprise", location: "Stevenage, UK", focus: "Satellites, Rovers" }
    ],
    "IN": [
        { name: "ISRO Space Applications Centre", type: "Space Agency", location: "Ahmedabad, India", focus: "Payloads, Comm Satellites" },
        { name: "IIT Bombay Space Technology Cell", type: "Academic Lab", location: "Mumbai, India", focus: "Student Satellites, Subsystems" },
        { name: "Agnikul Cosmos", type: "Commercial Startup", location: "Chennai, India", focus: "Small Launch Vehicles, 3D Printing" },
        { name: "Skyroot Aerospace", type: "Commercial Startup", location: "Hyderabad, India", focus: "Launch Vehicles, Propulsion" }
    ],
    "CN": [
        { name: "CNSA Deep Space Academic Hub", type: "Space Agency", location: "Beijing, China", focus: "Lunar & Deep Space Exploration" },
        { name: "Tsinghua University Aerospace Lab", type: "Academic Lab", location: "Beijing, China", focus: "Astrodynamics, Satellite Tech" },
        { name: "i-Space (Beijing Interstellar Glory)", type: "Commercial Startup", location: "Beijing, China", focus: "Reusable Launch Vehicles" }
    ],
    "FR": [
        { name: "ISAE-SUPAERO Space Department", type: "Academic Lab", location: "Toulouse, France", focus: "Systems Engineering, Structures" },
        { name: "CNES (French Space Agency)", type: "Space Agency", location: "Paris/Toulouse, France", focus: "Space Missions, Ariane Series" },
        { name: "Thales Alenia Space", type: "Commercial Enterprise", location: "Cannes, France", focus: "Satellite Manufacturing, Payload" }
    ],
    "DE": [
        { name: "DLR (German Aerospace Center)", type: "Space Agency", location: "Cologne/Bremen, Germany", focus: "Robotics, Missions" },
        { name: "TU Munich Space Systems", type: "Academic Lab", location: "Munich, Germany", focus: "CubeSats, Electric Propulsion" },
        { name: "Rocket Factory Augsburg (RFA)", type: "Commercial Startup", location: "Augsburg, Germany", focus: "Micro Launchers" }
    ],
    "JP": [
        { name: "JAXA Institute of Space and Astronautical Science", type: "Space Agency", location: "Sagamihara, Japan", focus: "Asteroid Missions, X-ray Astronomy" },
        { name: "University of Tokyo Space Lab", type: "Academic Lab", location: "Tokyo, Japan", focus: "Micro-satellites, Deep Space" },
        { name: "ispace", type: "Commercial Startup", location: "Tokyo, Japan", focus: "Lunar Exploration, Rovers" }
    ],
    "Other": [
        { name: "European Space Agency (ESA)", type: "Space Agency", location: "Various, EU", focus: "Multinational Space Strategy" },
        { name: "TU Delft Space Institute", type: "Academic Lab", location: "Delft, Netherlands", focus: "Micro-propulsion, Space Instruments" },
        { name: "GomSpace", type: "Commercial Enterprise", location: "Aalborg, Denmark", focus: "Nanosatellites, IoT" },
        { name: "University of Sydney Space Institute", type: "Academic Lab", location: "Sydney, Australia", focus: "Space Engineering, Astrodynamics" }
    ]
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
            
            // 1. Populate Status
            const badge = document.getElementById('status-badge');
            badge.className = `badge ${exportData.status}`;
            badge.textContent = exportData.badge;
            document.getElementById('limitation-text').textContent = exportData.message;
            document.getElementById('approved-zones').textContent = exportData.zones;
            
            // 2. Populate Dashboard Matches (top 3)
            const matchList = document.getElementById('match-list-ul');
            matchList.innerHTML = '';
            matchesData.slice(0, 3).forEach(match => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="match-name">${match.name}</span>
                    <span class="match-type">${match.type}</span>
                    <span class="match-location">📍 ${match.location} | 🔬 Focus: ${match.focus}</span>
                `;
                matchList.appendChild(li);
            });
            
            // 3. Populate Forecast
            document.getElementById('forecast-niche-title').textContent = niche;
            document.getElementById('growth-val').textContent = exportData.cagr;
            document.getElementById('forecast-insights').textContent = exportData.insight;
            
            // 4. Populate Full Lab Matches Tab
            const fullLabMatchesContainer = document.getElementById('full-lab-matches-container');
            fullLabMatchesContainer.innerHTML = '';
            matchesData.forEach(match => {
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

            // Update Tab Info
            document.getElementById('lab-matches-country-title').textContent = targetCountry ? document.getElementById('target-country').options[document.getElementById('target-country').selectedIndex].text : "Global";

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