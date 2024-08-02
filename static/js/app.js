// Build the metadata panel
function buildMetadata(sample) {
  
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("called buildMetadata", sample); 
    //code used with help from professor 
    // get the metadata field
    let metadata = data["metadata"]; 
    // Filter the metadata for the object with the desired sample number
    let buildMetadataresult= metadata.filter(x=>x.id==sample);
    let result = buildMetadataresult[0]; 
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata"); 

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let key in result) { 
      panel.append("h6").text(`${key}: ${result[key]}`);
    }
  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    //got help with code from peer and tutor
    // Get the samples field
    let samples = data["samples"]; 

    // Filter the samples for the object with the desired sample number
    let sampleData = samples.filter(x=>x.id==sample); 
    let result = sampleData[0]; 

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result["otu_ids"];
    let otu_labels = result["otu_labels"];
    let sample_values = result["sample_values"];

    // Build a Bubble Chart
    var layout = { 
      title: 'Bacteria per sample', 
      showlegend: false, 
      height:600, 
      width:1200 

    };

    var bubblechart = [{ 
      x: otu_ids,
      y: sample_values,
      type: 'scatter',
      mode: 'markers',
      text: otu_labels,
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubblechart, layout);
    //used chatgpt for help with bubble chart 
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barValues = sample_values.slice(0, 10).reverse();
    let barLabels = otu_labels.slice(0, 10).reverse();

     
    var barchart = [{
      x: barValues,
      y: yticks,
      text: barLabels,
      type: 'bar',
      orientation: 'h'
    }];

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
      Plotly.newPlot('bar', barchart);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
console.log (data)
    // Get the names field
    //developed code with help from tutor 
        let names = data.names
        console.log(names);
    // Use d3 to select the dropdown with id of `#selDataset`
        let dropdown = d3.select('#selDataset');
  
  // Use the list of sample names to populate the select options
  // Hint: Inside a loop, you will need to use d3 to append a new
  // option for each sample name.
  names.forEach(name => {
    dropdown.append('option').text(name).property("value", name);
    
  });
  
  // Get the first sample from the list
  let firstname = names[0]


    // Build charts and metadata panel with the first sample
    optionChanged(firstname);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
console.log(newSample);
buildMetadata(newSample);
buildCharts(newSample);
}

// Initialize the dashboard
init();
