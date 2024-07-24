function renderCalendarHeatmap(data, categoryId) {
    d3.select("#habitHeatmap").selectAll("*").remove(); // Clear existing heatmap

    const width = Math.max(document.getElementById('habitHeatmap').clientWidth, 960);
    const height = 136;
    const cellSize = 17;

    const years = d3.groups(Object.entries(data), d => new Date(d[0]).getFullYear());

    const color = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(Object.values(data))]);

    const svg = d3.select("#habitHeatmap")
        .selectAll("svg")
        .data(years)
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "year")
        .append("g")
        .attr("transform", `translate(${(width - cellSize * 53) / 2},${height - cellSize * 7 - 1})`);

    svg.append("text")
        .attr("transform", `translate(-6,${cellSize * 3.5})rotate(-90)`)
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .text(d => d[0]);

    const rect = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .selectAll("rect")
        .data(d => d3.timeDays(new Date(d[0], 0, 1), new Date(d[0] + 1, 0, 1)))
        .enter().append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
        .attr("y", d => d.getDay() * cellSize)
        .datum(d3.timeFormat("%Y-%m-%d"));

    rect.append("title")
        .text(d => d);

    rect.filter(d => d in data)
        .attr("fill", d => color(data[d]))
        .select("title")
        .text(d => `${d}: ${data[d]}`);

    svg.append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d3.range(1, 8))
        .enter().append("text")
        .attr("x", -5)
        .attr("y", d => (d - 1) * cellSize + 10)
        .attr("dy", "0.32em")
        .attr("font-size", 10)
        .text(d => "SMTWTFS"[d - 1]);

    const month = svg.append("g")
        .selectAll("g")
        .data(d => d3.timeMonths(new Date(d[0], 0, 1), new Date(d[0] + 1, 0, 1)))
        .enter().append("g");

    month.append("text")
        .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d3.timeMonth.floor(d)) * cellSize + 2)
        .attr("y", -5)
        .attr("font-size", 10)
        .text(d3.timeFormat("%b"));

    month.append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("fill", "none")
        .attr("d", function(d) {
            const t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0),
                d0 = d.getDay(), w0 = d3.timeWeek.count(d3.timeYear(d), d),
                d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
            return `M${(w0 + 1) * cellSize},${d0 * cellSize}H${w0 * cellSize}V${7 * cellSize}H${w1 * cellSize}V${(d1 + 1) * cellSize}H${(w1 + 1) * cellSize}V0H${(w0 + 1) * cellSize}Z`;
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
