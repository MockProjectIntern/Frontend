import React, { useEffect, useRef, useState } from 'react'
import exportIcon from '../../assets/icons/ExportIcon'
import importIcon from '../../assets/icons/ImportIcon'
import filterIcon from '../../assets/icons/FilterIcon'
import col from '../../assets/colgroup/variant-list.js'
import cn from "classnames"
import Cookies from 'js-cookie'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header/Header'


const variantsList = [
    {
        name: "Sản phẩm 4",
        images:[
            {
                url: "https://www.fahasa.com/tuyen-tap-nam-cao.html?p=2&web_ref=dore.vn&srsltid=AfmBOoo6dzj-e4CSuvi9JhjkEh-Xm2thx6cV5A7kycQ3i0TPAtiR1ngw#lg=1&slide=0",
                alt: ""
            },
            {

            }
        ],
        category_name: "MDC",
        brand_name: "Admin",
        quantity: 7,
        status: "ACTIVE",
        created_at: "18/09/2024",
        updated_at: "18/10/2024",
        cost_price : 500.000,
        wholesale_price : 550.000, 
        retail_price : 700.000 
    },
    {
        name: "Sản phẩm 3",
        images:[
            {
                url: "abc",
                alt: ""
            },
            {

            }
        ],
        category_name: "MDC",
        brand_name: "Admin",
        quantity: 7,
        status: "INACTIVE",
        created_at: "18/09/2024",
        updated_at: "18/10/2024",
        cost_price : 500.000,
        wholesale_price : 550.000, 
        retail_price : 700.000 
    },
    {
        name: "Sản phẩm 2",
        images:[
            {
                url: "abc",
                alt: ""
            },
            {

            }
        ],
        category_name: "MDC",
        brand_name: "Admin",
        quantity: 7,
        status: "ACTIVE",
        created_at: "18/09/2024",
        updated_at: "18/10/2024",
        cost_price : 500.000,
        wholesale_price : 550.000, 
        retail_price : 700.000 
    },
    {
        name: "Sản phẩm 1",
        images:[
            {
                url: "abc",
                alt: ""
            },
            {

            }
        ],
        category_name: "MDC",
        brand_name: "Admin",
        quantity: 7,
        status: "ACTIVE",
        created_at: "18/09/2024",
        updated_at: "18/10/2024",
        cost_price : 500.000,
        wholesale_price : 550.000, 
        retail_price : 700.000 
    }
]

const ordersQuantity = 4;
const VariantList = () => {
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
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('variantsList');
        return storedCols ? JSON.parse(storedCols) : {
            name: true,
            status: true,
            category_name: true,
            brand_name: true,
            quantity: true,
            images: false,
            created_at: true,
            updated_at: true,
            cost_price : true,
            wholesale_price : true, 
            retail_price : true 
            
        }
    })

    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        Cookies.set('variantsList', JSON.stringify(colsToRender));
    }, [colsToRender])
    return (
        <>
        <Header />

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
                    <button className="btn btn-base btn-text">
                        <span className="btn__label">
                            <span className="btn__icon">
                                {importIcon}
                            </span>
                                Loại sản phẩm
                            </span>
                    </button>
                </div>
                <div className="btn-toolbar">
                    <button className="btn btn-primary">
                        <span className="btn__title">Xem danh sách sản phẩm</span>
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
                                {/* Render table headers for columns that exist in variantsList */}
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
                                    {variantsList.map((order, index) => {
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
                                                                        //'box-status--pending': order[key] === "Chưa nhập",
                                                                        'box-status--partial': order[key] === "ACTIVE",
                                                                        //'box-status--completed': order[key] === "INACTIVE",
                                                                        'box-status--cancelled': order[key] === "INACTIVE",
                                                                    })}>
                                                                        <span>
                                                                        {order[key] === "ACTIVE" ? 'Đang hoạt động' : order[key] === "INACTIVE" ? 'Ngừng giao dịch' : order[key]}
                                                                        </span>
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
                            <button className="btn-page-limit">
                                20
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                        </div>
                        <p>kết quả</p>
                        <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + variantsList.length} trên tổng {ordersQuantity}</p>
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

export default VariantList
