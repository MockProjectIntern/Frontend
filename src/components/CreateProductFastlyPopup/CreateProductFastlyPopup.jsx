import s from './CreateProductFastlyPopup.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState,useEffect } from 'react'
import SelectListCategoryPopup from './SelectListCategoryPopup/SelectListCategoryPopup'
import { getListCategory } from '../../service/CategoryAPI'
const CreateProductFastlyPopup = ({handleCLickBack}) =>{
    const [isSelectCategoryList, setIsSelectCategoryList] = useState(false);

    const selectCategoryRef = useRef(null);

    const [categoryList, setCategoryList] = useState([]);
    const [dataPageCategory, setDataPageCategory] = useState({
        currentPage: 1,
        totalPage: 1,
        currentSize: 5,
    });
    const [categoryDataFilter, setCategoryDataFilter] = useState({
        keyword: null
    });
    const fetchCategoryList = async () => {
        const response = await getListCategory(dataPageCategory.currentPage, dataPageCategory.currentSize, categoryDataFilter);
        setCategoryList(response.data.data);
        setDataPageCategory(prevState => {
            return {
                ...prevState,
                totalPage: response.data.total_page
            }
        });
    }
    const fetchMoreCategory = async () => {
        if (dataPageCategory.currentPage < dataPageCategory.totalPage) {
            const response = await getListCategory(dataPageCategory.currentPage + 1, dataPageCategory.currentSize, categoryDataFilter);
            setCategoryList(prevList => [...prevList, ...response.data.data]);
            setDataPageCategory(prevState => {
                return {
                    ...prevState,
                    currentPage: prevState.currentPage + 1,
                    totalPage: response.data.total_page
                }
            });
        }
    }
    const handleFetchMoreCategory = () => {
        if (isSelectCategoryList) {
            fetchCategoryList();
        } else {
            setCategoryList([]);
            setCategoryDataFilter((prev) => {
                return (
                    {
                        ...prev,
                        keyword: ""
                    }
                )
            })
            setDataPageCategory(prevState => {
                return {
                    ...prevState,
                    currentPage: 1,
                    totalPage: 1
                }
            });
        }
    }
    useEffect(() => {
        handleFetchMoreCategory();
    }, [isSelectCategoryList])
    useEffect(() => {
        setDataPageCategory(prevState => {
            return {
                ...prevState,
                currentPage: 1
            }
        });
        handleFetchMoreCategory();
    }, [categoryDataFilter.keyword])
    return(
        <div className={s["modal-content"]}>
            <div className={s["modal-header"]}>
                <div className={s["modal-box-header"]}>
                    <h5>Thêm nhanh sản phẩm</h5>
                </div>
            </div>

            <div className={s["modal-body"]}>
                <div className={s["row-name"]}>
                    <label htmlFor="name" className={s["form-label"]}>
                        Tên nhóm nhà cung cấp
                        <span className="asterisk-icon">*</span>
                    </label>
                    <div className={s["form-textfield"]}>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Nhập tên sản phẩm'
                        />
                        <fieldset className="input-field"></fieldset>
                    </div>
                </div>
                <div className={s["row-content"]}>
                    <div className={s["content"]}>
                        <label htmlFor="name" className={s["form-label"]}>
                            Giá nhập
                        </label>
                        <div className={s["form-textfield"]}>
                            <input
                                type="number"
                                name="name"
                                id="name"
                            />
                            <fieldset className="input-field"></fieldset>
                        </div>
                    </div>
                    <div className={s["content"]}>
                        <label htmlFor="name" className={s["form-label"]}>
                            Giá bán lẻ
                        </label>
                        <div className={s["form-textfield"]}>
                            <input
                                type="number"
                                name="name"
                                id="name"
                            />
                            <fieldset className="input-field"></fieldset>
                        </div>
                    </div>
                </div>
                <div className={s["row-content"]}>
                    <div className={s["content"]}>
                        <label htmlFor="name" className={s["form-label"]}>
                            Số lượng đặt
                        </label>
                        <div className={s["form-textfield"]}>
                            <input
                                type="number"
                                name="name"
                                id="name"
                            />
                            <fieldset className="input-field"></fieldset>
                        </div>
                    </div>
                    <div className={s["content"]}>
                        <label htmlFor="name" className={s["form-label"]}>
                            Loại sản phẩm
                        </label>
                        <div className={s["box-select"]}>
                            <button  id='category' ref={selectCategoryRef} onClick={() => setIsSelectCategoryList(!isSelectCategoryList)}>
                                Chọn loại sản phẩm
                                {isSelectCategoryList ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} />}
                            </button>
                            {
                                isSelectCategoryList && 
                                <SelectListCategoryPopup 
                                    btnRef={selectCategoryRef}
                                    title={"Loại sản phẩm"}
                                    closePopup={() => setIsSelectCategoryList(false)}
                                    dataList={categoryList}
                                    fetchMoreData={fetchMoreCategory}
                                />
                                
                            }
                        </div>
                    </div>
                </div>
                <div className={s["row-content"]}>
                    <div className={s["content"]}>
                        <label htmlFor="name" className={s["form-label"]}>
                            Đơn vị
                        </label>
                        <div className={s["form-textfield"]}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                            />
                            <fieldset className="input-field"></fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s["modal-footer"]}>
                <button className="btn btn-outline-primary" onClick={handleCLickBack} >
                    <span className="btn__title">Thoát</span>
                </button>
                <button className="btn btn-primary" onClick={handleCLickBack}>
                    <span className="btn__title">Thêm</span>
                </button>
            </div>
        </div>
    )
}
export default CreateProductFastlyPopup;