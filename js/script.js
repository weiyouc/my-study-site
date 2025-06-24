document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.top-nav nav a');
    const pages = document.querySelectorAll('.page');
    const mainContainer = document.querySelector('.main-container');
    const categoryLinks = document.querySelectorAll('.sidebar .category-list a');
    const contentGrids = document.querySelectorAll('.content-grid');

    // --- 示例数据 ---
    const courseData = {
        math: [
            { subject: '代数入门', description: '学习基础代数概念，包括方程式和不等式。', tags: ['#代数', '#基础'], progress: 75 },
            { subject: '几何学原理', description: '探索二维和三维空间的几何形状和性质。', tags: ['#几何', '#证明'], progress: 40 }
        ],
        reading: [
            { subject: '批判性阅读', description: '分析性文章的阅读技巧和策略。', tags: ['#阅读理解', '#分析'], progress: 90 }
        ],
        writing: [
            { subject: '议论文写作', description: '构建有说服力的论点和清晰的文章结构。', tags: ['#写作', '#论证'], progress: 55 }
        ],
        biology: [
            { subject: '细胞生物学', description: '探索生命的基本单位——细胞的奥秘。', tags: ['#生物', '#细胞'], progress: 20 }
        ]
    };

    // --- 函数定义 ---

    function renderCards(category) {
        // 清空所有网格
        contentGrids.forEach(grid => grid.innerHTML = '');

        const dataToRender = courseData[category] || [];
        const targetGrid = document.querySelector('#navigation-page .content-grid'); // 仅在导航页渲染

        if (!targetGrid) return;
        
        dataToRender.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="card-content">
                    <h3>${course.subject}</h3>
                    <p>${course.description}</p>
                    <div class="card-tags">
                        ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
                        </div>
                        <span class="progress-percentage">${course.progress}%</span>
                    </div>
                </div>
            `;
            targetGrid.appendChild(card);
        });
    }

    function handlePageChange(pageId) {
        let foundPage = false;
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
                foundPage = true;
            } else {
                page.classList.remove('active');
            }
        });

        // 如果找不到页面，显示主页搜索
        if (!foundPage) {
            document.getElementById('homepage').classList.add('active');
            pageId = 'homepage'; // 更新pageId以便正确控制侧边栏
        }

        // 控制侧边栏的显示/隐藏
        if (['navigation-page', 'courses', 'homework'].includes(pageId)) {
            mainContainer.classList.add('sidebar-active');
            // 如果是导航页，根据当前激活的分类渲染卡片
            if (pageId === 'navigation-page') {
                const activeCategory = document.querySelector('.sidebar .category-list a.active').dataset.category;
                renderCards(activeCategory);
            }
        } else {
            mainContainer.classList.remove('sidebar-active');
        }
    }

    function updateActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    function updateCategoryLink(activeLink) {
        categoryLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // --- 事件监听 ---

    // 初始化页面
    const initialHash = window.location.hash.substring(1) || 'homepage';
    handlePageChange(initialHash);
    updateActiveLink(document.querySelector(`a[href="#${initialHash}"]`));
    
    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // "导航" 链接特殊处理，它实际应该显示 navigation-page
            const pageToShow = (targetId === 'homepage') ? 'navigation-page' : targetId;
            
            handlePageChange(pageToShow);
            updateActiveLink(link);
            
            // 更新URL的hash
            window.location.hash = targetId;
        });
    });

    // 分类点击事件
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            updateCategoryLink(link);
            renderCards(category);
        });
    });
}); 