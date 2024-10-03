import { useRef, useState } from "react";
import s from "./PaymentPopup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import SelectDatePopup from "../SelectDatePopup";
import cn from "classnames";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ListSelectPopup from "../ListSelectPopup/ListSelectPopup";


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
                            <p>Xác nhận thanh toán</p>
                        </div>
                        <div className="btn-toolbar">
                            <button onClick={() => handleOnClickBack()} className="btn-icon">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    </div>

                    <div className={cn("info-content", s["content"])}>
                        <div className={s["group-form-items"]}>
                            <div className="form-item">
                                <label htmlFor="brand" className="form-label">
                                    Chọn phương thức thanh toán
                                </label>
                                <div className="box-select">
                                    <button ref={paymentMethodBtnRef} onClick={() => setIsPaymentMethodPopup(!isPaymentMethodPopup)} className="btn-select">
                                        Phương thức thanh toán
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </button>
                                    {
                                        isPaymentMethodPopup &&
                                        <ListSelectPopup 
                                            dataList={paymentMethods}
                                            btnRef={paymentMethodBtnRef}
                                            closePopup={() => setIsPaymentMethodPopup(false)}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="unit" className="form-label">
                                    Số tiền
                                </label>
                                <div className="form-textfield">
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                    />
                                    <fieldset className="input-field"></fieldset>
                                </div>
                            </div>
                        </div>
                        <div className={s["group-form-items"]}>
                            <div className="form-item">
                                <label htmlFor="brand" className="form-label">
                                    Ngày thanh toán
                                </label>
                                <div className="form-textfield">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="unit" className="form-label">
                                    Tham chiếu
                                </label>
                                <div className="form-textfield h-100">
                                    <input
                                        type="text"
                                        name="reference"
                                        id="reference"
                                    />
                                    <fieldset className="input-field"></fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s["box-btns"]}>
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
    );
};

export default PaymentPopup;
