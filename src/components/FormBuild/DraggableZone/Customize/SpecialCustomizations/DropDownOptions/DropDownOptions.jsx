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
    let updatedFormState = formState.map((elem) => {
      if (elem.id === selectedItem) {
        return ({ ...elem, source: value })
      }
      return elem
    })
    setformState(updatedFormState)
  }

  console.log(errors)

  return (
    <>
      <Form.Check
        type="switch"
        label="Set Through API"
        {...register("selectedState.source", {
          onChange: (e) => {
            let val = e.target.checked ? "url" : "options"
            setValue("selectedState.source", val)
            handleChangeSourceInContext(val)
          },
        })}
        checked={formState.find((elem) => elem.id === selectedItem).source === "url" ? true : false}
      />
      {
        formState.find((elem) => elem.id === selectedItem).source === "url" ?
          <div>
            <Form.Group className="mb-3">
              <Form.Label>API URL</Form.Label>
              <Form.Control type="text" autoComplete="new-password"
                {...register("selectedState.apiUrl")}
                isInvalid={!!errors?.selectedState?.apiUrl?.message}
              />
              {errors?.selectedState?.apiUrl && <Form.Control.Feedback type="invalid">{errors?.selectedState?.apiUrl.message}</Form.Control.Feedback>}
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