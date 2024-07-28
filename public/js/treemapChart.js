function renderTreemapChart(data) {
    d3.select("#treemapChart").selectAll("*").remove(); // Clear existing chart

    const width = 960;
    const height = 500;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const treemap = d3.treemap()
        .size([width, height])
        .padding(1)
        .round(true);

    const root = d3.hierarchy({ values: data }, d => d.values)
        .sum(d => d.value);

    treemap(root);

    const svg = d3.select("#treemapChart").append("svg")
        .attr("width", width)
        .attr("height", height);

    const cell = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell.append("rect")
        .attr("id", d => d.data.name)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.data.name));

    cell.append("text")
        .attr("x", 3)
        .attr("y", 10)
        .text(d => d.data.name);
}
