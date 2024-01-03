import React from "react";

const App = () => {
    const handleClick = async () =>{
        try {
            console.log('Click Me');
            const filePath = await window.electronAPI.openFile();
            console.log(filePath);
        } catch (error) {
            console.log(error);
        }  
    }

  return (
    <div id='root'>
    <h1>Hello Electron TypeScript React App!</h1>
    <button onClick={handleClick}>Click Me</button>
    </div>
    
  );
};

export default App;