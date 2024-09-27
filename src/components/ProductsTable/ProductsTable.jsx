import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

// Import Components
import DiscountTableCell from '../DiscountTableCell/DiscountTableCell'

// Import CSS
import s from './ProductsTable.module.scss'

// Import Columns Info
import col from '../../assets/colgroup/products-table'

// Import Icons
import infoIcon from '../../assets/icons/InfoIcon'
import boxOpenIcon from '../../assets/icons/BoxOpenIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCircleMinus, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'

const ProductsTable = ({ productsList, setProductList, colsToRender }) => {
    const [discount, setDiscount] = useState(0);

    const handleChangeData = (index, key, value) => {
        const newProductsList = [...productsList];
        newProductsList[index][key] = value;
        setProductList(newProductsList);
    }

    return (
        <div className={s.container}>
            <table className={s.table}>
                <colgroup>
                    {/* Render the <colgroup> only for the columns that are in colsToRender */}
                    {Object.entries(colsToRender).map(([key, value]) => {
                        if (value) {
                            return (
                                <col
                                    key={key}
                                    style={{
                                        width: col[key].width,
                                        minWidth: col[key].minWidth || "unset"
                                    }}
                                />
                            )
                        }
                        return null;
                    })}
                    <col style={{ width: "40px" }} />
                </colgroup>
                <thead className={s.tableHeader}>
                    <tr className={s.tableRow}>
                        {/* Render table headers for columns that exist in ordersList */}
                        {Object.entries(colsToRender).map(([key, value]) => {
                            if (value) {
                                return (
                                    <th
                                        key={key}
                                        scope='col'
                                        className={cn(s.tableCell, s.tableCellHeader, col[key].align)}
                                    >
                                        <p>{col[key].name}</p>
                                    </th>
                                )
                            }
                            return null;
                        })}
                        <th className={cn(s.tableCell, s.tableCellHeader, "text-center")}></th>
                    </tr>
                </thead>
                <tbody className={s.tableBody}>
                    {productsList.map((product, index) => {
                        return (
                            <tr
                                key={index}
                                className={s.tableRow}
                            >
                                {Object.entries(colsToRender).map(([key, value]) => {
                                    if (value) {
                                        if (key === "image") {
                                            return (
                                                <td
                                                    key={key}
                                                    className={cn(s.tableCell, s.tableCellBody, col[key].align)}
                                                >
                                                    <img src={product.image} alt="" />
                                                </td>
                                            )
                                        } else if (key === "name") {
                                            return (
                                                <td
                                                    key={key}
                                                    className={cn(s.tableCell, s.tableCellBody, col[key].align)}
                                                >
                                                    <div className={s.boxInfo}>
                                                        <div className={s.boxName}>
                                                            <p>{product.name}</p>
                                                            <button className={s.btnIcon}>
                                                                <span className={s.btnIconLabel}>
                                                                    {infoIcon}
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className={s.boxId}>
                                                            <Link to={`/admin/products/${product.id}`}>
                                                                <p>{product.id}</p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            )
                                        } else if (key.includes("quantity")) {
                                            return (
                                                <td
                                                    key={key}
                                                    className={cn(s.tableCell, s.tableCellBody, col[key].align)}
                                                >
                                                    <div className={s.boxQuantity}>
                                                        <button className={s.btnIcon} onClick={() => handleChangeData(index, key, product.quantity - 1)}>
                                                            <span className={s.btnIconLabel}>
                                                                <FontAwesomeIcon icon={faCircleMinus} />
                                                            </span>
                                                        </button>
                                                        <div className={s.boxFormControl}>
                                                            <div className={s.boxInput}>
                                                                <input
                                                                    className={cn(s.inputField, col[key].align)}
                                                                    type="text"
                                                                    value={product[key]}
                                                                    onChange={(e) => handleChangeData(index, key, e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button className={s.btnIcon} onClick={() => handleChangeData(index, key, product.quantity + 1)}>
                                                            <span className={s.btnIconLabel}>
                                                                <FontAwesomeIcon icon={faCirclePlus} />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            )
                                        } else if (key === "costPrice") {
                                            return (
                                                <td
                                                    key={key}
                                                    className={cn(s.tableCell, s.tableCellBody, col[key].align)}
                                                >
                                                    <div className={s.boxPrice}>
                                                        <div className={s.boxInput}>
                                                            <input className={cn(s.inputField, col[key].align)} type="text" value={product[key]} onChange={e => handleChangeData(index, key, e.target.value)} />
                                                        </div>
                                                    </div>
                                                </td>
                                            )
                                        } else if (key === "discount") {
                                            return (
                                                <DiscountTableCell
                                                    key={key}
                                                    price={product.costPrice}
                                                    discount={product.discount}
                                                    handleChangeDiscount={(value) => {
                                                        handleChangeData(index, key, value);
                                                    }}
                                                />
                                            )
                                        } else if (key === "tax") {
                                            return (
                                                <td
                                                    key={key}
                                                    className={cn(s.tableCell, s.tableCellBody, col[key].align)}
                                                >
                                                    <div className={s.boxPrice}>
                                                        <div className={s.boxInput}>
                                                            <input className={cn(s.inputField, col[key].align)} type="text" value={product[key]} onChange={e => handleChangeData(index, key, e.target.value)} />
                                                        </div>
                                                    </div>
                                                </td>
                                            )
                                        }
                                        return (
                                            <td
                                                key={key}
                                                className={cn(s.tableCell, s.tableCellBody, col[key].align)}
                                            >
                                                <p>
                                                    {key === "total"
                                                        ? Number(product.quantity) * (Number(product.costPrice) - Number(product.discount) + Number(product.tax))
                                                        : product.unit}
                                                </p>

                                            </td>
                                        )
                                    }
                                    return null;
                                })}
                                <td className={cn(s.tableCell, s.tableCellBody, "text-center")}>
                                    <button className="btn-icon">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {
                productsList.length === 0 &&
                <div className={s.boxEmpty}>
                    {boxOpenIcon}
                    <p>{colsToRender["ordered_quantity"] ? "Đơn đặt hàng nhập" : "Đơn nhập hàng"} của bạn chưa có sản phẩm nào</p>
                    <button className="btn btn-outline-primary">
                        <span className="btn__label">Thêm sản phẩm</span>
                    </button>
                </div>
            }
        </div>
    )
}

export default ProductsTable