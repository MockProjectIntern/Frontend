import { createSupplierGroup, getListSupplierGroups } from "../../service/SupplierGroupsAPI";
import Header from "../Header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMagnifyingGlass,faCaretDown,faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import cn from "classnames"
import { useEffect, useState,useRef } from "react"
import { formatDateTime } from "../../utils/DateUtils"
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup";
import CreateSupplierGroupPopup from "../CreateSupplierGroupPopup/CreateSupplierGroupPopup";

const SupplierGroupsList = () =>{

    const limitBtnRef = useRef(null);

    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
    const [page, setPage] = useState(1);
    const [pageQuantiy, setPageQuantity] = useState(1);
    const [limit, setLimit] = useState(10);
    const [supplierGroupsQuantity, setSupplierGroupsQuantity] = useState();
    const [supplierGroupsList, setSupplierGroupsList] = useState([]);
    const [dataBody, setDataBody] = useState(
        {
            keyword: null,
            status: "ACTIVE"
        }
    );

    const [dataCreateSupplierGroup, setDataCreateSupplierGroup] = useState({
        name: "",
        note: "",
        sub_id: "",
    })
    const [isCreateSupplierGroups, setIsCreateSupplierGroups] = useState(false);

    const handleChangeDataCreateSupplierGroup = (e) => {
        const { name, value } = e.target; // Lấy name và value từ input
        setDataCreateSupplierGroup((prevData) => ({
            ...prevData,
            [name]: value // Cập nhật giá trị tương ứng với name
        }));
    };

    const handleClickBack = () =>{
        setIsCreateSupplierGroups(false);
    }

    const handleCLickCreate = async() =>{
        try{
            const response = await createSupplierGroup(dataCreateSupplierGroup);
            if (response.status === 201) {
                alert("Tạo nhóm nhà cung cấp thành thành công!");
                setDataCreateSupplierGroup({
                    name: "",
                    note: "",
                    sub_id: "",
                });
                setIsCreateSupplierGroups(false)
            }
            setIsCreateSupplierGroups(false)
        }
        catch(err){
            console.log(err);
            throw err;
        }
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

    const fetchSupplierGroupsList = async () =>{
        try{
            const supplierGroups = await getListSupplierGroups(page, limit, dataBody);
            if(supplierGroups.status_code === 200){
                setSupplierGroupsList(supplierGroups.data.data);
                setSupplierGroupsQuantity(supplierGroups.data.total_items);
                setPageQuantity(supplierGroups.data.total_page);
            }
            else{
                console.log("status code:",supplierGroups.status_code);
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }


    useEffect(() => {
        fetchSupplierGroupsList();
    }, [limit,page, isCreateSupplierGroups]);

    console.log(dataCreateSupplierGroup);
    return (
        <>  
            {isCreateSupplierGroups && (
                <>
                    <div className="overlay"></div>
                    <CreateSupplierGroupPopup handleOnClickBack = {handleClickBack} handleOnClickCreate = {handleCLickCreate} handleOnChange = {handleChangeDataCreateSupplierGroup}/>
                </>
            )}
            <Header title={"Nhóm nhà cung cấp"}/>
            <div className="right__listPage">
                <div className='right__toolbar'>
                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={() => setIsCreateSupplierGroups(!isCreateSupplierGroups)}>
                            <span className="btn__icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="btn__title">Thêm nhóm nhà cung cấp</span>
                        </button>
                    </div>
                </div>
                <div className="right__table">
                    <div className="right__table-scroller">
                        <div className="box-scroller">
                            <div className="group-scroller-btns">
                                <button className="btn-scroller active">Tất cả nhóm nhà cung cấp</button>
                            </div>
                        </div>
                    </div>
                    <div className="right__table-search-filter">
                        <div className="">
                            <div className="box-search-filter-btns">
                            <div className="box-search">
                                <div className="box-input">
                                    <div className="search-icon">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </div>
                                    <input placeholder='Tìm kiếm theo mã nhóm,tên nhóm nhà cung cấp' type="text" name="search" id="" autoComplete='on' />
                                    <fieldset className='input-field' />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right__table-headers">
                        <table className="box-table-headers">
                            <colgroup>
                                <col style={{ width: "233px" }} /> 
                                <col style={{ width: "233px" }} />
                                <col style={{ width: "233px" }} />
                                <col style={{ width: "295px" }} />
                                <col style={{ width: "233px" }} />
                            </colgroup>
                            <thead>
                                <tr className="group-table-headers">
                                    <th
                                        colSpan={1}
                                        rowSpan={1}
                                        className={cn("table-header-item", "text-start")}
                                    >
                                        Tên nhóm
                                    </th>
                                    <th
                                        colSpan={1}
                                        rowSpan={1}
                                        className={cn("table-header-item", "text-start")}
                                    >
                                        Mã nhóm
                                    </th>
                                    <th
                                        colSpan={1}
                                        rowSpan={1}
                                        className={cn("table-header-item", "text-start")}
                                    >
                                        Ghi chú
                                    </th>
                                    <th
                                        colSpan={1}
                                        rowSpan={1}
                                        className={cn("table-header-item", "text-center")}
                                    >
                                        Số lượng nhà cung cấp
                                    </th>
                                    <th
                                        colSpan={1}
                                        rowSpan={1}
                                        className={cn("table-header-item", "text-start")}
                                    >
                                        Ngày tạo
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="right__table-content">
                        <div className="right__table-data">
                            <div className="table-data__container">
                                <table className="box-table-data">
                                    <colgroup>
                                        <col style={{ width: "233px" }} /> 
                                        <col style={{ width: "233px" }} />
                                        <col style={{ width: "233px" }} />
                                        <col style={{ width: "295px" }} />
                                        <col style={{ width: "233px" }} />
                                    </colgroup>
                                    <tbody>
                                        {supplierGroupsList?.map((supplierGroup,index) => {
                                            return(
                                                <tr key={index} className="table-data-row">
                                                    <td className={cn("table-data-item", "text-start")}>
                                                        <p className="box-text">
                                                            {supplierGroup?.name}
                                                        </p>
                                                    </td>
                                                    <td className={cn("table-data-item", "text-start")}>
                                                        <p className="box-text">
                                                            {supplierGroup?.id}
                                                        </p>
                                                    </td>
                                                    <td className={cn("table-data-item", "text-start")}>
                                                        <p className="box-text">
                                                            {supplierGroup?.note}
                                                        </p>
                                                    </td>
                                                    <td className={cn("table-data-item", "text-center")}>
                                                        <p className="box-text">
                                                            {supplierGroup?.total_supplier}
                                                        </p>
                                                    </td>
                                                    <td className={cn("table-data-item", "text-start")}>
                                                        <p className="box-text">
                                                            {formatDateTime(supplierGroup?.created_at)}
                                                        </p>
                                                    </td>
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
                                {isOpenLimitPopup && <LimitSelectPopup btnRef={limitBtnRef} closePopup={() => setIsOpenLimitPopup(false)} limit={limit} handleChangeLimit={(limit) => { setLimit(limit) }}/>}
                            </div>
                            <p>Kết quả</p>
                            <p className="item-quantity">Từ {(page - 1) * limit + 1} đến {(page - 1) * limit + supplierGroupsList.length} trên tổng {supplierGroupsQuantity}</p>
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

export default SupplierGroupsList;