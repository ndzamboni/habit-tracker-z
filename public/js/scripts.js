document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const categorySelector = document.getElementById('categorySelector');
    categorySelector.addEventListener('change', function() {
        const categoryId = categorySelector.value;
        fetchHabitData(categoryId);
        fetchHabitList(categoryId);
    });

    // Initial load
    fetchHabitData('all');
    fetchHabitList('all');

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

    function fetchHabitList(categoryId) {
        const url = categoryId === 'all' ? '/habits/list' : `/habits/list/${categoryId}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('habitsList').innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching habits list:', error);
            });
    }
});
