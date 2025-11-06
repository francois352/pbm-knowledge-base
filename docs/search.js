/**
 * Client-Side Search for PBM Knowledge Base
 * Simple but effective search implementation
 */

// Search index - Updated with actual available articles
const searchIndex = [
    {
        title: "Qu'est-ce que la Photobiomodulation (PBM) ?",
        url: "basics/what-is-pbm.html",
        category: "Fondamentaux",
        excerpt: "La photobiomodulation (PBM) est une thérapie non invasive utilisant la lumière rouge et proche infrarouge pour induire des changements photochimiques dans les cellules.",
        keywords: ["PBM", "photobiomodulation", "lumière", "thérapie", "mécanismes", "ATP", "mitochondrie", "infrarouge"],
        readTime: "15 min"
    },
    {
        title: "Vielight Neuro-4 : Guide Complet",
        url: "devices/neuro-4.html",
        category: "Appareils",
        excerpt: "Guide utilisateur complet du Vielight Neuro-4, l'appareil de photobiomodulation transcranienne le plus avancé. Spécifications techniques, protocoles d'utilisation, positionnement des modules.",
        keywords: ["Vielight", "Neuro-4", "Neuro Duo", "transcranien", "810nm", "gamma", "alpha", "appareil", "guide"],
        readTime: "20 min"
    },
    {
        title: "Vielight Vagus : Stimulation Vagale Photobiomodulée",
        url: "devices/vagus.html",
        category: "Appareils",
        excerpt: "Guide complet du Vielight Vagus pour la stimulation non invasive du nerf vague par photobiomodulation. Positionnement optimal, bénéfices et protocoles d'utilisation.",
        keywords: ["Vagus", "nerf vague", "Vielight", "intranasal", "guide", "stimulation", "810nm"],
        readTime: "15 min"
    },
    {
        title: "Nos Offres : Neuro-4 + Vagus",
        url: "packs.html",
        category: "Équipement",
        excerpt: "Pack Autonomie (€3,700 TTC) et Pack Guidé avec formation personnalisée (€4,000 TTC). Vielight Neuro Duo 4 + Vagus avec expertise QEEG.",
        keywords: ["prix", "offre", "pack", "tarif", "autonomie", "guidé", "formation", "QEEG", "acheter"],
        readTime: "10 min"
    },
    {
        title: "Fondamentaux de la PBM",
        url: "basics/index.html",
        category: "Fondamentaux",
        excerpt: "Comprendre les mécanismes, la science et les bases de la photobiomodulation. Articles sur les processus cellulaires, paramètres optimaux et histoire de la PBM.",
        keywords: ["fondamentaux", "introduction", "science", "mécanismes", "bases"],
        readTime: "5 min"
    },
    {
        title: "Appareils Vielight",
        url: "devices/index.html",
        category: "Appareils",
        excerpt: "Découvrez la gamme complète des appareils de photobiomodulation Vielight. Guides d'utilisation, spécifications techniques et comparatifs.",
        keywords: ["appareils", "dispositifs", "équipement", "Vielight", "gamme"],
        readTime: "5 min"
    },
    {
        title: "Applications Cliniques",
        url: "clinical/index.html",
        category: "Applications Cliniques",
        excerpt: "Découvrez les applications thérapeutiques de la PBM : neurofeedback, protocoles cliniques, et synergies. Basé sur 2,500+ analyses QEEG et 1,500+ sessions.",
        keywords: ["clinique", "thérapie", "neurofeedback", "protocoles", "applications", "QEEG"],
        readTime: "5 min"
    },
    {
        title: "Recherche Scientifique",
        url: "research/index.html",
        category: "Recherche",
        excerpt: "37 études scientifiques, revues complètes, et bibliographie des recherches sur la photobiomodulation. Analyses par Lisa Lai et autres experts.",
        keywords: ["recherche", "études", "science", "bibliographie", "Lisa Lai", "preuves"],
        readTime: "5 min"
    }
];

// Search functionality
function performSearch(query) {
    if (!query || query.length < 2) {
        return [];
    }

    query = query.toLowerCase();
    const results = [];

    searchIndex.forEach(item => {
        let score = 0;

        // Title match (highest priority)
        if (item.title.toLowerCase().includes(query)) {
            score += 10;
        }

        // Keyword match
        item.keywords.forEach(keyword => {
            if (keyword.toLowerCase().includes(query)) {
                score += 5;
            }
        });

        // Excerpt match
        if (item.excerpt.toLowerCase().includes(query)) {
            score += 3;
        }

        // Category match
        if (item.category.toLowerCase().includes(query)) {
            score += 2;
        }

        if (score > 0) {
            results.push({ ...item, score });
        }
    });

    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);

    return results;
}

// Display search results
function displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('results-container');
    const resultCount = document.getElementById('result-count');
    const searchResults = document.getElementById('search-results');

    if (results.length === 0) {
        resultCount.textContent = `Aucun résultat pour "${query}"`;
        resultsContainer.innerHTML = '<p style="text-align: center; color: rgba(0,0,0,0.5); padding: 3rem;">Essayez d\'autres termes de recherche.</p>';
        searchResults.classList.remove('hidden');
        return;
    }

    resultCount.textContent = `${results.length} résultat${results.length > 1 ? 's' : ''} pour "${query}"`;

    resultsContainer.innerHTML = results.map(result => `
        <div class="article-item" onclick="window.location.href='${result.url}'">
            <h3 class="article-title">${highlightText(result.title, query)}</h3>
            <p class="article-meta">${result.category} • ${result.readTime} de lecture</p>
            <p class="article-excerpt">${highlightText(result.excerpt, query)}</p>
            <div class="article-tags">
                ${result.keywords.slice(0, 3).map(kw => `<span class="tag">${kw}</span>`).join('')}
            </div>
        </div>
    `).join('');

    searchResults.classList.remove('hidden');
}

// Highlight search terms in text
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #ffeb3b; padding: 0 2px;">$1</mark>');
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                const results = performSearch(query);
                displaySearchResults(results, query);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const results = performSearch(query);
                    displaySearchResults(results, query);
                }
            }
        });

        // Real-time search (optional - debounced)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = searchInput.value.trim();

            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    const results = performSearch(query);
                    displaySearchResults(results, query);
                }, 300);
            } else {
                document.getElementById('search-results').classList.add('hidden');
            }
        });
    }
});
