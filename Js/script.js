/**
 * FONCTIONNALITÉS GLOBALES DU SITE
 * Inclut le chargement des composants (Header, Footer) et la gestion des interactions (Plein écran, Sections déroulantes).
 */

// =================================================================
// 1. GESTION DES COMPOSANTS HTML (Header et Footer)
// =================================================================

// Fonction pour charger un fichier HTML dans un placeholder
function loadHtmlComponent(placeholderId, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de chargement du composant ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        })
        .catch(error => console.error("Erreur de chargement du composant:", error));
}

// Chargement des composants au chargement initial du script
document.addEventListener('DOMContentLoaded', () => {
    // Note : Le script qui charge le HEADER doit être exécuté avant DOMContentLoaded
    // pour garantir que la navigation est en place avant les autres événements.
    // Cependant, pour le Footer, on peut le faire ici.
    loadHtmlComponent("footer-placeholder", "Pages/footer.html");
});

// Exécution immédiate du chargement du Header
loadHtmlComponent("header-placeholder", "Pages/header.html");


// =================================================================
// 2. GESTION DES INTERACTIONS UTILISATEUR
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 2.1. Logique des sections rétractables (utilisée typiquement sur index.html)
    const sections = document.querySelectorAll('section strong'); 
    sections.forEach(section => {
        section.addEventListener('click', () => {
            const contentDiv = section.nextElementSibling;
            if (contentDiv && contentDiv.classList.contains('content')) {
                contentDiv.classList.toggle('active');
            }
        });
    });
    
    // 2.2. Logique pour la fermeture du plein écran au clic sur le fond
    const fullscreenContainer = document.getElementById('fullscreen-container');
    if (fullscreenContainer) {
        fullscreenContainer.addEventListener('click', function(event) {
            if (event.target === this) {
                closeFullscreen();
            }
        });
    }
});

// =================================================================
// 3. FONCTIONS PLEIN ÉCRAN (Maintenues globales pour les appels 'onclick' dans le HTML)
// =================================================================

/**
 * Ouvre l'image en plein écran.
 * @param {HTMLImageElement} img - L'élément image cliqué.
 */
function openFullscreen(img) {
    var fullscreenContainer = document.getElementById('fullscreen-container');
    var fullscreenImage = document.getElementById('fullscreen-image');
    
    if (fullscreenContainer && fullscreenImage) {
        fullscreenImage.src = img.src;  
        fullscreenContainer.style.display = 'flex';
    }
}

/**
 * Ferme l'affichage plein écran.
 */
function closeFullscreen() {
    var fullscreenContainer = document.getElementById('fullscreen-container');
    if (fullscreenContainer) {
        fullscreenContainer.style.display = 'none';
    }
}