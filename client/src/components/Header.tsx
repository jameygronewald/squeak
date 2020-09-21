import React from 'react'

interface HeaderProps {
    text: string
    className: string
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps): JSX.Element => {
    return (
        <h1 className={props.className}>
            {props.text}
        </h1>
    )
}
