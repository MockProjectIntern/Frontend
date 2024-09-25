import React, { useEffect, useRef } from 'react'
import cn from 'classnames'

// Import CSS
import s from './ListSelectPopup.module.scss'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'

const ListSelectPopup = ({ 
    title, 
    isLarge, 
    isSearch,
    keyword,
    handleChangeKeyword,
    isFastCreate, 
    dataList,
    handleSelect,
    btnRef,
    closePopup
}) => {
    const popupRef = useRef(null)

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
            closePopup();
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const onSelectItem = (id) => {
        handleSelect(id);
        closePopup();
    }

  return (
    <div ref={popupRef} className={cn(s.container, { [s.largePopup]: isLarge })}>
        <div className={s.wrapper}>
            {
                isSearch &&
                <div className={s.boxSearch}>
                    <div className={s.searchBar}>
                        <div className={s.searchIcon}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input value={keyword} onChange={handleChangeKeyword} className={s.searchInput} placeholder='Tìm kiếm hoặc nhập mới' type="text" />
                        <fieldset className="input-field"></fieldset>
                    </div>
                </div>
            }
            {
                isFastCreate && 
                <button className={s.btnCreate}>
                    <span className={s.btnIcon}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <h6 className={s.btnLabel}>Thêm mới {title}</h6>
                </button>
            }
            {
                dataList?.length > 0 ? 
                <div className={s.selectList}>
                    {
                        dataList.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className={s.selectItem}
                                    onClick={() => onSelectItem(item?.id)}
                                >
                                    {title === "nhà cung cấp" && <FontAwesomeIcon className={s.supplierAvatar} icon={faCircleUser} />}
                                    {
                                        title === "sản phẩm" && 
                                        (
                                            item.images?.length > 0 ?
                                            <img className={s.productImg} src={item.images[0]?.src} alt={item.images[0]?.alt} /> :
                                            <div className={s.defaultImg}>
                                                <FontAwesomeIcon icon={faImage} />
                                            </div>
                                        )
                                    }
                                    <div className={s.selectContent}>
                                        <p className={s.itemName}>
                                            {item.name}
                                            {item.types?.map((type) => ' - ' + type.value)}
                                        </p>
                                        {item.phone && <p className={s.supplierPhone}>{item.phone}</p>}
                                        {
                                            title === "sản phẩm" && 
                                            <p className={s.productInfo}>
                                                <span className={s.productId}>{item.id}</span>
                                                &nbsp;&nbsp;&nbsp;
                                                <span className={s.productType}>{item.types?.[0]?.value || "Mặc định"}</span>
                                            </p>
                                        }
                                    </div>
                                    {
                                        title === "sản phẩm" &&
                                        <div className={s.productData}>
                                            <p className={s.price}>
                                                <span className={s.dataName}>Giá nhập: </span>
                                                <span className={s.dataValue}>{item.cost_price}</span>
                                            </p>
                                            <p className={s.quantity}>
                                                <span className={s.dataName}>Tồn: </span>
                                                <span className={cn(s.dataValue, { [s.danger]: item.quantity === 0 })}>{item.quantity}</span>
                                            </p>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div> :
                <div className={s.emptyList}>
                    Không có kết quả
                </div>
            }
        </div>
    </div>
  )
}

export default ListSelectPopup