import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

// Import Components
import SearchSupplier from '../SearchSupplier/SearchSupplier'
import SupplierInfo from '../SupplierInfo/SupplierInfo'
import ProductsTable from '../ProductsTable/ProductsTable.jsx'
import DiscountPopup from '../DiscountPopup/DiscountPopup.jsx'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronLeft, faGear, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import calendarIcon from '../../assets/icons/CalendarIcon.jsx'
import infoIcon from '../../assets/icons/InfoIcon.jsx'

const CreateOrder = () => {
    const [supplier, setSupplier] = useState({
        name: "Test",
        phone: "0123456789",
        address: "Hà Nội, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội, Việt Nam",
        debt: "4,000,000",
        grn_quantity: 0,
        grn_total: 0,
        return: 0,
    });
    const [order, setOrder] = useState({
        discount: 0,
        total: 350000,
    });
    const [productsList, setProductsList] = useState([
        {
            id: "PVN05",
            image: "https://sapo.dktcdn.net/100/805/407/variants/1abe9da6-729b-4bc6-b0f3-df59da5fcfe2-1726473515737.jpg",
            name: "Áo khoác Chino thời thượng SID56708 - Trắng",
            barcode: "SID56708",
            unit: "---",
            ordered_quantity: 0,
            price: 350000,
            discount: 17000,
            tax: "0%",
            total: "0"
        }
    ])
    const [tags, setTags] = useState([]);
    const [tagValue, setTagValue] = useState("");
    const [isDiscountPopup, setIsDiscountPopup] = useState(false)
    const discountBtnRef = useRef(null)
    
    // Get list of columns that need redering from Cookies
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_products_table');
        return storedCols ? JSON.parse(storedCols) : {
            index: true,
            image: true,
            name: true,
            barcode: true,
            unit: true,
            ordered_quantity: true,
            price: true,
            discount: true,
            tax: true,
            total: true
        }
    })

    // Set required columns to Cookies
    useEffect(() => {
        Cookies.set('filter_products_table', JSON.stringify(colsToRender));
    }, [colsToRender])

    const addTag = (e) => {
        if (e.key === 'Enter' &&!tags.includes(tagValue)) {
            setTags([...tags, tagValue])
            setTagValue("");
        }
    }

    const deleteTag = (tag) => {
        setTags(prev => prev.filter(item => item !== tag))
    }

    const closeDiscountPopup = () => {
        setIsDiscountPopup(false);
    }

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
                        <span className="btn__title">Tạo đơn đặt hàng</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="right__createPage">
            <div className="right__createPage-wrapper">
                <div className="right__createPage-container">
                    <div className="box-supplier">
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin nhà cung cấp</p>
                            </div>
                            <div className="paper-content">
                                {
                                    supplier ?
                                    <SupplierInfo supplier={supplier} handleCancel={() => setSupplier(null)} /> :
                                    <SearchSupplier />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="box-info">
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin đơn đặt hàng</p>
                            </div>
                            <div className="paper-content">
                                <div className="group-info">
                                    <div className="info-item">
                                        <p className="info-title">Nhân viên</p>
                                        <div className="info-field">
                                            <div className="box-input">
                                                <input placeholder='Nhân viên' name='user_created_name' type="text" className="text-field" />
                                                <fieldset className='input-field'></fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Ngày nhập</p>
                                        <div className="info-field">
                                            <div className="box-input">
                                                <input placeholder='Chọn ngày nhập dự kiến' name='expected_at' type="text" className="text-field" />
                                                <fieldset className='input-field'></fieldset>
                                                <div className="calendar-icon">
                                                    {calendarIcon}
                                                </div>
                                            </div>               
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Mã đơn</p>
                                        <div className="info-field">
                                            <div className="box-input">
                                                <input placeholder='Nhập mã' name='id' type="text" className="text-field" />
                                                <fieldset className='input-field'></fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-products">
                        <div className="box-paper">
                            <div className="paper-header">
                                <div className="box-header">
                                    <p>Thông tin sản phẩm</p>
                                    <div className="btn-toolbar">
                                        <div className="checkbox__container">
                                            <div className="checkbox__wrapper">
                                                <input type="checkbox" name="" id="checkBoxInput" className='checkbox__input' />
                                                <div className="btn-checkbox"></div>
                                            </div>
                                            <label htmlFor='checkBoxInput' className='checkbox__label'>Tách dòng</label>
                                        </div>
                                        <button className="btn-icon">
                                            <FontAwesomeIcon icon={faGear} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="paper-content">
                                <div className="right__table">
                                    <div className="right__table-search-filter">
                                        <div className="box-search-filter-btns">
                                            <div className="box-search">
                                                <div className="box-input">
                                                    <div className="search-icon">
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </div>
                                                    <input placeholder='Tìm theo tên, mã SKU, hoặc quét mã Barcode...(F3)' type="text" name="search" id="" autoComplete='on' />
                                                    <fieldset className='input-field' />
                                                </div>
                                                <button className="btn btn-base">
                                                    <span className="btn__label">
                                                        <p>Chọn nhanh</p>
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="btn-group group-filter-btns">
                                                <button className="btn btn-base btn-filter">
                                                    <span className="btn__label">
                                                        Giá nhập
                                                        <span className="btn__icon">
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-table">
                                <ProductsTable productsList={productsList} colsToRender={colsToRender} />
                                <div className="box-total">
                                    <div className="box-total__container">
                                        <div className="box-subinfo">
                                            <div className="box-note">
                                                <label className='input-label' htmlFor="note">Ghi chú đơn</label>
                                                <div className="text-field">
                                                    <textarea name="note" id="note" placeholder='VD: Hàng tặng gói riêng'></textarea>
                                                    <fieldset className='input-field'></fieldset>
                                                </div>
                                            </div>
                                            <div className="box-tags">
                                                <label className='input-label' htmlFor="tags">Tags</label>
                                                <div className="tags-field">
                                                    <div className="group-tags">
                                                        {
                                                            tags.map((tag, index) => {
                                                                return (
                                                                    <div key={index} role='button' className="btn-tag-item">
                                                                        <span className="tag-label">{tag}</span>
                                                                        <FontAwesomeIcon onClick={() => deleteTag(tag)} icon={faXmark} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <input 
                                                            id='tags'
                                                            onChange={(e) => setTagValue(e.target.value)}
                                                            onKeyDown={addTag}
                                                            aria-invalid="false" 
                                                            autoComplete='off' 
                                                            placeholder='Nhập ký tự và ấn Enter' 
                                                            type="text" 
                                                            className="tags-input"
                                                            aria-autocomplete='list'
                                                            autoCapitalize='none'
                                                            spellCheck="false"
                                                            maxLength={255}
                                                            value={tagValue}
                                                        />
                                                        <fieldset className='input-field'></fieldset>
                                                    </div>    
                                                </div>                                                             
                                            </div>
                                        </div>
                                        <div className="box-price-info">
                                            <div className="info-item">
                                                <p>Số lượng</p>
                                                <p>0</p>
                                            </div>
                                            <div className="info-item">
                                                <p>Tổng tiền</p>
                                                <p>350,000</p>
                                            </div>
                                            <div className="info-item">
                                                <button onClick={() => setIsDiscountPopup(true)} ref={discountBtnRef} className="btn-base">
                                                    <span className="btn__label">
                                                        <p>Chiết khấu (F6)</p>
                                                    </span>
                                                </button>
                                                {isDiscountPopup && <DiscountPopup price={order.total} discount={order.discount} btnRef={discountBtnRef} closePopup={closeDiscountPopup} />}
                                                <p>0</p>
                                            </div>
                                            <div className="info-item">
                                                <div className="d-flex">
                                                    <p>Thuế</p>
                                                    <p>{infoIcon}</p>
                                                </div>
                                                <p>0</p>
                                            </div>
                                            <div className="info-item">
                                                <p className='total-price'>Tiền cần trả</p>
                                                <p className='total-price'>350,000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreateOrder