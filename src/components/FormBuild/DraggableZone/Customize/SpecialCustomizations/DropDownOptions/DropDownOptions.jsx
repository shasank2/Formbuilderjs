import { Form } from 'react-bootstrap'
import CustomOptions from './CustomOptions'
import "./dropdownoptions.css"
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../../../context/GlobalContext'

const DropDownOptions = (props) => {
  const { individualItemState, setIndividualItemState, selectedItem, register, getValues, watch, setValue, errors } = props
  const { formState, setformState } = useContext(GlobalContext);

  useEffect(() => {
    let foundSelectedObject = formState.find((elem) => elem.id === selectedItem)
    setValue("selectedState.source", foundSelectedObject.source)
  }, [selectedItem])

  const handleChangeSourceInContext = (value) => {
    let foundSelectedObject = formState.find((elem) => elem.id === selectedItem)
    
    // setformState((prev) => ({ ...prev,foundSelectedObject }))
  }

  return (
    <>
      <Form.Check
        type="switch"
        label="Set Through API"
        {...register("selectedState.source", {
          onChange: (e) => {
            let val =  e.target.checked ? "url" : "options"
            setValue("selectedState.source", val)
            handleChangeSourceInContext(val)
          },
        })}
        checked={watch("selectedState.source") === "url" ? true : false}
      />
      {
        watch("selectedState.source") === "url" ?
          <div>
            <Form.Group className="mb-3">
              <Form.Label>API URL</Form.Label>
              <Form.Control type="text" autoComplete="new-password"
                onChange={(e) => setIndividualItemState((prev) => ({ ...prev, apiUrl: e.target.value }))}
                value={individualItemState.apiUrl}
              />
            </Form.Group>
          </div>
          :
          <CustomOptions
            individualItemState={individualItemState}
            setIndividualItemState={setIndividualItemState}
            selectedItem={selectedItem}
          />
      }
    </>
  )
}

export default DropDownOptions