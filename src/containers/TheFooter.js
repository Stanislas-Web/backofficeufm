import React from 'react'
import { CFooter } from '@coreui/react'

const myStyle ={
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  ZIndex: "3"
}

const TheFooter = () => {
  return (
    <di></di>
    // <CFooter fixed={false} >
    //   {/* <div style={{ marginLeft:"250px"}}>
    //     <a href="https://www.kinshasadigital.com/academy" target="_blank" rel="noopener noreferrer">Cartographie VBG</a>
    //     <span className="ml-1">&copy; 2020 .</span>
    //   </div>
    //   <div className="mfs-auto">
    //     <span className="mr-1">Powered by</span>
    //     <a href="https://www.kinshasadigital.academy" target="_blank" rel="noopener noreferrer">Kinshasa Digital Academy</a>
    //   </div> */}
    // </CFooter>
  )
}

export default React.memo(TheFooter)
