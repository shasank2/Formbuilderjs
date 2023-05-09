import { useContext } from 'react'
import { useEffect } from 'react'
import { Button, CloseButton, Form } from 'react-bootstrap'
import { GlobalContext } from '../../../../../../context/GlobalContext'

const CustomOptions = (props) => {
  const { individualItemState, setIndividualItemState, selectedItem } = props
  const { formState } = useContext(GlobalContext)

  useEffect(() => {
    let foundSelectedObject= formState.find((elem) => elem.id === selectedItem)
    if (foundSelectedObject.options && foundSelectedObject.options?.length !== 0) {
      setIndividualItemState((prev) => ({
        ...prev,
        ...foundSelectedObject,
        options: [...foundSelectedObject.options]
      }))
    } else {
      setIndividualItemState((prev) => ({ ...prev, options: [] }))
    }

  }, [selectedItem])

  const handleAddOption = () => {
    setIndividualItemState((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { label: "", value: "" }
      ]
    }))
  }

  const handleChange = (target, index) => {
    let newOptionList = individualItemState.options
    newOptionList[index][target.name] = target.value
    setIndividualItemState((prev) => ({
      ...prev,
      options: newOptionList
    }))
  }

  const handleRemoveOption = (index) => {
    let newOptionList = individualItemState.options
    newOptionList.splice(index, 1)

    setIndividualItemState((prev) => ({
      ...prev,
      options: newOptionList
    }))
  }

  return (
    <div className='custom-option-container'>
      {
        individualItemState.options?.map((elem, index) => {
          return (
            <div className='option-card' key={index}>
              <div className='d-flex justify-content-between' >
                <h6>#{index + 1}</h6>
                {
                  index + 1 === 1 ?
                    null : <CloseButton onClick={() => handleRemoveOption(index)} />
                }
              </div>
              <Form.Group className='mb-2'>
                <Form.Label column="sm" >Label</Form.Label>
                <Form.Control type="text" autoComplete="new-password" name='label'
                  onChange={(e) => handleChange(e.target, index)}
                  value={individualItemState.options[index].label}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label column="sm" >Value</Form.Label>
                <Form.Control type="text" autoComplete="new-password" name='value'
                  onChange={(e) => handleChange(e.target, index)}
                  value={individualItemState.options[index].value}
                />
              </Form.Group>
            </div>
          )
        })
      }

      <Button className='mt-3' style={{ width: "100%" }} variant='light' type="button" onClick={() => handleAddOption()}  >+ Add More Option</Button>
    </div>
  )
}

export default CustomOptions