
import { Button, Form } from 'react-bootstrap'
import CustomizeZone from './Customize/CustomizeZone'
import DraggableItem from './DraggableItem'
import React from 'react'
import { MdTextFields } from 'react-icons/md'
import { RxDropdownMenu } from 'react-icons/rx'
import { CiCalendarDate } from 'react-icons/ci'
import { IoMdCheckbox } from 'react-icons/io'
import { RiRadioButtonFill,RiInputMethodFill } from 'react-icons/ri'

const builderComponentsList = [
  {
    "type": "text-field",
    "text": "Text Field",
    "icon": <MdTextFields />,
    "sample": <Form.Control size="sm" disabled placeholder="Text Field" />
  },
  {
    "type": "drop-down",
    "text": "Drop Down",
    "icon": <RxDropdownMenu />,
    "sample": (
      <Form.Select size="sm" disabled  value={"default"}>
        <option disabled value={"default"} >Option 1</option>
      </Form.Select>
    )
  },
  {
    "type": "check-box",
    "text": "Check Box",
    "icon": <IoMdCheckbox />,
    "sample": (
      <div className='sample-checkbox-container'>
        <Form.Check
          size="sm"
          disabled
          type="checkbox"
          label="Label"
        />
      </div>
    )
  },
  {
    "type": "radio-button",
    "text": "Radio Button",
    "icon": <RiRadioButtonFill />,
    "sample": (
      <div className='sample-checkbox-container'>
        <Form.Check
          size="sm"
          disabled
          type="radio"
          label="Label"
        />
      </div>
    )
  },
  {
    "type": "text-area",
    "text": "Text Area",
    "icon": <RiInputMethodFill />,
    "sample": <Form.Control size="sm" as="textarea" rows={1} disabled className='sample-textarea' placeholder='Text Area' />
  },
  {
    "type": "date-picker",
    "text": "Date Picker",
    "icon": <CiCalendarDate />,
    "sample": <Form.Control size="sm" disabled placeholder="DD/MM/YYYY" />
  }
]

const DraggableZone = (props) => {
  const { selectedItem, setSelectedItem } = props
  return (
    <>
      <div className='draggablezone-container'>
        <div className='draggablezone-header'>
          <Button variant="light" size="sm" onClick={() => setSelectedItem(null)} >Back</Button>
        </div>
        {
          !selectedItem ?
            <div className='draggablezone-grid'>
              {
                builderComponentsList.map((elem, index) => {
                  return (
                    <React.Fragment key={index} >
                      <DraggableItem data={elem} />
                    </React.Fragment>
                  )
                })
              }
            </div>
            :
            <CustomizeZone selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        }
      </div>
    </>
  )
}

export default DraggableZone