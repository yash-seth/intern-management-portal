import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard({ role }) {
  const [adminView, setAdminView] = useState("create");
  const [update, setUpdate] = useState(false);
  const [currentMission, setCurrentMission] = useState({});
  const [missions, setMissions] = useState([]);
  const [newMission, setNewMission] = useState({
    name: "",
    about: "",
    type: "",
    vacancy: "",
    status: "ongoing",
  });

  useEffect(() => {
    fetchMissions();
  }, []);

  const addMission = async () => {
    if (
      newMission.name === "" ||
      newMission.about === "" ||
      newMission.type === ""
    ) {
      alert("Please enter valid data htmlFor the mission!");
      setNewMission({
        name: "",
        about: "",
        type: "",
        vacancy: "",
        status: "ongoing",
      });
      return;
    } else {
      await axios
        .post("http://127.0.0.1:5000/api/add-mission", newMission)
        .then(alert("New Mission successfully added!"))
        .catch((e) =>
          console.log(
            "There is an error with the backend. Please refresh or try again later if the problem persists."
          )
        );
      setNewMission({
        name: "",
        about: "",
        type: "",
        vacancy: "",
        status: "ongoing",
      });
      fetchMissions();
    }
  };

  const fetchMissions = async () => {
    await axios
      .get("http://127.0.0.1:5000/api/get-missions")
      .then((missionsList) => setMissions(missionsList.data))
      .catch((e) =>
        console.log(
          "There is an error with the backend. Please refresh or try again later if the problem persists."
        )
      );
  };

  const deleteMission = async (e) => {
    await axios
      .post("http://127.0.0.1:5000/api/delete-mission", {
        missionID: missions[e.target.value]._id,
      })
      .then(alert("Mission was deleted"))
      .catch((err) => alert(err));
    fetchMissions();
  };

  const handleFormChange = (e) => {
    if (e.target.name === "name")
      setNewMission({ ...newMission, name: e.target.value });
    else if (e.target.name === "about")
      setNewMission({ ...newMission, about: e.target.value });
    else if (e.target.name === "type")
      setNewMission({ ...newMission, type: e.target.value });
    else if (e.target.name === "vacancy")
      setNewMission({ ...newMission, vacancy: e.target.value });
  };

  const handleUpdateOperation = (e) => {
    setCurrentMission(missions[e.target.value])
    setUpdate(true)
  };

  const updateMission = async (e) => {
    await axios.post("http://127.0.0.1:5000/api/update-mission", currentMission)
    .then(alert("Update was successful"))
    .catch((e) => alert(e))
    setUpdate(false)
    setCurrentMission({})
    fetchMissions()
  }

  const handleUpdateFormChange = (e) => {
    if (e.target.name === "name")
      setCurrentMission({ ...currentMission, name: e.target.value });
    else if (e.target.name === "about")
      setCurrentMission({ ...currentMission, about: e.target.value });
    else if (e.target.name === "type")
      setCurrentMission({ ...currentMission, type: e.target.value });
    else if (e.target.name === "vacancy")
      setCurrentMission({ ...currentMission, vacancy: e.target.value });
  };

  return (
    <div className="dashboard-main">
      {role === "admin" ? (
        <>
          <div className="admin-controls">
            <button
              className="admin-view-controls"
              onClick={() => {
                setAdminView("create");
                fetchMissions();
              }}
            >
              Create Missions
            </button>
            <button
              className="admin-view-controls"
              onClick={() => {
                setAdminView("missions");
                fetchMissions();
              }}
            >
              Manage Missions
            </button>
            <button
              className="admin-view-controls"
              onClick={() => {
                setAdminView("interns");
                fetchMissions();
              }}
            >
              Manage Interns
            </button>
          </div>
          <div className="admin-content">
            {update && (
              <div className="update-form">
                <h2>Update Mission</h2>
                <label htmlFor="mission-id">Mission ID: {currentMission._id}</label>
                <label htmlFor="mission-name">Mission Name</label>
                <input
                  id="mission-name"
                  value={currentMission.name}
                  name="name"
                  onChange={(e) => handleUpdateFormChange(e)}
                />
                <label htmlFor="mission-about">About</label>
                <input
                  id="mission-about"
                  value={currentMission.about}
                  name="about"
                  onChange={(e) => handleUpdateFormChange(e)}
                />
                <label htmlFor="mission-type">Type</label>
                <input
                  id="mission-type"
                  value={currentMission.type}
                  name="type"
                  onChange={(e) => handleUpdateFormChange(e)}
                />
                <label htmlFor="mission-vacancy">Vacancy</label>
                <input
                  id="mission-vacancy"
                  value={currentMission.vacancy}
                  name="vacancy"
                  onChange={(e) => handleUpdateFormChange(e)}
                />
                <button id="add-mission" onClick={(e) => updateMission(e)}>
                  Update
                </button>
              </div>
            )}
            {adminView === "create" && (
              <div className="add-mission-form">
                <label htmlFor="mission-name">Mission Name</label>
                <input
                  id="mission-name"
                  value={newMission.name}
                  name="name"
                  onChange={(e) => handleFormChange(e)}
                />
                <label htmlFor="mission-about">About</label>
                <input
                  id="mission-about"
                  value={newMission.about}
                  name="about"
                  onChange={(e) => handleFormChange(e)}
                />
                <label htmlFor="mission-type">Type</label>
                <input
                  id="mission-type"
                  value={newMission.type}
                  name="type"
                  onChange={(e) => handleFormChange(e)}
                />
                <label htmlFor="mission-vacancy">Vacancy</label>
                <input
                  id="mission-vacancy"
                  value={newMission.vacancy}
                  name="vacancy"
                  onChange={(e) => handleFormChange(e)}
                />
                <button id="add-mission" onClick={() => addMission()}>
                  Add
                </button>
              </div>
            )}
            {adminView === "missions" && (
              <div className="missions-list-admin">
                <table>
                  <tr>
                    <th>ID</th>
                    <th>Mission Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Vacancy</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  {missions.map((mission, index) => {
                    return (
                      <tr key={index}>
                        <td>{mission._id}</td>
                        <td>{mission.name}</td>
                        <td>{mission.about}</td>
                        <td>{mission.type}</td>
                        <td>{mission.vacancy}</td>
                        <td>{mission.status}</td>
                        <td>
                          <button
                            value={index}
                            onClick={(e) => deleteMission(e)}
                          >
                            Delete
                          </button>
                          <button
                            value={index}
                            onClick={(e) => handleUpdateOperation(e)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            )}
            {adminView === "interns" && <div>Interns View</div>}
          </div>
        </>
      ) : role === "intern" ? (
        <div>Intern View</div>
      ) : (
        <div id="login-error-message">
          Please login to get access to the dashboard!
        </div>
      )}
    </div>
  );
}

export default Dashboard;