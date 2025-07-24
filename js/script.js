document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.top-nav nav');
    const cardGrid = document.querySelector('.card-grid');

    hamburger.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });

    async function loadCourses() {
        try {
            const response = await fetch('courses.json');
            const courses = await response.json();
            displayCourses(courses);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    const searchBox = document.querySelector('.search-box');
    let allCourses = [];

    async function loadCourses() {
        try {
            const response = await fetch('courses.json');
            const courses = await response.json();
            allCourses = courses;
            displayCourses(allCourses);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    function displayCourses(courses) {
        cardGrid.innerHTML = '';
        courses.forEach(category => {
            category.subcategories.forEach(course => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${course.name.zh}</h3>
                    <p>${course.description.zh}</p>
                    <div class="tags">
                        ${(course.tags || []).map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="progress-indicator">
                        <div class="progress-bar" style="width: ${course.progress}%"></div>
                        <span>${course.status}</span>
                    </div>
                `;
                cardGrid.appendChild(card);
            });
        });
    }

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCourses = allCourses.map(category => {
            return {
                ...category,
                subcategories: category.subcategories.filter(course => {
                    return course.name.zh.toLowerCase().includes(searchTerm) ||
                           course.description.zh.toLowerCase().includes(searchTerm);
                })
            };
        }).filter(category => category.subcategories.length > 0);
        displayCourses(filteredCourses);
    });

    loadCourses();
});
