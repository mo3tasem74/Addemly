let script = document.createElement('script');
const queryString = location.search.substring(1);
let recordNum = queryString ;
console.log(recordNum);
const sessionData = JSON.parse(localStorage.getItem('responses'))[recordNum-1]; 
const time = sessionData.time ; 
const targetTime = sessionData.targetTime ; 
const serverFeedback = sessionData.response ; 
const Metronome = serverFeedback.WordCount/(Math.floor(time/60)); 
const fillerCount = serverFeedback.Fillers.split(',').length ;  
const sentence = serverFeedback.Sentence ; 
console.log(fillerCount);
const metronomeElement= document.getElementById('resMetronome'); 
const timeElement= document.getElementById('resultTime'); 
const trgElement= document.getElementById('trgTime'); 
const fillerElement= document.getElementById('resFillers'); 
const WordCount = serverFeedback.WordCount ; 
metronomeElement.innerText = Metronome; 
timeElement.innerText = returFormattedTime(time); 
fillerElement.innerText = fillerCount; 
trgElement.innerText = returFormattedTime(targetTime); 
const sentenceHolder = document.getElementById("sentence"); 
sentenceHolder.innerHTML = sentence ; 

script.src = 'https://www.gstatic.com/charts/loader.js'; 
script.addEventListener('load', function() {
    google.charts.load('current', {'packages':['corechart']});
    console.log("loaded");
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
    
      let data = new google.visualization.DataTable();
      data.addColumn('string', 'Word Type');
      data.addColumn('number', 'Percent');
      data.addRows([
        ['Words', WordCount ],
        ['Filler words', fillerCount]
      ]);

   
      let options = {'title':'Filler Words to Non filler Words Ratio',
                     'width':400,
                     'height':300};

      let chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
    drawChart();
});
document.querySelector("body").appendChild(script); 
function returFormattedTime(time){
    let hours = Math.floor(time/3600); 
    let mins = Math.floor((time-hours*3600)/60); 
    let secs = Math.round(time - mins*60 - hours*3600); 
return `${hours.toString().padStart(2,"00")}:${mins.toString().padStart(2,"00")}:${secs.toString().padStart(2,"00")}`;
}