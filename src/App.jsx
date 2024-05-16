import { useState } from 'react'
import exampledata from './example-data'
import { PersonalForm } from './Forms'
import Education from './Education'
import Preview from './Preview'
import './styles/app.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState(exampledata.personalInfo)
  const [educationInfo, setEducationInfo] = useState(exampledata.educationInfo)

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
        <Education educationInfo={educationInfo} setInfo={setEducationInfo}></Education>
        </div>
        <div className="preview">
        <Preview personalInfo={personalInfo}></Preview>
        
        </div>
        
    </div>
  )
}

export default App
