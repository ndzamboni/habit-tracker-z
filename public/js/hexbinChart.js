function renderHexbinChart(data) {
    d3.select("#hexbinChart").selectAll("*").remove();
  
    const width = 800;
    const height = 600;
    const svg = d3.select("#hexbinChart").append("svg").attr("width", width).attr("height", height);
  
    const hexbin = d3.hexbin().radius(20).extent([[0, 0], [width, height]]);
    const color = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, d3.max(data, d => d.timeSpent)]);
  
    const points = data.map(d => [Math.random() * width, Math.random() * height, d.timeSpent]);
  
    svg.append("g")
      .selectAll("path")
      .data(hexbin(points))
      .enter().append("path")
      .attr("d", hexbin.hexagon())
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("fill", d => color(d3.mean(d, p => p[2])))
      .attr("stroke", "#fff");
  }
  