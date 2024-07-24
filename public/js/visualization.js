// function renderHeatmap(data) {
//     // Clear existing heatmap
//     d3.select("#habitHeatmap").html("");

//     const margin = { top: 50, right: 30, bottom: 50, left: 60 },
//           width = 800 - margin.left - margin.right,
//           height = 400 - margin.top - margin.bottom;

//     const svg = d3.select("#habitHeatmap")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//     const parseTime = d3.timeParse("%Y-%m-%d");
//     data.forEach(d => {
//         d.date = parseTime(d.date);
//     });

//     const x = d3.scaleTime()
//         .domain(d3.extent(data, d => d.date))
//         .range([0, width]);

//     const y = d3.scaleBand()
//         .domain(data.map(d => d.habit))
//         .range([0, height])
//         .padding(0.1);

//     svg.append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat("%b %d")));

//     svg.append("g")
//         .call(d3.axisLeft(y));

//     const colorScale = d3.scaleSequential(d3.interpolateBlues)
//         .domain([0, d3.max(data, d => d.value)]);

//     svg.selectAll()
//         .data(data, d => d.habit + ':' + d.date)
//         .enter()
//         .append("rect")
//         .attr("x", d => x(d.date))
//         .attr("y", d => y(d.habit))
//         .attr("width", (width / d3.timeDay.range(d3.min(data, d => d.date), d3.max(data, d => d.date)).length) - 1)
//         .attr("height", y.bandwidth())
//         .style("fill", d => colorScale(d.value));

//     // Add title
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", -20)
//         .attr("text-anchor", "middle")
//         .style("font-size", "16px")
//         .style("text-decoration", "underline")
//         .text("Habit Heatmap");

//     // Add X axis label
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", height + margin.bottom - 10)
//         .attr("text-anchor", "middle")
//         .style("font-size", "12px")
//         .text("Date");

//     // Add Y axis label
//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left + 10)
//         .attr("x", 0 - (height / 2))
//         .attr("text-anchor", "middle")
//         .style("font-size", "12px")
//         .text("Habit");
// }
