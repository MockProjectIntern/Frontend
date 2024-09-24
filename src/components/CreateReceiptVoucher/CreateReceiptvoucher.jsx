import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'

import { faCaretDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import infoIcon from '../../assets/icons/InfoIcon'
import { createTransaction } from '../../service/TransactionAPI'
import { getCategoryTransactionList } from '../../service/CategoryTransaction'
import { getAllSupplierByName } from '../../service/SuppliersAPI'

const CreateReceiptVoucher = () => {
    const [keywordRecipient, setKeywordRecipient] = useState("");
    const [isSelectRecipient, setIsSelectRecipient] = useState(false);
    const [isSelectCategory, setIsSelectCategory] = useState(false);
    const [pageRecipient, setPageRecipient] = useState(1);
    const [sizeRecipient, setSizeRecipient] = useState(10);

    const navigate = useNavigate();

    const [dataBody, setDataBody] = useState({
        sub_id: "",
        amount: "",
        payment_method: "CASH",
        tags: "",
        note: "",
        type: "INCOME",
        recipient_group: "SUP",
        recipient_id: "",
        recipient_name: "",
        transaction_category_id: "",
    })

    const [dataBodyCategory, setDataBodyCategory] = useState({
        name: "",
        keyword: "",
        type: "INCOME",
    })

    const listSupplier = [
        {
            id: "SUP",
            name: "Nhà cung cấp"
        },
        {
            id: "CUS",
            name: "Supplier 2"
        },
        {
            id: "CUS",
            name: "Supplier 3"
        },
    ];

    const [listRecipient, setListRecipient] = useState([]);
    const fetchRecipient = async () => {
        if (dataBody.recipient_group === "SUP") {
            const response = await getAllSupplierByName(pageRecipient, sizeRecipient, keywordRecipient);
            setListRecipient(response.data);
        }
    }

    const [listCategory, setListCategory] = useState([]);
    const fetchCategory = async () => {
        const response = await getCategoryTransactionList(pageRecipient, sizeRecipient, dataBodyCategory.keyword, dataBodyCategory.type);
        setListCategory(response.data.data);
    }

    const handleCreateTransaction = async () => {
        const response = await createTransaction(dataBody);
        console.log(response);
        if (response.status_code == 201) {
            alert("Tạo phiếu chi thành công");
            navigate('/admin/receipt_vouchers');
        }
    }

    useEffect(() => {
        if (isSelectRecipient) {
            fetchRecipient();
        } else {
            setListRecipient([]);
            setKeywordRecipient("");
        }
    }, [isSelectRecipient, keywordRecipient])

    useEffect(() => {
        if (isSelectCategory) {
            fetchCategory();
        } else {
            setListRecipient([]);
            setDataBodyCategory(prevState => {
                return {
                    ...prevState,
                    keyword: ""
                }
            });
        }
    }, [isSelectCategory, dataBodyCategory.name])

    useEffect(() => {
        console.log(dataBody);
    }, [dataBody])

    return (
        <>
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/admin/receipt_vouchers' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h6 className="btn-back__title">
                                Quay lại danh sách sản phẩm
                            </h6>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-outline-primary">
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button className="btn btn-primary" onClick={handleCreateTransaction}>
                            <span className="btn__title">Lưu</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__createObjectPage">
                <div className="right__createObjectPage-wrapper">
                    <div className="right__createObjectPage-container vouchers">
                        <div className="box-maininfo">
                            <div className="box-info-item box-voucher">
                                <div className="info-header">
                                    <div className="box-header">
                                        <h6>Thông tin chung</h6>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="grid-container">
                                        <div className="box-group">
                                            <div className="form-item">
                                                <label htmlFor="group" className="form-label">
                                                    Nhóm người nộp&nbsp;
                                                    <span className="asterisk-icon">*</span>
                                                </label>
                                                <div className="box-select">
                                                    <button id='group' className="btn-select">
                                                        Khách hàng
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    </button>
                                                    <select name="group" id="group" onChange={e => setDataBody(prevState => {
                                                        return {
                                                            ...prevState,
                                                            recipient_group: e.target.value
                                                        }
                                                    })}>
                                                        {listSupplier?.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-name">
                                            <div className="form-item">
                                                <label htmlFor="name" className="form-label">
                                                    Tên người nộp&nbsp;
                                                    <span className="asterisk-icon">*</span>
                                                </label>
                                                <div className="box-select">
                                                    <button id='name' className="btn-select" onClick={() => setIsSelectRecipient(!isSelectRecipient)}>
                                                        {dataBody.recipient_name === "" ? "Chọn người nhận" : dataBody.recipient_name}
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    </button>
                                                    {isSelectRecipient &&
                                                        <>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                onChange={e => setKeywordRecipient(e.target.value)}
                                                                placeholder='Nhập từ khóa' />
                                                            <select name="group" id="group" onChange={e => {
                                                                setDataBody(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        recipient_id: e.target.value
                                                                    }
                                                                });
                                                                setDataBody(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        recipient_name: listRecipient.find(item => item.id === e.target.value).name
                                                                    }
                                                                });
                                                                setIsSelectRecipient(false);
                                                            }}>
                                                                {listRecipient?.map((item, index) => (
                                                                    <option key={index} value={item.id}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-voucher-type">
                                            <div className="form-item">
                                                <label htmlFor="type" className="form-label">
                                                    Loại phiếu thu&nbsp;
                                                    <span className="asterisk-icon">*</span>
                                                </label>
                                                <div className="box-select">
                                                    <button id='type' className="btn-select" onClick={() => setIsSelectCategory(!isSelectCategory)}>
                                                        {dataBodyCategory.name === "" ? "Chọn loại phiếu chi" : dataBodyCategory.name}
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    </button>
                                                    {isSelectCategory &&
                                                        <>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                onChange={e => setDataBodyCategory(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        name: e.target.value
                                                                    }
                                                                })}
                                                                placeholder='Nhập từ khóa' />
                                                            <select name="group" id="group" onChange={e => {
                                                                setDataBodyCategory(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        name: listCategory.find(item => item.id === e.target.value).name
                                                                    }
                                                                });
                                                                setDataBody(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        transaction_category_id: e.target.value
                                                                    }
                                                                });
                                                                setIsSelectCategory(false);
                                                            }}>
                                                                {listCategory?.map((item, index) => (
                                                                    <option key={index} value={item.id}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-voucher-id">
                                            <div className="form-item">
                                                <label htmlFor="id" className="form-label">
                                                    Mã phiếu&nbsp;
                                                    <span
                                                        id='idCaption'
                                                        className="caption-icon"
                                                    >
                                                        {infoIcon}
                                                    </span>
                                                    <UncontrolledTooltip
                                                        placement="top"
                                                        target="idCaption"
                                                    >
                                                        Mã phiếu thu không trùng lặp. Nếu để trống mã phiếu tự sinh với tiền tố <strong>RVN</strong>
                                                    </UncontrolledTooltip>
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="id"
                                                        id="id"
                                                        onChange={e => setDataBody(prevState => ({
                                                            ...prevState,
                                                            sub_id: e.target.value
                                                        }))}
                                                    />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-info-item box-voucher-cost">
                                <div className="info-header">
                                    <div className="box-header">
                                        <h6>Giá trị ghi nhận</h6>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="grid-container">
                                        <div className="box-cost">
                                            <div className="form-item">
                                                <label htmlFor="cost" className="form-label">
                                                    Giá trị&nbsp;
                                                    <span className="asterisk-icon">*</span>
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="cost"
                                                        id="cost"
                                                        onChange={e => setDataBody(prevState => ({
                                                            ...prevState,
                                                            amount: e.target.value
                                                        }))}
                                                        className='text-end'
                                                    />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-method">
                                            <div className="form-item">
                                                <label htmlFor="method" className="form-label">
                                                    Hình thức thanh toán&nbsp;
                                                </label>
                                                <div className="box-select">
                                                    <button id='method' className="btn-select">
                                                    {dataBody.payment_method === "CASH"
                                                            ? "Tiền mặt" : dataBody.payment_method === "BANK_TRANSFER"
                                                                ? "Chuyển khoản" : "Quẹt thẻ"}
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    </button>
                                                    <select name="method" id="method" onChange={e => setDataBody(prevState => {
                                                        return {
                                                            ...prevState,
                                                            payment_method: e.target.value
                                                        }
                                                    })}>
                                                        <option value="CASH">Tiền mặt</option>
                                                        <option value="BANK_TRANSFER">Chuyển khoản</option>
                                                        <option value="CREDIT_CARD">Quẹt thẻ</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="box-reference">
                                            <div className="form-item">
                                                <label htmlFor="reference" className="form-label">
                                                    Tham chiếu&nbsp;
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="reference"
                                                        id="reference"
                                                        onChange={e => setDataBody(prevState => ({
                                                            ...prevState,
                                                            reference: e.target.value
                                                        }))}
                                                    />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-subinfo">
                            <div className="box-info-item">
                                <div className="info-header">
                                    <div className="box-header">
                                        <h6>Thông tin bổ sung</h6>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="form-item">
                                        <label htmlFor="description" className="form-label">
                                            Mô tả
                                        </label>
                                        <textarea name="description" id="description"></textarea>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="tags" className="form-label">
                                            Tags
                                        </label>
                                        <textarea name="tags" id="tags"></textarea>
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

export default CreateReceiptVoucher