
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const handleClick = async () =>{
        try {
            console.log('Click happened');
            const filePath = await window.electronAPI.openFile;
            console.log(filePath);
        } catch (error) {
            console.log(error);
        }  
    }

  return (
    <>
    <h1>Hello Electron TypeScript React App!</h1>
    <button onClick={handleClick}>Click Me</button>
    </>
    
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
