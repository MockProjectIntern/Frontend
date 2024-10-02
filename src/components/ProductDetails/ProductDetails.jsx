import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import s from './ProductDetails.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCopy } from '@fortawesome/free-solid-svg-icons'

import { getProductById } from '../../service/ProductAPI'

const ProductDetails = () => {
    const { productId } = useParams();

    const status = {

    }

    const [dataDetail, setDataDetail] = useState({});

    // const fetchProductDetails = async () => {
    //     const response = await getProductById(productId);
    //     console.log(response);
        
    // }

    // useEffect(() => {
    //     fetchProductDetails();
    // }, [])

    return (
        <>
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/admin/products' className='btn-back'>
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
                        <button className="btn btn-outline-danger">
                            <span className="btn__title">Xóa</span>
                        </button>
                        <button className="btn btn-primary">
                            <span className="btn__title">Sửa sản phẩm</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__paperPage">
                <div className="right__paperPage-wrapper">
                    <div className={cn("right__paperPage-container", s.container)}>
                        <div className="box-title">
                            <div className="group-details">
                                <h4 className='box-code'>{dataDetail.name}</h4>
                            </div>
                            <div className="btn-toolbar">
                                <button className="btn btn-base btn-text">
                                    <span className="btn__label">
                                        <span className="btn__icon">
                                            <FontAwesomeIcon icon={faCopy} />
                                        </span>
                                        Sao chép
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin sản phẩm</p>
                                <button className={`btn-status btn-status--${dataDetail.status}`}>
                                    {status[dataDetail.status]}
                                </button>
                            </div>
                            <div className={cn("paper-content", s.gridContainer)}>
                                <div className="group-info">
                                    <div className="info-item">
                                        <p className="info-title">Loại sản phẩm</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            Áo khoác
                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Nhãn hiệu</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            ---
                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Ghi chú</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            {dataDetail.created_at}
                                        </p>
                                    </div>
                                </div>
                                <div className="group-info">
                                    <div className="info-item">
                                        <p className="info-title">Ngày tạo</p>
                                        <p className="info-value">
                                            :&nbsp;

                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Ngày cập nhật cuối</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            {dataDetail.updated_at}
                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Tags</p>
                                        <p className="info-value">
                                            :&nbsp;

                                        </p>
                                    </div>
                                </div>
                                <div className="box-image">
                                    <div className="image-item">
                                        <img className={s.image} src="" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin chi tiết</p>
                            </div>
                            <div className={cn("paper-content", s.detailsGrid)}>
                                <div className="info-item">
                                    <p className="info-title">Mã sản phẩm</p>
                                    <p className="info-value">
                                        :&nbsp;
                                        
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p className="info-title">Tồn kho</p>
                                    <p className="info-value">
                                        :&nbsp;
                                        
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p className="info-title">Khối lượng</p>
                                    <p className="info-value">
                                        :&nbsp;
                                        
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p className="info-title">Đơn vị tính</p>
                                    <p className="info-value">
                                        :&nbsp;
                                        
                                    </p>
                                </div>
                                {
                                    dataDetail?.types?.map(([key, value]) => {
                                        return (
                                            <div key={value} className="info-item">
                                                <p className="info-title">{key}</p>
                                                <p className="info-value">
                                                    :&nbsp;
                                                    {value}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="box-paper box-price">
                            <div className="paper-header">
                                <p>Giá sản phẩm</p>
                            </div>
                            <div className="paper-content grid-container">
                                <div className="box-retail-price">
                                    <div className="info-item">
                                        <p className="info-title">Giá bản lẻ</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            
                                        </p>
                                    </div>
                                </div>
                                <div className="box-wholesale-price">
                                    <div className="info-item">
                                        <p className="info-title">Giá bán buôn</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="box-cost-price">
                                    <div className="info-item">
                                    <p className="info-title">Giá nhập</p>
                                        <p className="info-value">
                                            :&nbsp;
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin thêm</p>
                            </div>
                            <div className="paper-content">
                                <div className="switch-item">
                                    <p>Cho phép bán</p>
                                    <div className="box-switch">
                                        <div className="btn-switch">
                                            <input
                                                type="checkbox"
                                                name="status"
                                                className='switch-checkbox'
                                                id=""
                                                defaultChecked={true}
                                                value={dataDetail.status}
                                                disabled
                                            />
                                            <span className="switch-bar" ></span>
                                        </div>
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

export default ProductDetails