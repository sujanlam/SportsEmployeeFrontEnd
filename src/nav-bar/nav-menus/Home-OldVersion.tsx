import React, { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
    id: number;
    fname: string;
    lname: string;
    age: number;
    club: string;
    goals_scored: number;
    nationality: string;
  }

export const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [editedEmployee, setEditedEmployee] = useState<Employee>({
    id: 0,
    fname: '',
    lname: '',
    age: 0,
    club: '',
    goals_scored: 0,
    nationality: ''
  });

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getAllEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>("http://localhost:8080/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error getting employees: ", error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditedEmployee({ ...employee });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/employees/${editedEmployee.id}`,
        editedEmployee
      );
      getAllEmployees();
      setEditMode(false);
      setEditedEmployee({
        id: 0,
        fname: '',
        lname: '',
        age: 0,
        club: '',
        goals_scored: 0,
        nationality: ''
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };


  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedEmployee({
      id: 0,
      fname: "",
      lname: "",
      age: 0,
      club: "",
      goals_scored: 0,
      nationality: "",
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
      getAllEmployees();
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
  };

  return (
    <div className="container">
      <table className="table table-stripe">
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Club</th>
            <th>Goals Scored</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fname}</td>
              <td>{employee.lname}</td>
              <td>{employee.age}</td>
              <td>{employee.club?? 'No club Assigned'}</td>
              <td>{employee.goals_scored}</td>
              <td>{employee.nationality}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => handleEdit(employee)}
                >
                  <i className="bi bi-pencil-fill"></i> Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => handleDelete(editedEmployee.id)}
                >
                  <i className="bi bi-trash-fill"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous Page</button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next Page</button>
      </div>
      {editMode && (
        <div className="container">
          <h2>Edit Employee</h2>
          <form>
            <label>
              First Name:
              <input
                type="text"
                name="fname"
                value={editedEmployee.fname}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lname"
                value={editedEmployee.lname}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={editedEmployee.age || ''}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Club:
              <input
                type="text"
                name="club"
                value={editedEmployee.club}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Goals Scored:
              <input
                type="number"
                name="goals_scored"
                value={editedEmployee.goals_scored || ''}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Nationality:
              <input
                type="text"
                name="nationality"
                value={editedEmployee.nationality}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      )}
      </div>
  );
};