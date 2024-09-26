import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Cookies from 'js-cookie'

// Import Components
import Header from '../Header/Header'

// Import Columns Info
import col from '../../assets/colgroup/gin-list.js'

// Import Icons
import exportIcon from '../../assets/icons/ExportIcon'
import importIcon from '../../assets/icons/ImportIcon'
import filterIcon from '../../assets/icons/FilterIcon'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import LimitSelectPopup from '../LimitSelectPopup/LimitSelectPopup.jsx'
import { getGINs } from '../../service/GINApi.jsx'

// const ginList = [
//     {
//         id: "OSN00004",
//         created_at: "13/09/2024 11:36",
//         balanced_at: "13/09/2024 11:36",
//         status: "Đang kiểm kho",
//         user_created: "Admin",
//         user_inspection: "Admin",
//         user_balanced: "Admin",
//         note: "Giao hàng",
//     },
//     {
//         id: "OSN00003",
//         created_at: "13/09/2024 11:36",
//         balanced_at: "13/09/2024 11:36",
//         status: "Đã cân bằng",
//         user_created: "Admin",
//         user_inspection: "Admin",
//         user_balanced: "Admin",
//         note: "Giao hàng",
//     },
//     {
//         id: "OSN00002",
//         created_at: "13/09/2024 11:36",
//         balanced_at: "13/09/2024 11:36",
//         status: "Đã xóa",
//         user_created: "Admin",
//         user_inspection: "Admin",
//         user_balanced: "Admin",
//         note: "Giao hàng",
//     }
    
  
// ]


const GINList = () => {
    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
    const limitBtnRef = useRef(null);
    const navigate = useNavigate();
    const [totalItems, setTotalItems] = useState(0);


    const [ginList, setGinList] = useState([]);
    // Get list of columns that need redering from Cookies
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_gins');
        return storedCols ? JSON.parse(storedCols) : {
            id: true,
            sub_id: true,
            created_at: true,
            updated_at: true,
            status: true,
            user_created_name: true,
            user_inspection_name: true,
            user_balanced_name: true,
            note: true,
            balanced_at: true,
        }
    })

    // Set required columns to Cookies
    useEffect(() => {
        Cookies.set('filter_gins', JSON.stringify(colsToRender));
    }, [colsToRender])

    useEffect(() => {
        const fetchGinList = async () => {
            try {
                const res = await getGINs(page, limit, "filter_gins", Cookies.get('filter_gins'));
                setGinList(res.data.data);
                setPageQuantity(Math.ceil(res.data.total_items / limit));
                setTotalItems(res.data.total_items);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGinList();
    }, [page, limit])
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
                <button className="btn btn-primary" onClick={()=> navigate("/admin/gins/create")}>
                    <span className="btn__icon">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className="btn__title">Tạo phiếu kiểm hàng</span>
                </button>
            </div>
            </div>
            <div className="right__table">
                <div className="right__table-scroller">
                    <div className="box-scroller">
                        <div className="group-scroller-btns">
                            <button className="btn-scroller active">Tất cả phiếu kiểm hàng</button>
                            <button className="btn-scroller">Đang kiểm</button>
                            <button className="btn-scroller">Đã cân bằng</button>
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
                            <button className="btn btn-base btn-filter">
                                <span className="btn__label">
                                    Trạng thái
                                    <span className="btn__icon">
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </span>
                            </button>
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
                                {/* Render table headers for columns that exist in ginList */}
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
                                    {ginList.map((gin, index) => {
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
                                                                        'box-status--pending': gin[key] === "Đang kiểm kho",
                                                                        'box-status--balanced': gin[key] === "Đã cân bằng",
                                                                        'box-status--deleted': gin[key] === "Đã xóa",
                                                                    })}>
                                                                        <span>{gin[key]}</span>
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
                                                                        key !== "id" ? gin[key] :
                                                                        <a className='box-id'>{gin[key]}</a>
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
                                className={cn("btn-page-limit", {"selected": isOpenLimitPopup})}
                            >
                                {limit}
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                            {isOpenLimitPopup && <LimitSelectPopup btnRef={limitBtnRef} closePopup={() => setIsOpenLimitPopup(false)} limit={limit} handleChangeLimit={(limit) => setLimit(limit)} />}
                        </div>
                        <p>kết quả</p>
                        <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + ginList.length} trên tổng {totalItems}</p>
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

export default GINList;