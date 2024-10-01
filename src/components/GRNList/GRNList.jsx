import React, { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

// Import Components
import Header from '../Header/Header'

// Import Columns Info
import col from '../../assets/colgroup/grn-list.js'

// Import Icons
import exportIcon from '../../assets/icons/ExportIcon'
import importIcon from '../../assets/icons/ImportIcon'
import filterIcon from '../../assets/icons/FilterIcon'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import StatusFilter from './FiltersPopup/StatusFilter.jsx'
import CreatedAtFilter from '../GINList/FiltersPopup/CreatedAtFilter.jsx'
import { getGRNs } from '../../service/GRNApi.jsx'
import { formatDateTime } from '../../utils/DateUtils.jsx'

const grnsQuantity = 4;

const GRNList = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(20);

    const [isOpenStatusPopup, setIsOpenStatusPopup] = useState(false);
    const [statusListFilter, setStatusListFilter] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const [isOpenCreatedAtPopup, setIsOpenCreatedAtPopup] = useState(false);
    const [createdMin, setCreatedMin] = useState(null);
    const [createdMax, setCreatedMax] = useState(null)

    const [grnList, setGrnList] = useState([])

    const status = {
        COMPLETED: "Hoàn thành",
        PENDING: "Chưa nhập",
        RETURNED: "Đã hoàn hàng",
        NOT_RETURNED: "Chưa hoàn hàng",
        REFUNDED: "Đã hoàn tiền",
        NOT_REFUNDED: "Chưa hoàn tiền",
        PARTIAL: "Nhập một phần",
        CANCELLED: "Đã hủy",
        ENTERED: "Đã nhập",
        NOT_ENTERED: "Chưa nhập",
        UNPAID: "Chưa thanh toán",
        PAID: "Đã thanh toán",
        PARTIAL_PAID: "Thanh toán một phần",
        ORDERING: "Đang đặt hàng",
        TRADING: "Đang giao dịch",
    }

    const defaultFilter = {
        keyword: null,
        statuses: null,
        received_statuses: null,
        supplier_ids: null,
        start_created_at: null,
        end_created_at: null,
        start_expected_at: null,
        end_expected_at: null,
        product_ids: null,
        user_created_ids: null,
        user_completed_ids: null,
        user_cancelled_ids: null
    }
    const [filterBody, setFilterBody] = useState(defaultFilter)

    const fetchGrnList = async () => {
        const responseAPI = await getGRNs(page, limit, "filter_grns", Cookies.get('filter_grns'), {
            ...filterBody, start_date_at: createdMin, end_created_at: createdMax, statuses: statusListFilter
        });
        setGrnList(responseAPI.data.data);
        setPageQuantity(responseAPI.data.total_page);
        setTotalItems(responseAPI.data.total_items);
    }

    useEffect(() => {
        fetchGrnList();
    }, [])
    
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_grns');
        return storedCols ? JSON.parse(storedCols) : {
            grn_id: true,
            grn_sub_id: true,
            grn_status: true,
            grn_receive_status: true,
            grn_payment_status: true,
            grn_return_status: true,
            grn_refund_status: true,
            grn_received_at: true,
            grn_expected_at: true,
            grn_cancelled_at: true,
            grn_payment_at: true,
            grn_total_received_quantity: true,
            grn_total_value: true,
            grn_supplier_name: true,
            grn_supplier_sub_id: true,
            grn_supplier_phone: true,
            grn_supplier_email: true,
            grn_user_created_name: true,
            grn_user_completed_name: true,
            grn_user_cancelled_name: true,
            grn_note: true,
            grn_tags: true,
            grn_created_at: true,
            grn_updated_at: true,
            grn_order_sub_id: true
        }

    })

    useEffect(() => {
        Cookies.set('filter_grns', JSON.stringify(colsToRender));
    }, [colsToRender])

    const headersRef = useRef(null);
    const contentRef = useRef(null);
    const statusBtnRef = useRef(null);
    const createdAtRef = useRef(null)

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
            <Header title={"Danh sách đơn nhập hàng"} />
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
                        <button className="btn btn-base btn-text">
                            <span className="btn__label">
                                Quản lý hoàn trả NCC
                            </span>
                        </button>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={() => { navigate("/admin/grns/create") }}>
                            <span className="btn__icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="btn__title">Tạo phiếu nhập hàng</span>
                        </button>
                    </div>
                </div>
                <div className="right__table">
                    <div className="right__table-scroller">
                        <div className="box-scroller">
                            <div className="group-scroller-btns">
                                <button className="btn-scroller active">Tất cả đơn nhập hàng</button>
                                <button className="btn-scroller">Đang giao dịch</button>
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
                                <button ref={statusBtnRef} className="btn btn-base btn-filter" onClick={() => setIsOpenStatusPopup(!isOpenStatusPopup)}>
                                    <span className="btn__label">
                                        Trạng thái
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                    </span>
                                </button>
                                {isOpenStatusPopup && <StatusFilter statusBtnRef={statusBtnRef} closePopup={() => setIsOpenStatusPopup(false)} type={"GRN"} setStatusList={setStatusListFilter} />}
                                <button onClick={() => setIsOpenCreatedAtPopup(!isOpenCreatedAtPopup)} className="btn btn-base btn-filter">
                                    <span className="btn__label">
                                        Ngày tạo
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                    </span>
                                </button>
                                {isOpenCreatedAtPopup && <CreatedAtFilter createdRef={createdAtRef} closePopup={() => setIsOpenCreatedAtPopup(false)} setCreatedMin={setCreatedMin} setCreatedMax={setCreatedMax} />}

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
                                    {/* Render table headers for columns that exist in grnList */}
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
                                        {grnList.map((grn, index) => {
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
                                                                        <div className={cn('box-status',
                                                                            `box-status--${grn[key.substring(4)]?.toLowerCase()}`

                                                                        )}>
                                                                            <span>{(status[grn[key.substring(4)]])}</span>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            } else if (key.includes("_at")) {
                                                                return (
                                                                    <td
                                                                        key={key}
                                                                        className={cn("table-data-item", col[key].align)}
                                                                    >
                                                                        <p className='box-text'>
                                                                            {formatDateTime(grn[key.substring(4)])}
                                                                        </p>
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
                                                                            key !== "id" ? grn[key.substring(4)] :
                                                                                <a className='box-id'>{grn[key.substring(4)]}</a>
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
                            <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + grnList.length} trên tổng {grnsQuantity}</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GRNList;