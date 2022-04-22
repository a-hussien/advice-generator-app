import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'normalize.css';
import 'animate.css';
import './App.css';
import BackgroundImage1 from './images/workSpace1.jpg';
import BackgroundImage2 from './images/workSpace2.jpg';
import BackgroundImage3 from './images/workSpace3.jpg';
import BackgroundImage4 from './images/workSpace4.jpg';
import BackgroundImage5 from './images/workSpace5.jpg';

const initialState = {
  randomImg : 1,
  advice: "",
  color: "white",
  animation: ""
};

const images = [BackgroundImage1, BackgroundImage2, BackgroundImage3, BackgroundImage4, BackgroundImage5]

const App = () => {
  
  const [{ randomImg, advice, color, animation }, setState] = useState(initialState);
    
  const clearState = useCallback(() => {
    return setState({ ...initialState });
  }, []);

  const fetchAdvice = useCallback(() => {

    const randomImg = Math.floor(Math.random() * images.length);

    axios.get('https://api.adviceslip.com/advice')
    .then((res)=>{
      
      setState((prevState) => {
          const {advice} = res.data.slip;
          
          return ({ ...prevState, randomImg, advice, color: 'white', animation :'animate__flipInX' })
        }
      );
      
    })
    .catch((err) => {

      setState((prevState) => ({ ...prevState, randomImg, advice : 'No advice available for you at this moment :(', 
      color: '#f64747', animation :'animate__pulse' }));

      console.log(err)
    })

    clearState();

  }, [clearState])

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  return (
    <div className='app' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${images[randomImg]})`}}>
      <div className='card'>
        <div className='advice'>
          <h1 className={`heading animate__animated ${animation}`} style={{color: color}}>
            { !advice.length > 0 && (
              <div className="loadingio-spinner-spinner-7ot58maybvy">
                <div className="ldio-wo5mzaaryj">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </div>
              </div>
            )}

            {advice}
          </h1>
          <button className='getAdvice' onClick={ () => fetchAdvice() }>Advice Me</button>
        </div>
      </div>
    </div>
  )
}

export default App;
