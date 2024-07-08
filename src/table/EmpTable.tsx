import React from "react";
import { useEffect, useState } from "react";
//import { Employee } from "../model/Employee";
import axios from "axios";
import { Employee } from "../model/Employee";

function Table() {
  const API_URL = "http://localhost:8080/api/employees";

  const [employee, setEmployee] = useState<Employee[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      //.then(res => console.log(res))
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container m-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <table className="table table-stripe">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Club</th>
            <th>Goals Scored</th>
            <th>Nationality</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employee.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.age}</td>
                <td>{user.club}</td>
                <td>{user.goals_scored}</td>
                <td>{user.nationality}</td>
                <td>
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-pencil-fill"></i> Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    <i className="bi bi-trash-fill"></i> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
