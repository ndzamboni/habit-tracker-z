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

    // Fetch and display data using D3.js
    fetch('/habits/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const margin = { top: 30, right: 30, bottom: 30, left: 30 },
                  width = 600 - margin.left - margin.right,
                  height = 400 - margin.top - margin.bottom;

            const svg = d3.select("#habitHeatmap")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

            const x = d3.scaleTime()
                .domain([new Date(d3.min(data, d => d.date)), new Date(d3.max(data, d => d.date))])
                .range([0, width]);

            const y = d3.scaleBand()
                .range([0, height])
                .domain(data.map(d => d.habit))
                .padding(0.05);

            const myColor = d3.scaleSequential()
                .interpolator(d3.interpolateBlues)
                .domain([0, 4]);

            const cellWidth = (width / data.length) * 0.8;  // Calculate cell width

            svg.selectAll()
                .data(data, function(d) { return d.date+':'+d.habit; })
                .enter()
                .append("rect")
                .attr("x", function(d) { return x(new Date(d.date)) })
                .attr("y", function(d) { return y(d.habit) })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", cellWidth)  // Use calculated cell width
                .attr("height", y.bandwidth())
                .style("fill", function(d) { return myColor(d.value)} )
                .style("stroke-width", 4)
                .style("stroke", "none")
                .style("opacity", 0.8);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
