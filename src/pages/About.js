import React from 'react'
import Resume from '../assets/Resume.pdf'

export default function About() {
    return (
        <div className='gp-bg fullScreen'>
            <embed src={Resume} width="100%" height="900px" />
        </div>
    )
}
