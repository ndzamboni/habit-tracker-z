function renderCalendarHeatmap(data) {
    d3.select("#habitHeatmap").selectAll("*").remove(); // Clear existing heatmap

    const margin = { top: 20, right: 10, bottom: 10, left: 20 };
    const cellSize = 20;
    const width = cellSize * 7 + margin.left + margin.right;
    const height = cellSize * 53 + margin.top + margin.bottom; // Adjust the height to accommodate the vertical layout

    const color = d3.scaleSequential()
        .interpolator(d3.interpolateRdYlGn) // Use green-to-red gradient
        .domain([d3.max(Object.values(data)), 0]); // Reverse the gradient

    const years = d3.groups(Object.entries(data), d => new Date(d[0]).getFullYear());

    years.forEach(([year, entries], index) => {
        const svg = d3.select("#habitHeatmap")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid #ccc") // Add border around the chart
            .style("margin", "10px") // Add margin between charts
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg.append("text")
            .attr("x", -5)
            .attr("y", -5)
            .attr("font-size", 14)
            .attr("text-anchor", "start")
            .text(year);

        const rect = svg.append("g")
            .selectAll("rect")
            .data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
            .enter().append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", d => d.getDay() * cellSize)
            .attr("y", d => (d3.timeWeek.count(d3.timeYear(d), d) + 1) * cellSize)
            .datum(d3.timeFormat("%Y-%m-%d"))
            .attr("fill", "rgba(0, 0, 0, 0)"); // Set default color for squares without data to be translucent

        rect.append("title")
            .text(d => d);

        rect.filter(d => d in data)
            .attr("fill", d => color(data[d]))
            .select("title")
            .text(d => `${d}: ${data[d]}`);

        svg.append("g")
            .selectAll("text")
            .data(d3.range(7))
            .enter().append("text")
            .attr("x", (d, i) => i * cellSize + cellSize / 2)
            .attr("y", -5)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .text(d => "SMTWTFS"[d]);

        const monthGroup = svg.append("g")
            .selectAll("g")
            .data(d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
            .enter().append("g");

        monthGroup.append("text")
            .attr("x", -5)
            .attr("y", d => (d3.timeWeek.count(d3.timeYear(d), d) + 1) * cellSize + cellSize / 1.5)
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .text(d3.timeFormat("%b"));
    });
}

document.addEventListener('DOMContentLoaded', function() {
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
                renderCalendarHeatmap(data, categoryId);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    fetchHabitData('all'); // Initial load
});
