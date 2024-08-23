

// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let sampleMetadata = metadata.filter(meta => meta.id == sample)[0];
        console.log(sampleMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(sampleMetadata).forEach(([key, value]) => {
            metadataPanel.append("div")
            .attr("class", "metadata-entry")
            .html(`${key.toUpperCase()}: ${value}`);
          });

    // Update styling of metadata panel
    d3.select(".card-header").style("background-color", "steelblue");
    d3.select(".card-title").style("color", "white");
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field and
    let samples = data.samples;
    // Filter the samples for the object with the desired sample number
    let sampleData = samples.filter(choice => choice.id == sample)[0];
    console.log(sampleData);

    // Get the otu_ids, otu_labels, and sample_values
    let top10samplesValues = sampleData.sample_values.slice(0, 10).reverse();
    let top10otuIds = sampleData.otu_ids.slice(0, 10);
    let top10otuLabels = sampleData.otu_labels.slice(0, 10);

    // Build a Bubble Chart
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

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, layout2);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
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

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, layout1);
  });
}

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
    let sample = names[0];
    console.log(sample);

    // Build charts and metadata panel with the first sample
    buildCharts(sample);
    buildMetadata(sample);
  });
}

  // Function for event listener
  function optionChanged(newSample) {
    // Build charts and metadata panel each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }

// Initialise the dashboard
init();

