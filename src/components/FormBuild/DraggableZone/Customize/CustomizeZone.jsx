import { Button, Form } from 'react-bootstrap'
import './customizezone.css'
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../context/GlobalContext';
import DropDownOptions from './SpecialCustomizations/DropDownOptions/DropDownOptions';
import { basicValidationFunction } from "../../../../validationSchema/BasicFieldsValidation"
import { DROPDOWN, DROPDOWNSTEP } from '../../../../utils/componentTypes';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { dropDownSchema } from '../../../../validationSchema/DropdownFieldValidation';


const CustomizeZone = (props) => {

  const { selectedItem, setSelectedItem } = props
  const { formState, setformState, specialCustomizationStep, setSpecialCustomizationStep } = useContext(GlobalContext);
  const [fieldType, setFieldType] = useState(null)

  const selectValidationConditionally = () => {
    if (specialCustomizationStep === DROPDOWNSTEP) {
      return dropDownSchema
    } else {
      return basicValidationFunction()
    }
  }

  const { register, handleSubmit, setError, getValues, setValue, watch, formState: { errors }, control } = useForm({
    resolver: yupResolver(selectValidationConditionally())
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
    setValue("selectedState", foundSelectedObject)
    setFieldType(watch("selectedState.type"));
  }, [selectedItem])

  const onSubmit = async () => {
    let updatedArray = formState.map((obj) => {
      if (obj.id === watch("selectedState.id")) {
        return watch("selectedState")
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
                  isInvalid={!!errors?.selectedState?.label?.message}
                />
                {errors?.selectedState?.label && <Form.Control.Feedback type="invalid">{errors?.selectedState?.label.message}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("selectedState.name", {
                    onChange: (e) => setValue("selectedState.name", e.target.value.toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, ''))
                  })}
                  type="text" autoComplete="new-password"
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
                onChange={(e) => { setValue("selectedState.isRequried", e.target.checked), setError("selectedState.validationMessage", null) }}
              />

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Validation Message</Form.Label>
                <Form.Control type="text"
                  {...register("selectedState.validationMessage")}
                  disabled={!watch("selectedState.isRequried")}
                  autoComplete="new-password"
                  isInvalid={!!errors.selectedState?.validationMessage?.message}
                />
                {errors.selectedState?.validationMessage && <Form.Control.Feedback type="invalid">{errors.selectedState?.validationMessage.message}</Form.Control.Feedback>}
              </Form.Group>
            </div>
          </>
          :
          specialCustomizationStep === DROPDOWNSTEP ?
            <DropDownOptions
              register={register}
              getValues={getValues}
              watch={watch}
              setValue={setValue}
              errors={errors}
              individualItemState={individualItemState}
              setIndividualItemState={setIndividualItemState}
              selectedItem={selectedItem}
              control={control}
            /> : null

      }
      <Button variant="primary" type="submit"  >
        Submit
      </Button>
    </Form>
  )
}

export default CustomizeZone