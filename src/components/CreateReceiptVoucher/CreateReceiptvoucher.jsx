import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'

import { faCaretDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import infoIcon from '../../assets/icons/InfoIcon'

const CreateReceiptVoucher = () => {
    const [dataBody, setDataBody] = useState({
        id: "",
        group: "",
        name: "",
        type: "",
        cost: "",
        method: "",
        reference: ""
    })

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
                    <button className="btn btn-primary">
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
                                                <button id='name' className="btn-select">
                                                    Chọn khách hàng
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
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
                                                <button id='type' className="btn-select">
                                                    Chọn loại phiếu thu
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
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
                                                        id: e.target.value
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
                                                        cost: e.target.value
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
                                                    Tiền mặt
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-reference">
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
                                    </div>
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