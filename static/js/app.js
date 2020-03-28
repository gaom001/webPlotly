// Create initate function (1. populate id into droptwon; 2.set up default ID [940] for plotting)
function init(){
    d3.json("samples.json").then((data)=>{
        var dropdown = d3.select("#selDataset"); 
        data.names.forEach((name)=> { 
        dropdown.append("option").text(name).property("value");
        });

        var defaultID = data.names[0];
        activation(defaultID);
    } )
}
init();

// Create activation function to activate below charting functions
function activation(Id){
    barchar(Id);
    bubblechar(Id);
    infoTable(Id);
    gaugechar(Id);
}

// Create optionChanged function to update individual id.
function optionChanged(id){
    activation(id);
}


// Function for generating list.
function infoTable(inputID){
    d3.json("samples.json").then((data)=>{ 
    var selectData = data.metadata.filter(d => d.id === parseInt(inputID))[0];
    console.log(selectData);
         
    demogKeys=d3.keys(selectData);
    console.log(demogKeys);
    demogValues=d3.values(selectData);
    console.log(demogValues);
   

    d3.select("ul").remove();

    d3.select("#sample-metadata").append('ul');
    var ul=d3.select('#sample-metadata ul');
    for (var i=0;i<demogValues.length;i++) {
    ul.append('li').text(`${demogKeys[i]}:${demogValues[i]}`);    
    }})  
}


// Function for generating bar chart.
function barchar(inputID){
    d3.json("samples.json").then((data)=>{       
    var selectData = data.samples.filter(d => d.id === inputID)[0];
    console.log(selectData);
    var values=selectData.sample_values;
    console.log(values);
    var otuID=selectData.otu_ids;
    otuIDy=otuID.map(d => "OTU " + d);
    console.log(otuIDy);
    var otuLabel=selectData.otu_labels;
    console.log(otuLabel); 

    barcharValue=values.slice(0,10).reverse();
    barchatLabel=otuID.slice(0,10).reverse();
    barchatText=otuLabel.slice(0,10).reverse();
    console.log(barcharValue);
    console.log(barchatLabel);
    console.log(barchatText);   

    var trace1 = {
        x: barcharValue,
        y: otuIDy,       
        text: barchatText,
        type: "bar",
        orientation: "h",
        marker: {
            color: 'orange',},       
    }
    var layout = {
        title: "Top 10 OTUs Found in individual",
        yaxis: {tickfont: {size: 14}}
      };
        var data= [trace1];        
        Plotly.newPlot('bar', data,layout);
    })
}


// Function for generating bubble chart.
function bubblechar(inputID){
    d3.json("samples.json").then((data)=>{       
    var selectData = data.samples.filter(d => d.id === inputID)[0];
    console.log(selectData);
    var values=selectData.sample_values;
    console.log(values);
    var otuID=selectData.otu_ids;
    console.log(otuID);
    var otuLabel=selectData.otu_labels;
    console.log(otuLabel); 
 
    var trace1 = {
        x: otuID,
        y: values, 
        text:otuLabel, 
        mode:'markers',   
        marker: {
            color: otuID,
            size:values},       
    }
    var data= [trace1];    
        
    var layout = {
        title: " All Microbial Species Display in Populations",
        xaxis: {title: "OTUS", size: 14},    
        yaxis: {
            title: 'Sample Values',
            titlefont: {size: 16},
            tickfont: {size: 14},}
        };
        Plotly.newPlot('bubble', data, layout);

    })
}


// Function for generating gauge chart.
function gaugechar(inputID){
    d3.json("samples.json").then((data)=>{       
        var selectData = data.metadata.filter(d => d.id === parseInt(inputID))[0];
        wfreqData=selectData.wfreq;

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreqData,
          title: { text: "Belly Button Washing Frequency (Scrubs per Week)", font: { size: 15 } },
          type: "indicator",
          mode: "gauge+number+delta",          
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 10], color: "yellow" },
              { range: [10,20], color: "gray" }],}
        }
      ];
      
    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 },
    title:"abcd", };

    Plotly.newPlot('gauge',  data, layout);
    })
}









