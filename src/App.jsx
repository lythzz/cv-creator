import { useState } from 'react'
import exampledata from './example-data'
import { PersonalForm, SectionForm } from './Forms'
import Preview from './Preview'
import './styles/app.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState(exampledata.personalInfo)


  function handlePersonalData(e){
    const updated = {}
    updated[e.target.dataset.key] = e.target.value
    
    setPersonalInfo(personalInfo => ({
      ...personalInfo,
      ...updated
    }))
  }

  return (
    <div className='body'>
        <div className="forms">
        <PersonalForm preset={personalInfo} onChange={handlePersonalData}></PersonalForm>
        </div>
        <div className="preview">
        <Preview personalInfo={personalInfo}></Preview>
        <SectionForm type={'education'}></SectionForm>
        </div>
        
    </div>
  )
}

export default App
