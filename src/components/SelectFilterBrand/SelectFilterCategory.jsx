
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import s from "./SelectFilterCategory.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const SelectFilterBrand = ({ 
    closePopup, 
    listCategories, 
    btnRef, 
    currentPage, 
    totalPage,
    onSelectionChange, // Thêm prop này
    handleOnClickButton
}) => {
    const popupRef = useRef(null);
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
            closePopup();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        onSelectionChange(selectedCategories); // Gọi hàm truyền lên mỗi khi selectedCategories thay đổi
    }, [selectedCategories]); // Khi selectedCategories thay đổi, gọi hàm onSelectionChange

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedCategories([]); // Bỏ chọn tất cả
        } else {
            const allSelectedIds = listCategories.map(item => item.id);
            setSelectedCategories(allSelectedIds); // Chọn tất cả
        }
        setIsAllSelected(!isAllSelected);
    };

    const toggleSelectCategory = (sub_id) => {
        let updatedCategories;
        
        if (selectedCategories.includes(sub_id)) {
            // Bỏ chọn mục
            updatedCategories = selectedCategories.filter(categoryId => categoryId !== sub_id);
        } else {
            // Chọn mục
            updatedCategories = [...selectedCategories, sub_id];
        }
    
        setSelectedCategories(updatedCategories);
    
        // Nếu không phải tất cả các mục đều được chọn, cập nhật trạng thái "Chọn tất cả"
        if (updatedCategories.length !== listCategories.length) {
            setIsAllSelected(false); // Trở về trạng thái chưa chọn tất cả
        } else {
            setIsAllSelected(true); // Nếu tất cả đều được chọn, thì đặt trạng thái là đã chọn tất cả
        }
    };

    return (
        <div ref={popupRef} className={s.container}>
            <div className={s.wrapper}>
                <div className={s.search}> 
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#aaaeb5", fontSize: "14px" }} />
                    </div>
                    <input placeholder="Tìm kiếm" style={{ flex: 1 }} />
                </div>

                <div className={s.wrapper_select}>
                    <div className={s.select_all} onClick={toggleSelectAll}>

                        {
                            isAllSelected ?
                            (
                                <div>
                                    <FontAwesomeIcon icon={ faCheckSquare} style={{ color: "#4d53e0", fontSize: "18px" }} /> 
                                </div>
                            ) :
                            (
                                <div>
                                    <FontAwesomeIcon icon={faSquare} style={{ color: "#aaaeb5", fontSize: "18px" }} /> 
                                </div>
                            )
                        }
                        <div>Chọn tất cả</div>
                    </div>

                    {listCategories.map((item) => (
                        <div className={s.select_all} key={item.id} onClick={() => toggleSelectCategory(item.sub_id)}>
                            { selectedCategories.includes(item.sub_id) ?(
                                <div>
                                    <FontAwesomeIcon icon= {faCheckSquare} style={{ color: "#4d53e0", fontSize: "18px" }} />
                                </div>
                            )
                            : 
                            (
                                <div>
                                    <FontAwesomeIcon icon= {faSquare} style={{ color: "#aaaeb5", fontSize: "18px" }} />
                                </div>
                            )
                            }
                            <div>{item.name}</div>
                        </div>
                    ))}
                </div>

                <button className={s.btn_select} onClick={handleOnClickButton}>Lọc</button>
            </div>
        </div>
    );
};

export default SelectFilterBrand;

