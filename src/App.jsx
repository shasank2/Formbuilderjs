import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import GlobalProvider from './context/GlobalContext'
import MainLayout from './layouts/MainLayout/MainLayout'
import FormBuild from './pages/FormBuild'

function App() {

  return (
    // ADD REACT ROUTER HERE
    <>
      <GlobalProvider>
        <MainLayout>
          <FormBuild />
        </MainLayout>
      </GlobalProvider>
    </>
  )
}

export default App
