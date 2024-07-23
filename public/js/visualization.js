document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visualizationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const chartType = document.getElementById('chartType').value;
        const habitId = document.getElementById('habitSelector').value;

        fetch(`/habits/data/${habitId}`)
            .then(response => response.json())
            .then(data => {
                renderChart(chartType, data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

    function renderChart(chartType, data) {
        const chartContainer = d3.select('#chartContainer');
        chartContainer.html(''); // Clear previous chart

        if (chartType === 'bar') {
            renderBarChart(data);
        } else if (chartType === 'line') {
            renderLineChart(data);
        } else if (chartType === 'pie') {
            renderPieChart(data);
        }
    }

    function renderBarChart(data) {
        const margin = { top: 30, right: 30, bottom: 40, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select('#chartContainer')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.date))
            .range([0, width])
            .padding(0.2);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.date))
            .attr('y', d => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.value))
            .attr('fill', '#69b3a2');
    }

    function renderLineChart(data) {
        const margin = { top: 30, right: 30, bottom: 40, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select('#chartContainer')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.date)))
            .range([0, width]);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#69b3a2')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => x(new Date(d.date)))
                .y(d => y(d.value))
            );
    }

    function renderPieChart(data) {
        const width = 450;
        const height = 450;
        const margin = 40;

        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3.select('#chartContainer')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const pie = d3.pie()
            .value(d => d.value);

        const dataReady = pie(data);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        svg.selectAll('slices')
            .data(dataReady)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemeCategory10[i]);
    }
});
