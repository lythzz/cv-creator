import { useState } from 'react'
import exampledata from './example-data'
import { PersonalForm } from './Forms'
import Experience from './Experience'
import Education from './Education'
import Preview from './Preview'
import './styles/app.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState(exampledata.personalInfo)
  const [educationInfo, setEducationInfo] = useState(exampledata.educationInfo)
  const [expInfo, setExpInfo] = useState(exampledata.expInfo)

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
        <div className="forms no-print">
        <PersonalForm preset={personalInfo} onChange={handlePersonalData}></PersonalForm>
        <Education  educationInfo={educationInfo} setInfo={setEducationInfo}></Education>
        <Experience expInfo={expInfo} setInfo={setExpInfo}></Experience>
        <div className="btnContainer"><button className='printBtn' onClick={window.print}><i className="fa-solid fa-floppy-disk"></i> Save</button></div>
        </div>
        <div className="preview">
        <Preview personalInfo={personalInfo} education={educationInfo} exp={expInfo}></Preview>
    
        </div>
        
    </div>
  )
}

export default App
