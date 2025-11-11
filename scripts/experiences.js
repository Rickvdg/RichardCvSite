// Fetch experiences from data/experiences.json and render into #experiences

async function loadExperiences() {
    try {
        const res = await fetch('/data/experiences.json');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        renderExperiences(data);
    } catch (err) {
        console.error('Failed to load experiences:', err);
        const container = document.getElementById('experiences');
        container.innerHTML = '<p>[Fout bij het laden van ervaringen]</p>';
    }
}

function renderExperiences(experiences) {
    const container = document.getElementById('experiences');
    if (!container) return;

    if (!experiences || experiences.length === 0) {
        container.innerHTML = '<p>[Geen ervaringen gevonden]</p>';
        return;
    }

    container.innerHTML = experiences.map(exp => `
        <section class="experience-item">
            <h2>${escapeHtml(exp.title)} <span class="company">- ${escapeHtml(exp.company)}</span></h2>
            <p class="date">${escapeHtml(exp.start)} - ${escapeHtml(exp.end)}</p>
            <p class="description">${escapeHtml(exp.description)}</p>
            ${Array.isArray(exp.responsibilities) && exp.responsibilities.length ? `<ul>${exp.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : ''}
        </section>
    `).join('');
}

// simple escape to avoid inserting raw HTML
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>\"]/g, function(tag) {
        const charsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '\"': '&quot;'
        };
        return charsToReplace[tag] || tag;
    });
}

// load on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadExperiences);
} else {
    loadExperiences();
}
