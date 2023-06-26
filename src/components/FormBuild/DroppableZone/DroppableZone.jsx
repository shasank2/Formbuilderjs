import { useContext } from "react"
import "./droppablezone.css"
import { useDrop } from "react-dnd"
import { GlobalContext } from "../../../context/GlobalContext"
import { v4 } from 'uuid';
import { Form } from "react-bootstrap";
import { MdTextFields } from "react-icons/md";
import DroppableSampleField from "./DroppableSampleField";

const DroppableZone = (props) => {

  const { setSelectedItem, selectedItem } = props

  const { formState, setformState, setSpecialCustomizationStep } = useContext(GlobalContext);

  const [{ }, drop] = useDrop(() => ({
    accept: "builderComponent",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (elem) => {
      handleStateWhenDrop(elem)
    }
  }))

  const handleStateWhenDrop = (elem) => {
    // create new object and push to list
    let newElem = {
      ...elem,
      id: v4(),
      name: "",
      label: "",
      isRequried: false,
      validationMessage: "",
    }

    if (elem.type === 'drop-down') {
      newElem.source = 'options'
    }
    setformState((prev) => ([...prev, newElem]))
    // once dropped it is selected too
    setSelectedItem(newElem.id)

    setSpecialCustomizationStep(null)
  }

  const handleSelectItem = (elemId) => {
    setSpecialCustomizationStep(null)
    setSelectedItem(elemId)
  }

  return (
    <div ref={drop} className='droppable-zone'>
      {formState.map((elem, index) => {
        return (
          <>
            <div key={index}
              className={` ${selectedItem === elem.id ? "droppable-items-selected" : "droppable-items"}`}
              onClick={() => handleSelectItem(elem.id)}>
              <DroppableSampleField itemData={elem} />
            </div>
          </>
        )
      })}

    </div>
  )
}

export default DroppableZone