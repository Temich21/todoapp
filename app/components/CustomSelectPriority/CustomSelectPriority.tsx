"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { OptionKeys, options } from './PriorityConstants'
import styles from './CustomSelectPriority.module.scss'

const CustomSelectPriority = ({ setPriority, priorityInput }) => {
    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef(null)

    const handleOptionClick = (value: string) => {
        setPriority(value)
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref])


    return (
        <div className={styles.customSelectContainer} ref={ref}>
            <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faFlag} style={{ color: options[priorityInput as OptionKeys] }} />
                {priorityInput}
            </div>
            {isOpen && (
                <div className={styles.optionContainer}>
                    {Object.keys(options).map((option: string, index: number) => (
                        <div
                            key={index}
                            className={styles.option}
                            onClick={() => handleOptionClick(option)}
                        >
                            <FontAwesomeIcon icon={faFlag} style={{ color: options[option as OptionKeys] }} />
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomSelectPriority