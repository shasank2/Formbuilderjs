import { Button, Form } from 'react-bootstrap'
import './customizezone.css'
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../context/GlobalContext';
import DropDownOptions from './SpecialCustomizations/DropDownOptions/DropDownOptions';
import { basicValidationFunction } from "../../../../validationSchema/BasicFieldsValidation"
import { DROPDOWN, DROPDOWNSTEP } from '../../../../utils/componentTypes';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const CustomizeZone = (props) => {

  const { selectedItem, setSelectedItem } = props
  const { formState, setformState, specialCustomizationStep, setSpecialCustomizationStep } = useContext(GlobalContext);

  const { register, handleSubmit, getValues, setValue, formState: { errors,touchedFields} } = useForm({
    resolver: yupResolver(basicValidationFunction())
  });
console.log(touchedFields)
  const [individualItemState, setIndividualItemState] = useState({
    type: "",
    text: "",
    id: "",
    name: "",
    label: "",
    isRequried: false,
    validationMessage: "oiasjdioj",
  })

  useEffect(() => {
    let foundSelectedObject = formState.find((elem) => elem.id === selectedItem)
    setIndividualItemState((prev) => ({
      ...prev,
      ...foundSelectedObject
    }))

  }, [selectedItem])

  const onSubmit = async () => {
    let updatedArray = formState.map((obj) => {
      if (obj.id === individualItemState.id) {
        return individualItemState
      }
      return obj
    })
    setformState(updatedArray)
  }

  console.log(errors)
  return (
    <Form className='customize-container' onSubmit={handleSubmit(onSubmit)} >

      {
        specialCustomizationStep === null ?
          <>
            <div>
              <h5>Basics</h5>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Label</Form.Label>
                <Form.Control
                  {...register("label")}
                  type="text" autoComplete="new-password"
                  name='label'
                  onChange={(e) => setIndividualItemState((prev) => ({ ...prev, label: e.target.value }))}
                  value={individualItemState.label}
                  isInvalid={!!errors?.label?.message}
                />
               {errors?.label && <Form.Control.Feedback type="invalid">{errors?.label.message}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text" autoComplete="new-password"
                  name='name'
                  onChange={(e) => setIndividualItemState((prev) => ({
                    ...prev,
                    name: e.target.value.toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, '')
                  }))}
                  value={individualItemState.name}
                  isInvalid={!!errors?.name?.message}
                />
               {errors?.name && <Form.Control.Feedback type="invalid">{errors?.name.message}</Form.Control.Feedback>}
              </Form.Group>

              {
                individualItemState.type === DROPDOWN ?
                  <Button variant="primary" type="button" style={{ width: "100%" }} onClick={() => setSpecialCustomizationStep(DROPDOWNSTEP)} >
                    Edit Options
                  </Button>
                  : null
              }
            </div>

            <div>
              <h5>Validations</h5>
              <Form.Check
                type="switch"
                label="Is Required"
                className="mb-3"
                id="isRequired"
                {...register("isRequired")}
                onChange={(e) => { setIndividualItemState((prev) => ({ ...prev, isRequried: e.target.checked })), setValue("isRequried", e.target.checked) }}
                checked={individualItemState.isRequried}
              />

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Validation Message</Form.Label>
                <Form.Control type="text"
                  {...register("validationMessage")}
                  disabled={!individualItemState.isRequried}
                  autoComplete="new-password"
                  onChange={(e) => setIndividualItemState((prev) => ({ ...prev, validationMessage: e.target.value }))}
                  value={individualItemState.validationMessage}
                  name='validationMessage'
                  isInvalid={!!errors.validationMessage?.message}
                />
               {errors.validationMessage && <Form.Control.Feedback type="invalid">{errors.validationMessage.message}</Form.Control.Feedback>}
              </Form.Group>
            </div>
          </>
          :
          specialCustomizationStep === DROPDOWNSTEP ?
            <DropDownOptions
              individualItemState={individualItemState}
              setIndividualItemState={setIndividualItemState}
              selectedItem={selectedItem}
            /> : null

      }
      <Button variant="primary" type="submit"  >
        Submit
      </Button>
    </Form>
  )
}

export default CustomizeZone