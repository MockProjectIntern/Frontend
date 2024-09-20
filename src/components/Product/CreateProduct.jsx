import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronLeft, faGear, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import calendarIcon from '../../assets/icons/CalendarIcon.jsx'
import infoIcon from '../../assets/icons/InfoIcon.jsx'
const CreateProduct = () => {
    return (
        <>
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/admin/order_suppliers' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h6 className="btn-back__title">
                                Quay lại danh sách đơn đặt hàng
                            </h6>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-outline-primary">
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button className="btn btn-primary">
                            <span className="btn__title">Lưu</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProduct
