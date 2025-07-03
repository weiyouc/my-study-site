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

    // --- SAT主课程子分类数据 ---
    // const subCategoryData = { ... } // 删除原有对象

    // 当前语言，默认中文
    let currentLang = 'zh';

    // 多语言按钮文字
    const btnTextMap = {
        zh: '查看详情',
        en: 'View Details',
        es: 'Ver detalles'
    };

    // 动态加载课程数据（包含科目和子分类）
    async function loadCourses() {
        if (window.coursesData) return window.coursesData;
        const res = await fetch('courses.json');
        const data = await res.json();
        window.coursesData = data;
        return data;
    }

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

    // 动态渲染侧边栏科目列表并绑定事件（多语言）
    async function renderSidebarSubjects() {
        const courses = await loadCourses();
        const ul = document.querySelector('.sidebar .category-list');
        ul.innerHTML = '';
        courses.forEach((course, idx) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.dataset.category = course.key;
            a.textContent = course.label[currentLang] || course.label['zh'];
            if (idx === 0) a.classList.add('active');
            li.appendChild(a);
            ul.appendChild(li);
        });
        // 绑定点击事件
        ul.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                ul.querySelectorAll('a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // 切换到课程页面
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById('courses').classList.add('active');
                mainContainer.classList.add('sidebar-active');
                // 渲染子分类卡片
                await renderSubCategoryCards(link.dataset.category);
                // 更新URL hash
                window.location.hash = 'courses';
            });
        });
    }

    // 渲染子分类卡片到课程页面（多语言）
    async function renderSubCategoryCards(categoryKey) {
        const courses = await loadCourses();
        const course = courses.find(c => c.key === categoryKey);
        const coursesSection = document.querySelector('#courses .content-grid');
        if (!coursesSection) return;
        coursesSection.innerHTML = '';
        (course?.subcategories || []).forEach(sub => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="card-content">
                    <h3>${sub.name[currentLang] || sub.name['zh']}</h3>
                    <p>${sub.description[currentLang] || sub.description['zh']}</p>
                    <button onclick="alert('敬请期待！')">${btnTextMap[currentLang] || btnTextMap['zh']}</button>
                </div>
            `;
            coursesSection.appendChild(card);
        });
    }

    // 语言切换按钮事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            await renderSidebarSubjects();
            // 重新渲染当前激活科目的子分类
            const active = document.querySelector('.sidebar .category-list a.active');
            if (active) await renderSubCategoryCards(active.dataset.category);
        });
    });

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

    // 页面初始化时渲染侧边栏科目并默认显示第一个科目的子分类
    (async () => {
        await renderSidebarSubjects();
        const courses = await loadCourses();
        let defaultCategory = courses[0]?.key || 'math';
        if (window.location.hash.substring(1) === 'courses') {
            await renderSubCategoryCards(defaultCategory);
        }
    })();

    // --- 汉堡包菜单逻辑 ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !expanded);
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        // 点击菜单项后自动收起菜单（仅移动端）
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    hamburgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}); 