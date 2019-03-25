import React from 'react';


const Tablehead = React.memo((props)=>{
    console.log("called tyhead")
  let ths = props.columnname.map((colname)=>{
      return  <th  key={colname}>{colname}</th>
  })
 

    return (<tr>
        {ths}
    </tr>
    )

})
export default Tablehead;