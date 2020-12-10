import React from 'react'
import {useState} from 'react'
import picture from '../assets/img/picture.png'
import text from '../assets/img/text.png'
import history from '../assets/img/history.png'
import './Card.css';
import axios from  '../axios.js';
import download from 'js-file-download';
import { Link } from 'react-router-dom'



function Card({userID}) {

  const [pdfText, setpdfText] = useState("");
  const [fileName, setFileName] = useState("");

    const convert=(e)=>{
      e.preventDefault();
    }

    const updateText = (e) =>{
      setpdfText(e.target.value);
    }

    const updateFileName=(e)=>{
      setFileName(e.target.value);
    }
    const convertToPDF=async(e)=>{
      e.preventDefault();
      console.log("Convert to pdf fffff");
      const res = await axios.post('/addConversion',{
        article:pdfText,
      },{
        responseType:'arraybuffer',
        encoding:null
      }).then(resp=>{
        download(resp.data,`${fileName}.pdf`);
      });;
      console.log(res);
      const update = await axios.post('/updateConversionHistory',{
        fileName:fileName,
        userID:userID
      });
      console.log(update.data);
      
    }


    return (
        <div className="section-2">
        <div>
        <h2 className="section-heading text-uppercase">Features</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
            <div class="card">
            <centre>
            <img src={history} class="small-pic" alt="..." />
            </centre>
            <div class="card-body">
              <h5 class="card-title">History</h5>
              <p class="card-text">Check your History.</p>
              <Link to={`/history/:${userID}`}>
                <a href="#" class="btn btn-primary">History</a>
              </Link>
            </div>
            </div>

            </div>
          <div className="col-sm">
          <div class="card">
          <centre>
<img src={text} class="small-pic" alt="..." />
</centre>
<div class="card-body">
  <h5 class="card-title">Text to PDF</h5>
  <p class="card-text">Convert Text to PDF.</p>
  <a href="#box" class="btn btn-primary">Convert Below</a>
</div>
</div>

          </div>
          
        </div>
      </div>
      <div className="text__input">
        <input value = {fileName} onChange={updateFileName} placeholder="<File Name>.pdf" />
      </div>

      <div className="text__input" id="box">
        <textarea rows = "25" cols="130" value = {pdfText} onChange={updateText} type="text" size="50"/>
      </div>

      <a onClick={convertToPDF} href="#" class="btn btn-primary">Convert</a>

    </div>
    )
}

export default Card 
