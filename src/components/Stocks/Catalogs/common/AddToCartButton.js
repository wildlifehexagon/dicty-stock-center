// @flow
import React from "react"
import { makeStyles } from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { green } from "@material-ui/core/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AddToCartDialog from "components/Stocks/Catalogs/common/AddToCartDialog"
import { useCartStore } from "components/ShoppingCart/CartStore"
import useCartItems from "hooks/useCartItems"

const useStyles = makeStyles(theme => ({
  cartButton: {
    color: green[600],
  },
}))

type Props = {
  /** Strain data */
  data: Array<{
    /** Strain ID number */
    id: string,
    /** Strain label (name) */
    name: string,
    /** Strain summary */
    summary: string,
  }>,
  /** Function to add to checked items array */
  setCheckedItems?: Function,
}

/**
 * AddToCartButton appears on the catalog page if the stock is available
 * for purchase.
 */

export const AddToCartButton = ({ data, setCheckedItems }: Props) => {
  const [{ showCartDialog, maxItemsInCart }] = useCartStore()
  const { addToCart } = useCartItems(data)
  const classes = useStyles()

  let button

  maxItemsInCart
    ? (button = (
        <Tooltip title="Shopping cart is full">
          <span>
            <IconButton
              disabled
              size="medium"
              aria-label="Shopping cart is full">
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon="cart-plus" />
                <FontAwesomeIcon icon="slash" />
              </span>
            </IconButton>
          </span>
        </Tooltip>
      ))
    : (button = (
        <IconButton
          size="medium"
          className={classes.cartButton}
          onClick={addToCart}
          title="Add to cart"
          aria-label="Add to shopping cart">
          <FontAwesomeIcon icon="cart-plus" />
        </IconButton>
      ))

  return (
    <>
      <strong>{button}</strong>
      {showCartDialog && (
        <AddToCartDialog data={data} setCheckedItems={setCheckedItems} />
      )}
    </>
  )
}

export default AddToCartButton
