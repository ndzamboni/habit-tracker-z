function renderHexbinChart(data) {
  // Clear existing hexbin chart
  d3.select("#hexbinChart").selectAll("*").remove();

  // Set up the hexbin chart
  const margin = { top: 20, right: 10, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#hexbinChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.timeSpent)])
      .range([height, 0]);

  const hexbin = d3.hexbin()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.timeSpent))
      .radius(20)
      .extent([[0, 0], [width, height]]);

  const color = d3.scaleSequential(d3.interpolateRdYlGn)
      .domain([0, d3.max(data, d => d.timeSpent)]);

  svg.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("class", "mesh")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .attr("class", "hexagon")
      .attr("clip-path", "url(#clip)")
      .selectAll("path")
      .data(hexbin(data))
      .enter().append("path")
      .attr("d", hexbin.hexagon())
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("fill", d => color(d.length))
      .attr("stroke", "#fff");
}
