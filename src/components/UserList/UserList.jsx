import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faMagnifyingGlass,
	faCaretDown,
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { getListCategory } from "../../service/CategoryAPI";
import { useRef, useState } from "react";
import { formatDateTime } from "../../utils/DateUtils";
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup";
import { useDebouncedEffect } from "../../utils/CommonUtils";
import { createNewUser, getListUser } from "../../service/UserAPI";
import CreateUserPopup from "../UserListPopup/CreateUserPopup";
import s from "./UserList.module.scss";
const UserList = () => {
	const limitBtnRef = useRef(null);

	const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [pageQuantiy, setPageQuantity] = useState(1);
	const [usersQuantity, setUsersQuantity] = useState();
	const [usersList, setUsersList] = useState([]);
	const [dataBody, setDataBody] = useState({
		keyword: null,
		roles: null,
		start_created_date: null,
		end_created_date: null,
		active_status: null,
	});

	const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false); // State cho popup tạo user
	const isActive = {
		true: "Đang làm việc",
		false: "Đã nghỉ việc",
	}

	const role = {
		COORDINATOR: "Thủ kho",
		WAREHOUSE_MANAGER: "Nhân viên điều phối",
		WAREHOUSE_STAFF: "Nhân viên kho"
	}

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
	const fetchUserList = async () => {
		const users = await getListUser(page, limit, dataBody);
		setUsersList(users.data.data);
		setUsersQuantity(users.data.total_items);
		setPageQuantity(users.data.total_page);
	};

	const handleCreateUser = async (userData) => {
		const res = await createNewUser(userData);
		fetchUserList();
	};

	useDebouncedEffect(
		() => {
			fetchUserList();
		},
		300,
		[limit, page, dataBody]
	);

	return (
		<>
			<div className={cn(s.container, { [s.opacity]: isOpenCreatePopup })}>
				<Header title={"Loại sản phẩm"} />
				<div className="right__listPage">
					<div className="right__toolbar">
						<div className="btn-toolbar">
							<button onClick={() => setIsOpenCreatePopup(!isOpenCreatePopup)} className="btn btn-primary">
								<span className="btn__icon">
									<FontAwesomeIcon icon={faPlus} />
								</span>
								<span className="btn__title">Thêm nhân viên mới</span>
							</button>
						</div>
					</div>
					<div className="right__table">
						<div className="right__table-scroller">
							<div className="box-scroller">
								<div className="group-scroller-btns">
									<button className="btn-scroller active">
										Tất cả nhân viên
									</button>
								</div>
							</div>
						</div>
						<div className="right__table-search-filter">
							<div className="">
								<div className="box-search-filter-btns">
									<div className="box-search">
										<div className="box-input">
											<div className="search-icon">
												<FontAwesomeIcon icon={faMagnifyingGlass} />
											</div>
											<input
												placeholder="Tìm kiếm theo tên nhân viên, số điện thoại, email"
												type="text"
												name="search"
												id=""
												autoComplete="on"
												onChange={(e) =>
													setDataBody((prev) => {
														return {
															...prev,
															keyword: e.target.value,
														};
													})
												}
											/>
											<fieldset className="input-field" />
										</div>
									</div>
									<div className="btn-group group-filter-btns">
										<button className="btn btn-base btn-filter">
											<span className="btn__label">
												Trạng thái
												<span className="btn__icon">
													<FontAwesomeIcon icon={faCaretDown} />
												</span>
											</span>
										</button>

										<button className="btn btn-base btn-filter">
											<span className="btn__label">
												Vai trò
												<span className="btn__icon">
													<FontAwesomeIcon icon={faCaretDown} />
												</span>
											</span>
										</button>

										<button className="btn btn-base btn-filter">
											<span className="btn__label">
												Ngày tạo
												<span className="btn__icon">
													<FontAwesomeIcon icon={faCaretDown} />
												</span>
											</span>
										</button>

									</div>
								</div>
							</div>
						</div>
						<div className="right__table-headers">
							<table className="box-table-headers">
								<colgroup>
									<col style={{ width: "150px" }} />
									<col style={{ width: "150px" }} />
									<col style={{ width: "180px" }} />
									<col style={{ width: "150px" }} />
									<col style={{ width: "150px" }} />
									<col style={{ width: "150px" }} />
									<col style={{ width: "150px" }} />
									<col style={{ width: "150px" }} />
								</colgroup>
								<thead>
									<tr className="group-table-headers">
										<th rowSpan={1} className="table-icon">
											<div className="group-icons">
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
										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-start")}
										>
											Tên nhân viên
										</th>
										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-start")}
										>
											Số điện thoại
										</th>
										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-start")}
										>
											Email
										</th>
										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-start")}
										>
											Trạng thái
										</th>
										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-start")}
										>
											Vai trò
										</th>


										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-center")}
										>
											Ngày tạo
										</th>
										<th
											colSpan={1}
											rowSpan={1}
											className={cn("table-header-item", "text-start")}
										>
											Địa chỉ
										</th>

									</tr>
								</thead>
							</table>
						</div>
						<div className="right__table-content">
							<div className="right__table-data">
								<div className="table-data__container">
									<table className="box-table-data">
										<colgroup>
											<col style={{ width: "150px" }} />
											<col style={{ width: "150px" }} />
											<col style={{ width: "180px" }} />
											<col style={{ width: "150px" }} />
											<col style={{ width: "150px" }} />
											<col style={{ width: "150px" }} />
											<col style={{ width: "150px" }} />
											<col style={{ width: "150px" }} />
										</colgroup>
										<tbody>
											{usersList.map((user, index) => {
												return (
													<tr key={index} className="table-data-row">
														<td rowSpan={1} className="table-icon">
															<div className="group-icons">
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
														<td className={cn("table-data-item", "text-start")}>
															<p className="box-text">{user.full_name}</p>
														</td>
														<td className={cn("table-data-item", "text-start")}>
															<p className="box-text">{user.phone}</p>
														</td>
														<td className={cn("table-data-item", "text-start")}>
															<p className="box-text">{user.email}</p>
														</td>
														<td className={cn("table-data-item", "text-start",)}>
															<p className="box-text" style={{ color: "rgb(13, 180, 115)" }}>{isActive[user.is_active]}</p>
														</td>
														<td className={cn("table-data-item", "text-start")}>
															<p className="box-text" style={{ color: "#4d53E0" }}>{role[user.role]}</p>
														</td>

														<td className={cn("table-data-item", "text-center")}>
															<p className="box-text">
																{formatDateTime(user.created_at)}
															</p>
														</td>

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
										ref={limitBtnRef}
										onClick={() => setIsOpenLimitPopup(!isOpenLimitPopup)}
										className={cn("btn-page-limit", {
											selected: isOpenLimitPopup,
										})}
									>
										{limit}
										<span>
											<FontAwesomeIcon icon={faCaretDown} />
										</span>
									</button>
									{isOpenLimitPopup && (
										<LimitSelectPopup
											btnRef={limitBtnRef}
											closePopup={() => setIsOpenLimitPopup(false)}
											limit={limit}
											handleChangeLimit={(limit) => {
												setLimit(limit);
											}}
										/>
									)}
								</div>
								<p>Kết quả</p>
								<p className="item-quantity">
									Từ {(page - 1) * limit + 1} đến{" "}
									{(page - 1) * limit + usersList.length} trên tổng{" "}
									{usersQuantity}
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
			</div>
			{isOpenCreatePopup && (
				<CreateUserPopup onCreate={handleCreateUser} // Truyền trạng thái isOpen
					onClose={() => setIsOpenCreatePopup(false)} // Đóng popup

				/>
			)}
		</>
	);
};

export default UserList;
