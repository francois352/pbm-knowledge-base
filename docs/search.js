/**
 * Client-Side Search for PBM Knowledge Base
 * Simple but effective search implementation
 */

// Search index will be populated from content
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
        title: "Le Potentiel Synergique du Neurofeedback et de la PBM",
        url: "clinical/nfb-synergy.html",
        category: "Applications Cliniques",
        excerpt: "Analyse complète de la synergie entre la photobiomodulation Vielight et le neurofeedback pour optimiser le bien-être cérébral.",
        keywords: ["neurofeedback", "NFB", "synergie", "cerveau", "neuroplasticité", "Lisa Lai", "combinaison"],
        readTime: "25 min"
    },
    {
        title: "Vielight Neuro-4 : Guide Complet",
        url: "devices/neuro-4.html",
        category: "Appareils",
        excerpt: "Guide utilisateur complet du Vielight Neuro-4, l'appareil de photobiomodulation transcranienne le plus avancé.",
        keywords: ["Vielight", "Neuro-4", "transcranien", "810nm", "gamma", "appareil", "guide"],
        readTime: "20 min"
    },
    {
        title: "Revue Complète de la Photobiomodulation",
        url: "research/comprehensive-review.html",
        category: "Recherche",
        excerpt: "Revue exhaustive de 19 pages couvrant les mécanismes, applications, technologie Vielight, limites actuelles et directions futures.",
        keywords: ["revue", "recherche", "scientifique", "mécanismes", "applications", "Lisa Lai", "complet"],
        readTime: "30 min"
    },
    {
        title: "Vielight Vagus : Guide d'Utilisation",
        url: "devices/vagus.html",
        category: "Appareils",
        excerpt: "Guide complet du Vielight Vagus pour la stimulation du nerf vague par photobiomodulation.",
        keywords: ["Vagus", "nerf vague", "Vielight", "intranasal", "guide", "stimulation"],
        readTime: "10 min"
    },
    {
        title: "Aspects Légaux et Réglementaires de la PBM",
        url: "research/legal-aspects.html",
        category: "Recherche",
        excerpt: "Cadre légal et réglementaire pour les appareils de photobiomodulation cérébrale en Europe, Luxembourg, France, et Allemagne.",
        keywords: ["légal", "réglementation", "Europe", "Luxembourg", "RGPD", "conformité", "Lisa Lai"],
        readTime: "15 min"
    },
    {
        title: "FAQ : Questions Fréquentes sur la PBM",
        url: "basics/faq.html",
        category: "Fondamentaux",
        excerpt: "Plus de 100 questions-réponses sur la photobiomodulation, la sécurité, l'efficacité, et les applications cliniques.",
        keywords: ["FAQ", "questions", "réponses", "sécurité", "efficacité", "contre-indications"],
        readTime: "30 min"
    },
    {
        title: "PBM pour Alzheimer et Démence",
        url: "clinical/alzheimers.html",
        category: "Applications Cliniques",
        excerpt: "Applications de la photobiomodulation pour la maladie d'Alzheimer et les démences : mécanismes, études cliniques, et protocoles.",
        keywords: ["Alzheimer", "démence", "cognition", "mémoire", "neuroprotection", "bêta-amyloïde"],
        readTime: "20 min"
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
