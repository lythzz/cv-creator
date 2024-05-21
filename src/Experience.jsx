import './styles/experience.css'
import Input from './input'
import { useRef} from 'react'
import { v1 as uuid }  from 'uuid'

export default function Experience({expInfo, setInfo}){
    const footerRef = useRef(null)
    const formRef = useRef(null)
    const listRef = useRef(null)
    const dropdownRef = useRef(null)
    const bodyRef = useRef(null)
    const companyRef = useRef(null)
    const jobRef = useRef(null)
    const startRef = useRef(null)
    const endRef = useRef(null)
    const descRef = useRef(null)
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
        const copy = expInfo.filter((item) => item.id != id)
        setInfo(copy)
    }

    function toggleForm(key = null){
        const inputs = [
            companyRef.current,
            jobRef.current,
            startRef.current,
            endRef.current
        ]
        inputs.map((input) => {
            input.classList.remove('invalid')
            
        })
        if(key && key!= 'cancel'){
            editQueue = key
            const info = expInfo.filter((item) => item.id == key)
            const preset = info[0]

            companyRef.current.value = preset.company
            jobRef.current.value = preset.job
            startRef.current.value = preset.start
            endRef.current.value = preset.end
            descRef.current.value = preset.desc
            
        } else if(key == 'cancel'){
            companyRef.current.value = ''
            jobRef.current.value = ''
            startRef.current.value = ''
            endRef.current.value = ''
            descRef.current.value = ''
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
            companyRef.current,
            jobRef.current,
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
            const copy = [...expInfo]
            let i = copy.map((item, index) => {
                if(item.id==editQueue){
                    return index
                }
            })
            i = i.toString()

            const item = {
                company: company.value,
                job: job.value,
                start: start.value,
                end: end.value,
                desc: desc.value,
                id: editQueue
            }
            copy[i] = item
            setInfo(copy)
            editQueue = null
            toggleForm()
        } else{ 

            toggleForm()
            const newItem = {
                company: companyRef.current.value,
                job: jobRef.current.value,
                start: startRef.current.value,
                end: endRef.current.value,
                desc: descRef.current.value,
                id: uuid()
            }
            const cpy = [...expInfo]
            cpy.push(newItem)
            
            setInfo(cpy)
        }
    }

    function Form(){
        return(
            <div ref={formRef} className='hidden form'>
                <div className="inputGroup">
                    <Input ref={companyRef} type={'text'} req={true} label={'Company'} ph={'Enter company name'}></Input>
                    <Input ref={jobRef} type={'text'} req={true} label={'Job Title'} ph={'Enter job title'}></Input>
                    <Input ref={startRef} type={'text'} req={true} label={'From'} ph={'When you started working there'}></Input>
                    <Input ref={endRef} type={'text'} req={true} label={'To'} ph={'When you exit'}></Input>
                    <Input ref={descRef} type={'textarea'} req={false} label={'Job description'} ph={'Description of your position and duties'} id={'descInput'}></Input>
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
                {expInfo.map((item) => (
                    <div key={item.id} className='item' onClick={() => toggleForm(item.id)} style={{display: 'flex'}}>
                        <h2>{item.company}</h2>
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
                    <h1><i className="fa-solid fa-suitcase"></i> Experience</h1>
                    <button ref={dropdownRef} className="dropdown" onClick={dropDown}><i className="fa-solid fa-angle-down"></i></button>
                </div>
                <div ref={bodyRef} className="body">
                <div style={{width: '100%'}} ref={listRef}><List></List></div>
                <Form></Form>
                </div>
                <div ref={footerRef} className="footer">
                    <button className="newExp" onClick={() => toggleForm(null)}><i className="fa-solid fa-circle-plus"></i> New</button>
                </div>
            </div>
        </>    
    )
}