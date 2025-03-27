import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListSuccess, addProject, deleteProject, updateProject } from "../../Redux/Slices/Projects/ProjectsSlice";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [MenuId, SetmenuId] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectTitle, setEditProjectTitle] = useState("");
  const [search, setSearch] = useState("");
  const projects = useSelector((state) => state.projectSliceReducer.projectdetailsSlice.projects || []);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    dispatch(projectListSuccess(storedProjects));
  }, [dispatch]);

  const handleAddProject = () => {
    if (newProjectTitle) {
      const newProject = { id: Date.now(), title: newProjectTitle };
      dispatch(addProject(newProject));
      setNewProjectTitle("");
      setIsOpen(false);
    }
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
    SetmenuId(null);
  };

  const handleEditProject = (project) => {
    setEditProjectId(project.id);
    setEditProjectTitle(project.title);
    SetmenuId(null);
  };

  const handleUpdateProject = () => {
    if (editProjectTitle) {
      dispatch(updateProject({ id: editProjectId, newTitle: editProjectTitle }));
      setEditProjectId(null);
      setEditProjectTitle("");
    }
  };


  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen p-6 bg-slate-900">
      <section className="mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search all projects"
            className="w-full max-w-md px-4 py-2 rounded-md text-white bg-slate-900 border border-gray-700"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-700 flex gap-1 text-white px-4 py-2 rounded-md"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" /></svg>
            </div>
            <p className="font-semibold">New Project</p>
          </button>
        </div>

        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-gray-700 rounded-lg text-white flex justify-between items-center"
              >
                <div className="flex justify-between items-center w-full">
                  <button
                    className="font-semibold hover:underline"
                    onClick={() => navigate(`/issuelist/${project.id}`)}
                  >
                    {project.title}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => SetmenuId(MenuId === project.id ? null : project.id)}
                      className="hover:bg-gray-700 px-2 py-1 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 512 512">
                        <path fill="currentColor" fillRule="evenodd" d="M117.333 256c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32m341.333 0c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32M288 256c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32"/>
                      </svg>
                    </button>

                    {MenuId === project.id && (
                      <div className="absolute z-10 left-2 right-0 mt-1 w-40 border border-gray-700 bg-gray-800 text-white shadow-lg rounded-lg py-[6px]">
                        <button
                          className="flex items-center space-x-2 px-2 py-1 text-white w-full hover:bg-gray-700"
                          onClick={() => handleEditProject(project)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></g></svg>
                          <p>Edit</p>
                        </button>

                        <button
                          className="flex items-center space-x-1 px-2 py-1 text-white w-full"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                              d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
                          </svg>
                          <p>Remove project</p>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No projects found.</p>
          )}
        </div>



        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
              <input
                type="text"
                placeholder="Enter project title"
                className="w-full border p-2 rounded mb-4"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
              <button
                onClick={handleAddProject}
                className="w-full bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Create Project
              </button>
            </div>
          </div>
        )}






        {editProjectId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
              <button
                onClick={() => setEditProjectId(null)}
                className="absolute top-2 right-2 text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold mb-4">Edit Project</h2>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={editProjectTitle}
                onChange={(e) => setEditProjectTitle(e.target.value)}
              />
              <button
                onClick={handleUpdateProject}
                className="w-full bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Update Project Title
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;