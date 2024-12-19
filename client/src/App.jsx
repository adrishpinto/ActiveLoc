import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
const App = () => {
  const [projects, setProjects] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const deleteProject = async (projectId) => {
    try {
      const response = await axios.delete(`${URL}/${projectId}`);
      console.log(response.data);
      getData();
    } catch (error) {
      console.error("Error::", error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${URL}`, {
        headers: {
          Authorization: 1234,
        },
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Error:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  const openEdit = (project) => {
    setCurrentProject(project);
    setShowEdit(true);
  };

  return (
    <div>
      <h1 className="text-5xl font-400 text-center mt-12 font-[200]">
        Admin Table
      </h1>
      <div className="mx-auto">
        <div className="w-full mt-4 mx-auto mb-10">
          <div className="flex flex-row w-fit bg-gray-800 text-white py-3 mx-auto">
            <div className="w-40 text-2xl text-center font-semibold">ID</div>
            <div className="text-2xl w-72 text-center font-semibold">
              Project Name
            </div>
            <div className="text-2xl w-72 text-center font-semibold">
              Client Name
            </div>
            <div className="text-2xl w-72 text-center font-semibold">
              Deadline
            </div>
            <div className="text-2xl w-40 text-center font-semibold">
              Modify
            </div>
            <div className="text-2xl w-40 text-center font-semibold">
              Delete
            </div>
          </div>

          {projects.map((project, index) => (
            <Item
              key={project._id}
              project={project}
              index={index}
              setProjects={setProjects}
              deleteProject={deleteProject}
              openEdit={openEdit}
            />
          ))}
        </div>

        <div
          className="text-xl py-2 px-3 bg-slate-700 rounded-lg mx-auto cursor-pointer hover:bg-slate-600 text-white w-fit"
          onClick={toggleAdd}
        >
          Add Project
        </div>
      </div>

      {showAdd && <Add setShow={setShowAdd} getData={getData} />}
      {showEdit && (
        <Edit
          setShow={setShowEdit}
          getData={getData}
          project={currentProject}
        />
      )}
    </div>
  );
};

const Item = ({ project, index, deleteProject, openEdit }) => {
  return (
    <div
      className={`flex flex-row w-fit bg-white-800 py-2 mx-auto ${
        index % 2 == 0 ? "bg-slate-100" : "bg-[#e9eef5]"
      }`}
    >
      <div className="w-40 text-[22px] text-center">{index + 1}</div>
      <div className="text-[22px] w-72 text-center">{project.project_name}</div>
      <div className="text-[22px] w-72 text-center">{project.client_name}</div>
      <div className="text-[22px] w-72 text-center">{project.deadline}</div>
      <div className="text-[22px] w-40 text-center">
        <p
          className="text-white bg-blue-500 w-fit mx-auto px-2 cursor-pointer text-[18px] rounded-lg hover:bg-blue-600"
          onClick={() => openEdit(project)}
        >
          edit
        </p>
      </div>
      <div className="text-[22px] w-40 text-center">
        <p
          className="cursor-pointer w-fit mx-auto px-2 hover:opacity-65"
          onClick={() => deleteProject(project._id)}
        >
          <FaTrashAlt />
        </p>
      </div>
    </div>
  );
};

const Add = ({ setShow, getData }) => {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const addProject = async () => {
    if (!projectName || !clientName || !deadline) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post(`${URL}`, {
        project_name: projectName,
        client_name: clientName,
        deadline: deadline,
      });

      setShow(false);
      getData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl mb-4">Add New Project</h2>

        <div className="mb-4">
          <label className="block text-lg mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb">Deadline (in days)</label>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {error ? (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        ) : (
          <p className="text-white text-sm mb-2">..</p>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

const Edit = ({ setShow, getData, project }) => {
  const [projectName, setProjectName] = useState(project.project_name);
  const [clientName, setClientName] = useState(project.client_name);
  const [deadline, setDeadline] = useState(project.deadline);
  const [error, setError] = useState("");

  const updateProject = async () => {
    if (!projectName || !clientName || !deadline) {
      setError("All fields are required.");
      return;
    }

    try {
      setShow(false);
      const res = await axios.put(`${URL}/${project._id}`, {
        project_name: projectName,
        client_name: clientName,
        deadline: deadline,
      });

      getData();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [updateProject]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl mb-4">Edit Project</h2>

        <div className="mb-4">
          <label className="block text-lg mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Deadline (in days)</label>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {error ? (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        ) : (
          <p className="text-white text-sm mb-2">..</p>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            onClick={updateProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Update Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
