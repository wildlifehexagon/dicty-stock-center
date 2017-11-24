import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PanelGroup, Panel, PanelHeader, PanelTitle, PanelBody } from 'dicty-components-panel'
import FormGroupInput from './form/FormGroupInput'
import Comments from './form/Comments'
import SubmitButton from './form/SubmitButton'
import { submitEmail } from 'actions/contact'
import { reduxForm } from 'redux-form'
import { syncValidate } from 'forms/validate/contact-form'
import { Flex, Box } from 'rebass'
import 'styles/custom.scss'

export const fields = ['name', 'email', 'subject', 'message']

const theme = {
    headerBackgroundColor: '#f9f9f9'
}

// still need to find way to add custom width/padding to new panels

class Contact extends Component {
    displayName = 'contact page'
    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool
    }
    render() {
        const {
            fields: { name, email, subject, message },
            handleSubmit,
            resetForm,
            submitting
        } = this.props
        return (
          <div className="container">
            <Flex wrap justify="center">
              <Box>
                  <h1 className="dicty-header">Contact Us</h1>
              </Box>
              <Box>
                  <p>For questions, comments, or suggestions, please fill out the form below
                    to send us an email&nbsp;
                    <a href="mailto:dictybase@northwestern.edu?Subject=Question" target="_top">
                      (dictybase@northwestern.edu)
                    </a>
                  </p>
              </Box>
              <Box>
                <PanelGroup theme={ theme }>
                <Panel collapse style={ {width: '100%'} }>
                  <PanelHeader style={ {padding: '20px'} }>
                      <PanelTitle>
                        <i className="fa fa-envelope-o"></i> Email dictyBase
                      </PanelTitle>
                  </PanelHeader>
                  <PanelBody>
                    <form onSubmit={ handleSubmit } className="form-horizontal">
                      <FormGroupInput field={ name } >
                          <span className="text-danger" title="required field">* </span>
                          Name:
                      </FormGroupInput>
                      <FormGroupInput field={ email } >
                          <span className="text-danger" title="required field">* </span>
                          Email:
                      </FormGroupInput>
                      <FormGroupInput field={ subject } >
                          Subject:
                      </FormGroupInput>
                      <Comments comments= { message } rows = { '5' }
                        placeholder = { 'Please enter your message here' }>
                          Message:
                      </Comments>
                      <Flex width={ 1 / 2 }>
                        <Box>
                          <button type="button" className="btn btn-default btn-lg btn-block"
                            disabled={ submitting }
                            onClick={ resetForm }>
                              Reset
                          </button>
                        </Box>
                        <Box>
                          <SubmitButton name={ 'Submit ' }
                            submitting={ submitting }
                            icon = { 'fa fa-paper-plane-o' }
                          />
                        </Box>
                      </Flex>
                    </form>
                  </PanelBody>
                </Panel>
                </PanelGroup>
              </Box>
            </Flex>
          </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.auth
    return {
        initialValues: {
            email: user ? user.email : ''
        }
    }
}

export default reduxForm({
    form: 'contact',
    fields,
    onSubmit: submitEmail,
    validate: syncValidate
},
mapStateToProps
)(Contact)
