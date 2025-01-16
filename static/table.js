// Example D3.js code to manipulate or visualize data in the table
// This could be used to dynamically update table content based on data 

function updateTable(tableData) {
  const tableBody = document.querySelector("#table tbody");
  tableBody.innerHTML = ""; // Clear existing content

  tableData.forEach(data => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = data.shapeName;
    row.insertCell(1).textContent = data.province;
    row.insertCell(2).textContent = data.total;
    row.insertCell(3).textContent = data.female;
  });
} 

 