import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import Cookies from "js-cookie";

// Import Components
import Header from "../Header/Header.jsx";

// Import Columns Info
import col from "../../assets/colgroup/receipt-vouchers-list.js";

// Import Icons
import exportIcon from "../../assets/icons/ExportIcon.jsx";
import filterIcon from "../../assets/icons/FilterIcon.jsx";
import settingFilterIcon from "../../assets/icons/SettingFilterIcon.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faCaretDown,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getListTransaction } from "../../service/TransactionAPI.jsx";
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup.jsx";
import { useNavigate } from "react-router-dom";

const ReceiptVouchersList = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQuantiy, setPageQuantity] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isShowSelectLimit, setIsShowSelectLimit] = useState(false);
  const [active, setActive] = useState({
    all: "active",
    completed: false,
    cancelled: false,
  });
  const navigate = useNavigate();

  const handleChangeActive = (name) => {
    setActive({
      all: false,
      completed: false,
      cancelled: false,
      [name]: "active",
    });
    setDataFilter((prevState) => ({
      ...prevState,
      statuses:
        name === "all"
          ? null
          : name === "completed"
          ? ["COMPLETED"]
          : ["CANCELLED"],
    }));
  };

  // Get list of columns that need redering from Cookies
  const [colsToRender, setColsToRender] = useState(() => {
    const storedCols = Cookies.get("filter_transactions");
    return storedCols
      ? JSON.parse(storedCols)
      : {
          id: true,
          sub_id: true,
          transaction_category_name: true,
          status: true,
          amount: true,
          recipient_group: true,
          recipient_id: true,
          recipient_name: true,
          reference_code: false,
          reference_id: false,
          payment_method: false,
          note: false,
          user_created_name: false,
          created_at: false,
          updated_at: false,
        };
  });

  const [dataFilter, setDataFilter] = useState({
    keyword: null,
    recipient_groups: null,
    payment_methods: null,
    created_date_from: null,
    created_date_to: null,
    updated_date_from: null,
    updated_date_to: null,
    cancelled_date_from: null,
    cancelled_date_to: null,
    category_ids: null,
    created_user_ids: null,
    statuses: null,
    type: "INCOME",
  });

  const fetchTransactionList = async () => {
    const response = await getListTransaction(
      page,
      limit,
      "DESC",
      "createdAt",
      "filter_transactions",
      Cookies.get("filter_transactions"),
      dataFilter
    );
    setTransactionList(response.data.data);
    setPageQuantity(response.data.total_page);
    setTotalItem(response.data.total_items);
  };

  // Set required columns to Cookies
  useEffect(() => {
    Cookies.set("filter_transactions", JSON.stringify(colsToRender));

    const timeoutId = setTimeout(() => {
      fetchTransactionList();
    }, 300); // 500ms delay

    // Cleanup function: Clears the timeout if dependencies change before the timeout finishes
    return () => clearTimeout(timeoutId);
  }, [colsToRender, page, limit, dataFilter]);

  const headersRef = useRef(null);
  const contentRef = useRef(null);

  const handleScroll = (e, target) => {
    target.scrollLeft = e.target.scrollLeft;
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pageQuantiy) {
      setPage((prev) => prev + 1);
    }
  };

  const handleColsChange = (name) => {
    setColsToRender({ ...colsToRender, [name]: !colsToRender[name] });
  };

  return (
    <>
      <Header title={"Phiếu thu"} />
      <div className="right__listPage">
        <div className="right__toolbar">
          <div className="btn-toolbar">
            <button className="btn btn-base btn-text">
              <span className="btn__label">
                <span className="btn__icon">{exportIcon}</span>
                Xuất file
              </span>
            </button>
            <button
              className="btn btn-base btn-text ms-3"
              onClick={() => navigate("/admin/receipt_groups")}
            >
              <span className="btn__label">Loại phiếu thu</span>
            </button>
          </div>
          <div className="btn-toolbar">
            <button
              onClick={() => navigate("/admin/receipt_vouchers/create")}
              className="btn btn-primary"
            >
              <span className="btn__icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="btn__title">Tạo phiếu thu</span>
            </button>
          </div>
        </div>
        <div className="right__table">
          <div className="right__table-scroller">
            <div className="box-scroller">
              <div className="group-scroller-btns">
                <button
                  className={`btn-scroller ${active.all}`}
                  onClick={() => handleChangeActive("all")}
                >
                  Tất cả phiếu thu
                </button>
                <button
                  className={`btn-scroller ${active.completed}`}
                  onClick={() => handleChangeActive("completed")}
                >
                  Phiếu thu hoàn thành
                </button>
                <button
                  className={`btn-scroller ${active.cancelled}`}
                  onClick={() => handleChangeActive("cancelled")}
                >
                  Phiếu thu đã hủy
                </button>
              </div>
            </div>
          </div>
          <div className="right__table-search-filter">
            <div className="box-search-filter-btns">
              <div className="box-search">
                <div className="box-input">
                  <div className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                  <input
                    placeholder="Tìm kiếm theo mã phiếu thu, mã chứng từ gốc"
                    type="text"
                    name="query"
                    id=""
                    autoComplete="on"
                    onChange={(e) =>
                      setDataFilter((prevState) => ({
                        ...prevState,
                        keyword: e.target.value,
                      }))
                    }
                  />
                  <fieldset className="input-field" />
                </div>
              </div>
              <div className="btn-group group-filter-btns">
                <button className="btn btn-base btn-filter">
                  <span className="btn__label">
                    Ngày tạo
                    <span className="btn__icon">
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  </span>
                </button>
                <button className="btn btn-base btn-filter">
                  <span className="btn__label">
                    Nhóm người nộp
                    <span className="btn__icon">
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  </span>
                </button>
                <button className="btn btn-base btn-filter">
                  <span className="btn__label">
                    Bộ lọc khác
                    <span className="btn__icon">{filterIcon}</span>
                  </span>
                </button>
              </div>
              <button disabled id="btn-save-filter" className="btn btn-primary">
                <span className="btn__title">Lưu bộ lọc</span>
              </button>
            </div>
          </div>
          <div
            ref={headersRef}
            onScroll={(e) => handleScroll(e, contentRef.current)}
            className="right__table-headers"
          >
            <table className="box-table-headers">
              <colgroup>
                <col style={{ width: "80px" }} />
                {/* Render the <colgroup> only for the columns that are in colsToRender */}
                {Object.entries(colsToRender).map(([key, value]) => {
                  if (value) {
                    return (
                      <col
                        key={key}
                        style={{
                          width: col[key].width,
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </colgroup>
              <thead>
                <tr className="group-table-headers">
                  <th rowSpan={1} className="table-icon">
                    <div className="group-icons">
                      <button className="btn-icon">{settingFilterIcon}</button>
                      <div className="checkbox__container">
                        <div className="checkbox__wrapper">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="checkbox__input"
                          />
                          <div className="btn-checkbox"></div>
                        </div>
                      </div>
                    </div>
                  </th>
                  {/* Render table headers for columns that exist in receiptVouchersList */}
                  {Object.entries(colsToRender).map(([key, value]) => {
                    if (value) {
                      if (key.includes("_at")) {
                        return (
                          <th
                            key={key}
                            colSpan={1}
                            rowSpan={1}
                            className={cn("table-header-item", col[key].align)}
                          >
                            <div className="box-sort-date">
                              {col[key].name}
                              <span className="box-icon">
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            </div>
                          </th>
                        );
                      }
                      return (
                        <th
                          key={key}
                          colSpan={1}
                          rowSpan={1}
                          className={cn("table-header-item", col[key].align)}
                        >
                          {col[key].name}
                        </th>
                      );
                    }
                    return null;
                  })}
                </tr>
              </thead>
            </table>
          </div>
          <div className="right__table-content">
            <div className="right__table-data">
              <div
                ref={contentRef}
                onScroll={(e) => handleScroll(e, headersRef.current)}
                className="table-data__container"
              >
                <table className="box-table-data">
                  <colgroup>
                    <col style={{ width: "80px" }} />
                    {/* Render the <colgroup> only for the columns that are in colsToRender */}
                    {Object.entries(colsToRender).map(([key, value]) => {
                      if (value) {
                        return (
                          <col
                            key={key}
                            style={{
                              width: col[key].width,
                            }}
                          />
                        );
                      }
                      return null;
                    })}
                  </colgroup>
                  <tbody>
                    {transactionList.map((order, index) => {
                      return (
                        <tr key={index} className="table-data-row">
                          <td rowSpan={1} className="table-icon">
                            <div className="group-icons">
                              <div className="btn-icon"></div>
                              <div className="checkbox__container">
                                <div className="checkbox__wrapper">
                                  <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    className="checkbox__input"
                                  />
                                  <div className="btn-checkbox"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          {Object.entries(colsToRender).map(([key, value]) => {
                            if (value) {
                              if (key.includes("status")) {
                                return (
                                  <td
                                    key={key}
                                    className={cn(
                                      "table-data-item",
                                      col[key].align
                                    )}
                                  >
                                    <div
                                      className={cn("box-status", {
                                        "box-status--completed":
                                          order[key] === "COMPLETED",
                                        "box-status--cancelled":
                                          order[key] === "CANCELLED",
                                      })}
                                    >
                                      <span>
                                        {order[key] === "COMPLETED"
                                          ? "Hoàn thành"
                                          : "Đã hủy"}
                                      </span>
                                    </div>
                                  </td>
                                );
                              } else if (key.includes("recipient_group")) {
                                return (
                                  <td
                                    key={key}
                                    className={cn(
                                      "table-data-item",
                                      col[key].align
                                    )}
                                  >
                                    <p className="box-text">
                                      {order[key] === "SUP"
                                        ? "Nhà cung cấp"
                                        : "Khách hàng"}
                                    </p>
                                  </td>
                                );
                              }
                              return (
                                <td
                                  key={key}
                                  className={cn(
                                    "table-data-item",
                                    col[key].align
                                  )}
                                >
                                  <p className="box-text">
                                    {!Array(
                                      "sub_id",
                                      "original_document",
                                      "payer_name",
                                      "recipient_id"
                                    ).includes(key) ? (
                                      order[key]
                                    ) : (
                                      <a className="box-id">{order[key]}</a>
                                    )}
                                  </p>
                                </td>
                              );
                            }
                            return null;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="right__table-pagination">
              <p>Hiển thị</p>
              <div className="box-page-limit">
                <button
                  className="btn-page-limit"
                  onClick={() => setIsShowSelectLimit(true)}
                >
                  {limit}
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                </button>
                {isShowSelectLimit && (
                  <LimitSelectPopup
                    limit={limit}
                    handleChangeLimit={setLimit}
                    closePopup={() => setIsShowSelectLimit(false)}
                  />
                )}
              </div>
              <p>kết quả</p>

              <p className="item-quantity">
                Từ {(page - 1) * limit + 1} đến{" "}
                {(page - 1) * limit + transactionList.length} trên tổng{" "}
                {totalItem}
              </p>
              <button
                className={cn("btn-icon", "btn-page", { inactive: page === 1 })}
                onClick={handlePrevPage}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array(pageQuantiy)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className={cn("box-page", { active: page === index + 1 })}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </div>
                ))}
              <button
                className={cn("btn-icon", "btn-page", {
                  inactive: page === pageQuantiy,
                })}
                onClick={handleNextPage}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptVouchersList;
