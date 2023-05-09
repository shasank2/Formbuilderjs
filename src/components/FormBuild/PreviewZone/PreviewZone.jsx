import { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'


const PreviewZone = () => {

  const { formState } = useContext(GlobalContext)

  return (
    <>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </>
  )
}

export default PreviewZone