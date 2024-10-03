import { useRef, useState } from "react";
import s from "./PaymentPopup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import SelectDatePopup from "../SelectDatePopup";
import cn from "classnames";


const PaymentPopup = ({
    type,
    handleOnClickBack,
    handleOnClickCreate,
    handleOnChange,
}) => {

    const paymentMethods = [
        { id: 1, name: 'Credit Card' },
        { id: 2, name: 'Bank Transfer' },
        { id: 3, name: 'Cash on Delivery' }
    ];

    const [dataFilter, setDataFilter] = useState({
        keyword: null,
        statuses: null,
        supplier_group_ids: null,
        created_date_from: null,
        created_date_to: null,
        tags: null
    });

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [isPaymentMethodPopup, setIsPaymentMethodPopup] = useState(false);
    const paymentMethodBtnRef = useRef(null);

    return (
        <div className={s.popup}>
            <div className="overlay"></div>
            <div className={s["container"]}>
                <div className={cn("box-info-item", s["wrapper"])}>
                    <div className={cn("info-header", s["header"])}>
                        <div className={s["box-header"]}>
                            <p>Điều chỉnh cột hiển thị</p>
                        </div>
                        <div className="btn-toolbar">
                            <button className="btn-icon">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    </div>

                    <div className="info-content">
                        <div className={s["content"]}>
                            <div className="d-flex">
                                <div className="form-item">
                                    <label htmlFor="brand" className="form-label">
                                        Phương thức thanh toán
                                    </label>
                                    <div className="box-select">
                                        <button className="btn-select">
                                            Phương thức thanh toán
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </button>

                                    </div>
                                </div>

                                <div className={s["row"]}>
                                    <label htmlFor="sub_id" className={s["form-label"]}>
                                        Ngày thanh toán
                                    </label>
                                    <div className={s["form-textfield"]}>
                                        <input
                                            type="text"
                                            name="sub_id"
                                            id="sub_id"
                                            placeholder="Nhập mã"
                                            onChange={handleOnChange}
                                        />
                                        <fieldset className="input-field"></fieldset>
                                    </div>
                                    <div className="btn-group group-filter-btns">
                                        <SelectDatePopup
                                            setDataFilters={(data) => setDataFilter(prev => {
                                                return {
                                                    ...prev,
                                                    created_date_from: data.date_from,
                                                    created_date_to: data.date_to
                                                };
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className={s["row"]}>
                                    <label htmlFor="name" className={s["form-label"]}>
                                        Số tiền
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className={s["form-textfield"]}>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Nhập tên"
                                            onChange={handleOnChange}
                                        />
                                        <fieldset className="input-field"></fieldset>
                                    </div>
                                </div>
                                <div className={s["row"]}>
                                    <label htmlFor="name" className={s["form-label"]}>
                                        Tham chiếu
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className={s["form-textfield"]}>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Nhập tên"
                                            onChange={handleOnChange}
                                        />
                                        <fieldset className="input-field"></fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex w-100 justify-content-end p-2">
                            <div className="btn-toolbar">
                                <button className="btn btn-outline-primary" onClick={handleOnClickBack}>
                                    <span className="btn__title">Thoát</span>
                                </button>
                                <button className="btn btn-primary" onClick={handleOnClickCreate}>
                                    <span className="btn__title">Thêm</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;
