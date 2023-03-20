import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import useState from "next/script"
import React from 'react'



export default function Home() {

  const [inputValueTitle, setInputValueTitle] = React.useState<string>('');
  const [inputValueContent, setInputValueContent] = React.useState<string>('');
  const [ValueJson, setValueJson] = React.useState<string>('');

  const handleInputChangeT = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputValueTitle(event.target.value);
  };
  
  const handleInputChangeC = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputValueContent(event.target.value);
  };

  const handleButtonClick = async () => {
    const response = await fetch('/api/add_item', {
      method: 'POST',
      
      body: JSON.stringify({ title : inputValueTitle,
                             content : inputValueContent }),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    if (!response.ok)
    {
      throw new Error(`Error! status: ${response.status}`);

    }
  };


  const handleButtonShow = async () => {
    const response = await fetch('/api/recup_item', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    const data = await response.json();

    setValueJson(JSON.stringify(data));
    
    if (!response.ok)
    {
      throw new Error(`Error! status: ${response.status}`);

    }
  };

  handleButtonShow
return (
  <>
        <div id='body'>
          <div id='form'>
            <h1>truc a envoyer :</h1>
            <div id='elem'>
              <input type="text" value={inputValueTitle} onChange={handleInputChangeT} placeholder='titre'/>
              <input type="text" value={inputValueContent} onChange={handleInputChangeC} placeholder='contenu'/>

              <button onClick={handleButtonClick}>Submit</button>
            </div>
          </div>

          <h1> les trucs deja stocké :</h1>
          <button onClick={handleButtonShow}>Submit</button>
          <p> {ValueJson}</p>
        </div>


  </>
)
}