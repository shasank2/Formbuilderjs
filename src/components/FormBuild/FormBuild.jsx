import { Container } from 'react-bootstrap'
import DraggableZone from './DraggableZone/DraggableZone'
import DroppableZone from './DroppableZone/DroppableZone'
import "./formbuild.css"
import { useState } from 'react'
import PreviewZone from './PreviewZone/PreviewZone'

const FormBuild = () => {

  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <>
      <Container fluid>
        <div className='container-grid'>
          <DraggableZone selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          <DroppableZone selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          <PreviewZone />
        </div>
      </Container>
    </>
  )
}

export default FormBuild