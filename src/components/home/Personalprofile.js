import React from 'react';


const Personalprofile = (props) => {
    let personID =window.location.href.substring(window.location.href.indexOf("=")+1) 

    return <div >
        <h1> Get the person's detail information.  </h1>
        <h2>Current person's ID is: {personID}</h2>

    </div>
}

export default Personalprofile;