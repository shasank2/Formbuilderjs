import { Button, Form } from 'react-bootstrap'
import './customizezone.css'
import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../../../context/GlobalContext';
import DropDownOptions from './SpecialCustomizations/DropDownOptions/DropDownOptions';
import { basicValidationFunction } from "../../../../validationSchema/BasicFieldsValidation"
import { DROPDOWN, DROPDOWNSTEP } from '../../../../utils/componentTypes';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const CustomizeZone = (props) => {

  const { selectedItem, setSelectedItem } = props
  const { formState, setformState, specialCustomizationStep, setSpecialCustomizationStep } = useContext(GlobalContext);
  const [fieldType, setFieldType] = useState(null)

  const { register, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(basicValidationFunction())
  });

  const [individualItemState, setIndividualItemState] = useState({
    type: "",
    text: "",
    id: "",
    name: "",
    label: "",
    isRequried: false,
    validationMessage: "",
  })

  useEffect(() => {
    let foundSelectedObject = formState.find((elem) => elem.id === selectedItem)
    // setIndividualItemState((prev) => ({
    //   ...prev,
    //   ...foundSelectedObject
    // }))
    // console.log(foundSelectedObject)
    setValue("selectedState", foundSelectedObject)
    setFieldType(watch("selectedState.type"));
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
                  {...register("selectedState.label")}
                  type="text" autoComplete="new-password"
                  // name='label'
                  // onChange={(e) => setIndividualItemState((prev) => ({ ...prev, label: e.target.value }))}
                  // value={individualItemState.label}
                  isInvalid={!!errors?.selectedState?.label?.message}
                />
                {errors?.selectedState?.label && <Form.Control.Feedback type="invalid">{errors?.selectedState?.label.message}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("selectedState.name",{
                    onChange:
                  }) }
                  type="text" autoComplete="new-password"
                  // name='name'
                  // onChange={(e) => setIndividualItemState((prev) => ({
                  //   ...prev,
                  //   name: e.target.value.toLowerCase()
                  //     .replace(/ /g, '-')
                  //     .replace(/[^\w-]+/g, '')
                  // }))}
                  // value={individualItemState.name}
                  isInvalid={!!errors?.selectedState?.name?.message}
                />
                {errors?.selectedState?.name && <Form.Control.Feedback type="invalid">{errors?.selectedState?.name.message}</Form.Control.Feedback>}
              </Form.Group>

              {
                fieldType === DROPDOWN ?
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
                {...register("selectedState.isRequired")}
              // onChange={(e) => { setIndividualItemState((prev) => ({ ...prev, isRequried: e.target.checked })), setValue("isRequried", e.target.checked) }}
              // checked={individualItemState.isRequried}
              />

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Validation Message</Form.Label>
                <Form.Control type="text"
                  {...register("selectedState.validationMessage")}
                  disabled={!individualItemState.isRequried}
                  autoComplete="new-password"
                  // onChange={(e) => setIndividualItemState((prev) => ({ ...prev, validationMessage: e.target.value }))}
                  // value={individualItemState.validationMessage}
                  // name='validationMessage'
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