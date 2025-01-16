fetch('http://127.0.0.1:5000/countries')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(apiData => {
    if (apiData.length === 0) {
      console.warn('API data is empty');
    }
    // Update visualizations with the fetched data
    updateVisualizationsWithData(apiData);
  })
  .catch(error => console.error('Error fetching data:', error));

function updateVisualizations(apiData) {
  const selectedCountry = document.getElementById('countrySelect').value;
  console.log("Selected Country:", selectedCountry);

  // Filter the API data based on the selected country
  const filteredData = apiData.filter(data => data.countryiso3 === selectedCountry);

  // Log the filtered data to verify
  console.log("Filtered Data:", filteredData);

  // Ensure that filteredData is being used in subsequent functions
  if (filteredData.length > 0) {
    // Return the filtered data and iso3
    return { filteredData, iso3: selectedCountry };
  } else {
    console.warn('No data found for the selected country');
    return { filteredData: [], iso3: selectedCountry };
  }
}

document.getElementById('countrySelect').addEventListener('change', () => {
  fetch('http://127.0.0.1:5000/countries')
    .then(response => response.json())
    .then(apiData => updateVisualizationsWithData(apiData))
    .catch(error => console.error('Error fetching data:', error));
});


