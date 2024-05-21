import './styles/education.css'
import Input from './input'
import { useRef, useState } from 'react'
import { v1 as uuid }  from 'uuid'

export default function Education({educationInfo, setInfo}){
    const footerRef = useRef(null)
    const formRef = useRef(null)
    const listRef = useRef(null)
    const dropdownRef = useRef(null)
    const bodyRef = useRef(null)
    const schoolRef = useRef(null)
    const courseRef = useRef(null)
    const startRef = useRef(null)
    const endRef = useRef(null)
    const locRef = useRef(null)
    let editQueue = null;

    function dropDown(){
        const body = bodyRef.current
        const list = listRef.current
        const form = formRef.current
        const footer = footerRef.current
        const btn = dropdownRef.current
        
        if(body.classList.contains('hidden')){
            footer.classList.remove('hidden')
            list.classList.remove('hidden')
            body.classList.remove('hidden')
            form.classList.contains('hidden') ? null : form.classList.remove('hidden')
            btn.style.transform = 'rotate(0turn)'
        } else {
            body.classList.add('hidden')
            list.classList.add('hidden')
            footer.classList.add('hidden')
            form.classList.add('hidden')
            btn.style.transform = 'rotate(0.5turn)'
        }

    }

    function deleteItem(id){
        const copy = educationInfo.filter((item) => item.id != id)
        setInfo(copy)
    }

    function toggleForm(key = null){
        const inputs = [
            schoolRef.current,
            courseRef.current,
            startRef.current,
            endRef.current
        ]
        inputs.map((input) => {
            input.classList.remove('invalid')
            
        })
        if(key && key!= 'cancel'){
            editQueue = key
            const info = educationInfo.filter((item) => item.id == key)
            const preset = info[0]

            schoolRef.current.value = preset.school
            courseRef.current.value = preset.course
            startRef.current.value = preset.start
            endRef.current.value = preset.end
            locRef.current.value = preset.location
            
        } else if(key == 'cancel'){
            schoolRef.current.value = ''
            courseRef.current.value = ''
            startRef.current.value = ''
            endRef.current.value = ''
            locRef.current.value = ''
            editQueue = null;
        } else{
            editQueue = null;
        }   
        
        const form = formRef.current
        const list = listRef.current
        const footer = footerRef.current
        if(form.classList.contains('hidden')){
            form.classList.remove('hidden')
            list.classList.add('hidden')
            footer.classList.add('hidden')
        } else {
            form.classList.add('hidden')
            list.classList.remove('hidden')
            footer.classList.remove('hidden')
        }

        
    }

    function  handleItem(){
        const inputs = [
            schoolRef.current,
            courseRef.current,
            startRef.current,
            endRef.current
        ]
        let invalid = false;
        inputs.map((input) => {
            if(input.value == ''){
                input.classList.add('invalid')
                invalid = true;
            } else{
                input.classList.remove('invalid')
            }
        })

        if(invalid) return;
        

        if(editQueue){
            const copy = [...educationInfo]
            let i = copy.map((item, index) => {
                if(item.id==editQueue){
                    return index
                }
            })
            i = i.toString()

            const item = {
                school: school.value,
                course: course.value,
                start: start.value,
                end: end.value,
                location: location.value,
                id: editQueue
            }
            copy[i] = item
            setInfo(copy)
            editQueue = null
            toggleForm()
        } else{ 

            toggleForm()
            const newItem = {
                school: schoolRef.current.value,
                course: courseRef.current.value,
                start: startRef.current.value,
                end: endRef.current.value,
                location: locRef.current.value,
                id: uuid()
            }
            const cpy = [...educationInfo]
            cpy.push(newItem)
            
            setInfo(cpy)
        }
    }

    function Form(){
        return(
            <div ref={formRef} className='hidden form'>
                <div className="inputGroup">
                    <Input ref={schoolRef} type={'text'} req={true} label={'School'} ph={'School/university'}></Input>
                    <Input ref={courseRef} type={'text'} req={true} label={'Course/Degree'} ph={'Enter course'}></Input>
                    <Input ref={startRef} type={'text'} req={true} label={'Start date'} ph={''}></Input>
                    <Input ref={endRef} type={'text'} req={true} label={'Conclusion'} ph={''}></Input>
                    <Input ref={locRef} type={'text'} req={false} label={'Location'} ph={''} id={'locationInput'}></Input>
                </div>
                <div className="formBtns">
                    <button className='formBtn' onClick={() => toggleForm('cancel')} id='cancel'>Cancel</button>
                    <button className='formBtn' onClick={handleItem} id='save'>Save</button>
                </div>
            </div>
        )
        
    } 

    function List(){
        return (
            <div style={{width: '100%'}}>
                {educationInfo.map((item) => (
                    <div key={item.id} className='education item' onClick={() => toggleForm(item.id)} style={{display: 'flex'}}>
                        <h2>{item.school}</h2>
                        <h2 className='deleteItem' onClick={() => deleteItem(item.id)}><i className="deleteItem fa-solid fa-trash"></i></h2>
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
                    <button ref={dropdownRef} className="dropdown" onClick={dropDown}><i className="fa-solid fa-angle-down"></i></button>
                </div>
                <div ref={bodyRef} className="body">
                <div style={{width: '100%'}} ref={listRef}><List></List></div>
                <Form></Form>
                </div>
                <div ref={footerRef} className="footer">
                    <button className="newEducation" onClick={() => toggleForm(null)}><i className="fa-solid fa-circle-plus"></i> New</button>
                </div>
            </div>
        </>    
    )
}