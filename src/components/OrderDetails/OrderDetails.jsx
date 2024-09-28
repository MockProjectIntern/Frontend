import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'
import Cookies from 'js-cookie'

import SupplierInfo from '../SupplierInfo/SupplierInfo'
import ProductsTable from '../ProductsTable/ProductsTable'

import s from './OrderDetails.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faGear, faPrint } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'

const OrderDetails = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState({
        id: "OSN00004",
        created_at: "25/09/2024 00:14",
        status: "COMPLETED",
        user_created_name: "Admin",
        expected_at: ""
    })
    const [supplier, setSupplier] = useState(null)
    const status = {
        COMPLETED: "Hoàn thành",
        PENDING: "Chưa nhập",
        PARTIAL: "Nhập một phần",
        CANCELLED: "Đã hủy",
        ENTERED: "Đã nhập",
        NOT_ENTERED: "Chưa nhập",
        UNPAID: "Chưa thanh toán",
        PAID: "Đã thanh toán",
        PARTIAL_PAID: "Thanh toán một phần"
    }
    const grnsList = [
        {
            id: "PON00002",
            received_status: "ENTERED",
            created_at: "25/09/2024 13:23",
            received_at: "25/09/2024 13:23",
            total_received_quantity: 4,
            payment_status: "UNPAID",
            user_imported_name: "Admin"
        }
    ]
    const [productsList, setProductsList] = useState([
        {
            id: "PVN05",
            image: "https://sapo.dktcdn.net/100/805/407/variants/1abe9da6-729b-4bc6-b0f3-df59da5fcfe2-1726473515737.jpg",
            name: "Áo khoác Chino thời thượng SID56708 - Trắng",
            unit: "---",
            ordered_quantity: 0,
            imported_quantity: 0,
            price: 350000,
            discount: 17000,
            tax: "0%",
            total: "0"
        }
    ])

    // Get list of columns that need redering from Cookies
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_products_table');
        return storedCols ? JSON.parse(storedCols) : {
            index: true,
            image: true,
            name: true,
            unit: true,
            ordered_quantity: true,
            imported_quantity: true,
            price: true,
            discount: true,
            tax: true,
            total: true
        }
    })

    // Set required columns to Cookies
    useEffect(() => {
        Cookies.set('filter_products_table', JSON.stringify(colsToRender));
    }, [colsToRender])

  return (
    <>
        <div className="right__navbar">
            <div className="box-navbar">
                <div className="btn-toolbar">
                    <Link to='/admin/order_suppliers' className='btn-back'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <h6 className="btn-back__title">
                            Quay lại danh sách đơn đặt hàng
                        </h6>
                    </Link>
                </div>
                <div className="btn-toolbar">
                    <button className="btn btn-outline-primary">
                        <span className="btn__title">Thoát</span>
                    </button>
                    <button className="btn btn-primary">
                        <span className="btn__title">Sửa đơn</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="right__paperPage">
            <div className="right__paperPage-wrapper">
                <div className={cn("right__paperPage-container", s.container)}>
                    <div className="box-title">
                        <div className="group-details">
                            <h4 className='box-code'>ORD00001</h4>
                            <h6 className='box-date'>25/09/2024 00:14</h6>
                            <div className={cn('box-status', {
                                'box-status--pending': order.status === "PENDING",
                                'box-status--partial': order.status === "PARTIAL",
                                'box-status--completed': order.status === "COMPLETED",
                                'box-status--cancelled': order.status === "CANCELLED",
                            })}>
                                <span>{status[order.status]}</span>
                            </div>
                        </div>
                        <div className="btn-toolbar">
                            <button className="btn btn-base btn-text">
                                <span className="btn__label">
                                    <span className="btn__icon">
                                        <FontAwesomeIcon icon={faPrint} />
                                    </span>
                                    In đơn
                                </span>                                    
                            </button>
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
                    <div className="box-supplier">
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin nhà cung cấp</p>
                            </div>
                            <div className="paper-content">
                                {supplier && <SupplierInfo supplier={supplier} />}
                            </div>
                        </div>
                    </div>
                    <div className="box-info">
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin đơn đặt hàng</p>
                            </div>
                            <div className="paper-content">
                                <div className="group-info">
                                    <div className="info-item">
                                        <p className="info-title">Nhân viên</p>
                                        <p className="info-value">: {order.user_created_name}</p>
                                    </div>
                                    <div className="info-item">
                                        <p className="info-title">Ngày nhập dự kiến</p>
                                        <p className="info-value">: {order.expected_at || "---"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.boxGRN}>
                        <div className="box-paper">
                            <div className="paper-header">
                                <div className="box-header">
                                    <p>Thông tin nhập hàng</p>
                                    {
                                        order.status !== "COMPLETED" && 
                                        <button className="btn btn-outline-primary">
                                            <span className="btn__label">Tạo đơn nhập hàng</span>
                                        </button>
                                    }
                                </div>
                            </div>
                            {
                                order.status !== "PENDING" && 
                                <div className="box-table">
                                    <table className={s.table}>
                                        <colgroup>
                                            <col style={{width: "60px"}} />
                                            <col style={{width: "120px"}} />
                                            <col style={{width: "160px"}} />
                                            <col style={{width: "160px"}} />
                                            <col style={{width: "160px"}} />
                                            <col style={{width: "140px"}} />
                                            <col style={{width: "190px"}} />
                                            <col style={{width: "155px"}} />
                                        </colgroup>
                                        <thead className={s.tableHeader}>
                                            <tr className={s.tableRow}>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-center")}>
                                                    <p>STT</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-start")}>
                                                    <p>Mã đơn nhập</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-start")}>
                                                    <p>Trạng thái nhập</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-start")}>
                                                    <p>Ngày tạo</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-start")}>
                                                    <p>Ngày nhập</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-center")}>
                                                    <p>SL nhập</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-start")}>
                                                    <p>Thanh toán</p>
                                                </th>
                                                <th colSpan={1} rowSpan={1} className={cn(s.tableCell, s.tableCellHeader, "text-start")}>
                                                    <p>Nhân viên nhập</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.tableBody}>
                                            {grnsList?.map((grn, index) => {
                                                return (
                                                    <tr key={index} className={s.tableRow}>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-center")}>
                                                            <p>{index + 1}</p>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-start")}>
                                                            <div className={s.boxInfo}>
                                                                <div className={s.boxId}>
                                                                    <Link to={`/admin/grns/GRN/${grn.id}`}>
                                                                        <p>{grn.id}</p>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-start")}>
                                                            <div className={cn('box-status', `box-status--${grn.received_status?.toLowerCase()}`)}>
                                                                <span>{status[grn.received_status]}</span>
                                                            </div>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-start")}>
                                                            <p>{grn.created_at}</p>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-start")}>
                                                            <p>{grn.created_at}</p>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-center")}>
                                                            <p>{grn.total_received_quantity}</p>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-start")}>
                                                            <div className={cn('box-status', `box-status--${grn.payment_status?.toLowerCase()}`)}>
                                                                <span>{status[grn.payment_status]}</span>
                                                            </div>
                                                        </td>
                                                        <td className={cn(s.tableCell, s.tableCellBody, "text-start")}>
                                                            <p>{grn.user_imported_name}</p>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="box-products">
                        <div className="box-paper">
                            <div className="paper-header">
                                <div className="box-header">
                                    <p>Thông tin sản phẩm</p>
                                    <div className="btn-toolbar">
                                        <div className="checkbox__container">
                                            <div className="checkbox__wrapper">
                                                <input type="checkbox" name="" id="checkBoxInput" className='checkbox__input' />
                                                <div className="btn-checkbox"></div>
                                            </div>
                                            <label htmlFor='checkBoxInput' className='checkbox__label'>Tách dòng</label>
                                        </div>
                                        <button className="btn-icon">
                                            <FontAwesomeIcon icon={faGear} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="box-table">
                                <ProductsTable productsList={productsList} colsToRender={colsToRender} isView={true} />
                                <div className="box-total">
                                    <div className="box-total__container">
                                        <div className="box-subinfo">
                                            <div className="box-note">
                                                <p className='box-label'>Ghi chú đơn</p>
                                                <p className='box-content'>{order.note || "Chưa có ghi chú"}</p>
                                            </div>
                                            <div className="box-tags">
                                                <p className='box-label'>Tags</p>
                                                <p className='box-content'>{order.tags || "Chưa có tags"}</p>
                                            </div>
                                        </div>
                                        <div className="box-price-info">
                                            <div className="info-item">
                                                <p>Số lượng</p>
                                                <p>0</p>
                                            </div>
                                            <div className="info-item">
                                                <p>Tổng tiền</p>
                                                <p>350,000</p>
                                            </div>
                                            <div className="info-item">
                                                <p>Chiết khấu</p>
                                                <p>0</p>
                                            </div>
                                            <div className="info-item">
                                                <div className="d-flex">
                                                    <p>Thuế</p>
                                                </div>
                                                <p>0</p>
                                            </div>
                                            <div className="info-item">
                                                <p className='total-price'>Tiền cần trả</p>
                                                <p className='total-price'>350,000</p>
                                            </div>
                                        </div>
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

export default OrderDetails