import React from 'react'

interface LandingPageTextProps {
    text1: string
    text2: string
    text3: string
    className: string
}

const LandingPageText: React.FC<LandingPageTextProps> = (props: LandingPageTextProps): JSX.Element => {
    return (
        <div className={props.className}>
            <h3>{props.text1}</h3>
            <h3>{props.text2}</h3>
            <h3>{props.text3}</h3>
        </div>
    )
}

export default LandingPageText;