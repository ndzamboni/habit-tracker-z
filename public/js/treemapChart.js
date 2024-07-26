function renderTreemapChart(data) {
    d3.select("#treemapChart").selectAll("*").remove();
  
    const width = 800;
    const height = 600;
    const svg = d3.select("#treemapChart").append("svg").attr("width", width).attr("height", height);
  
    const root = d3.hierarchy({ values: data }, d => d.values)
      .sum(d => d.count)
      .sort((a, b) => b.value - a.value);
  
    d3.treemap().size([width, height]).padding(1)(root);
  
    const color = d3.scaleSequential(d3.interpolateBlues).domain([0, d3.max(data, d => d.count)]);
  
    const cell = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);
  
    cell.append("rect")
      .attr("id", d => d.data.name)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => color(d.value));
  
    cell.append("text")
      .attr("x", 3)
      .attr("y", 13)
      .text(d => d.data.name);
  }
  