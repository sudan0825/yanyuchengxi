import React from 'react';
import mystyle from '../../containers/home/home.module.css';
import { Link } from 'react-router-dom'

const Heart = (props) => {

     return <div className={mystyle.persernalInfo} onClick={props.click}>

          <div className={mystyle.heartcontainer}
               onClick={props.clickHeart}>
               {/* &#9829; */}
               <div className={mystyle.infoInHeartl}>
                    <p> {props.data.Name}</p>
                    <p>{props.data.Gender} </p>
                    <p>{props.data.Age} </p>

               </div>
               <div className={mystyle.infoInHeartr}>
                    <p>{props.data.Occupation} </p>
                    <p>{props.data.Location} </p>
               </div>

          </div>

          <div className={mystyle.info}>
               <div className={mystyle.smallhearttag} title="favorit me"></div>
               <p>{props.data.SelfIntro} </p>
               <p>
                    <Link to={"personalprofile?id=" + props.data.Name}>
                         Click
              </Link>
               </p>
          </div>


     </div>
}

export default Heart;