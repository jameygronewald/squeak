import React from 'react'

interface HomeTextProps {
    text1: string
    text2: string
    text3: string
    className: string
}

export const HomeText: React.FC<HomeTextProps> = (props: HomeTextProps): JSX.Element => {
    return (
        <div className={props.className}>
            <h3>{props.text1}</h3>
            <h3>{props.text2}</h3>
            <h3>{props.text3}</h3>
        </div>
    )
}
