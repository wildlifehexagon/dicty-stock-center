import React, { Component } from 'react'
import 'styles/core.scss'

export default class Order extends Component {
    displayName = 'order parent component'

    renderChildren = () => {
        const { children, order, orderActions, cart } = this.props
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                order: order,
                orderActions: orderActions,
                cart: cart
            })
        })
    }

    render() {
        return (
            <div className="container">
                { this.renderChildren() }
            </div>
        )
    }
}
