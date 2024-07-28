function renderHexbinChart(data) {
    d3.select("#habitHeatmap").selectAll("*").remove(); // Clear existing chart

    const margin = { top: 20, right: 10, bottom: 10, left: 20 };
    const width = 800;
    const height = 600;
    const radius = 20;

    const svg = d3.select("#habitHeatmap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const hexbin = d3.hexbin()
        .radius(radius)
        .extent([[0, 0], [width, height]]);

    const color = d3.scaleSequential(d3.interpolateYlGnBu)
        .domain([0, d3.max(data, d => d.length)]);

    svg.append("g")
        .selectAll("path")
        .data(hexbin(data))
        .enter().append("path")
        .attr("d", hexbin.hexagon())
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("fill", d => color(d.length))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5);

    svg.append("g")
        .selectAll("text")
        .data(hexbin(data))
        .enter().append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#000")
        .text(d => d.length);
}
