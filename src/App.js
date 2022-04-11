import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'normalize.css';
import 'animate.css';
import './App.css';

const initialState = {
  advice: "",
  color: "black",
  animation: ""
};

const App = () => {
 
  const [{ advice, color, animation }, setState] = useState(initialState);
    
  const clearState = useCallback(() => {
    return setState({ ...initialState });
  }, []);

  const fetchAdvice = useCallback(() => {

    axios.get('https://api.adviceslip.com/advice')
    .then((res)=>{
      
      setState((prevState) => {
          const {advice} = res.data.slip;
          return ({ ...prevState, advice, color: 'black', animation :'animate__flipInX' })
        }
      );
      
    })
    .catch((err) => {
      setState((prevState) => ({ ...prevState, advice : 'No advice available for you at this moment :(', 
      color: '#f64747', animation :'animate__pulse' }));

      console.log(err)
    })

    clearState();

  }, [clearState])

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  return (
    <div className='app'>
      <div className='card'>
        <div className='advice'>
          <h1 className={`heading animate__animated ${animation}`} style={{color: color}}>
            { !advice.length > 0 && (
              <span>loading...</span>
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
