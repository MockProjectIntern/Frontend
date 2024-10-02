import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import CreatedAtFilter from './GINList/FiltersPopup/CreatedAtFilter';

const SelectDatePopup = ({setDataFilters}) => {
    const createdAtRef = useRef(null);
    const [isOpenCreatedAtPopup, setIsOpenCreatedAtPopup] = useState(false);

    const handleChangeDataFilter = (filters) => {
        console.log(filters);
		setDataFilters(filters);
	};

    return (
        <div>
            <button
                ref={createdAtRef}
                onClick={() => setIsOpenCreatedAtPopup(!isOpenCreatedAtPopup)}
                className="btn btn-base btn-filter"
            >
                <span className="btn__label">
                    Ngày tạo
                    <span className="btn__icon">
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                </span>
            </button>
            {isOpenCreatedAtPopup && (
                <CreatedAtFilter
                    createdRef={createdAtRef}
                    closePopup={() => setIsOpenCreatedAtPopup(false)}
                    handeChangeDatafilter={(data) => handleChangeDataFilter(data)}
                />
            )}
        </div>
    )
}

export default SelectDatePopup