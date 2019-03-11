import React from 'react';


const Personalprofile = (props) => {

    let personID = window.location.href.substring(window.location.href.indexOf("=") + 1)
    // let plus = document.getElementsByTagName('button')[0];
    // let min = document.getElementsByTagName('button')[1];
    function plus(){
        let meter = document.getElementsByTagName('meter')[0];
        if(meter.value<100){
            meter.value +=10;
        }
        
       

    }
    function min(){
        let meter = document.getElementsByTagName('meter')[0];
        if(meter.value>0){
            meter.value -=10;
        }
      
        
    }
    
    return <div >
        <h1> Get the person's detail information, whom you click on </h1>
        <h2>Current person's ID is: {personID}</h2>
        <div>
            <label> I am looking for the one actively
        <meter min="0" low="40" high="90" max="100" value="95"></meter>
            </label>
            <div>
                <button onClick={plus}>Plus 10</button>
                <button onClick={min}>Minus 10</button>
            </div>

        </div>

    </div>
}

export default Personalprofile;