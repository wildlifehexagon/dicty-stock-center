// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { submitForm } from "actions/order/payment"
import EditPanel from "./EditPanel"
import User from "./User"
import PaymentMethod from "./PaymentMethod"
import SubmitButton from "./SubmitButton"
import PaymentAlert from "./PaymentAlert"
import { syncValidatePayment } from "forms/validate/order-form"
import { editShipping } from "actions/order/shipping"
import { sameAsShipping } from "actions/order/payment"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import {
  PanelGreen,
  DictyHeader,
  AlertBox,
  TextInfo,
  HorizontalForm,
  SuccessSmallButton
} from "styles"

export const fields = [
  "firstName",
  "lastName",
  "email",
  "org",
  "group",
  "address",
  "address2",
  "city",
  "state",
  "zip",
  "country",
  "phone",
  "payMethod",
  "poNum"
]

type Props = {
  order: Object,
  fields: Object,
  submitting: boolean,
  consumer: Object,
  editShipping: Function,
  sameAsShipping: Function,
  handleSubmit: Function,
  error: string
}

class Payment extends Component<Props> {
  render() {
    const { consumer, editShipping, sameAsShipping } = this.props
    const {
      submitting,
      handleSubmit,
      error,
      fields: {
        firstName,
        lastName,
        email,
        org,
        group,
        address,
        address2,
        city,
        state,
        zip,
        country,
        phone,
        payMethod,
        poNum
      }
    } = this.props
    return (
      <Flex wrap justify="center">
        <Box>
          <DictyHeader>
            <h2>Please enter payment information</h2>
          </DictyHeader>
        </Box>
        <Box w={["95%", "95%", "95%"]}>
          <Flex wrap justify="center">
            <Box w={"95%"}>
              <PanelGreen>
                <EditPanel
                  user={consumer}
                  edit={editShipping}
                  title={"Ship to:"}
                />
              </PanelGreen>
              <hr />
              <SuccessSmallButton type="button" onClick={sameAsShipping}>
                Same as shipping
              </SuccessSmallButton>{" "}
              Click here if payer address is the same as shipping address<br />
              <br />
            </Box>
          </Flex>
          <HorizontalForm onSubmit={handleSubmit}>
            <Flex wrap justify="center">
              <Box w={[1, 1, 1, 1 / 2]} mr={1}>
                <User
                  title={"Payer Address"}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  org={org}
                  group={group}
                  address={address}
                  address2={address2}
                  city={city}
                  state={state}
                  zip={zip}
                  country={country}
                  phone={phone}
                />
              </Box>
              <Box w={[1, 1, 1, "45%"]} mr={1}>
                <Flex>
                  <Box w={1}>
                    <PaymentMethod
                      title={"Payment Method"}
                      payMethod={payMethod}
                      poNum={poNum}
                    />
                  </Box>
                </Flex>
                <hr />
                <Flex>
                  <Box w={1}>
                    <PaymentAlert />
                  </Box>
                </Flex>
                <hr />
                {error && (
                  <Flex>
                    <Box w={1}>
                      <AlertBox>
                        <FontAwesome name="exclamation-circle" />
                        <strong> Error! </strong> {error}
                      </AlertBox>
                    </Box>
                  </Flex>
                )}
                <Flex justify="flex-end">
                  <Box w={[1, 1, 1, 1 / 2]}>
                    <SubmitButton
                      name={"Continue "}
                      submitting={submitting}
                      icon={"arrow-circle-right"}
                    />
                    <TextInfo>
                      <small>
                        You can review this order before it's final.
                      </small>
                    </TextInfo>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </HorizontalForm>
        </Box>
      </Flex>
    )
  }
}

// pull state into forms initial values,
// if user had already filled out the form
const mapStateToProps = state => {
  if (state.order.payer) {
    const { payer, payment } = state.order
    const {
      firstName,
      lastName,
      email,
      org,
      group,
      address,
      address2,
      city,
      zip,
      country,
      phone
    } = payer
    const { method, poNum } = payment

    return {
      initialValues: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        org: org,
        group: group,
        address: address,
        address2: address2,
        city: city,
        state: payer.state,
        zip: zip,
        country: country,
        phone: phone,
        payMethod: method,
        poNum: poNum
      }
    }
  }

  return {
    consumer: state.order.consumer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editShipping: () => {
      dispatch(editShipping())
    },
    sameAsShipping: () => {
      dispatch(sameAsShipping())
    }
  }
}

Payment = connect(mapStateToProps, mapDispatchToProps)(Payment)

export default reduxForm({
  form: "payment",
  fields,
  onSubmit: submitForm,
  validate: syncValidatePayment
})(Payment)
