// Simulated Database for the mock application
const database = {
    "US": {
        status: "pass",
        badge: "Unrestricted",
        message: "As a US Person, you face minimal ITAR restrictions for domestic roles in the US.",
        zones: "USA, UK, Australia (AUKUS), NATO Allies",
        matches: [
            { name: "NASA Jet Propulsion Laboratory (JPL)", type: "Space Agency", location: "Pasadena, CA" },
            { name: "SpaceX", type: "Commercial Startup", location: "Hawthorne, CA" },
            { name: "MIT Space Systems Laboratory", type: "Academic Lab", location: "Cambridge, MA" }
        ],
        cagr: "14.5%",
        insight: "Extreme domestic growth. High demand for engineers with unrestricted clearance."
    },
    "CN": {
        status: "fail",
        badge: "Severely Restricted",
        message: "Subject to strict export controls under ITAR and EAR. US-based aerospace roles are generally prohibited without scarce Dept. of State waivers.",
        zones: "China, Restricted access to EU/US",
        matches: [
            { name: "CNSA Deep Space Academic Hub", type: "Space Agency", location: "Beijing, China" },
            { name: "i-Space (Beijing Interstellar Glory)", type: "Commercial Startup", location: "Beijing, China" },
            { name: "Tsinghua University Aerospace Lab", type: "Academic Lab", location: "Beijing, China" }
        ],
        cagr: "21.2%",
        insight: "Rapid domestic sector growth driven by state funding, mitigating international restrictions."
    },
    "IN": {
        status: "warn",
        badge: "Conditionally Restricted",
        message: "Non-US person. Will require export control licenses for US jobs. However, strong ties through Quad/Wassenaar allow significant access to EU/UK markets.",
        zones: "India, UK, EU, UAE, Australia",
        matches: [
            { name: "ISRO Space Applications Centre", type: "Space Agency", location: "Bengaluru, India" },
            { name: "Surrey Space Centre (SSTL)", type: "Academic Lab", location: "Surrey, UK" },
            { name: "Airbus Defence and Space", type: "Commercial Enterprise", location: "Toulouse, France" }
        ],
        cagr: "18.7%",
        insight: "High demand internationally, particularly in the UK and European space sectors where ITAR is not a factor."
    },
    "Other": {
        status: "warn",
        badge: "Evaluation Required",
        message: "Subject to general dual-use restrictions. Opportunities heavily dependent on specific country of origin and current Wassenaar Arrangement standing.",
        zones: "EU (ESA Member States), Canada, Japan",
        matches: [
            { name: "European Space Agency (ESA)", type: "Space Agency", location: "Various, EU" },
            { name: "TU Delft Space Institute", type: "Academic Lab", location: "Delft, Netherlands" },
            { name: "Rocket Factory Augsburg (RFA)", type: "Commercial Startup", location: "Augsburg, Germany" }
        ],
        cagr: "12.1%",
        insight: "Steady growth across the global 'NewSpace' economy outside of the US defense perimeter."
    }
};

// Default fallback
const defaultData = database["Other"];

document.addEventListener('DOMContentLoaded', () => {
    const screeningForm = document.getElementById('screening-form');
    const analyzeBtn = document.getElementById('analyze-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const tabPanes = document.querySelectorAll('.tab-pane');

    screeningForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nationality = document.getElementById('nationality').value;
        const niche = document.getElementById('niche').value;
        
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
            const data = database[nationality] || defaultData;
            
            // 1. Populate Status
            const badge = document.getElementById('status-badge');
            badge.className = `badge ${data.status}`;
            badge.textContent = data.badge;
            document.getElementById('limitation-text').textContent = data.message;
            document.getElementById('approved-zones').textContent = data.zones;
            
            // 2. Populate Matches
            const matchList = document.getElementById('match-list-ul');
            matchList.innerHTML = '';
            data.matches.forEach(match => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="match-name">${match.name}</span>
                    <span class="match-type">${match.type}</span>
                    <span class="match-location">📍 ${match.location}</span>
                `;
                matchList.appendChild(li);
            });
            
            // 3. Populate Forecast
            document.getElementById('forecast-niche-title').textContent = niche;
            document.getElementById('growth-val').textContent = data.cagr;
            document.getElementById('forecast-insights').textContent = data.insight;
            
            // Show sections
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
                    pane.classList.add('active');
                } else {
                    pane.style.display = 'none';
                    pane.classList.remove('active');
                }
            });

            // Special handling for certain tabs if needed
            if (tab === 'lab-matches') {
                const labMatchesContent = document.getElementById('lab-matches-content');
                const dashboardMatches = document.getElementById('lab-matches');
                labMatchesContent.innerHTML = '<h2>Lab Matches</h2>' + dashboardMatches.innerHTML;
            }
        });
    });
});