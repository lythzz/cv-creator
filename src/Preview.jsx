import './styles/preview.css'

export default function Preview({personalInfo, education, exp}){
    return (
        <> 
            <div className="previewContainer">
                <header className='header'>
                    <h1>{personalInfo.name}</h1>
                    <div className='contactInfo'>
                        <h3><i className="fa-solid fa-envelope"></i>  {personalInfo.email}</h3>
                        <h3><i className="fa-solid fa-phone"></i> {personalInfo.phone}</h3>
                        <h3><i className="fa-solid fa-location-dot"></i> {personalInfo.address}</h3>
                    </div>
                </header>

                {education?
                <div className="educationSection">
                     <div className="title">Education</div>
                     {education.map((item) => (
                        <div className="previewItem">
                            <h3><strong>{item.course}</strong> <br></br> <span>at {item.school}</span></h3>
                            <div>
                                <div className="preview date">{item.start} - {item.end}</div>
                                <div className="preview loc">{item.location}</div>
                            </div>
                        </div>
                     ))}    
                </div>    
                :null
            }       
                {exp?
                <div className="expSection">
                    <div className="title">Experience</div>
                    {exp.map((item) => (
                        <div className="previewExp">
                            <div className="head">
                                <h3><strong>{item.job}</strong> <br></br> <span>at {item.company}</span></h3>
                                <div>
                                    <div className="preview date">{item.start} - {item.end}</div>
                                </div>
                            </div>
                            <div className="main">
                                <div className="desc">{item.desc}</div>
                            </div>
                        </div>
                     ))}   
                </div>
                :null     
            }
            </div>
        </>
    )
}