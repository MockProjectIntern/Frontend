import React, { useEffect, useRef } from 'react'
import cn from 'classnames'

import s from './LimitSelectPopup.module.scss'

const LimitSelectPopup = ({ btnRef, limit, handleChangeLimit, closePopup, }) => {
    const popupRef = useRef(null)

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
            closePopup();
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const handleChange = (limit) => {
        handleChangeLimit(limit);
        closePopup();
    }

  return (
    <div ref={popupRef} className={s.container}>
        <div className={s.wrapper}>
            <button onClick={() => handleChange(5)} className={cn(s.selectItem, { [s.selected]: limit === 5 })}>5</button>
            <button onClick={() => handleChange(10)} className={cn(s.selectItem, { [s.selected]: limit === 10 })}>10</button>
            <button onClick={() => handleChange(15)} className={cn(s.selectItem, { [s.selected]: limit === 15 })}>15</button>
        </div>
    </div>
  )
}

export default LimitSelectPopup