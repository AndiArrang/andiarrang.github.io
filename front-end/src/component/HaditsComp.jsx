
import React from "react";
function HaditsComp(props) {
 console.log(props)
  return (
    <table>
    <div className="card">
    <div className="card-header ">
      <tr>
        <td>No. Hadits</td>
        <td>:</td>
        <td>
          <h5 className="card-title mr-auto">{props.data.No}</h5>
        </td>
      </tr>
      <tr>
        <td>Kitab</td>
        <td>:</td>
        <td>
          <h6 className="card-subtitle text-body-secondary">{props.data.Kitab}</h6>
        </td>
      </tr>
    </div>
    <div className="card-body bg-primary-subtle">
      <p className="card-text arab">{props.data.Arab}</p>
      <p className="card-text terjemah">{props.data.Terjemah}</p>
    </div>
  </div>
  </table>
  );
}

export default HaditsComp;