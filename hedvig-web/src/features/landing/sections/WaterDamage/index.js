import React from "react"
import Lottie from "react-lottie"

import "./waterdamage.css"

const getAnimationDimensions = () => {
  let width = window.innerWidth
  if (width < 576) {
    return {
      height: 520,
      width: 347
    }
  } else {
    return {
      height: 615,
      width: 410
    }
  }
}
const animationDimensions = getAnimationDimensions()

const width = window.innerWidth

const WaterDamage = () => (
    <section className="pure-g WaterDamage">
      <div className="pure-u-1-1">
        <div className="WaterDamage__relative-container">
          <div className="WaterDamage__animations">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: require("../../../../bundledAssets/animations/desktop.json")
              }}
              height={animationDimensions.height}
              width={animationDimensions.width}
            />
            { width > 800 ? (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: require("../../../../bundledAssets/animations/drawer.json")
                }}
                height={animationDimensions.height}
                width={animationDimensions.width}
              />
            ) : null }
          </div>
          <div className="WaterDamage__text">
            <h1 className="WaterDamage__heading">Hemförsäkring för dig<br/> som bor i lägenhet</h1>
            <p className="WaterDamage__subtext">Omdesignat från grunden. Så ditt liv blir enklare,<br/> och försäkring äntligen känns schysst</p>
          </div>
        </div>
      </div>
    </section>
)

export default WaterDamage
