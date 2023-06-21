import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableItem = (props) => {

  let { data } = props
  console.log(data)

  const [, dragRef] = useDrag(() => ({
    type: 'builderComponent',
    item: { type: data.type, text: data.text },
  }))

  return (
    <>
      <span ref={dragRef} className='items'>
        <div className='item-info'>
          <span className='item-info-icon'>{data.icon}</span>
          {data.text}
        </div>
        <div className='item-sample'>
        {data.sample}
        </div>
      </span>
    </>
  )
}

export default DraggableItem