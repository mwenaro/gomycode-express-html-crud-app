//path
const path = "http://localhost:5000/users";
const headers = {
  "Content-Type": "application/json",
};
//API 
const postUser = async (user) => await (await fetch(path, {method:"POST", body:JSON.stringify(user), headers})).json();
const updateUser = async (id,data) => await (await fetch(`${path}/${id}`, {method:"PUT", body:JSON.stringify(data), headers})).json();
const getAll = async () => await (await fetch(path)).json();
const getById = async (id) => await (await fetch(`${path}/${id}`)).json();
const DeleteById = async (id) =>
  await (
    await fetch(`${path}/${id}`, { method: "DELETE", headers })
  ).json();
