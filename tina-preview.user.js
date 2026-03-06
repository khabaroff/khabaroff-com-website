// ==UserScript==
// @name         Tina CMS Preview Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add preview button to Tina CMS
// @author       You
// @match        http://localhost:4444/admin/index.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function addPreviewButton() {
        // Ищем панель инструментов или место для кнопок
        const selectors = [
            '[data-testid="save-button"]',
            '.cms-toolbar',
            '[class*="toolbar"]',
            '[class*="header"]',
            'nav',
            '.header'
        ];
        
        let toolbar = null;
        for (const selector of selectors) {
            toolbar = document.querySelector(selector);
            if (toolbar) break;
        }
        
        // Если нашли toolbar и кнопки еще нет
        if (toolbar && !document.getElementById('tina-preview-btn')) {
            const previewBtn = document.createElement('button');
            previewBtn.id = 'tina-preview-btn';
            previewBtn.innerHTML = '👁️ Preview';
            previewBtn.style.cssText = `
                background: #3b82f6;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                margin-right: 8px;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.2s;
            `;
            
            previewBtn.addEventListener('mouseenter', () => {
                previewBtn.style.background = '#2563eb';
            });
            
            previewBtn.addEventListener('mouseleave', () => {
                previewBtn.style.background = '#3b82f6';
            });
            
            previewBtn.addEventListener('click', openPreview);
            
            // Добавляем кнопку в начало toolbar
            toolbar.insertBefore(previewBtn, toolbar.firstChild);
            
            console.log('Preview button added to Tina CMS');
        }
    }
    
    function openPreview() {
        // Получаем информацию о текущем документе из URL
        const urlParts = window.location.pathname.split('/');
        const collection = urlParts[3]; // posts
        const filename = urlParts[4]; // post-filename
        
        let targetUrl = 'http://localhost:4444/';
        
        if (collection === 'posts' && filename) {
            // Убираем расширение .mdx
            const slug = filename.replace('.mdx', '');
            targetUrl = `http://localhost:4444/${slug}/`;
            
            // Также открываем кастомное превью
            const previewUrl = `http://localhost:4444/preview.html?slug=${slug}`;
            
            // Открываем оба окна
            window.open(previewUrl, 'tina-preview', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        }
        
        // Всегда открываем основной сайт как запасной вариант
        window.open(targetUrl, 'site-preview', '_blank');
        
        console.log('Preview opened:', targetUrl);
    }
    
    // Ждем загрузки страницы
    function waitForPage() {
        if (document.body) {
            addPreviewButton();
            // Повторяем попытки на случай динамической загрузки
            setInterval(addPreviewButton, 2000);
        } else {
            setTimeout(waitForPage, 500);
        }
    }
    
    waitForPage();
    
    // Следим за изменениями в DOM
    const observer = new MutationObserver(() => {
        addPreviewButton();
    });
    
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });
})();
