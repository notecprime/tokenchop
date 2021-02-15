import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import MainWindow from './components/MainWindow';
import SiteHeader from './components/SiteHeader';
import { getLibrary } from './utils';
import { isMobile, browserName, CustomView } from 'react-device-detect';



// function App() {
//   return (
//     <>
//       <CustomView condition={!isMobile && browserName === "Chrome"}>
//         <Web3ReactProvider getLibrary={getLibrary}>
//           <SiteHeader></SiteHeader>
//           <MainWindow></MainWindow>
//         </Web3ReactProvider>
//       </CustomView>
//       <CustomView condition={isMobile || browserName !== "Chrome"}>
//         Sorry. This application only runs in Chrome Desktop at the moment... :(
//       </CustomView>
//     </>
//   );
// }


function App() {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SiteHeader></SiteHeader>
        <MainWindow></MainWindow>
      </Web3ReactProvider>
    </>
  );
}

export default App;
