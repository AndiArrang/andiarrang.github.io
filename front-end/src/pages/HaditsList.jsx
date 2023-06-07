import axios from "axios"
import React, { useState , useEffect, Fragment}  from "react"
import HaditsComp from "../component/HaditsComp"
const HaditsList = () => {
    const [data,setData] = useState([])

    const getApi = () => {
        const kitab = window.location.href.split('/')[3]
        console.log(kitab)
        axios.get(`http://localhost:3001/kitab/${kitab}`)
        .then((response) => {
            // handle success
            console.log(response.data.data)
            setData(response.data.data)
           
        })
    }

  
    useEffect(() => {
        getApi()
    },[])

    return(
        <Fragment>
            <table>
            {
                data.map((item,i) => {
                    return (
                        <HaditsComp key={i} data={item}/>
                    )
                })
            }
            </table>
        </Fragment>
    )
}

export default HaditsList;