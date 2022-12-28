console.log("linked")
const record = document.getElementById('record'); 
const stopRecord = document.getElementById('stopRecord');
const tools = document.getElementById("recordsBox");
const backButton = document.querySelector(".backButton");
let mediaRecorder = '';
let browserStream = ""; 
const baseUrl = "http://localhost:4000/" ; 
const audioUp = "tasks/me/audio"; 
const notifier = document.querySelector(".notifier");
const addSectionBtn = document.getElementById("addSectionBtn");
const sectionTitle = document.getElementById("sectionTitle");
const sectionTime = document.getElementById("sectionTime");
const sectionCont = document.getElementById("sectionsContainer"); 
const recordCounter = document.getElementById("recordCounter"); 
const resultContainer = document.getElementById("Results");
const sections = [];     
let timer = ''; 
let counter = '';
let counted = 0 ;
let currentSec = 0 ; 
let audios = []; 
let responses = []; 
let records =0; 
const Spinner = document.createElement('img'); 
let fullTime = 0 ;
// const file = document.getElementById('file');
// const upload = document.getElementById('upload');
const error = document.createElement('p'); 
error.classList.add("error"); 
error.innerText = "Couldn't upload" ; 



function countDown(){
  if(sections.length == 0) return ; 
  let section = sections[currentSec];
  totalSecs = section.totalSecs;   
  let htmlsection =document.getElementById(`${section.id}`); 
  htmlsection.classList.add('active');
  timer = setInterval(function(){
      let hours = Math.floor(totalSecs/3600); 
      let mins = Math.floor((totalSecs-hours*3600)/60); 
      let secs = totalSecs - mins*60 - hours*3600; 
      htmlsection.querySelector('.timeParagraph').innerText= `${hours.toString().padStart(2,"00")}:${mins.toString().padStart(2,"00")}:${secs.toString().padStart(2,"00")}`;
      totalSecs--;
      if (totalSecs < 0) {
          currentSec++;
          clearInterval(timer);
          htmlsection.classList.remove('active');
          if(currentSec<sections.length){
          countDown();
        }else{
          currentSec = 0;
        }
      }
  }, 1000);

}
function countUp(){
    counter = setInterval(()=>{
      counted++;
      let hours = Math.floor(counted/3600); 
      let mins = Math.floor((counted-hours*3600)/60); 
      let secs = counted - mins*60 - hours*3600; 
      recordCounter.innerText = `${hours.toString().padStart(2,"00")}:${mins.toString().padStart(2,"00")}:${secs.toString().padStart(2,"00")}`;
    },1000);
}


addSectionBtn.addEventListener('click',()=>{
  let secId = "section"+sections.length ;  

 const sectionHeader= document.createElement('p'); 
 const time = document.createElement('p') ; 
 sectionHeader.innerText = `${sections.length +1}. `+ sectionTitle.value
 sectionHeader.style.textAlign ='center';
 time.style.textAlign ='center'
 let mins =  parseFloat(sectionTime.value) ;
 console.log(mins);

 let secs = Math.floor((mins-Math.floor(mins))*60) ; 
 let hours = Math.floor(Math.floor(mins)/60); 
 mins = Math.floor(mins-hours*60) ;
 time.innerText =`${hours.toString().padStart(2,"00")}:${mins.toString().padStart(2,"00")}:${secs.toString().padStart(2,"00")}`; 
 time.classList.add('timeParagraph')
 const section = document.createElement('div') ; 
 section.classList.add('timerSection'); 
 section.append(sectionHeader); 
 section.append(time); 
 section.id = secId; 
 sectionCont.append(section); 
 
 sections.push({title : sectionTitle.value, 
  min : mins,
  sec: secs,
  hour: hours,
  totalSecs: sectionTime.value*60,
  id : secId
}); 
fullTime +=  sectionTime.value*60; 
})        
record.onclick = function () {
  recordCounter.innerText = `00:00:00`;
  countDown(); 
  countUp(); 
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices.getUserMedia(
                {
                  audio: {sampleSize: 16, channelCount: 1, sampleRate: 16000 }
                }
              ).then(function (stream) {
                browserStream = stream ; 
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = function (e) {
                    console.log("I was called")
                    chunks.push(e.data);
                };
                mediaRecorder.onstop = async function (e) {
                    console.log("recorder stopped");
                  
                    const clipName = "Record"
                  
                    const clipContainer = document.createElement("article");
                    clipContainer.id = `article${records}`; 
                    clipContainer.style.display = 'flex'; 
                    clipContainer.style.padding = '0.5rem'
                    clipContainer.style.alignContent = 'center';
                    const clipLabel = document.createElement("p");
                    const audio = document.createElement("audio");
                    const deleteButton = document.createElement("button");
                   
                    Spinner.src = "../resources/images/Spinner.gif"; 

                    audio.setAttribute("controls", "");
                    clipContainer.appendChild(audio);
                    clipContainer.appendChild(Spinner); 
                    tools.appendChild(clipContainer);
                    notifier.style.display = "none"; 
                    const blob = new Blob(chunks, { type: "audio/wav; codecs=PCM" });
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    audio.src = audioURL;
                    // console.log(audioURL);
                    // console.log("I was called"); 
                    // console.log(browserStream);
                    browserStream.getTracks().forEach(track => track.stop());
                    const token =  JSON.parse(localStorage.getItem('user')).token ;
                    uploadBlob(blob,token,clipContainer,null); 
                  
                    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE0OTA1MGFiNjlkZDlmNDVhN2JjYmMiLCJpYXQiOjE2NTUwNTI4NDV9.yaIX8qmDuhfynLs66ZgEqXllaoK16Sx-6ZYdt-aKO-M"
                    // console.log(token);
                     
                }
          
                mediaRecorder.start();
                stopRecord.style.display = 'block';
                record.style.display = 'none'
                console.log(mediaRecorder.state);
                console.log("recorder started");
            
              })
          
