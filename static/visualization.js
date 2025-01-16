function updateMap(filteredData) {
    const svg = d3.select("#mapSvg");
    svg.selectAll("*").remove();
  
    if (!filteredData || filteredData.length === 0) {
      console.warn('No data available to update the map');
      return;
    }
  
    // Parse all geometry fields
    const features = filteredData.map(d => ({
      type: "Feature",
      geometry: JSON.parse(d.geometry),  // Parse the geometry string
      properties: {
        countryiso3: d.countryiso3,
        province: d.province
      }
    }));
  
    const geoJsonFeature = {
      type: "FeatureCollection",
      features: features
    };
  
  
    // Define the projection
    const projection = d3.geoMercator()
      .fitSize([svg.node().clientWidth || 800, svg.node().clientHeight || 600], geoJsonFeature);
  
    const path = d3.geoPath().projection(projection);
  
    // Generate random values for each feature for coloring
    const colorData = filteredData.map(d => ({
      province: d.province,
      value: Math.random() * 100  // Random value between 0 and 100
    }));

    // Create a color scale
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, 100]);  // Adjust domain based on your data range

    // Create a tooltip div that is hidden by default
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("display", "none");

    // Bind data and draw the map with color
    svg.selectAll("path")
      .data(geoJsonFeature.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", d => {
        const provinceData = colorData.find(cd => cd.province === d.properties.province);
        return provinceData ? colorScale(provinceData.value) : "lightgray";  // Default color if no data
      })
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        tooltip.style("display", "block")
            .html(`Province: ${d.properties.province}<br>Value: ${colorData.find(cd => cd.province === d.properties.province)?.value || 'N/A'}`);
      })
      .on("mousemove", function(event) {
        tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("display", "none");
      });

    //Add province names
    svg.selectAll("text")
      .data(geoJsonFeature.features)
      .enter()
      .append("text")
      .attr("x", d => path.centroid(d)[0])
      .attr("y", d => path.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text(d => {
        const provinceName = d.properties.province;
        return `${provinceName}`;
      });
  }
  

  function updateChart(filteredData) {
    const svg = d3.select("#chartSvg");
    svg.selectAll("*").remove();
  
    if (!filteredData || filteredData.length === 0) {
      console.warn('No data available to update the chart');
      return;
    }
  
    // Generate random values for each province
    const chartData = filteredData.map(d => ({
      province: d.province || `Province ${Math.random().toString(36).substring(7)}`,  // Fallback if no province name
      value: d.total || Math.floor(Math.random() * 100) + 1  // Random number between 1-100
    }));
  
    // Chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(chartData.map(d => d.province))
      .range([margin.left, width - margin.right])
      .padding(0.2);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    // Create X axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");
  
    // Create Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  
    // Draw bars
    svg.selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.province))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.value))
      .style("fill", "steelblue");
  
    // Add labels on top of bars
    svg.selectAll("text.bar")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "bar")
      .attr("x", d => xScale(d.province) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .text(d => d.value);
  }
  

  function updateTable(filteredData) {
    const tbody = d3.select("#dataTable tbody");
    tbody.selectAll("tr").remove();
  
    if (!filteredData || filteredData.length === 0) {
      console.warn('No data available to update the table');
      return;
    }
  
    // Generate random values for each province for the table
    const tableData = filteredData.map(d => ({
      province: d.province || `Province ${Math.random().toString(36).substring(7)}`,
      value: Math.floor(Math.random() * 100) + 1
    }));
  
    // Append new rows with province and random value
    tableData.forEach(data => {
      const row = tbody.append("tr");
      row.append("td").text(data.province);
      row.append("td").text(data.value);
    });
  }
  

// Example function to call these updates
function updateVisualizationsWithData(apiData) {
  const { filteredData, iso3 } = updateVisualizations(apiData);
  updateMap(filteredData);
  updateChart(filteredData);
updateTable(filteredData);
} 