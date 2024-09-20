import React from 'react'

import s from './SearchSupplier.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'

const SearchSupplier = () => {
  return (
    <div className={s.container}>
        <div className="box-search">
            <div className="box-input">
                <div className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input placeholder='Tìm theo tên, SĐT, mã nhà cung cấp...' type="text" name="search" id="" autoComplete='on' />
                <fieldset className='input-field'></fieldset>
            </div>
        </div>
        <div className={s.boxEmpty}>
            <FontAwesomeIcon icon={faAddressCard} />
            <p>Chưa có thông tin nhà cung cấp</p>
        </div>
    </div>
  )
}

export default SearchSupplier