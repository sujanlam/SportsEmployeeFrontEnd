import React, { useEffect, useState } from "react";
import axios from "axios";
import { Logo } from "./logos/Logo";

export const Home: React.FC = () => {
  const [employees, setEmployees] = useState(
    [] as {
      id: number;
      fname: string;
      lname: string;
      club: string;
      goals_scored: number;
      age: number;
      nationality: string;
    }[]
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(
    null
  );
  const [editedEmployeeData, setEditedEmployeeData] = useState({
    fname: "",
    lname: "",
    age: 0,
    club: "",
    goals_scored: 0,
    nationality: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/employees/by-page?page=${currentPage}&size=9`
      );
      setEmployees(response.data.content);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleEditClick = (id: number) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    if (employeeToEdit) {
      setEditingEmployeeId(id);
      setEditedEmployeeData({
        fname: employeeToEdit.fname,
        lname: employeeToEdit.lname,
        age: employeeToEdit.age,
        club: employeeToEdit.club,
        goals_scored: employeeToEdit.goals_scored,
        nationality: employeeToEdit.nationality,
      });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployeeData({
      ...editedEmployeeData,
      [name]: value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/employees/${editingEmployeeId}`,
        editedEmployeeData
      );
      fetchEmployees();
      setEditingEmployeeId(null);
      setEditedEmployeeData({
        fname: "",
        lname: "",
        age: 0,
        club: "",
        goals_scored: 0,
        nationality: "",
      });
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/app/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const renderEditForm = (employee: {
    id: number;
    fname: string;
    lname: string;
    club: string;
  }) => {
    return (
      <div>
        <input
          type="text"
          name="fname"
          value={editedEmployeeData.fname}
          onChange={handleEditChange}
        />
        <input
          type="text"
          name="lname"
          value={editedEmployeeData.lname}
          onChange={handleEditChange}
        />
        <input
          type="number"
          name="age"
          value={editedEmployeeData.age}
          onChange={handleEditChange}
        />
        <input
          type="text"
          name="club"
          value={editedEmployeeData.club}
          onChange={handleEditChange}
        />
        <input
          type="number"
          name="goals_scored"
          value={editedEmployeeData.goals_scored}
          onChange={handleEditChange}
        />
        <input
          type="text"
          name="nationality"
          value={editedEmployeeData.nationality}
          onChange={handleEditChange}
        />
        <button onClick={handleEditSubmit}>Save</button>
        <button onClick={() => setEditingEmployeeId(null)}>Cancel</button>
      </div>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
       <Logo />
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Club</th>
            <th>Goals Scored</th>
            <th>Nationality</th>
            <th>
              <div>
              <i className="bi bi-x-circle"></i>
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fname}</td>
              <td>{employee.lname}</td>
              <td>{employee.age}</td>
              <td>{employee.club ?? "No club Assigned"}</td>
              <td>{employee.goals_scored}</td>
              <td>{employee.nationality}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => handleEditClick(employee.id)}
                >
                  <i className="bi bi-pencil-fill"></i> Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <i className="bi bi-trash-fill"></i> Delete
                </button>
              </td>
              {employee.id === editingEmployeeId && renderEditForm(employee)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container container text-center">
        <button style={{marginRight: '5px'}} onClick={handlePrevPage} disabled={currentPage === 0}>
          Prev Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
