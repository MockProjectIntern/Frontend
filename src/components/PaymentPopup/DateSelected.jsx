import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs"; // Ensure you have dayjs installed: npm install dayjs
import s from "./DateSelected.module.scss"; // Ensure you have imported the CSS for this file
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateSelected = ({ closePopup, handeChangeDatafilter }) => {
    const [customStartDate, setCustomStartDate] = useState(null);
    const [customEndDate, setCustomEndDate] = useState(null);

    const handleFilterClick = () => {
        if (customStartDate && customEndDate) {
            handeChangeDatafilter({
                date_from: dayjs(customStartDate).format("YYYY-MM-DD"),
                date_to: dayjs(customEndDate).format("YYYY-MM-DD"),
            });
            closePopup(); // Close the popup after filtering
        }
    };

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.customContainer}>
                    <div className="w-100">
                        <div className={s.customAt}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Ngày bắt đầu"
                                    value={customStartDate}
                                    onChange={(date) => setCustomStartDate(date)}
                                    renderInput={(params) => <input {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div
                        style={{
                            height: "1px",
                            flex: "0 0 auto",
                            background: "rgb(163, 168, 175)",
                            width: "0.285714rem",
                            margin: "0px 0.571429rem",
                        }}
                    ></div>

                    <div className="w-100">
                        <div className={s.customAt}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Ngày kết thúc"
                                    value={customEndDate}
                                    onChange={(date) => setCustomEndDate(date)}
                                    renderInput={(params) => <input {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>

                <button className={s.filter} onClick={handleFilterClick}>
                    <span>Lọc</span>
                </button>
            </div>
        </div>
    );
};

export default DateSelected;
