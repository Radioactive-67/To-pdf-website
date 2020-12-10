import React from 'react'
import {useEffect,useState} from 'react'
import axios from '../axios.js'
import  {useParams} from 'react-router';


function Histroy() {

    const params = useParams();
    const [historyData, sethistoryData] = useState([])

    useEffect(() => {
        console.log(params.userID);
        axios.get('/getHistory',{
            "params":{
                "userID":params.userID.substring(1,params.userID.length),
            }
        }).then(res=>{
            console.log(res);
        sethistoryData(res.data.pastConversion);
        });
        
    }, [])
    return (
        <div>
            <h1>The history of the user is</h1>   
            {
                (historyData.length===0)?(<h3>No Data Available</h3>):(
                    
                    historyData.map((conversion)=>(
                        <div>
                            <p>{conversion.fileName}</p>
                            <p>{conversion.timeOfConversion}</p>
                        </div>
                    ))    
                    
                )
                    
                
            }
        </div>
    )
}

export default Histroy
