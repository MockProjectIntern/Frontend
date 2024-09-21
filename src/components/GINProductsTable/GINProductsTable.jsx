import React, { useState } from 'react'; // Add useState
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Import CSS
import s from './GINProductsTable.module.scss';

// Import Columns Info
import productsTableColgroup from '../../assets/colgroup/gin-products-table';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import dropdownicon from '../../assets/icons/TriangleDropdown'; // Adjust path as needed

const GINProductsTable = ({ productsList }) => {
  // Options for the "reason" field
  const reasonOptions = ["Khác", "Trả hàng", "Hư hỏng", "Hao mòn"];

  return (
    <div className={s.container}>
      <table className={s.table}>
        <colgroup>
          {/* Render the <colgroup> based on productsTableColgroup */}
          {Object.entries(productsTableColgroup).map(([key, col]) => (
            <col key={key} style={{ width: col.width, minWidth: col.minWidth || "unset" }} />
          ))}
          <col style={{ width: "40px" }} />
        </colgroup>
        <thead className={s.tableHeader}>
          <tr className={s.tableRow}>
            {/* Render table headers based on productsTableColgroup */}
            {Object.entries(productsTableColgroup).map(([key, col]) => (
              <th key={key} scope='col' className={cn(s.tableCell, s.tableCellHeader, col.align)}>
                <p>{col.name}</p>
              </th>
            ))}
            <th className={cn(s.tableCell, s.tableCellHeader, "text-center")}></th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {productsList.map((product, index) => (
            <tr key={index} className={s.tableRow}>
              {Object.entries(productsTableColgroup).map(([key, col]) => {
                if (key === "image") {
                  return (
                    <td key={key} className={cn(s.tableCell, s.tableCellBody, col.align)}>
                      <img src={product.image} alt="" />
                    </td>
                  );
                } else if (key === "name") {
                  return (
                    <td key={key} className={cn(s.tableCell, s.tableCellBody, col.align)}>
                      <div className={s.boxInfo}>
                        <div className={s.boxName}>
                          <p>{product.name}</p>
                        </div>
                        <div className={s.boxId}>
                          <Link to={`/admin/products/${product.id}`}>
                            <p>{product.id}</p>
                          </Link>
                        </div>
                      </div>
                    </td>
                  );
                } else if (key.includes("actual_stock")) {
                  return (
                    <td key={key} className={cn(s.tableCell, s.tableCellBody, col.align)}>
                      <div className={s.boxQuantity}>
                        <button className={s.btnIcon}>
                          <span className={s.btnIconLabel}>
                            <FontAwesomeIcon icon={faCircleMinus} />
                          </span>
                        </button>
                        <div className={s.boxFormControl}>
                          <div className={s.boxInput}>
                            <input className={cn(s.inputField, col.align)} type="text" value={product[key]} />
                          </div>
                        </div>
                        <button className={s.btnIcon}>
                          <span className={s.btnIconLabel}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                          </span>
                        </button>
                      </div>
                    </td>
                  );
                } else if (key === "reason") {
                  return (
                    <td key={key} className={cn(s.tableCell, s.tableCellBody, col.align)}>
                      <div className= {cn(s.boxReason, col.align)}>
                        <select>
                          {reasonOptions.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                         {dropdownicon}
                      </div>
                    </td>
                  );
                } else if (key === "note") {
                  return (
                    <td key={key} className={cn(s.tableCell, s.tableCellBody, col.align)}>
                      <input className={s.boxNote} type="text" placeholder="Nhập ghi chú" />
                    </td>
                  );
                }
                return (
                  <td key={key} className={cn(s.tableCell, s.tableCellBody, col.align)}>
                    <p>{key === "index" ? index + 1 : product[key]}</p>
                  </td>
                );
              })}
              <td className={cn(s.tableCell, s.tableCellBody, "text-center")}>
                <button className="btn-icon">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {productsList.length === 0 && (
        <div className={s.boxEmpty}>
          <p>Bảng chưa có sản phẩm nào</p>
          <button className="btn btn-outline-primary">
            <span className="btn__label">Thêm sản phẩm</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default GINProductsTable;
