function renderTreemapChart(data) {
  // Clear existing treemap chart
  d3.select("#treemapChart").selectAll("*").remove();

  const width = 960,
        height = 500;

  const svg = d3.select("#treemapChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0,0)");

  const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

  const treemapLayout = d3.treemap()
      .size([width, height])
      .padding(1);

  treemapLayout(root);

  const nodes = svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

  nodes.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', 'steelblue');

  nodes.append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text(d => d.data.name);
}
