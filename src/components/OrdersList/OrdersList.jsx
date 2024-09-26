import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import Cookies from 'js-cookie'

// Import Components
import Header from '../Header/Header'

// Import Columns Info
import col from '../../assets/colgroup/orders-list.js'

// Import Icons
import exportIcon from '../../assets/icons/ExportIcon'
import importIcon from '../../assets/icons/ImportIcon'
import filterIcon from '../../assets/icons/FilterIcon'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import LimitSelectPopup from '../LimitSelectPopup/LimitSelectPopup.jsx'
import StatusFilter from '../GRNList/FiltersPopup/StatusFilter.jsx'

const ordersList = [
    {
        id: "OSN00004",
        created_at: "13/09/2024 11:36",
        status: "Nhập một phần",
        supplier_name: "MDC",
        user_created_name: "Admin",
        total_quantity: 7,
        total_price: "2,448,000"
    },
    {
        id: "OSN00003",
        created_at: "13/09/2024 11:36",
        status: "Đã hủy",
        supplier_name: "MDC",
        user_created_name: "Admin",
        total_quantity: 7,
        total_price: "2,448,000"
    },
    {
        id: "OSN00002",
        created_at: "13/09/2024 11:36",
        status: "Hoàn thành",
        supplier_name: "MDC",
        user_created_name: "Admin",
        total_quantity: 7,
        total_price: "2,448,000"
    },
    {
        id: "OSN00001",
        created_at: "13/09/2024 11:36",
        status: "Chưa nhập",
        supplier_name: "MDC",
        user_created_name: "Admin",
        total_quantity: 7,
        total_price: "2,448,000"
    }
]

const ordersQuantity = 4;

const OrdersList = () => {
    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
    const limitBtnRef = useRef(null);
    const navigate = useNavigate()

    const [isOpenStatusPopup, setIsOpenStatusPopup] = useState(false);
    const [statusListFilter, setStatusListFilter] = useState([]);

    // Get list of columns that need redering from Cookies
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_orders');
        return storedCols ? JSON.parse(storedCols) : {
            id: true,
            created_at: true,
            status: true,
            supplier_name: true,
            user_created_name: true,
            total_quantity: true,
            total_price: true,
            supplier_id: false,
            user_cancelled_name: false,
            user_completed_name: false,
            supplier_phone: false,
            supplier_address: false,
            supplier_email: false,
            note: false,
            tags: false,
            expected_at: false,
            completed_at: false,
            cancelled_at: false
        }
    })

    // Set required columns to Cookies
    useEffect(() => {
        Cookies.set('filter_orders', JSON.stringify(colsToRender));
    }, [colsToRender])

    const headersRef = useRef(null);
    const contentRef = useRef(null);
    const orderStatusRef = useRef(null);

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
        setColsToRender({ ...colsToRender, [name]: !colsToRender[name] })
    }

    return (
        <>
            <Header title={"Danh sách đơn đặt hàng nhập"} />
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
                        <button className="btn btn-base btn-text">
                            <span className="btn__label">
                                <span className="btn__icon">
                                    {importIcon}
                                </span>
                                Nhập file
                            </span>
                        </button>
                    </div>
                    <div className="btn-toolbar">
                        <button onClick={() => navigate('/admin/order_suppliers/create')} className="btn btn-primary">
                            <span className="btn__icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="btn__title">Tạo đơn đặt hàng</span>
                        </button>
                    </div>
                </div>
                <div className="right__table">
                    <div className="right__table-scroller">
                        <div className="box-scroller">
                            <div className="group-scroller-btns">
                                <button className="btn-scroller active">Tất cả đơn đặt hàng</button>
                                <button className="btn-scroller">Chưa nhập</button>
                                <button className="btn-scroller">Nhập một phần</button>
                                <button className="btn-scroller">Hoàn thành</button>
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
                                    <input placeholder='Tìm mã đơn nhập, đơn đặt hàng, tên, SĐT, mã NCC' type="text" name="search" id="" autoComplete='on' />
                                    <fieldset className='input-field' />
                                </div>
                            </div>
                            <div className="btn-group group-filter-btns">
                                <button ref={orderStatusRef} onClick={()=>setIsOpenStatusPopup(!isOpenStatusPopup)} className="btn btn-base btn-filter">
                                    <span className="btn__label">
                                        Trạng thái
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                    </span>
                                </button>
                                {isOpenStatusPopup && <StatusFilter statusBtnRef = {orderStatusRef} closePopup={() => setIsOpenStatusPopup(false)} type={"Order"} setStatusList={setStatusListFilter}/>}
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
                                        Sản phẩm
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
                            <button id='btn-save-filter' className="btn btn-primary">
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
                                    {/* Render table headers for columns that exist in ordersList */}
                                    {Object.entries(colsToRender).map(([key, value]) => {
                                        if (value) {
                                            if (key === "created_at") {
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
                                        {ordersList.map((order, index) => {
                                            return (
                                                <tr key={index} className="table-data-row">
                                                    <td rowSpan={1} className='table-icon'>
                                                        <div className="group-icons">
                                                            <button className="btn-icon">
                                                                <FontAwesomeIcon icon={faAnglesRight} />
                                                            </button>
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
                                                                            key !== "id" ? order[key] :
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
                                <button
                                    ref={limitBtnRef}
                                    onClick={() => setIsOpenLimitPopup(!isOpenLimitPopup)}
                                    className={cn("btn-page-limit", { "selected": isOpenLimitPopup })}
                                >
                                    {limit}
                                    <span>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </button>
                                {isOpenLimitPopup && <LimitSelectPopup btnRef={limitBtnRef} closePopup={() => setIsOpenLimitPopup(false)} limit={limit} handleChangeLimit={(limit) => setLimit(limit)} />}
                            </div>
                            <p>kết quả</p>
                            <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + ordersList.length} trên tổng {ordersQuantity}</p>
                            <button
                                className={cn('btn-icon', 'btn-page', { 'inactive': page === 1 })}
                                onClick={handlePrevPage}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            {
                                Array(pageQuantiy).fill(null).map((_, index) => (
                                    <div
                                        key={index}
                                        className={cn("box-page", { 'active': page === index + 1 })}
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </div>
                                ))
                            }
                            <button
                                className={cn('btn-icon', 'btn-page', { 'inactive': page === pageQuantiy })}
                                onClick={handleNextPage}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                            {isOpenLimitPopup && <LimitSelectPopup btnRef={limitBtnRef} closePopup={() => setIsOpenLimitPopup(false)} limit={limit} handleChangeLimit={(limit) => setLimit(limit)} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersList;