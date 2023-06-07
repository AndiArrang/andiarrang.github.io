import axios from "axios"
import React, { useState , useEffect, Fragment}  from "react"

import KitabComp from '../component/KitabComp';
// import Menu from "../component/Navbar";
const KitabList = () => {
    const [data,setData] = useState([])
    // const [result,setResult] = useState([])
   
    const getApi = () => {
        axios.get('http://localhost:3001/kitab')
        .then((response) => {
            // handle success
            console.log(response.data)
            setData(response.data.data)
           
        })
    }

    useEffect(() => {
        getApi()
    },[])

    return(
        <Fragment>       
            <h1>Daftar Kitab</h1>
                {    
                    data.map((item,i) => { 
                        return (       
                            <KitabComp key={i} kitab={item.Kitab} />
                        )
                    })
                }      
        </Fragment>
    )
}

export default KitabList;