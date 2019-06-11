import React from "react"
import { shallow } from "enzyme"
import PaymentAddressInformation from "./PaymentAddressInformation"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import TextField from "../TextField"

describe("OrderForm/Shipping/PaymentAddressInformation", () => {
  const props = {
    classes: {
      requiredText: "requiredText",
    },
    values: {
      country: "Iceland",
    },
  }
  const wrapper = shallow(<PaymentAddressInformation {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find(Grid)).toHaveLength(12)
      expect(wrapper.dive().find(TextField)).toHaveLength(5)
      expect(wrapper.dive().find(Select)).toHaveLength(1)
    })
  })
})
