import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Import Components
import SearchSupplier from "../SearchSupplier/SearchSupplier";
import SupplierInfo from "../SupplierInfo/SupplierInfo";
import ProductsTable from "../ProductsTable/ProductsTable.jsx";
import DiscountPopup from "../DiscountPopup/DiscountPopup.jsx";

// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faChevronLeft,
	faGear,
	faMagnifyingGlass,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import calendarIcon from "../../assets/icons/CalendarIcon.jsx";
import infoIcon from "../../assets/icons/InfoIcon.jsx";
import importIcon from "../../assets/icons/ImportIcon.jsx";
import GINProductsTable from "../GINProductsTable/GINProductsTable.jsx";
import { createNewGIN } from "../../service/GINApi.jsx";

const CreateGIN = () => {

	    const [productRequest,setProductRequest] = useState({
        
            sub_id: null,
            note: "",
            tags: "",
            user_inspection_id: "USR00002",
            isBalance: false,
            products: [
                {
                    product_id: "PRD00007",
                    actual_stock: 30,
                    discrepancy_quantity: 5,
                    reason: "Hư hỏng",
                    note: "Ghi chú",
                    unit: "Chiếc"
                }
            ]
        
});

	const handleProductRequestChange = (e) => {
		const { name, value } = e.target;
		setProductRequest({ ...productRequest, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("Tao gin moi")
			const res = await createNewGIN(productRequest);
			console.log(res);
			if(res.status_code == 201){
				alert(res.message);
			}

		}	catch (error) {
			console.log(error);
		}
	};

	const [productsList, setProductsList] = useState([
		{
			id: "PVN05",
			image:
				"https://sapo.dktcdn.net/100/805/407/variants/1abe9da6-729b-4bc6-b0f3-df59da5fcfe2-1726473515737.jpg",
			name: "Áo khoác Chino thời thượng SID56708 - Trắng",
			barcode: "SID56708",
			unit: "---",
			quantity: 10,
			actual_stock: 10,
			discrepancy_quantity: 0,
			reason: "Hư hỏng",
		},
		{
			id: "PVN05",
			image:
				"https://sapo.dktcdn.net/100/805/407/variants/1abe9da6-729b-4bc6-b0f3-df59da5fcfe2-1726473515737.jpg",
			name: "Áo khoác Chino thời thượng SID56708 - Trắng",
			barcode: "SID56708",
			unit: "---",
			quantity: 10,
			actual_stock: 0,
			discrepancy_quantity: 0,
			reason: "Hư hỏng",
		},
	]);
	const [tags, setTags] = useState([]);
	const [tagValue, setTagValue] = useState("");
	const [isDiscountPopup, setIsDiscountPopup] = useState(false);
	const discountBtnRef = useRef(null);

	const [activeTab, setActiveTab] = useState("all");

	// Get list of columns that need redering from Cookies
	const [colsToRender, setColsToRender] = useState(() => {
		const storedCols = Cookies.get("filter_products_table");
		return storedCols
			? JSON.parse(storedCols)
			: {
					index: true,
					image: true,
					name: true,
					barcode: true,
					unit: true,
					ordered_quantity: true,
					price: true,
					discount: true,
					tax: true,
					total: true,
			  };
	});

	// Set required columns to Cookies
	useEffect(() => {
		Cookies.set("filter_products_table", JSON.stringify(colsToRender));
	}, [colsToRender]);

	const filterProducts = (products) => {
		switch (activeTab) {
			case "unchecked":
				return products.filter((product) => product.actual_stock === 0);
			case "matched":
				return products.filter(
					(product) => product.actual_stock === product.quantity
				);
			case "mismatched":
				return products.filter(
					(product) => product.actual_stock !== product.quantity
				);
			default:
				return products;
		}
	};

	return (
		<>
			<div className="right__navbar">
				<div className="box-navbar">
					<div className="btn-toolbar">
						<Link to="/admin/gins" className="btn-back">
							<FontAwesomeIcon icon={faChevronLeft} />
							<h6 className="btn-back__title">Quay lại phiếu kiểm hàng</h6>
						</Link>
					</div>
					<div className="btn-toolbar">
						<button className="btn btn-outline-primary">
							<span className="btn__title">Thoát</span>
						</button>
						<button className="btn btn-primary" onClick={handleSubmit}>
							<span className="btn__title">Tạo phiếu kiểm</span>
						</button>
						<button
							className="btn btn-secondary-cyan"
							style={{ color: "white" }}
						>
							<span className="btn__title">Cân bằng kho</span>
						</button>
					</div>
				</div>
			</div>
			<div className="right__createPaperPage">
				<div className="right__createPaperPage-wrapper">
					<div className="right__createPaperPage-container">

					<div className="box-supplier">
                        <div className="box-paper">
                            <div className="paper-header">
                                <p>Thông tin phiếu</p>
                            </div>
							<div className="paper-content">
									<div className="group-info">
									<div className="info-item">
											<p className="info-title">Mã phiếu</p>
											<div className="info-field">
												<div className="box-input">
													<input
														placeholder="Nhập mã phiếu"
														name="sub_id"
														value={productRequest.sub_id}
														onChange={handleProductRequestChange}
														type="text"
														className="text-field"
													/>
													<fieldset className="input-field"></fieldset>
												</div>
											</div>
										</div>

									</div>
									</div>
                        </div>
                    </div>
					
						<div className="box-info">
							<div className="box-paper">
								<div className="paper-header">
									<p>Thông tin bổ sung</p>
								</div>
								<div className="paper-content">
									<div className="group-info">

										<div className="info-item">
											<p className="info-title">Ghi chú</p>
											<div className="info-field">
												<div className="box-input">
													<input
														placeholder="Kiểm hàng ngày 13/9/2024"
														name="note"
														value={productRequest.note}
														onChange={handleProductRequestChange}
														type="text"
														className="text-field"
													/>
													<fieldset className="input-field"></fieldset>
												</div>
											</div>
										</div>

										<div className="info-item">
											<p className="info-title">Tags</p>
											<div className="info-field">
												<div className="box-input">
													<input
														placeholder="Nhập Ký tự và enter"
														name="tags"
														value={productRequest.tags}
														onChange={handleProductRequestChange}
														type="text"
														className="text-field"
													/>
													<fieldset className="input-field"></fieldset>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="box-products">
							<div className="box-paper">
								<div className="paper-header">
									<div className="box-header">
										<div className="btn-tab">
											<button
												className={activeTab === "all" ? "active" : ""}
												onClick={() => setActiveTab("all")}
											>
												Tất cả
											</button>
											<button
												className={activeTab === "unchecked" ? "active" : ""}
												onClick={() => setActiveTab("unchecked")}
											>
												Chưa kiểm
											</button>
											<button
												className={activeTab === "matched" ? "active" : ""}
												onClick={() => setActiveTab("matched")}
											>
												Khớp
											</button>
											<button
												className={activeTab === "mismatched" ? "active" : ""}
												onClick={() => setActiveTab("mismatched")}
											>
												Lệch
											</button>
										</div>

										<div className="btn-toolbar">
										<button className="btn btn-base btn-text">
                        <span className="btn__label">
                            <span className="btn__icon">
                                {importIcon}
                            </span>
                            Nhập file
                        </span>
                    </button>
										</div>
									</div>
								</div>
								<div className="paper-content">
									<div className="right__table">
										<div className="right__table-search-filter">
											<div className="box-search-filter-btns">
												<div className="box-search">
													<div className="box-input">
														<div className="search-icon">
															<FontAwesomeIcon icon={faMagnifyingGlass} />
														</div>
														<input
															placeholder="Tìm theo tên, mã SKU, hoặc quét mã Barcode...(F3)"
															type="text"
															name="search"
															id=""
															autoComplete="on"
														/>
														<fieldset className="input-field" />
													</div>
													<button className="btn btn-base">
														<span className="btn__label">
															<p>Chọn nhanh</p>
														</span>
													</button>
												</div>
												<div className="btn-group group-filter-btns">
													<button className="btn btn-base btn-filter">
														<span className="btn__label">
															Giá nhập
															<span className="btn__icon">
																<FontAwesomeIcon icon={faCaretDown} />
															</span>
														</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="box-table">
									<GINProductsTable
										productsList={filterProducts(productsList)}
										colsToRender={colsToRender}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateGIN;
