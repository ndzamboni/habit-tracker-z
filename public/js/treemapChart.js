function renderTreemapChart(data) {
    d3.select("#habitHeatmap").selectAll("*").remove(); // Clear existing chart

    const margin = { top: 20, right: 10, bottom: 10, left: 20 };
    const width = 800;
    const height = 600;

    const svg = d3.select("#habitHeatmap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data)
        .sum(d => d.time_spent)
        .sort((a, b) => b.height - a.height || b.value - a.value);

    d3.treemap()
        .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
        .padding(1)
        (root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const nodes = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    nodes.append("rect")
        .attr("id", d => d.data.name)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.data.category_id))
        .attr("stroke", "#fff");

    nodes.append("text")
        .attr("dx", 4)
        .attr("dy", 14)
        .text(d => d.data.name);
}
