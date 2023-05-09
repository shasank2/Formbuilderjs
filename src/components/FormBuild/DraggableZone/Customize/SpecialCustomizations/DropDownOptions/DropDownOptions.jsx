import { Form } from 'react-bootstrap'
import CustomOptions from './CustomOptions'
import "./dropdownoptions.css"
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../../../context/GlobalContext'

const DropDownOptions = (props) => {
  const { individualItemState, setIndividualItemState, selectedItem } = props
  const { formState } = useContext(GlobalContext);

  const [dropDownSource, setDropDownSource] = useState("options")

  useEffect(() => {
    let foundSelectedObject = formState.find((elem) => elem.id === selectedItem)
    setDropDownSource(foundSelectedObject.source)
  }, [selectedItem])
  

  return (
    <>
      <Form.Check
        type="switch"
        label="Set Through API"
        onChange={(e) => {
          setDropDownSource(e.target.checked ? "url" : "options"),
            setIndividualItemState((prev) => ({ ...prev, source: e.target.checked ? "url" : "options" }))
        }}
        checked={dropDownSource === "url" ? true : false}
      />
      {
        dropDownSource === "url" ?
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