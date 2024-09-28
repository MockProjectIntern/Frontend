import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Cookies from 'js-cookie'

// Import Components
import Header from '../Header/Header'

// Import Columns Info
import col from '../../assets/colgroup/suppliers-list.js'

// Import Icons
import exportIcon from '../../assets/icons/ExportIcon'
import importIcon from '../../assets/icons/ImportIcon'
import filterIcon from '../../assets/icons/FilterIcon'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getSupplierList } from '../../service/SuppliersAPI.jsx'
import { useNavigate } from 'react-router-dom'
import LimitSelectPopup from '../LimitSelectPopup/LimitSelectPopup.jsx'



const SupplierList = () => {
    const navigate = useNavigate();
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
    //Cookies.remove("ordersListCols")
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_suppliers');
        return storedCols ? JSON.parse(storedCols) : {
            id: true,
            name: true,
            phone: false,
            email: false,
            address: false,
            status: true,
            tags: false,
            note: false,
            total_refund: false,
            created_at: true,
            updated_at: false
        }
    })
    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
    const [suppliersList, setSuppliersList] = useState([]);
    const [suppliersQuantity, setSuppliersQuantity] = useState();
    const limitBtnRef = useRef(null);

    const [dataBody, setDataBody] = useState(
        {
            "keyword": null,
            "status": null
        }
    );

    const fetchSupplierList = async () => {
        try {
            const suppliers = await getSupplierList(page, limit, "filter_suppliers", Cookies.get("filter_suppliers"), dataBody);

            if (suppliers.status_code === 200) {
                setSuppliersList(suppliers.data.data);
                setSuppliersQuantity(suppliers.data.total_items);
                setPageQuantity(suppliers.data.total_page)
            } else {
                console.log("status code:", suppliers.status_code);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    useEffect(() => {
        Cookies.set('filter_suppliers', JSON.stringify(colsToRender));
    }, [colsToRender])
    //console.log(col)

    useEffect(() => {
        fetchSupplierList();

    }, [limit, page]);
    return (
        <>
            <Header title={"Danh sách nhà cung cấp"} />
            <div className='right__listPage'>
                <div className='right__toolbar'>
                    <div className='btn-toolbar'>
                        <button className='btn btn-base btn-text'>
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
                        <button className="btn btn-base btn-text" onClick={() => navigate("/admin/supplier_groups")}>
                            <span className="btn__label">
                                <span className="btn__icon">
                                    {importIcon}
                                </span>
                                Nhóm nhà cung cấp
                            </span>
                        </button>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={() => navigate('/admin/suppliers/create')}>
                            <span className="btn__icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="btn__title">Thêm nhà cung cấp</span>
                        </button>
                    </div>
                </div>

                <div className='right__table'>
                    <div className="right__table-scroller">
                        <div className="box-scroller">
                            <div className="group-scroller-btns">
                                <button className="btn-scroller active">Tất cả sản phẩm</button>
                            </div>
                        </div>
                    </div>
                    <div className='right__table-search-filter'>
                        <div className='box-search-filter-btns'>
                            <div className="box-search">
                                <div className="box-input">
                                    <div className="search-icon">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </div>
                                    <input placeholder='Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode' type="text" name="search" id="" autoComplete='on' />
                                    <fieldset className='input-field' />
                                </div>
                            </div>
                            <div className="btn-group group-filter-btns">
                                <button className="btn btn-base btn-filter">
                                    <span className="btn__label">
                                        Loại sản phẩm
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
                                        Nhãn hiệu
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
                                    {/* Render table headers for columns that exist in suppliersList */}
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
                                        {suppliersList.map((supplier, index) => {
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
                                                                            'box-status--completed': supplier[key] === "ACTIVE",
                                                                            'box-status--cancelled': supplier[key] === "INACTIVE",
                                                                        })}>
                                                                            <span>
                                                                                {supplier[key] === "ACTIVE" ? 'Đang hoạt động' : supplier[key] === "INACTIVE" ? 'Ngừng giao dịch' : supplier[key]}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            } else if (key === "images") {
                                                                return (
                                                                    <td
                                                                        key={key}
                                                                        className={cn("table-data-item", col[key].align)}
                                                                    >
                                                                        <img src={supplier.images[0]?.url} alt={supplier.images[0]?.alt} />
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
                                                                            key !== "id" ? supplier[key] :
                                                                                <a className='box-id'>{supplier[key]}</a>
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
                            <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + suppliersList.length} trên tổng {suppliersQuantity}</p>
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
export default SupplierList;