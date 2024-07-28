document.addEventListener('DOMContentLoaded', function() {
    let allHabits = [];
    let allCategories = [];

    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher && !themeSwitcher.dataset.listenerAdded) {
        themeSwitcher.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            console.log('Theme toggled.');
        });
        themeSwitcher.dataset.listenerAdded = true;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            console.log('Dark mode applied on load.');
        }
    }

    const categorySelector = document.getElementById('categorySelector');
    const chartSelector = document.getElementById('chartSelector');
    const calendarHeatmapContainer = document.getElementById('calendarHeatmap');
    const hexbinChartContainer = document.getElementById('hexbinChart');
    const treemapChartContainer = document.getElementById('treemapChart');

    if (categorySelector) {
        categorySelector.addEventListener('change', function() {
            const categoryId = categorySelector.value;
            console.log('Category selected:', categoryId);
            updateHabitList(categoryId);
            fetchHabitData(categoryId);
        });
        fetchAllHabitsAndCategories();
    }

    if (chartSelector) {
        chartSelector.addEventListener('change', function() {
            const selectedChart = chartSelector.value;
            console.log('Chart selected:', selectedChart);
            toggleChartVisibility(selectedChart);
        });
    }

    function fetchAllHabitsAndCategories() {
        Promise.all([fetch('/habits/data'), fetch('/categories/api')])
            .then(([habitsResponse, categoriesResponse]) => {
                if (!habitsResponse.ok || !categoriesResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                return Promise.all([habitsResponse.json(), categoriesResponse.json()]);
            })
            .then(([habitsData, categoriesData]) => {
                allHabits = habitsData;
                allCategories = categoriesData;
                console.log('Habits:', allHabits);
                console.log('Categories:', allCategories);
                updateHabitList('all');
                fetchHabitData('all');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function updateHabitList(categoryId) {
        const habitsList = document.getElementById('habitsList');
        habitsList.innerHTML = '';

        const filteredHabits = categoryId === 'all' ? allHabits : allHabits.filter(habit => habit.category_id == categoryId);
        const category = allCategories.find(cat => cat.id == categoryId);

        console.log('Filtered Habits:', filteredHabits);
        console.log('Selected Category:', category);

        const createAccordionItem = (habits, category) => {
            if (!category) {
                console.error('Category not found for habits:', habits);
                return '';
            }
            return `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading-${category.id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${category.id}" aria-expanded="false" aria-controls="collapse-${category.id}">
                            ${category.name}
                        </button>
                    </h2>
                    <div id="collapse-${category.id}" class="accordion-collapse collapse" aria-labelledby="heading-${category.id}" data-bs-parent="#habitsAccordion">
                        <div class="accordion-body">
                            <div class="list-group mb-4">
                                ${habits.map(habit => `
                                    <div class="list-group-item d-flex justify-content-between align-items-center">
                                        ${habit.name} - ${habit.description} (${new Date(habit.created_at).toLocaleDateString()})
                                        <form action="/habits/delete/${habit.id}" method="post" class="ms-3">
                                            <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                                        </form>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };

        if (categoryId === 'all') {
            allCategories.forEach(cat => {
                const catHabits = filteredHabits.filter(habit => habit.category_id == cat.id);
                habitsList.innerHTML += createAccordionItem(catHabits, cat);
            });
        } else {
            habitsList.innerHTML += createAccordionItem(filteredHabits, category);
        }

        const accordionElements = document.querySelectorAll('.accordion');
        accordionElements.forEach(accordion => {
            new bootstrap.Collapse(accordion, {
                toggle: false
            });
        });
    }

    function fetchHabitData(categoryId) {
        const url = categoryId === 'all' ? '/habits/data/calendar' : `/habits/data/${categoryId}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                renderCalendarHeatmap(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function toggleChartVisibility(selectedChart) {
        calendarHeatmapContainer.style.display = selectedChart === 'calendarHeatmap' ? 'block' : 'none';
        hexbinChartContainer.style.display = selectedChart === 'hexbin' ? 'block' : 'none';
        treemapChartContainer.style.display = selectedChart === 'treemap' ? 'block' : 'none';

        if (selectedChart === 'hexbin') {
            fetchHexbinData();
        } else if (selectedChart === 'treemap') {
            fetchTreemapData();
        }
    }

    function fetchHexbinData() {
        fetch('/habits/data/hexbin')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                renderHexbinChart(data);
            })
            .catch(error => {
                console.error('Error fetching hexbin data:', error);
            });
    }

    function fetchTreemapData() {
        fetch('/habits/data/treemap')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                renderTreemapChart(data);
            })
            .catch(error => {
                console.error('Error fetching treemap data:', error);
            });
    }
});
