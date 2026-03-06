// Custom preview button for Tina CMS
(function() {
  'use strict';
  
  // Wait for Tina to load
  function waitForTina() {
    if (typeof window !== 'undefined' && window.tinacms) {
      addPreviewButton();
    } else {
      setTimeout(waitForTina, 1000);
    }
  }
  
  function addPreviewButton() {
    // Look for the save button or toolbar
    const toolbar = document.querySelector('[data-testid="save-button"]')?.parentElement || 
                   document.querySelector('.cms-toolbar') ||
                   document.querySelector('[class*="toolbar"]');
    
    if (toolbar && !document.getElementById('custom-preview-btn')) {
      const previewBtn = document.createElement('button');
      previewBtn.id = 'custom-preview-btn';
      previewBtn.innerHTML = '👁️ Preview';
      previewBtn.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium mr-2';
      previewBtn.style.cssText = 'background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; margin-right: 8px; font-size: 14px; font-weight: 500;';
      
      previewBtn.addEventListener('click', openPreview);
      toolbar.insertBefore(previewBtn, toolbar.firstChild);
    }
  }
  
  function openPreview() {
    // Get current document info from URL or page
    const urlParts = window.location.pathname.split('/');
    const collection = urlParts[3]; // posts
    const filename = urlParts[4]; // post-filename
    
    if (collection === 'posts' && filename) {
      // Remove .mdx extension and open preview
      const slug = filename.replace('.mdx', '');
      window.open(`http://localhost:4444/${slug}/`, '_blank');
    } else {
      // Fallback - open main site
      window.open('http://localhost:4444/', '_blank');
    }
  }
  
  // Start waiting for Tina
  waitForTina();
  
  // Also try on DOM changes
  const observer = new MutationObserver(() => {
    addPreviewButton();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
