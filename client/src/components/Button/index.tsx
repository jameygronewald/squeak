import React from 'react'

interface ButtonProps {
    onClick: () => void
    text: string
    className: string
}

const Button: React.FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button;