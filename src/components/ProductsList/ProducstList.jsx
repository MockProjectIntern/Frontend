import React, { useEffect, useRef, useState } from 'react'
import exportIcon from '../../assets/icons/ExportIcon.jsx'
import importIcon from '../../assets/icons/ImportIcon.jsx'
import filterIcon from '../../assets/icons/FilterIcon.jsx'
import col from '../../assets/colgroup/products-list.js'
import cn from "classnames"
import Cookies from 'js-cookie'
import settingFilterIcon from '../../assets/icons/SettingFilterIcon.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header/Header.jsx'
import { useNavigate } from 'react-router-dom'
import { getProductList } from '../../service/ProductAPI.jsx'
import LimitSelectPopup from '../LimitSelectPopup/LimitSelectPopup.jsx'
import SelectFilter from '../SelectFilter/SelectFilter.jsx'
import { getListCategory } from '../../service/CategoryAPI.jsx'
import { getListBrand } from '../../service/BrandAPI.jsx'




const ProductList = () => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_products');
        return storedCols ? JSON.parse(storedCols) : {
            images: true,
            name: true,
            status: true,
            category_name: true,
            brand_name: true,
            quantity: true,
            created_at: true,
            updated_at: true
        }
    })

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


    const navigate = useNavigate();

    const headersRef = useRef(null);
    const contentRef = useRef(null);
    const limitBtnRef = useRef(null);
    const filterCategoryBtnRef = useRef(null);
    const filterBrandBtnRef = useRef(null);


    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(10);
    const [productsList, setProductsList] = useState([]);
    const [productsQuantity, setProductsQuantity] = useState();
    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
    const [dataBody, setDataBody] = useState(
        {
            keyword: null,
            category_ids: null,
            created_date_from: null,
            created_date_to: null,
            brand_ids: null,
            statuses: null,
            tags: null
        }
    );
    // phan useState quan ly filter loai san pham
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [listCategories, setListCategories,] = useState([]);
    const [isOpenFilterCategoryPopup, setIsOpenFilterCategoryPopup] = useState(false);
    const [dataFilterCategory, setDataFilterCategory] = useState(
        {
            "keyword": null,
        }
    );
    const [categoryKeyword, setCategoryKeyword] = useState("");
    const [currentPageFilterCategory, setCurrentPageFilterCategory] = useState(1);
    const [totalPageFilterCategory, setTotalPageFilterCategory] = useState();
    //phan useState quan ly filter nhan hieu
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [listBrands, setListBrands,] = useState([]);
    const [isOpenFilterBrandPopup, setIsOpenFilterBrandPopup] = useState(false);
    const [dataFilterBrand, setDataFilterBrand] = useState(
        {
            "keyword": null,
        }
    );
    const [brandKeyword, setBrandKeyword] = useState("");
    const [currentPageFilterBrand, setCurrentPageFilterBrand] = useState(1);
    const [totalPageFilterBrand, setTotalPageFilterBrand] = useState();

    const handleSelectionChangeCategories = (selected) => {
        setSelectedCategories(selected);
        setDataBody((prevDataBody) => ({
            ...prevDataBody, // Giữ nguyên các thuộc tính khác của prevDataBody
            category_ids: selected // Cập nhật danh sách brand_ids
        }));
    };
    const handleSelectionChangeBrands = (selected) => {
        setSelectedBrands(selected);
        setDataBody((prevDataBody) => ({
            ...prevDataBody, // Giữ nguyên các thuộc tính khác của prevDataBody
            brand_ids: selected // Cập nhật danh sách brand_ids
        }));
    };

    const handleClickButtonFilterCategory = () =>{
        fetchProductList();
        setIsOpenFilterCategoryPopup(!isOpenFilterCategoryPopup)
    }

    const handleClickButtonFilterBrand = () =>{
        fetchProductList();
        setIsOpenFilterBrandPopup(!isOpenFilterBrandPopup)
    }

    const fetchProductList = async () => {
        try {
            const products = await getProductList(page, limit, "filter_products", Cookies.get("filter_products"), dataBody);

            if (products.status_code === 200) {
                console.log("data")
                setProductsList(products.data.data);
                setProductsQuantity(products.data.total_items);
                setPageQuantity(products.data.total_page)
            } else {
                console.log("status code:", products.status_code);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const fetchCategoryList = async () => {
        try {
            const categories = await getListCategory(currentPageFilterCategory,10,dataFilterCategory )
            if(categories.status_code === 200){
                setListCategories(categories.data.data);
                setTotalPageFilterCategory(categories.data.total_page)
            }
            else {
                console.log("status code:", categories.status_code);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const fetchBrandList = async () => {
        try {
            const brands = await getListBrand(currentPageFilterCategory,10,dataFilterCategory )
            if(brands.status_code === 200){
                setListBrands(brands.data.data);
                setTotalPageFilterBrand(brands.data.total_page)
            }
            else {
                console.log("status code:", brands.status_code);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    const fetchMoreCategoryList = async() =>{
        if(currentPageFilterCategory < totalPageFilterCategory){
            const categories = await getListCategory(currentPageFilterCategory + 1,10,dataFilterCategory )
            setListCategories(prev => [
                ...prev,
                ...categories.data.data,
            ]);
            setCurrentPageFilterCategory(currentPageFilterCategory + 1);
            setTotalPageFilterCategory(categories.data.total_page);
        }
    }

    const fetchMoreBrandsList = async() =>{
        if(currentPageFilterBrand < totalPageFilterBrand){
            const brands = await getListCategory(currentPageFilterBrand + 1,10,dataFilterBrand )
            setListBrands(prev => [
                ...prev,
                ...brands.data.data,
            ]);
            setCurrentPageFilterBrand(currentPageFilterBrand + 1);
            setTotalPageFilterBrand(brands.data.total_page);
        }
    }

    const handleFetchMoreCategoryList = () =>{
        if(isOpenFilterCategoryPopup){
            fetchCategoryList();
        }
        else{
            setListCategories([]);
            setCategoryKeyword("");
            setCurrentPageFilterCategory(1);
            setTotalPageFilterCategory(1);
        }
    }

    const handleFetchMoreBrandList = () =>{
        if(isOpenFilterBrandPopup){
            fetchBrandList();
        }
        else{
            setListBrands([]);
            setBrandKeyword("");
            setCurrentPageFilterBrand(1);
            setTotalPageFilterBrand(1);
        }
    }

    useEffect(() =>{
        handleFetchMoreCategoryList();
    },[isOpenFilterCategoryPopup])

    useEffect(() =>{
        setCurrentPageFilterCategory(1);
        handleFetchMoreCategoryList();
    },[categoryKeyword])

    useEffect(() =>{
        handleFetchMoreBrandList();
    },[isOpenFilterBrandPopup])

    useEffect(() =>{
        setCurrentPageFilterBrand(1);
        handleFetchMoreBrandList();
    },[brandKeyword])

    useEffect(() => {
        Cookies.set('filter_products', JSON.stringify(colsToRender));
    }, [colsToRender])
    //console.log(col)

    useEffect(() => {
        fetchProductList();

    }, [limit, page]);

    useEffect(()=>{
        if(isOpenFilterCategoryPopup){
            fetchCategoryList();
        }
        else{
            setListCategories([]);
            setDataFilterCategory({keyword: null});
        }

    }, [isOpenFilterCategoryPopup, dataFilterCategory.keyword, currentPageFilterCategory]);

    useEffect(()=>{
        if(isOpenFilterBrandPopup){
            fetchBrandList();
        }
        else{
            setListBrands([]);
            setDataFilterBrand({keyword: null});
        }

    }, [isOpenFilterBrandPopup, dataFilterBrand.keyword, currentPageFilterBrand]);

    useEffect(() => {
        console.log("Sản phẩm đã thay đổi:", productsList);
        // Bạn có thể thực hiện các hành động khác nếu cần khi sản phẩm thay đổi
    }, [productsList]);

    console.log(selectedBrands)

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
                        <button className="btn btn-primary" onClick={() => navigate('/admin/products/create')}>
                            <span className="btn__icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="btn__title">Thêm sản phẩm</span>
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
                                <button className="btn btn-base btn-filter" onClick={() => {setIsOpenFilterCategoryPopup(!isOpenFilterCategoryPopup);  }} ref={filterCategoryBtnRef}>
                                    <span className="btn__label">
                                        Loại sản phẩm
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                    </span>
                                </button>
                                {
                                    isOpenFilterCategoryPopup && 
                                    <SelectFilter
                                        btnRef={filterCategoryBtnRef} 
                                        closePopup={() =>setIsOpenFilterCategoryPopup(false)} 
                                        listObject={listCategories} 
                                        currentPage={currentPageFilterCategory} 
                                        totalPage={totalPageFilterCategory}
                                        onSelectionChange={handleSelectionChangeCategories}
                                        handleOnClickButton={handleClickButtonFilterCategory}
                                        keyword={categoryKeyword}
                                        handleChangeKeyword={(e) => {
                                            setCategoryKeyword(e.target.value);
                                        }}
                                        loadMoreData={fetchMoreCategoryList}
                                    />
                                }
                                <button className="btn btn-base btn-filter">
                                    <span className="btn__label">
                                        Ngày tạo
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                    </span>
                                </button>
                                <button className="btn btn-base btn-filter" onClick={() => {setIsOpenFilterBrandPopup(!isOpenFilterBrandPopup);  }} ref={filterBrandBtnRef}>
                                    <span className="btn__label">
                                        Nhãn hiệu
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                    </span>
                                </button>
                                {
                                    isOpenFilterBrandPopup && 
                                    <SelectFilter
                                        btnRef={filterBrandBtnRef} 
                                        closePopup={() =>setIsOpenFilterBrandPopup(false)} 
                                        listObject={listBrands} 
                                        currentPage={currentPageFilterBrand} 
                                        totalPage={totalPageFilterBrand}
                                        onSelectionChange={handleSelectionChangeBrands}
                                        handleOnClickButton={handleClickButtonFilterBrand}
                                        keyword={brandKeyword}
                                        handleChangeKeyword={(e) => {
                                            setBrandKeyword(e.target.value);
                                        }}
                                        loadMoreData={fetchMoreBrandsList}
                                    />
                                }
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
                                    {/* Render table headers for columns that exist in productsList */}
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
                                        {productsList.map((product, index) => {
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
                                                                            'box-status--partial': product[key] === "ACTIVE",
                                                                            //'box-status--completed': order[key] === "INACTIVE",
                                                                            'box-status--cancelled': product[key] === "INACTIVE",
                                                                        })}>
                                                                            <span>
                                                                                {product[key] === "ACTIVE" ? 'Đang hoạt động' : product[key] === "INACTIVE" ? 'Ngừng giao dịch' : product[key]}
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
                                                                        <img src={product?.images[0]?.url} alt={product?.images[0]?.alt} />
                                                                    </td>
                                                                )
                                                            } else if (key === "updated_at" || key === "created_at") {
                                                                return (
                                                                    <td
                                                                        key={key}
                                                                        className={cn("table-data-item", col[key].align)}
                                                                    >
                                                                        <p className='box-text'>
                                                                            {
                                                                                formatDate(product[key])
                                                                            }
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
                                                                            key !== "name" ? product[key] :
                                                                                <a className='box-id'>{product[key]}</a>
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
                                {isOpenLimitPopup && <LimitSelectPopup btnRef={limitBtnRef} closePopup={() => setIsOpenLimitPopup(false)} limit={limit} handleChangeLimit={(limit) => { setLimit(limit) }} />}
                            </div>
                            <p>kết quả</p>
                            <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + productsList.length} trên tổng {productsQuantity}</p>
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
export default ProductList