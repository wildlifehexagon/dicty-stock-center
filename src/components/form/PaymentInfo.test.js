import React from "react"
import "jest-styled-components"
import "../../setupTests"
import PaymentInfo from "./PaymentInfo"
import { shallow } from "enzyme"
import { FormControl, HelpBlock } from "styles"

describe("form/PaymentInfo", () => {
  const payMethod = { value: "Credit", touched: true }
  const poNum = { value: "", touched: true }

  const wrapper = shallow(<PaymentInfo payMethod={payMethod} poNum={poNum} />)

  it("should render poNum textbox only when payMethod is PO", () => {
    expect(wrapper.containsMatchingElement(<FormControl />)).toEqual(false)

    wrapper.setProps({ payMethod: { value: "PO", touched: true } })

    expect(wrapper.containsMatchingElement(<FormControl />)).toEqual(true)
  })

  it("should render validation error messages properly", () => {
    const field = { value: "", touched: true, error: "required" }
    wrapper.setProps({ payMethod: field })
    expect(wrapper.contains(<HelpBlock>{field.error}</HelpBlock>)).toEqual(true)
  })
})
