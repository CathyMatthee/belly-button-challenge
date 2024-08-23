// Build the metadata panel
// function buildMetadata(sample) {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
//     console.log(data);

//     // get the metadata field
//     let metadata = data.metadata;

//     // Filter the metadata for the object with the desired sample number
//     // function selection(person) {
//     //   return person.age < 30;
//     // }
    
//     // filter() uses the custom function as its argument
//     // let choice = metadata.filter(selection);

//     // Use d3 to select the panel with id of `#sample-metadata`


//     // Use `.html("") to clear any existing metadata


//     // Inside a loop, you will need to use d3 to append new
//     // tags for each key-value in the filtered metadata.

//   });
// // }

// // function to build both charts
// // function buildCharts(sample) {
// //   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // Get the samples field


//     // Filter the samples for the object with the desired sample number


//     // Get the otu_ids, otu_labels, and sample_values


//     // Build a Bubble Chart


//     // Render the Bubble Chart
//     Plotly.restyle("bubble", data, layout);

//     // For the Bar Chart, map the otu_ids to a list of strings for your yticks


//     // Build a Bar Chart
//     // Don't forget to slice and reverse the input data appropriately


//     // Render the Bar Chart
//     Plotly.restyle("bar", data, layout);
// //   });
// // }

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropdownMenu.append("option")
      .text(name)
      .attr("value", name);
    });

    // Get the first sample from the list
    let firstSampleValues = data.samples[0];
    console.log(firstSampleValues);

    let top10samplesValues = firstSampleValues.sample_values.slice(0, 10).reverse();
    let top10otuIds = firstSampleValues.otu_ids.slice(0, 10);
    let top10otuLabels = firstSampleValues.otu_labels.slice(0, 10);

    // Build bar chart with the first sample
    let trace1 = {
      x: top10samplesValues,
      y: top10otuIds.map(id => `OTU ${id} `),
      text: top10otuLabels, //hover text
      type: "bar",
      orientation: "h"};

    // Data Array
    let barData = [trace1];

    // Layout object
    let layout1 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: 'Number of Bacteria' },

      margin: {
        l: 80,
        r: 0,
        t: 50,
        b: 50}};

    // Render the bar chart plot to the div tag with id "bar"
    Plotly.newPlot("bar", barData, layout1);

    // Build bubble charts with the first sample
    let trace2 = {
      x: top10otuIds,
      y: top10samplesValues,
      text: top10otuLabels,//hover text
      mode: 'markers',
      marker: {
        size: top10samplesValues,
        color: top10otuIds,
        colorscale: 'Viridis' }
      };

    // Data Array
    let bubbleData = [trace2]

    // Layout object
    let layout2 = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      margin: {
        l: 50,
        r: 5,
        t: 100,
        b: 100}};

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, layout2);

    // Build metadata panel with the first sample
    let firstMetadata = data.metadata[0];
    console.log(firstMetadata);
    d3.select(".card-header").style("background-color", "steelblue");
    d3.select(".card-title").style("color", "white");

      let metadataPanel = d3.select("#sample-metadata");
      Object.entries(firstMetadata).forEach(([key, value]) => {
        metadataPanel.append("div")
          .attr("class", "metadata-entry")
          .html(`${key.toUpperCase()}: ${value}`);
      });

  });
}
// Initialise the dashboard
init();

// Function for event listener
// d3.selectAll("#selDataset").on("change", function() {
//   optionChanged(d3.select(this).property("value"));
// });

//   // Build bar chart
//   function optionChanged(newSample) {
//     let dropdownMenu = d3.select("#selDataset");
//     let dataset = dropdownMenu.property("value");
   

//     Plotly.restyle("bar", "values", [newSample]);



