import React from 'react'
import { Form } from 'react-bootstrap'
import { CiCalendarDate } from 'react-icons/ci'
import { IoMdCheckbox } from 'react-icons/io'
import { MdTextFields } from 'react-icons/md'
import { RiInputMethodFill, RiRadioButtonFill } from 'react-icons/ri'
import { RxDropdownMenu } from 'react-icons/rx'

const DroppableSampleField = (props) => {

  const { itemData } = props

  switch (itemData.type) {
    case "text-field":
      return (
        <>
          <div className="item-heading">
            <MdTextFields size={"20"} />
            {itemData.text}
          </div>
          <div className="item-body">
            <Form.Control size="sm" disabled placeholder="Text Field" />
          </div>
        </>
      )
    case "drop-down":
      return (
        <>
          <div className="item-heading">
            <RxDropdownMenu size={"20"} />
            {itemData.text}
          </div>
          <div className="item-body">
            <Form.Select size="sm" disabled value={"default"}>
              <option value={"default"} >Option 1</option>
            </Form.Select>
          </div>
        </>
      )
    case "check-box":
      return (
        <>
          <div className="item-heading">
            <IoMdCheckbox size={"20"} />
            {itemData.text}
          </div>
          <div className="item-body">
            <div className='sample-checkbox-container'>
              <Form.Check
                size="sm"
                disabled
                type="checkbox"
                label="Label"
              />
            </div>
          </div>
        </>
      )
    case "radio-button":
      return (
        <>
          <div className="item-heading">
            <RiRadioButtonFill size={"20"} />
            {itemData.text}
          </div>
          <div className="item-body">
            <div className='sample-checkbox-container'>
              <Form.Check
                size="sm"
                disabled
                type="radio"
                label="Label"
              />
            </div>
          </div>
        </>
      )
    case "text-area":
      return (
        <>
          <div className="item-heading">
            <RiInputMethodFill size={"20"} />
            {itemData.text}
          </div>
          <div className="item-body">
            <Form.Control size="sm" as="textarea" rows={1} disabled className='sample-textarea' placeholder='Text Area' />
          </div>
        </>
      )
    case "date-picker":
      return (
        <>
          <div className="item-heading">
            <CiCalendarDate size={"20"} />
            {itemData.text}
          </div>
          <div className="item-body">
            <Form.Control size="sm" disabled placeholder="DD/MM/YYYY" />
          </div>
        </>
      )
    default:
      return (
        <Form.Control size="sm" disabled placeholder="Text Field" />
      )
  }

}

export default DroppableSampleField