import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Import CSS
import s from './SupplierInfo.module.scss'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { getDebtSupplier } from '../../service/SuppliersAPI'

const SupplierInfo = ({ supplier, handleCancel }) => {
  const [debt, setDebt] = useState({});

  const fetchDebtSupplier = async () => {
    const response = await getDebtSupplier(supplier);
    setDebt(response.data);
  }

  useEffect(() => {
    fetchDebtSupplier();
  }, [supplier]);

  return (
    <div className={s.container}>
      <div className={s.boxInfo}>
        <div className={s.boxName}>
          <div className={s.supplierName}>
            <p>
              <Link>
                {debt.name}
              </Link>
            </p>
          </div>
          {
            handleCancel &&
            <div className={s.cancelIcon}>
              <button onClick={handleCancel} className={s.btnCancel}>
                <span className={s.btnLabel}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </button>
            </div>
          }
        </div>
        {
          debt.phone &&
          <div className={s.boxPhone}>
            <p>{debt.phone}</p>
          </div>
        }
        {
          debt.address &&
          <div className={s.boxAddress}>
            <p>
              <span className={s.addressTitle}>Địa chỉ:&nbsp;</span>
              {debt.address}
            </p>
          </div>
        }
      </div>
      <div className={s.boxInfo}>
        <div className={s.boxReport}>
          <div className={s.reportItem}>
            <p className={s.reportTitle}>Nợ hiện tại</p>
            <p className={classNames(s.reportValue, s.danger)}>{debt.current_debt}</p>
          </div>
          <div className={s.reportItem}>
            <p className={s.reportTitle}>Tổng đơn nhập ({debt.grn_count})</p>
            <p className={s.reportValue}>{debt.grn_total_value?.toLocaleString('en-US')}</p>
          </div>
          <div className={s.reportItem}>
            <p className={s.reportTitle}>Trả hàng</p>
            <p className={classNames(s.reportValue, s.danger)}>{debt.total_refund}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierInfo