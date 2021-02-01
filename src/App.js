import React,{ useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import PText from 'react-predictive-text';
import cheeseImg from './images/cheese.jpg';
import { BrowserRouter} from 'react-router-dom';
import cheese_names_array from './cheese-names';
import ScrollArrow from './scrollArrow';
import prof_pic from "./images/avatar.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './website.css';

const App = () => {
  const [cheeses, setCheeses]= React.useState([]);
  const [selected, setSelected]= React.useState('');
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //const url = "https://9ofhfkvsec.execute-api.us-east-2.amazonaws.com/latest/cheeses";
  const url = "https://ifv3jtog27.execute-api.us-east-2.amazonaws.com/latest/latest/cheeses"
  React.useEffect( () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCheeses(data);
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
   }, []  );  // Notice the dependecy array
    

  let letter = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const links = [];
  letters.map(letter => (
        links.push('/#'.concat(letter)) 
  ));  



  return (
    <>
      <div id="container">
      <ScrollArrow/>
       <header>  {/*<!-- Header element -->  */}
         <img id="prof_pic" src={prof_pic} alt="Segovelo" width="150" height="150"/>
         <div id="divHeader"><h1>Segovelo Cheese App</h1></div>
       </header> {/* <!-- ****************  End of "header" *************  --> */}


    <div className='outer-container'>
    <div className="inner-container">
       
    <div  className="div-links">
      <BrowserRouter>
      { letters.map( letter => (
            <Link to ={links[letters.indexOf(letter)]} className="link-letters">{letter}</Link>
        ))
      }
     </BrowserRouter>
    </div>



    <div className="div-cheese-search">
     <div className="div-predictive-text">       
        <PText 
          options = {cheese_names_array}          
          onSelect={(cheese) => setSelected(cheese) }          
          optionColor={'#95C8D8'}
          optionStyles={{size : '20px', background:'#ffffff'}}
          textStyles = {{ width: '100px'}}
          wrapperStyles={{padding:'5px', margin:'3px',
                          display:'block'
                }}        
        />
        </div>
        <div className="div-search-button">
        <BrowserRouter>
        <Link to = {'/#'.concat(selected.toLowerCase().split(' ').join('-'))} className="link-cheeses">
          {'Search'}
        </Link>
        </BrowserRouter>
    </div>
    </div>


    <div className="cheeses-div">     
      {cheeses.map( cheese => (
                <div id={cheese.name.toLowerCase().split(' ').join('-')}>
                  {
                    (letter !== cheese.name.substring(0,1)) &&  
                    (letter = cheese.name.substring(0,1) ) &&                                       
                    <p className="p-letter" id={letter}> 
                       {letter}
                    </p>    
                  }                
                <CheeseCard 
                  name={cheese.name}
                  description={cheese.description}
                  image={cheese.image}
                />
               </div>
                )
      
      )}
    </div>
    </div>

    <footer>
        <h1>I would rather lose myself in passion than lose my passion</h1>
        <h3>Jacques Mayol</h3>
        <p>Last Update: 25th January 2021 </p>
    </footer>   {/* <!-- ********* End of footer ************** --> */}
    </div>
    </div>
     </>
  ); 

};
 


const CheeseCard = props => {
  const [show, setShow] = React.useState(false);
    return(
      <div>
       <div className="div-button">    
       <button className="button-name"
       onClick={() => {setShow(!show)}}>
        <p className="p-name"> {props.name} </p>
     </button>
     </div>
     
    {show &&
      <div className="div-description">
        <div>
          <img className="cheese-img" src={props.image} onError={(e)=>{e.target.onerror = null; e.target.src=cheeseImg; e.target.alt="Not actual image of cheese"}} alt={props.name}/>
        </div>
        <p className="p-description">{props.description}</p>
      </div>
    }
    </div>
    );
};

export default App;
