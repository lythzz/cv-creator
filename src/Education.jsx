import './styles/education.css'
import Input from './input'
import { useRef } from 'react'
import { v1 as uuid }  from 'uuid'

export default function Education({educationInfo, setInfo}){
    const formRef = useRef(null)
    const listRef = useRef(null)
    const dropdownRef = useRef(null)
    const bodyRef = useRef(null)

    function toggleForm(){
        const form = formRef.current
        const list = listRef.current
        if(form.classList.contains('hidden')){
            form.classList.remove('hidden')
            list.classList.add('hidden')
        } else {
            form.classList.add('hidden')
            list.classList.remove('hidden')
        }

    }

    function dropDown(){
        const body = bodyRef.current
        const btn = dropdownRef.current
        
        if(body.classList.contains('hidden')){
            body.classList.remove('hidden')
            btn.style.transform = 'rotate(0turn)'
        } else {
            body.classList.add('hidden')
            btn.style.transform = 'rotate(0.5turn)'
        }

    }

    function Form({ preset, toggleForm}){
        const schoolRef = useRef(null)
        const courseRef = useRef(null)
        const startRef = useRef(null)
        const endRef = useRef(null)
        const locRef = useRef(null)

        function  handleItem(){
            toggleForm()
            const item = {
                school: schoolRef.current.value,
                course: courseRef.current.value,
                start: startRef.current.value,
                end: endRef.current.value,
                location: locRef.current.value,
                id: uuid()
            }
            const cpy = educationInfo
            cpy.push(item)
            
            setInfo(cpy)
            
        }    
    
        return(
            <div ref={formRef} className='hidden'>
                <div className="inputGroup">
                    <Input ref={schoolRef} type={'text'} dataKey={'school'} label={'School'} value={preset.school} ph={'School/university'}></Input>
                    <Input ref={courseRef} type={'text'} dataKey={'title'} label={'Course/Degree'} value={preset.title} ph={'Enter course'}></Input>
                    <Input ref={startRef} type={'text'} dataKey={'start'} label={'Start date'} value={preset.start} ph={''}></Input>
                    <Input ref={endRef} type={'text'} dataKey={'end'} label={'Conclusion'} value={preset.end} ph={''}></Input>
                    <Input ref={locRef} type={'text'} dataKey={'location'} label={'Location'} value={preset.location} ph={''}></Input>
                </div>
                <div className="formBtns">
                    <button className='formBtn' onClick={toggleForm} id='cancel'>Cancel</button>
                    <button className='formBtn' onClick={handleItem} id='save'>Save</button>
                </div>
            </div>
        )
        
    } 

    function List(){
        return (
            <div >
                {educationInfo.map((item) => (
                    <div style={{display: 'flex'}}>
                        <div data-id={item.id} key={item.id}><strong>{item.course}</strong> <br></br> at {item.school}</div>
                        <div></div>
                    </div>

                ))}
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <div className="head" style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                    <h1><i className="fa-solid fa-graduation-cap"></i> Education</h1>
                    <button ref={dropdownRef} className="dropdown" onClick={dropDown}><i className="fa-solid fa-angle-up"></i></button>
                </div>
                <div ref={bodyRef} className="body">
                <div ref={listRef}><List></List></div>
                    <Form  toggleForm={toggleForm} preset={{}}></Form>
                </div>
                <div className="footer">
                    <button className="newEducation" onClick={toggleForm}><i className="fa-solid fa-circle-plus"></i> New</button>
                </div>
            </div>
        </>    
    )
}