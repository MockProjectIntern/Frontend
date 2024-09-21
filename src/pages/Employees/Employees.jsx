import { Route, Routes } from "react-router-dom";
import EmployeesTable from "../../components/EmployeesList/EmployeesTable";

const Employees = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<EmployeesTable />} />
            </Routes>
        </>
    )
}
export default Employees;