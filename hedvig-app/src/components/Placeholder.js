import React from "react"
import Placeholder from "rn-placeholder"
import { TextplainerStyle } from "./Styles"

export const ImageContentPlaceholder = () => {
  return (
    <Placeholder.ImageContent
      position="left"
      hasRadius
      lineNumber={5}
      textSize={14}
      lineSpacing={5}
      color="gainsboro"
      width="100%"
      lastLineWidth="30%"
      firstLineWidth="10%"
    />
  )
}

export const Textplainer = ({ text }) => {
  return (
    <TextplainerStyle>
      {text}
    </TextplainerStyle>
  )
}
