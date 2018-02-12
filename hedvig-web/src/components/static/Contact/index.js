import React from "react"
import Header from "../../Header";
import Footer from "../../Footer"
import Hero from "../../Hero"
import { SayHi } from "../common"
import "./contact.css"


export default () => (
  <main className="Contact">
    <Header headerRight={<SayHi/>}/>
    <Hero
      imageUrl="/assets/web/Images/map.png"
      alt="Map centered on Hedvigs Office at Norrsken"
    />
    <article className="pure-g Contact__article">
      <h1 className="pure-u-1-1 Contact__header">Vill du komma i kontakt med oss?</h1>
      <section className="pure-u-1-1 Contact__text">
        <a href="mailto:hedvig@hedvig.com">hedvig@hedvig.com</a><br/>
        <a href="mailto:press@hedvig.com">press@hedvig.com</a><br/>
        <a href="mailto:careers@hedvig.com">careers@hedvig.com</a><br/>
      </section>
    </article>
    <Footer />
  </main>
)
