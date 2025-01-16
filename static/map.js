// // Example D3.js code to create a map visualization
// function updateMap(mapData, data) {
//   console.log("Data:", data);
  
//   const svg = d3.select("#mapSvg");
//   svg.selectAll("*").remove(); // Clear existing content

//   // Load the combined GeoJSON file
//   d3.json('./static/EAPRO-ADM1.geojson').then((geoData) => {
//     // Filter the features by the selected country's ISO 3 code
//     const countryFeatures = geoData.features.filter(feature => feature.properties.shapeGroup === mapData.iso3);

//     if (countryFeatures.length === 0) {
//       console.warn(`No features found for ISO code: ${mapData.iso3}`);
//       return; // Exit if no features are found
//     }

//     // Create a new GeoJSON object for the selected country
//     const countryGeoJSON = {
//       type: "FeatureCollection",
//       features: countryFeatures
//     };

//     const projection = d3.geoMercator().fitSize([svg.node().clientWidth, svg.node().clientHeight], countryGeoJSON);
//     const path = d3.geoPath().projection(projection);

//     // Define a color scale with an appropriate domain
//     const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 100]); // Adjust domain as needed

//     svg.selectAll("path")
//       .data(countryGeoJSON.features)
//       .enter()
//       .append("path")
//       .attr("d", path)
//       .attr("fill", d => {
//         const provinceData = countryFeatures.find(feature => feature.properties.shapeName === d.properties.shapeName);
//         const value = provinceData ? provinceData.properties.total : 0;
//         return colorScale(value);
//       })
//       .attr("stroke", "white");

//     // Add province names
//     svg.selectAll("text")
//       .data(countryGeoJSON.features)
//       .enter()
//       .append("text")
//       .attr("x", d => path.centroid(d)[0])
//       .attr("y", d => path.centroid(d)[1])
//       .attr("text-anchor", "middle")
//       .attr("font-size", "10px")
//       .attr("fill", "white")
//       .text(d => {
//         const provinceName = d.properties.shapeName;
//         const provinceData = countryFeatures.find(feature => feature.properties.shapeName === provinceName);
//         console.log("provinceData", mapData);
//         return `${provinceName} ${provinceData.properties.province}`;
//       });

      
//     // Add country name text
//     const countryName = countryFeatures.length > 0 ? countryFeatures[0].properties.shapeGroup : "Unknown";
//     svg.append("text")
//       .attr("x", svg.node().clientWidth / 2)
//       .attr("y", 30)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "24px")
//       .attr("fill", "black")
//       .text(countryName);
//   }).catch(error => {
//     console.error("Error loading GeoJSON data:", error);
//   });
// } 