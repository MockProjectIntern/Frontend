import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Cookies from 'js-cookie'

// Import Components
import Header from '../Header/Header.jsx'

// Import Columns Info
import col from '../../assets/colgroup/receipt-vouchers-list.js'

// Import Icons
import exportIcon from '../../assets/icons/ExportIcon.jsx'
import filterIcon from '../../assets/icons/FilterIcon.jsx'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

const receiptVouchersList = [
    {
        created_at: "17/09/2024 03:44",
        id: "RVN00017",
        type: "Tự động",
        status: "Hoàn thành",
        money_received: "350,000",
        payer_group: "Nhà cung cấp",
        original_document: "PON00001",
        payer_name: "MDC",
        payment_method: "Credit",
        description: "Phiếu thu tự động tạo khi NCC hoàn tiền",
        user_created_name: "Admin",
        recorded_at: "17/09/2024 03:44",
        business_result_accounting: "Không",
        reference: "",
        payer_id: "SUPN00001",
        updated_at: "17/09/2024 03:44",
        cancelled_at: ""
    },
    {
        created_at: "16/09/2024 14:58",
        id: "RVN00016",
        type: "Tự động",
        status: "Hoàn thành",
        money_received: "277,000",
        payer_group: "Khách hàng",
        original_document: "SAM00016",
        payer_name: "Khách lẻ",
        payment_method: "Tiền mặt",
        description: "Phiếu thu tự động tạo khi khách hàng thanh toán cho đơn hàng",
        user_created_name: "Admin",
        recorded_at: "13/09/2024 14:58",
        business_result_accounting: "Không",
        reference: "",
        payer_id: "ANONYMOUS",
        updated_at: "16/09/2024 14:58	",
        cancelled_at: ""
    },
    {
        created_at: "16/09/2024 14:58",
        id: "RVN00015",
        type: "Tự động",
        status: "Hoàn thành",
        money_received: "277,000",
        payer_group: "Khách hàng",
        original_document: "SAM00015",
        payer_name: "Chị Hoàng Thu Hảo",
        payment_method: "Tiền mặt",
        description: "Phiếu thu tự động tạo khi khách hàng thanh toán cho đơn hàng",
        user_created_name: "Admin",
        recorded_at: "13/09/2024 14:58",
        business_result_accounting: "Không",
        reference: "",
        payer_id: "CUZN00007",
        updated_at: "16/09/2024 14:58	",
        cancelled_at: ""
    }
]

const receiptVouchersQuantity = 3;

