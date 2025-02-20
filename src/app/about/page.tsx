import React from 'react'

type Props = {}

const AboutPage = (props: Props) => {
  return (
    <>
        <div className="aboutPage">
            <center><h3 className='text-3xl font-semibold' style={{fontFamily: "Poppins"}}>About</h3></center>
            <br/>
            
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className='ml-8'>
                <li>Hi, I'm Armaan and I was bored so I made this to cram chem</li>
                <li>Used ChatGPT mostly coz of less time</li>
                <li>Active recall method works</li>
                <li>Nah, I'm not done with my sci syllabus yet, but was bored</li>
                <li>Do lmk if this worked.</li>
            </ul>
        </div>
    </>
  )
}

export default AboutPage