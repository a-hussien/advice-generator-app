import { useState, useEffect } from 'react';
import axios from 'axios';
import 'normalize.css';
import 'animate.css';
import './App.css';

const App = () => {
  const [advice, setAdvice] = useState('No advice available for you at this moment :( ');
  const [color, setColor] = useState();

  const fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
    .then((res)=>{
      setAdvice(()=> {
        const {advice} = res.data.slip;
        return advice;
      })
      setColor('black')
    })
    .catch((err) => {
      setColor('#f64747')
      console.log(err)
    })
  }

  useEffect(() => {
    return fetchAdvice()
  }, []);

  return (
    <div className='app'>
      <div className='card'>
        <div className='advice'>
          <h1 className='heading animate__animated animate__flipInX' style={{color: color}}>
            {advice}
          </h1>
          <button className='getAdvice' onClick={ () => fetchAdvice() }>Advice Me</button>
        </div>
      </div>
    </div>
  )
}

export default App;
