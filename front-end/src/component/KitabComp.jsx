import React from "react";
import { useNavigate } from 'react-router';
import '../style/KitabComp.css'
function KitabComp (props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${props.kitab}`)
  }
    return(
      <div onClick={handleClick} className="card">
        <div  className="card-body">
          <h5 className="card-title">{props.kitab}</h5>
        </div>
      </div>
    )
}

export default KitabComp;