const ReceiptVouchersList = () => {
    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(20);

    // Get list of columns that need redering from Cookies
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('receiptVouchersListCols');
        return storedCols ? JSON.parse(storedCols) : {
            created_at: true,
            id: true,
            type: true,
            status: true,
            money_received: true,
            payer_group: true,
            original_document: true,
            payer_name: true,
            payment_method: false,
            description: false,
            user_created_name: false,
            recorded_at: false,
            business_result_accounting: false,
            reference: false,
            payer_id: false,
            updated_at: false,
            cancelled_at: false
        }
    })

    // Set required columns to Cookies
    useEffect(() => {
        Cookies.set('receiptVouchersListCols', JSON.stringify(colsToRender));
    }, [colsToRender])

    const headersRef = useRef(null);
    const contentRef = useRef(null);

    const handleScroll = (e, target) => {
        target.scrollLeft = e.target.scrollLeft;
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    }

    const handleNextPage = () => {
        if (page < pageQuantiy) {
            setPage(prev => prev + 1);
        }
    }

    const handleColsChange = (name) => {
        setColsToRender({...colsToRender, [name]: !colsToRender[name]})
    }

  return (
    <>
        <Header />
        <div className='right__listPage'>
            <div className='right__toolbar'>
                <div className="btn-toolbar">
                    <button className="btn btn-base btn-text">
                        <span className="btn__label">
                            <span className="btn__icon">
                                {exportIcon}
                            </span>
                            Xuất file
                        </span>
                    </button>
                    <button className="btn btn-base btn-text ms-3">
                        <span className="btn__label">
                            Loại phiếu thu
                        </span>
                    </button>
                </div>
            <div className="btn-toolbar">
                <button className="btn btn-primary">
                    <span className="btn__icon">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className="btn__title">Tạo phiếu thu</span>
                </button>
            </div>
            </div>
            <div className="right__table">
                <div className="right__table-scroller">
                    <div className="box-scroller">
                        <div className="group-scroller-btns">
                            <button className="btn-scroller active">Tất cả phiếu thu</button>
                            <button className="btn-scroller">Phiếu thu hoàn thành</button>
                            <button className="btn-scroller">Phiếu thu đã hủy</button>
                        </div>
                    </div>
                </div>
                <div className="right__table-search-filter">
                    <div className="box-search-filter-btns">
                        <div className="box-search">
                            <div className="box-input">
                                <div className="search-icon">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </div>
                                <input placeholder='Tìm kiếm theo mã phiếu thu, tham chiếu, mã chứng từ gốc' type="text" name="query" id="" autoComplete='on' />
                                <fieldset className='input-field' />
                            </div>
                        </div>
                        <div className="btn-group group-filter-btns">
                            <button className="btn btn-base btn-filter">
                                <span className="btn__label">
                                    Ngày tạo
                                    <span className="btn__icon">
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </span>
                            </button>
                            <button className="btn btn-base btn-filter">
                                <span className="btn__label">
                                    Nhóm người nộp
                                    <span className="btn__icon">
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </span>
                            </button>
                            <button className="btn btn-base btn-filter">
                                <span className="btn__label">
                                    Bộ lọc khác
                                    <span className="btn__icon">
                                        {filterIcon}
                                    </span>
                                </span>
                            </button>
                        </div>
                        <button disabled id='btn-save-filter' className="btn btn-primary">
                            <span className="btn__title">Lưu bộ lọc</span>
                        </button>
                    </div>
                </div>
                <div 
                    ref={headersRef} 
                    onScroll={(e) => handleScroll(e, contentRef.current)}
                    className="right__table-headers">
                    <table className="box-table-headers">
                        <colgroup>
                        <col style={{ width: "80px" }} />
                            {/* Render the <colgroup> only for the columns that are in colsToRender */}
                            {Object.entries(colsToRender).map(([key, value]) => {
                                if (value) {
                                    return (
                                        <col
                                            key={key}
                                            style={{
                                                width: col[key].width
                                            }}
                                        />
                                    )
                                }
                                return null;
                            })}
                        </colgroup>
                        <thead>
                            <tr className="group-table-headers">
                                <th rowSpan={1} className='table-icon'>
                                    <div className="group-icons">
                                        <button className="btn-icon">
                                            {settingFilterIcon}
                                        </button>
                                        <div className="checkbox__container">
                                            <div className="checkbox__wrapper">
                                                <input type="checkbox" name="" id="" className='checkbox__input' />
                                                <div className="btn-checkbox"></div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                                {/* Render table headers for columns that exist in receiptVouchersList */}
                                {Object.entries(colsToRender).map(([key, value]) => {
                                    if (value) {
                                        if (key.includes('_at')) {
                                            return (
                                                <th 
                                                    key={key}
                                                    colSpan={1} 
                                                    rowSpan={1} 
                                                    className={cn("table-header-item", col[key].align)}
                                                >
                                                    <div className="box-sort-date">
                                                        {col[key].name}
                                                        <span className='box-icon'>
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    </div>
                                                </th>
                                            )
                                        }
                                        return (
                                            <th 
                                                key={key}
                                                colSpan={1} 
                                                rowSpan={1} 
                                                className={cn("table-header-item", col[key].align)}
                                            >
                                                {col[key].name}
                                            </th>
                                        )
                                    }
                                    return null;
                                })}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="right__table-content">
                    <div className="right__table-data">
                        <div 
                            ref={contentRef} 
                            onScroll={(e) => handleScroll(e, headersRef.current)} 
                            className='table-data__container'
                        >
                            <table className="box-table-data">
                                <colgroup>
                                    <col style={{ width: "80px" }} />
                                    {/* Render the <colgroup> only for the columns that are in colsToRender */}
                                    {Object.entries(colsToRender).map(([key, value]) => {
                                        if (value) {
                                            return (
                                                <col
                                                    key={key}
                                                    style={{
                                                        width: col[key].width
                                                    }}
                                                />
                                            )
                                        }
                                        return null;
                                    })}
                                </colgroup>
                                <tbody>
                                    {receiptVouchersList.map((order, index) => {
                                        return (
                                            <tr key={index} className="table-data-row">
                                                <td rowSpan={1} className='table-icon'>
                                                    <div className="group-icons">
                                                        <div className="btn-icon">
                                                        </div>
                                                        <div className="checkbox__container">
                                                            <div className="checkbox__wrapper">
                                                                <input type="checkbox" name="" id="" className='checkbox__input' />
                                                                <div className="btn-checkbox"></div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </td>
                                                {Object.entries(colsToRender).map(([key, value]) => {
                                                    if (value) {
                                                        if (key.includes("status")) {
                                                            return (
                                                                <td
                                                                    key={key}
                                                                    className={cn("table-data-item", col[key].align)}
                                                                >
                                                                    <div className={cn('box-status', {
                                                                        'box-status--pending': order[key] === "Chưa nhập",
                                                                        'box-status--partial': order[key] === "Nhập một phần",
                                                                        'box-status--completed': order[key] === "Hoàn thành",
                                                                        'box-status--cancelled': order[key] === "Đã hủy",
                                                                    })}>
                                                                        <span>{order[key]}</span>
                                                                    </div>
                                                                </td>
                                                            )
                                                        }
                                                        return (
                                                            <td
                                                                key={key}
                                                                className={cn("table-data-item", col[key].align)}
                                                            >
                                                                <p className='box-text'>
                                                                    {
                                                                        !Array("id", "original_document", "payer_name").includes(key) ? 
                                                                        order[key] :
                                                                        <a className='box-id'>{order[key]}</a>
                                                                    }
                                                                </p>
                                                            </td>
                                                        )
                                                    }
                                                    return null;
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="right__table-pagination">
                        <p>Hiển thị</p>
                        <div className="box-page-limit">
                            <button className="btn-page-limit">
                                20
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                        </div>
                        <p>kết quả</p>
                        <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + receiptVouchersList.length} trên tổng {receiptVouchersQuantity}</p>
                        <button 
                            className={cn('btn-icon', 'btn-page', { 'inactive': page === 1})}
                            onClick={handlePrevPage}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        {
                            Array(pageQuantiy).fill(null).map((_, index) => (
                                <div 
                                    key={index}
                                    className={cn("box-page", { 'active': page === index + 1})}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </div>
                            ))
                        }
                        <button 
                            className={cn('btn-icon', 'btn-page', { 'inactive': page === pageQuantiy})}
                            onClick={handleNextPage}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ReceiptVouchersList