              .catch(function (err) {
                console.log("The following getUserMedia error occurred: " + err);
              });
          } else {
            console.log("getUserMedia not supported on your browser!");
          }
          };
        
          let chunks = [];
        
       
        
        stopRecord.onclick = function () {
            console.log(mediaRecorder.state);
            mediaRecorder.stop();
            stopRecord.style.display = 'none';
            record.style.display = 'block'
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            clearInterval(timer);
            currentSec= 0 ; 
            clearInterval(counter); 
            records++ ; 
          };
        
      backButton.addEventListener('click',()=>{
        window.location.href = "../html/tools.html"; 
      })
    

    async function uploadBlob(blob,token ,clipContainer,audio){
      try{
      console.log(audio);
      if(audio){
        counted = audio.duration; 
        console.log(audio.duration);
      }
      const formData = new FormData()
      formData.append("audio",blob,"blob.wav"); 
      let response = await fetch(baseUrl+audioUp,{
          method: 'POST', 
          headers: {
              'Authorization':token,
              // 'Content-type' : "multipart/form-data ; boundary:suii--" ,
              'Accept' : '*/*', 
              'Connection': 'keep-alive',
              'Accept-Encoding': 'gzip, deflate, br', 
             },

          body : formData
        }).
      then(async (response)=>{
        try{
        const flipButton =document.createElement('a')
        flipButton.id = records ; 
        flipButton.innerText = 'See Results';
        flipButton.classList.add('authButton')
        flipButton.style.fontSize = '1rem';
        flipButton.href = "../html/result.html"+`?${records}`; 
        flipButton.target = "__blank"
        flipButton.rel = "noopener noreferrer"
        let jsonRes = await response.json(); 
        console.log(jsonRes);
        responses.push({response: jsonRes
          ,time : counted , 
          targetTime : fullTime
    }); 
        localStorage.setItem('responses', JSON.stringify(responses));
        console.log(responses[records-1].time
             );

        flipButton.onclick= ()=>{
        } ; 
        clipContainer.appendChild(flipButton);
        Spinner.style.display = 'none'; 
        counted = 0;
        
        console.log('Records count' , records) 
       
      }catch(e){
        console.log(e)
        clipContainer.appendChild(error);
        Spinner.style.display = 'none'
      }
    })
      
      }catch(e){
        console.log(e); 
        clipContainer.appendChild(error); 
      }
    }

      upload.addEventListener('click', () => {
        console.log('clicked the upload button!');
        let wavRecord = file.files[0]; 
        let fileReader = new FileReader(); 
        fileReader.addEventListener('load', ()=>{
          
         
        })
        // fileReader.readAsDataURL(wavRecord);
        const clipContainer = document.createElement("article");
        clipContainer.id = `article${records}`; 
        clipContainer.style.display = 'flex'; 
        clipContainer.style.padding = '0.5rem'
        clipContainer.style.alignContent = 'center';
        const clipLabel = document.createElement("p");
        const audio = document.createElement("audio");
        const deleteButton = document.createElement("button");
        audio.setAttribute("controls", "");
        Spinner.src = "../resources/images/Spinner.gif"; 
        Spinner.width = "30" ; 
        Spinner.height = "30"; 
        clipContainer.appendChild(audio);
        clipContainer.appendChild(Spinner); 
        tools.appendChild(clipContainer);
        notifier.style.display = "none"; 


        const audioURL = fileReader.result ; 
        audio.src = URL.createObjectURL(wavRecord);
        audio.preload = "metadata"; 
        // audio.play(); 
        // audio.muted =true; 
        audio.onloadedmetadata = function() {
            counted =audio.duration ; 
      };
        const token =  JSON.parse(localStorage.getItem('user')).token ;
        records++ ; 
        uploadBlob(wavRecord,token ,clipContainer, audio); 
})
