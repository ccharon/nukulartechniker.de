// Fetches and displays an article based on the provided article number, updating the URL and handling errors.
async function showArticle(articleNumber) {
    // Basic validation to ensure it's a safe filename
    if (!(articleNumber && Number.isInteger(Number(articleNumber)))) {
        console.error('Invalid article requested');
        document.querySelector("#main").innerHTML = "<h1>Error</h1><p>Invalid article requested.</p>";
        return;
    }

    const articleFile = `article${articleNumber}.html`;

    try {
        const response = await fetch(`articles/${articleFile}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        document.querySelector("#main").innerHTML = doc.body.innerHTML;

        // Update the URL to reflect the loaded article
        history.pushState(null, '', `?article=${articleNumber}`);

    } catch (error) {
        console.error('Failed to load article:', error);
        document.querySelector("#main").innerHTML = "<h1>Error</h1><p>Failed to load the article.</p>";
    }
}

// Checks the URL for an article number parameter and loads the
// corresponding article if present when the DOM content is fully loaded.
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleNumber = urlParams.get('article');

    if (articleNumber) {
        showArticle(articleNumber);
    }
});

// Adds event listeners to toggle the visibility of the aside menu on button click
// and hide the menu when a link inside it is clicked.
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-aside');
    const aside = document.querySelector('aside');
    const links = aside.querySelectorAll('a');

    toggleButton.addEventListener('click', function() {
        aside.classList.toggle('show');
    });

    links.forEach(link => {
        link.addEventListener('click', function() {
            aside.classList.remove('show');
        });
    });
});
