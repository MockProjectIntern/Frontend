import React, { useState } from 'react'
import ReturnTableItem from '../ReturnTableItem/ReturnTableItem'

const ReturnTable = () => {
    const [returnList, setReturnList] = useState([
        {
            created_at: "2024-09-30T16:31:01",
            updated_at: "2024-09-30T16:31:01",
            supplier_id: "SUP00002",
            supplier_name: "Nhà cung cấp 2",
            reason: "Chả có gì",
            transaction: {
                amount: 30000.00,
                updated_at: "2024-09-30T16:30:44",
                user_created_name: "Nguyễn Đình Văn",
                created_at: "2024-09-30T16:30:44",
                id: "TSN00002",
                payment_method: "CASH"
            },
            total_refunded_quantity: 1.00,
            total_refunded_value: 20000.00,
            status: "REFUNDED",
            refund_payment_status: "PARTIAL",
            user_created_name: "Nguyễn Đình Văn",
            refund_details: [
                {
                    id: "RID00001",
                    subId: "RID00001",
                    quantity: 1.00,
                    refundedPrice: 30000.00,
                    amount: 20000.00,
                    image: {
                        url: "https://firebasestorage.googleapis.com/v0/b/imagestore-f373f.appspot.com/o/images%2FScreenshot%202024-09-14%20014439_8aW1Jr.png?alt=media&token=17bf69bf-5267-4e28-ad4a-5b26a0eb3565",
                        alt: "Screenshot 2024-09-14 014439.png"
                    },
                    productName: "Hoa quả",
                    productId: "PRD00009",
                    productSubId: "PRD00009"
                }
            ]
        }
    ])

    return (
        <>
            <div className="right__table-headers">
                <table className="box-table-headers">
                    <colgroup>
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "155px" }} />
                        <col style={{ width: "200px" }} />
                    </colgroup>
                    <thead>
                        <tr className="group-table-headers">
                            <th rowSpan={1} className='table-icon'></th>
                            <th colSpan={1} rowSpan={1} className="table-header-item text-start">Ngày tạo</th>
                            <th colSpan={1} rowSpan={1} className="table-header-item text-center">SL hoàn</th>
                            <th colSpan={1} rowSpan={1} className="table-header-item text-end">Giá trị hoàn trả</th>
                            <th colSpan={1} rowSpan={1} className="table-header-item text-start">Trạng thái hoàn</th>
                            <th colSpan={1} rowSpan={1} className="table-header-item text-start">Hoàn tiền</th>
                            <th colSpan={1} rowSpan={1} className="table-header-item text-start">Nhân viên tạo</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="right__table-content">
                <div className="right__table-data">
                    <div className="table-data__container">
                        <table className="box-table-data">
                            <colgroup>
                                <col style={{ width: "50px" }} />
                                <col style={{ width: "150px" }} />
                                <col style={{ width: "150px" }} />
                                <col style={{ width: "150px" }} />
                                <col style={{ width: "150px" }} />
                                <col style={{ width: "155px" }} />
                                <col style={{ width: "200px" }} />
                            </colgroup>
                            <tbody>
                                {
                                    returnList?.map((returnItem, index) => (
                                        <ReturnTableItem key={index} returnItem={returnItem} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReturnTable