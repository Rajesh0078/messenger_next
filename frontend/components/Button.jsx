import React from 'react'

const Button = ({ type, value, styles }) => {
    return (
        <button className={styles} type={type}>{value}</button>
    )
}

export default Button