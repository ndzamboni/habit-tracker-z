function renderHexbinChart(data) {
    d3.select("#hexbinChart").selectAll("*").remove(); // Clear existing chart

    const width = 960;
    const height = 500;
    const radius = 20;

    const color = d3.scaleSequential(d3.interpolateViridis)
        .domain([0, d3.max(data, d => d.time_spent)]);

    const hexbin = d3.hexbin()
        .radius(radius)
        .extent([[0, 0], [width, height]]);

    const svg = d3.select("#hexbinChart").append("svg")
        .attr("width", width)
        .attr("height", height);

    const points = data.map(d => [d.x, d.y]);

    svg.append("g")
        .selectAll("path")
        .data(hexbin(points))
        .enter().append("path")
        .attr("d", hexbin.hexagon())
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("fill", d => color(d.length));
}
