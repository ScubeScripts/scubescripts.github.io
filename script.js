// Navigation between pages 
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Mark active nav-item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
}

// Script version display
function showScriptDescription(scriptId, version) {
    // Hide all descriptions for this script
    document.querySelectorAll(`#${scriptId} .script-description`).forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected version
    if (version) {
        document.getElementById(`${scriptId}-${version}`).style.display = 'block';
    }
}

// Initially hide all script descriptions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.script-description').forEach(el => {
        el.style.display = 'none';
    });
});

// Seitenwechsel
function showVersion(scriptId, version) {
    // Deactivate all version options
    document.querySelectorAll(`#${scriptId} .version-option`).forEach(option => {
        option.classList.remove('active');
    });
    
    // Hide all contents
    document.querySelectorAll(`#${scriptId} .version-content`).forEach(content => {
        content.classList.remove('active');
    });
    
    // Activate selected option
    event.currentTarget.classList.add('active');
    
    // Show selected content
    document.getElementById(`${scriptId}-${version}`).classList.add('active');
}

// Advanced search function
function performSearch() {
    const searchTerm = document.querySelector('.search-input').value.trim().toLowerCase();
    
    if (searchTerm === '') {
        showFeedback('Please enter a search term', 'error');
        return;
    }

    // Find all searchable elements
    const searchableElements = document.querySelectorAll('[data-search-terms], .page-content p, .page-content h2, .page-content h3');
    let foundResults = false;

    // Clear previous highlights and reset visibility
    document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));
    document.querySelectorAll('.page-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.version-content').forEach(el => el.classList.remove('active'));

    // Search through all elements
    searchableElements.forEach(element => {
        const elementText = element.textContent.toLowerCase();
        const searchTerms = element.dataset.searchTerms ? element.dataset.searchTerms.toLowerCase() : '';
        
        if (elementText.includes(searchTerm) || searchTerms.includes(searchTerm)) {
            foundResults = true;

            // Show the parent page content
            const pageContent = element.closest('.page-content');
            if (pageContent) {
                pageContent.style.display = 'block';
            }

            // Activate version content if applicable
            if (element.classList.contains('version-content')) {
                element.classList.add('active');
                const versionId = element.id;
                const scriptId = versionId.split('-')[0];
                const versionType = versionId.split('-')[1];
                document.querySelector(`#${scriptId} .version-option[onclick*="${versionType}"]`).classList.add('active');
            }

            // Highlight the match
            element.classList.add('search-highlight');
        }
    });

    if (!foundResults) {
        showFeedback(`No results found for: "${searchTerm}"`, 'error');
        // Show all pages again if nothing was found
        document.querySelectorAll('.page-content').forEach(el => el.style.display = 'block');
    } else {
        showFeedback(`Results found for: "${searchTerm}"`, 'success');
    }
}

function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `search-feedback ${type}`;
    feedback.textContent = message;
    
    const existingFeedback = document.querySelector('.search-feedback');
    if (existingFeedback) existingFeedback.remove();
    
    document.querySelector('.search-section').appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 3000);
}

// Highlight animation
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        animation: highlight 2s ease;
        background-color: rgba(67, 97, 238, 0.2);
        border-radius: 4px;
    }
    @keyframes highlight {
        0% { background-color: rgba(67, 97, 238, 0.5); }
        100% { background-color: rgba(67, 97, 238, 0); }
    }
    .search-feedback {
        position: absolute;
        top: 100%;
        right: 0;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        margin-top: 0.5rem;
        z-index: 100;
    }
    .search-feedback.success {
        background-color: #d4edda;
        color: #155724;
    }
    .search-feedback.error {
        background-color: #f8d7da;
        color: #721c24;
    }
`;
document.head.appendChild(style);

function copyCode(button) {
    const code = button.nextElementSibling.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = "✅ Copied";
      setTimeout(() => button.innerText = "📋 Copy", 1500);
    });
}