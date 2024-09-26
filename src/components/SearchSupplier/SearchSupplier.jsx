import React, { useRef, useState } from 'react'

import s from './SearchSupplier.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import ListSelectPopup from '../ListSelectPopup/ListSelectPopup'

const SearchSupplier = () => {
    const [isSupplierPopup, setIsSupplierPopup] = useState(false);
    const supplierBtnRef = useRef(null);
    const supplierList = [
        {
            name: "NCC1",
            phone: "0123456789"
        },
        {
            name: "NCC2",
            phone: ""
        }
    ]

  return (
    <div className={s.container}>
        <div className="box-search">
            <div ref={supplierBtnRef} onClick={() => setIsSupplierPopup(true)} className="box-input">
                <div className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input placeholder='Tìm theo tên, SĐT, mã nhà cung cấp...' type="text" name="search" id="" autoComplete='on' />
                <fieldset className='input-field'></fieldset>
            </div>
            {
                isSupplierPopup &&
                <ListSelectPopup 
                    title={"nhà cung cấp"}
                    isLarge={true}
                    isSearch={false}
                    isFastCreate={true}
                    dataList={supplierList}
                    btnRef={supplierBtnRef}
                    closePopup={() => setIsSupplierPopup(false)}
                />
            }
        </div>
        <div className={s.boxEmpty}>
            <FontAwesomeIcon icon={faAddressCard} />
            <p>Chưa có thông tin nhà cung cấp</p>
        </div>
    </div>
  )
}

export default SearchSupplier