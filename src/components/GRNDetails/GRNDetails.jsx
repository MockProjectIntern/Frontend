import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import cn from 'classnames'

import { formatDateTime } from '../../utils/DateUtils'

import s from './GRNDetails.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCheckCircle, faChevronLeft, faCircle, faCircleUser, faCopy, faGear, faMoneyBills, faPrint, faWarehouse, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import SupplierInfo from '../SupplierInfo/SupplierInfo'
import { Collapse } from 'reactstrap'
import TransactionItem from '../TransactionItem/TransactionItem'
import ProductsTable from '../ProductsTable/ProductsTable'
import ReturnTable from '../ReturnTable/ReturnTable'

const GRNDetails = () => {
    const { grnId } = useParams();
    const [grn, setGrn] = useState({
        created_at: "2024-09-27T10:36:17",
        updated_at: "2024-09-27T04:12:59",
        id: "GRN00006",
        sub_id: "GRN00006",
        status: "ORDERING",
        received_status: "NOT_ENTERED",
        supplierId: "SUP00002",
        user_created_name: "Tài khoản nhân viên",
        expected_delivery_at: null,
        received_at: null,
        payment_at: null,
        completed_at: null,
        cancelled_at: null,
        total_received_quantity: 15.00,
        discount: 500000.00,
        tax_amount: 0.00,
        total_value: 24635750.00,
        payment_status: "UNPAID",
        return_status: "NOT_RETURNED",
        refund_status: "FULL",
        note: "Nhập hàng lần đầu từ nhà cung cấp mới",
        tags: "Nhập hàng, Ưu tiên",
        import_cost: [
            {
                name: "Chi phí vận chuyển",
                value: 100000.00
            },
            {
                name: "Chi phí bốc xếp",
                value: 50000.00
            }
        ],
        payment_method: [
            {
                method: "Credit Card",
                amount: 3000000.00,
                date: "2023-09-10T12:00:00",
                reference: "REF12345"
            },
            {
                method: "Cash",
                amount: 2000000.00,
                date: "2023-09-10T12:00:00",
                reference: "REF54321"
            }
        ],
        histories: [
            {
                date: "2024-09-27T10:36:17",
                userExecuted: "Tài khoản nhân viên",
                function: "Nhập hàng",
                operation: "Tạo đơn nhập hàng"
            }
        ],
        products: [
            {
                id: "GRNP00001",
                sub_id: "GRNP00001",
                imported_quantity: 10.00,
                discount: 10000.00,
                tax: 500.00,
                price: 2000000.00
            },
            {
                id: "GRNP00002",
                sub_id: "GRNP00002",
                imported_quantity: 5.00,
                discount: 5000.00,
                tax: 250.00,
                price: 1000000.00
            }
        ]
    })
    const [supplier, setSupplier] = useState(null)
    const status = {
        COMPLETED: "Hoàn thành",
        ORDERING: "Chưa nhập",
        TRADING: "Đang giao dịch",
        CANCELLED: "Đã hủy",
        ENTERED: "Đã nhập",
        NOT_ENTERED: "Chưa nhập",
        UNPAID: "Chưa thanh toán",
        PAID: "Đã thanh toán",
        PARTIAL_PAID: "Thanh toán một phần",
        FULL: "FULL",
        PARITAL: "PARTIAL",
        NOT_REFUNDED: "Chưa hoàn tiền",
        NOT_RETURNED: "Chưa hoàn"
    }

    // Get list of columns that need redering from Cookies
    const [colsToRender, setColsToRender] = useState(() => {
        const storedCols = Cookies.get('filter_products_table');
        return storedCols ? JSON.parse(storedCols) : {
            index: true,
            image: true,
            name: true,
            unit: true,
            imported_quantity: true,
            price: true,
            discount: true,
            tax: true,
            total: true
        }
    })

    useEffect(() => {
        setColsToRender((prev) => {
            const { ordered_quantity, ...rest } = prev; // Tách imported_quantity khỏi state
            return rest; // Trả về state mới mà không có imported_quantity
        });
    }, [])

    // Set required columns to Cookies
    useEffect(() => {
        Cookies.set('filter_products_table', JSON.stringify(colsToRender));
    }, [colsToRender])

    const [isReceiveDetail, setIsReceiveDetail] = useState(false)
    const [tab, setTab] = useState("products")

    return (
        <>
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/admin/order_suppliers' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h6 className="btn-back__title">
                                Quay lại danh sách nhập hàng
                            </h6>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-outline-primary">
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button className="btn btn-outline-primary">
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
                                <div className={cn('box-status', `box-status--${grn.status.toLowerCase()}`)}>
                                    <span>{status[grn.status]}</span>
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
                        <div className={s.boxTimeline}>
                            <div className={s.boxTimelineWrapper}>
                                <div className={s.boxTime}>
                                    <div className={s.icon}>
                                        <div className={s.checkIcon}>
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                        </div>
                                        <div className={s.title}>Tạo đơn</div>
                                        <div className={s.timeRecorder}>{formatDateTime(grn.created_at)}</div>
                                    </div>
                                </div>
                                <div className={s.boxTime}>
                                    <div className={s.line}></div>
                                    <div className={s.icon}>
                                        {
                                            grn.received_status === "ENTERED" ?
                                            <div className={s.checkIcon}>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </div> : 
                                            <div className={s.numberIcon}>2</div>                     
                                        }
                                        <div className={s.title}>Nhập hàng</div>
                                        {grn.received_status === "ENTERED" && <div className={s.timeRecorder}>{formatDateTime(grn.received_at)}</div>}
                                    </div>
                                </div>
                                <div className={s.boxTime}>
                                    <div className={s.line}></div>
                                    <div className={s.icon}>
                                        {
                                            grn.status === "COMPLETED" ?
                                            <div className={s.checkIcon}>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </div> : 
                                            grn.status === "CANCELLED" ?
                                            <div className={s.closeIcon}>
                                                <FontAwesomeIcon icon={faXmarkCircle} />
                                            </div> :
                                            <div className={s.numberIcon}>3</div>                        
                                        }
                                        <div className={s.title}>{grn.status !== "CANCELLED" ? "Hoàn thành" : "Hủy"}</div>
                                        {
                                            (grn.status === "COMPLETED" || grn.status === "CANCELLED") && 
                                            <div className={s.timeRecorder}>{formatDateTime(grn.completed_at || grn.cancelled_at)}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-supplier">
                            <div className="box-paper">
                                <div className="paper-header">
                                    <FontAwesomeIcon icon={faCircleUser} />
                                    <p>Thông tin nhà cung cấp</p>
                                </div>
                                <div className="paper-content">
                                    {grn.supplierId && <SupplierInfo supplierIdId={grn.supplierId} />}
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
                                            <p className="info-value">: {grn.user_created_name}</p>
                                        </div>
                                        <div className="info-item">
                                            <p className="info-title">Ngày hẹn giao</p>
                                            <p className="info-value">: {grn.expected_at || "---"}</p>
                                        </div>
                                        <div className="info-item">
                                            <p className="info-title">Ngày nhập</p>
                                            <p className="info-value">: {grn.received_at || "---"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.btnHistory}>
                                    <a>Xem lịch sử đơn hàng</a>
                                </div>
                            </div>
                        </div>
                        <div className={s.boxGRN}>
                            <div className="box-paper">
                                <div className={cn("paper-header", s.boxHeader)}>
                                    {
                                        grn.received_status === "ENTERED" ? 
                                        <FontAwesomeIcon className="check-icon" icon={faCheckCircle} /> :
                                        <FontAwesomeIcon icon={faWarehouse} />
                                    }
                                    <p>Đơn nhập hàng {grn.received_status === "ENTERED" ? "đã nhập kho" : "chưa nhập kho"}</p>
                                </div>
                                {
                                    grn.received_status === "ENTERED" &&
                                    <div className="paper-content">
                                        <div className={s.listWrapper}>
                                            <div className={s.listItem}>
                                                <div className={s.dot}>
                                                    <FontAwesomeIcon icon={faCircle} />
                                                </div>
                                                <div className={s.boxCollapse}>
                                                    <div className={s.itemTitle}>
                                                        <button onClick={() => setIsReceiveDetail(!isReceiveDetail)} className={s.btnCollapse}>
                                                            <span className={s.btnTitle}>
                                                                <p>Đã nhập kho</p>
                                                            </span>
                                                            <span className={cn(s.btnIcon, { [s.collapseIcon]: isReceiveDetail })}>
                                                                <FontAwesomeIcon icon={faCaretDown} />
                                                            </span>
                                                        </button>
                                                        <p className={s.date}>{formatDateTime(grn.received_at)}</p>
                                                    </div>
                                                    <Collapse className={s.panel} isOpen={isReceiveDetail}>
                                                        <div className={s.collapseItem}>
                                                            <div className={s.infoItem}>
                                                                <p>Nhân viên nhập kho</p>
                                                                <p>
                                                                    :&nbsp;
                                                                    {grn.user_created_name}
                                                                </p>
                                                            </div>
                                                            <div className={s.infoItem}>
                                                                <p>Tổng tiền hàng</p>
                                                                <p>
                                                                    :&nbsp;
                                                                    {grn.total_value}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={s.boxPayment}>
                            <div className="box-paper">
                                <div className={cn("paper-header", s.boxHeader)}>
                                    {
                                        grn.payment_status === "PAID" ? 
                                        <FontAwesomeIcon className="check-icon" icon={faCheckCircle} /> :
                                        <FontAwesomeIcon icon={faMoneyBills} />
                                    }
                                    <p>Đơn nhập hàng {status[grn.payment_status].toLowerCase()}</p>
                                </div>
                                <div className="paper-content pt-3">
                                    <div className={s.paymentSummary}>
                                        <div className={s.itemSummary}>
                                            <p className={s.summaryTitle}>Tiền cần trả NCC:&nbsp;</p>
                                            <p className={s.summaryValue}>{grn?.total_value?.toLocaleString('en-US')}</p>
                                        </div>
                                        <div className={s.itemSummary}>
                                            <p className={s.summaryTitle}>Đã trả:&nbsp;</p>
                                        <p className={s.summaryValue}>{grn?.payment_method?.reduce((acc, payment) => acc + payment.amount, 0).toLocaleString('en-US')}</p>
                                        </div>
                                        <div className={s.itemSummary}>
                                            <p className={s.summaryTitle}>Còn phải trả:&nbsp;</p>
                                            <p className={s.summaryValue}>{(grn?.total_value - grn?.payment_method?.reduce((acc, payment) => acc + payment.amount, 0)).toLocaleString('en-US')}</p>
                                        </div>
                                    </div>
                                    <div className={s.listWrapper}>
                                        {
                                            grn.payment_method?.map((payment, index) => (
                                                <TransactionItem key={index} payment={payment} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-products">
                            <div className="box-paper">
                                <div className="paper-header">
                                    <div className="box-header">
                                        {
                                            grn?.return_status === "NOT_RETURN" ? 
                                            <p>Thông tin sản phẩm</p> :
                                            <div className="box-scroller">
                                                <div className="group-scroller-btns">
                                                    <button onClick={() => setTab("products")} className={cn("btn-scroller", { "active": tab === "products" })}>Thông tin sản phẩm</button>
                                                    <button onClick={() => setTab("return")} className={cn("btn-scroller", { "active": tab === "return" })}>Thông tin hoàn trả</button>
                                                </div>
                                            </div>
                                        }
                                        {
                                            tab === "products" &&
                                            <div className="btn-toolbar">
                                                <button className="btn-icon">
                                                    <FontAwesomeIcon icon={faGear} />
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="box-table">
                                    {
                                        tab === "products" ? 
                                        <>
                                            <ProductsTable productsList={grn?.products} colsToRender={colsToRender} isView={true} />
                                            <div className="box-total">
                                                <div className="box-total__container">
                                                    <div className="box-subinfo">
                                                        <div className="box-note">
                                                            <p className='box-label'>Ghi chú đơn</p>
                                                            <p className='box-content'>{grn.note || "Chưa có ghi chú"}</p>
                                                        </div>
                                                        <div className="box-tags">
                                                            <p className='box-label'>Tags</p>
                                                            <p className='box-content'>{grn.tags || "Chưa có tags"}</p>
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
                                        </> :
                                        <ReturnTable />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GRNDetails