import React, { Component } from 'react';
import Input from '../../UIs/input'
import './activities.css';


class Activities extends Component {
   
    state = {
        th: ["Activity/Event name", "Time", "City", "Zip", "Participants"],
        td: [["Grocery Shopping", "05/06/2019", "Sunnyvale", "94086", 10],
        ["Drawing Class", "03/30/2019", "Santa Clara", "95051", 31],
        ["10 miles Hiking", "04/03/2019", " Mountain view", " 95003", 18],
        ["15 miles Hiking", "04/20/2019", "Sunnyvale", "94087", 20],
        ["Cooking class with Chef", "09/12/2019", "Cupertino", "94028", 30],
        ["Video Game together", "12/31/2019", "Fremont", "93048", 10]],
        Filter:{
            elementType:'input',
            elemConfig:{
                type:'search',
                placeholder:"search activity by name or city"
            }
        }
    }
    search(){
        let filter, row, namedata, citydata,i,name,city;
       
        filter = document.getElementsByClassName("inputUI")[0].children[2].value.toLowerCase();
        row = document.getElementById("activitytable").getElementsByTagName("tr");
        for(i = 1; i<row.length;i++){
            name = row[i].getElementsByTagName('td')[0];
            city = row[i].getElementsByTagName('td')[2];
            namedata = name.textContent || name.innerText;
            citydata = city.textContent || city.innerText;
            console.log(namedata, citydata)
            if(namedata.toLowerCase().indexOf(filter) !== -1 || 
               citydata.toLowerCase().indexOf(filter) !== -1){
                row[i].style.display = "";
            }else{
                row[i].style.display = "none"
            }
        }
    }
    sorttable(e) {
       
        let n = this.state.th.indexOf(e.target.innerText.trim());
        let table,rows, switching = true,direction = "ascending",shouldswitch,i,
            switchedcount=0,firstrow, secondrow;
        table = document.getElementById("activitytable");
        while(switching){
            switching = false;
            rows = table.rows;
            for(i = 1; i < rows.length-1; i++){
                shouldswitch = false;
                firstrow = rows[i].getElementsByTagName('td')[n];
                secondrow = rows[i+1].getElementsByTagName('td')[n];

                if(direction == "ascending"){
                    if(firstrow.innerHTML.split(' ').join('').toLowerCase() > 
                        secondrow.innerHTML.split(' ').join('').toLowerCase()){
                            shouldswitch = true;
                            break;
                        }
                }else if(direction = "descending"){
                    if(firstrow.innerHTML.split(' ').join('').toLowerCase() < 
                        secondrow.innerHTML.split(' ').join('').toLowerCase()){
                            shouldswitch = true;
                            break;
                        }
                }


            }
            if(shouldswitch){
                rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                switching = true;
                switchedcount++;

            }else{
                if(switchedcount === 0 && direction === "ascending"){
                    direction = "descending";
                    switching = true
                }
            }
  
        }
    }

    render() {
        let ths = this.state.th.map((head) => {
            return <th columnname={head} key={head}>{head}</th>
        })
        let tds = this.state.td.map((tr, idx) => {
            let datas = tr.map((d, i) => {
                return <td data={d} key={d + i}>{d}</td>
            })
            return <tr key={idx + tr.join('')}>{datas}</tr>
        })
        return (<div>
            <Input  
                    elementType={this.state.Filter.elementType} 
                    elemConfig={this.state.Filter.elemConfig}
                    changed={this.search}></Input>
            <table id="activitytable">
                <caption>Activities & Events</caption>
                <thead onClick={(e) => this.sorttable(e)}>
                    <tr>{ths}</tr>
                </thead>
                <tbody>
                    {tds}
                </tbody>


            </table>
        </div>)
    }
}

export default Activities;