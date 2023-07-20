//import logo from './logo.svg';
import './App.css';
import EmailForm from './Components/form';
import Navbar from './Components/navbar';

import Gallery from './Components/Gallery';

function App() {
  return (
    <div className="App  h-[1000vh]   ">
      <div className=' fixed  text-center  w-[100vw] p-[20px]'>
      <Navbar/>
       <h3 className='text-white ff text-center mt-[10px] '>COMING SOON</h3>
       <EmailForm/>
       <br/>
        <div className="text-center jj text-gray-500 text-[25px] font-bold">Countdown to Digital Awesomeness: Brace Yourself for the Unveiling!</div>
        </div>
        <div className='bg-fixed ' >
          <Gallery/>
      
        </div>
        {/* <Contact/> */}
            
      
      
    </div>
  );
}

export default App;
