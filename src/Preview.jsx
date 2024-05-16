import './styles/preview.css'

export default function Preview({personalInfo, sections}){
    return (
        <> 
            <div className="previewContainer">
                <header>
                    <h1>{personalInfo.name}</h1>
                    <div className='contactInfo'>
                        <h3><i className="fa-solid fa-envelope"></i>  {personalInfo.email}</h3>
                        <h3><i className="fa-solid fa-phone"></i> {personalInfo.phone}</h3>
                        <h3><i className="fa-solid fa-location-dot"></i> {personalInfo.address}</h3>
                    </div>
                </header>
            </div>
        </>
    )
}