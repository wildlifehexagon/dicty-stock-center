import React, { Component, PropTypes } from 'react'
import Panel from 'dicty-react-components/src/Panel'
import PanelHeader from 'dicty-react-components/src/PanelHeader'
import PanelTitle from 'dicty-react-components/src/PanelTitle'
import PanelBody from 'dicty-react-components/src/PanelBody'
import FormPersonalInfo from './FormPersonalInfo'
import FormAddress from './FormAddress'
import FormContactInfo from './FormContactInfo'
import FormOrganization from './FormOrganization'
import FormPaymentMethod from './FormPaymentMethod'

export default class FormPayerInfo extends Component {
    displayName = 'component to input payer info into order-form';

    static propTypes = {
        firstName: PropTypes.object.isRequired,
        lastName: PropTypes.object.isRequired,
        org: PropTypes.object.isRequired,
        group: PropTypes.object.isRequired,
        address: PropTypes.object.isRequired,
        city: PropTypes.object.isRequired,
        state: PropTypes.object.isRequired,
        zip: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired,
        phone: PropTypes.object.isRequired,
        email: PropTypes.object.isRequired,
        payMethod: PropTypes.object.isRequired,
        poNum: PropTypes.object.isRequired,
        sameAsCustomer: PropTypes.object.isRequired
    }

    render() {
        const { firstName, lastName, org, group, address, address2, city, state,
            zip, country, phone, email, payMethod, poNum, sameAsCustomer } = this.props
        return (
            <Panel>
                <PanelHeader>
                    <PanelTitle>DSC Payment Information</PanelTitle>
                </PanelHeader>
                <PanelBody>
                    <div className="form-group">
                        <div className="col-sm-12">
                        <em className="checkbox">
                              <label><input type="checkbox" {...sameAsCustomer} />
                                Click here if payer is the same as customer
                              </label>
                        </em>
                        </div>
                    </div>
                    <FormPersonalInfo
                        firstName={ firstName }
                        lastName={ lastName }
                        email={ email }
                    />
                    <FormOrganization
                        org={ org }
                        group={ group }
                    />
                    <FormAddress
                        address={ address }
                        address2={ address2 }
                        city={ city }
                        state={ state }
                        zip={ zip }
                        country={ country }
                    />
                    <FormContactInfo phone={ phone } />
                    <FormPaymentMethod payMethod={ payMethod } poNum={ poNum }/>
                </PanelBody>
            </Panel>
        )
    }
}
