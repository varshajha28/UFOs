// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    }
    );
  });
}
// Keep track of all filters
var filters = {};

// This function will be called on change event.
function updateFilters() {
  // Save the element, value, and id of the filter that was changed
  let grabelement = d3.select(this);
  let filterid = grabelement.attr("id");
  let filtervalues = grabelement.property("value");
  if (filtervalues) {
    //console.log(filters);
    filters[filterid] = filtervalues;
    //console.log(filters);
  }
  else {
    delete filters[filterid];
  }
  // Call function to apply all filters and rebuild the table
  filterTable();
}


function filterTable() {
  // Set the filteredData to the tableData
  let filteredData = tableData;
  // Loop through all of the filters and keep any data that
  Object.entries(filters).forEach(function ([key, value]) {
    filteredData = filteredData.filter(row => row[key] == value);
  });
  // matches the filter values
  console.log(filteredData);

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}
// Attach an event to listen for the form button
d3.selectAll("input").on("change", updateFilters);

//Make it so that the clear button refreshes the page to reset everything
let clearEntries = d3.select("#clear-btn");
clearEntries.on("click", function () {
  location.reload();
});
// Build the table when the page loads
buildTable(tableData);



