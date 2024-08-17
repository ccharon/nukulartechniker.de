async function showArticle(articleFile) {
    // Basic validation to ensure it's a safe filename
    if (!/^[a-zA-Z0-9_-]+\.html$/.test(articleFile)) {
        console.error('Invalid article requested:', articleFile);
        document.querySelector("#main").innerHTML = "<h1>Error</h1><p>Invalid article requested.</p>";
        return;
    }

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
        history.pushState(null, '', `?article=${articleFile}`);

    } catch (error) {
        console.error('Failed to load article:', error);
        document.querySelector("#main").innerHTML = "<h1>Error</h1><p>Failed to load the article.</p>";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleFile = urlParams.get('article');

    if (articleFile) {
        showArticle(articleFile);
    }
});