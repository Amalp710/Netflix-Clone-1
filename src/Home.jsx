import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import "./Home.css"
import Banner from "./Components/Banner/Banner"
import RowPost from "./Components/RowPost/RowPost"
import { originals,actions,comedy,horror } from "./url"
import Footer from "./Components/Footer/Footer"

function Home() {
  return(
    <div className="Home">
      <Navbar/>
      <Banner/>
      <RowPost url={originals} title="Netflix Originals"/>
      <RowPost url={actions} title="Action" isSmall/>
      <RowPost url={comedy} title="Top Rated" isSmall/>
      <RowPost url={horror} title="Horror" isSmall/>
      <Footer/>

    </div>
  )
}

export default Home
