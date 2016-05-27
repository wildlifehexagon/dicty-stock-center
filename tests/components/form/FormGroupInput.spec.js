import React from 'react'
import FormGroupInput from 'components/form/FormGroupInput'
import { mount } from 'enzyme'

describe('components', () => {
    describe('form/FormGroupInput', () => {
        let wrapper = mount(<FormGroupInput
            field ={ {value: '', touched: true} }
        />)

        // const wrapperWithError = shallow(<FormGroupInput
        //     field ={ {value: 'John', touched: true, error: 'error'} }
        // />)

        it('should render an input field', () => {
            expect(wrapper.find('input')).to.exist
        })

        it('should add has-error class when there is a validation error', () => {
            expect(wrapper.find('.form-group').hasClass('has-error')).to.equal(false)
            wrapper.setProps({field: {touched: true, error: 'error'}})
            expect(wrapper.find('.form-group').hasClass('has-error')).to.equal(true)
        })
        it('should render validation error messages properly', () => {
            expect(wrapper.hasClass('help-block')).to.equal(false)

            const field = {value: '', touched: true, error: 'required'}
            wrapper.setProps({field})
            expect(wrapper.contains(
                <div className="help-block">{ field.error }</div>
            )).to.equal(true)
        })
    })
})
