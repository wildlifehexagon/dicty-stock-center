// @flow
import React, { useState } from "react"
import { Form, Formik } from "formik"
import { useMutation } from "@apollo/react-hooks"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import ShippingPage from "./Shipping/ShippingPage"
import PaymentPage from "./Payment/PaymentPage"
import SubmitPage from "./Submit/SubmitPage"
import initialValues from "./utils/initialValues"
import validationSchema from "./utils/validationSchema"
import useStyles from "./formStyles"
import { removeFromCart, useCartStore } from "components/ShoppingCart/CartStore"
import { POST_ORDER } from "queries/queries"
import OrderFormStepper from "./OrderFormStepper"

const pages = [ShippingPage, PaymentPage, SubmitPage]

type Props = {
  /** React Router History */
  history: Object,
}

/**
 * OrderForm is the main component used for the checkout process.
 */

const OrderForm = ({ history }: Props) => {
  const classes = useStyles()
  const [{ addedItems }, dispatch] = useCartStore()
  const [pageNum, setPageNum] = useState(0)
  const PageComponent = pages[pageNum]
  const [createOrder] = useMutation(POST_ORDER)

  return (
    <Grid container spacing={2} className={classes.layout}>
      <Helmet>
        <title>Order Form - Dicty Stock Center</title>
        <meta name="description" content="Order form for Dicty Stock Center" />
      </Helmet>
      <Grid item xs={12}>
        <center>
          <h1>Checkout</h1>
        </center>
        <OrderFormStepper pageNum={pageNum} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false)
            await createOrder({
              variables: {
                input: {
                  courier: values.shippingAccount,
                  courier_account: values.shippingAccountNumber,
                  comments: values.comments,
                  payment: values.paymentMethod,
                  purchase_order_num: values.purchaseOrderNum,
                  status: "IN_PREPARATION",
                  consumer: values.email,
                  payer: values.payerEmail,
                  purchaser: values.email,
                  items: addedItems.map(item => item.id),
                },
              },
            })
            history.push("/order/submitted")
            addedItems.forEach(item =>
              removeFromCart(dispatch, addedItems, item.id),
            )
          }}>
          {props => (
            <Form>
              <PageComponent
                {...props}
                pageNum={pageNum}
                setPageNum={setPageNum}
              />
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default OrderForm
