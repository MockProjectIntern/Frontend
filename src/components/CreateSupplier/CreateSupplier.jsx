import React from 'react'
import { Link } from 'react-router-dom'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import infoIcon from '../../assets/icons/InfoIcon'

const CreateSupplier = () => {
  return (
    <>
        <div className="right__navbar">
            <div className="box-navbar">
                <div className="btn-toolbar">
                    <Link to='/admin/suppliers' className='btn-back'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <h6 className="btn-back__title">
                            Quay lại danh sách nhà cung cấp
                        </h6>
                    </Link>
                </div>
                <div className="btn-toolbar">
                    <button className="btn btn-outline-primary">
                        <span className="btn__title">Hủy</span>
                    </button>
                    <button className="btn btn-primary">
                        <span className="btn__title">Lưu</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="right__createObjectPage">
            <div className="right__createObjectPage-wrapper">
                <div className="right__createObjectPage-container">
                    <div className="box-maininfo">
                        <div className="box-info-item box-supplier-general">
                            <div className="info-header">
                                <div className="box-header">
                                    <h6>Thông tin chung</h6>
                                </div>
                            </div>
                            <div className="info-content">
                                <div className="grid-container">
                                    <div className="box-supplier-name">
                                        <div className="form-item">
                                            <label htmlFor="name" className="form-label">
                                                Tên nhà cung cấp&nbsp;
                                                <span className="asterisk-icon">*</span>
                                            </label>
                                            <div className="form-textfield">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder='Nhập tên nhà cung cấp'
                                                    onChange={e => setDataBody(prevState => ({
                                                        ...prevState,
                                                        name: e.target.value
                                                    }))}
                                                />
                                                <fieldset className="input-field"></fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-supplier-id">
                                        <div className="form-item">
                                            <label htmlFor="id" className="form-label">
                                                Mã nhà cung cấp
                                            </label>
                                            <div className="form-textfield">
                                                <input
                                                    type="text"
                                                    name="id"
                                                    id="id"
                                                    onChange={e => setDataBody(prevState => ({
                                                        ...prevState,
                                                        sub_id: e.target.value
                                                    }))} />
                                                <fieldset className="input-field"></fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-supplier-group">
                                        <div className="form-item">
                                            <label htmlFor="group" className="form-label">
                                                Nhóm nhà cung cấp
                                            </label>
                                            <div className="box-select">
                                                <button id='group' className="btn-select">
                                                    Chọn nhóm nhà cung cấp
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-supplier-phone">
                                        <div className="form-item">
                                            <label htmlFor="phone" className="form-label">
                                                Số điện thoại
                                            </label>
                                            <div className="form-textfield">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    onChange={e => setDataBody(prevState => ({
                                                        ...prevState,
                                                        phone: e.target.value
                                                    }))} />
                                                <fieldset className="input-field"></fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-supplier-email">
                                        <div className="form-item">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <div className="form-textfield">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={e => setDataBody(prevState => ({
                                                        ...prevState,
                                                        email: e.target.value
                                                    }))} />
                                                <fieldset className="input-field"></fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-info-item box-supplier-address">
                            <div className="info-header">
                                <div className="box-header">
                                    <h6>Thông tin địa chỉ</h6>
                                </div>
                            </div>
                            <div className="info-content">
                                <div className="grid-container">
                                    <div className="box-province">
                                        <div className="form-item">
                                            <label htmlFor="province" className="form-label">
                                                Tỉnh / Thành phố
                                            </label>
                                            <div className="box-select">
                                                <button id='province' className="btn-select">
                                                    Chọn tỉnh/thành phố
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-district">
                                        <div className="form-item">
                                            <label htmlFor="district" className="form-label">
                                                Quận / Huyện
                                            </label>
                                            <div className="box-select">
                                                <button id='district' className="btn-select">
                                                    Chọn quận/huyện
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-ward">
                                        <div className="form-item">
                                            <label htmlFor="ward" className="form-label">
                                                Phường / Xã
                                            </label>
                                            <div className="box-select">
                                                <button id='ward' className="btn-select">
                                                    Chọn phường xã
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-street">
                                        <div className="form-item">
                                            <label htmlFor="street" className="form-label">
                                                Địa chỉ&nbsp;
                                                <span className="asterisk-icon">*</span>
                                            </label>
                                            <div className="form-textfield">
                                                <input
                                                    type="text"
                                                    name="street"
                                                    id="street"
                                                    onChange={e => setDataBody(prevState => ({
                                                        ...prevState,
                                                        street: e.target.value
                                                    }))} />
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
                                    <h6>Thông tin khác</h6>
                                </div>
                            </div>
                            <div className="info-content">
                                <div className="form-item">
                                    <label htmlFor="description" className="form-label">
                                        Mô tả
                                    </label>
                                    <textarea name="description" id="description" onChange={e => setDataBody(prevState => {
                                        return {
                                            ...prevState,
                                            note: e.target.value
                                        }
                                    })}></textarea>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="tags" className="form-label">
                                        Tags
                                    </label>
                                    <textarea name="tags" id="tags" onChange={e => setDataBody(prevState => {
                                        return {
                                            ...prevState,
                                            tags: e.target.value
                                        }
                                    })}></textarea>
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

export default CreateSupplier