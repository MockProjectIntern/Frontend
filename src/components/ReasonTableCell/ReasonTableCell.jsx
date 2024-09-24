import React, { useRef, useState } from 'react'
import cn from 'classnames'



// Import CSS
import s from '../GINProductsTable/GINProductsTable.module.scss'
import ReasonSelectPopup from '../ReasonSelectPopup/ReasonSelectPopup';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
const ReasonTableCell = ({}) => {
    const [isOpenReasonPopup, setIsOpenReasonPopup] = useState(false);
    const reasonBtnRef = useRef(null);
    const [reason, setReason] = useState("Khác");
    const closeReasonPopup = () => {
        setIsOpenReasonPopup(false);
    }

    const handleChangeReason = (reason) => {
        setReason(reason);
        closeReasonPopup();
    } 

  return (
    <td className={cn(s.tableCell, s.tableCellBody, "text-end", "table-cell")}>
                      <div className= {cn(s.boxReason)}>
                      <button 
                                ref={reasonBtnRef} 
                                onClick={() => setIsOpenReasonPopup(!isOpenReasonPopup)} 
                                className={cn(s.btnReason, {"selected": isOpenReasonPopup})}
                            >
                                {reason}
                                <span>
                                  
                                </span>
                            </button>
                            {isOpenReasonPopup && <ReasonSelectPopup btnRef={reasonBtnRef} closePopup={() => setIsOpenReasonPopup(false)} reason={reason} handleChangeReason={handleChangeReason} />}
                      </div>
                     
                    </td>
  )
}

export default ReasonTableCell