let dataContainer = document.querySelector(".data-container");
let formModal = document.createElement("form");
formModal.innerHTML = "";
document.body.appendChild(formModal);
//global users
let globalUsers = [],
  // selectedUser
  selectedUser = null;

const handleLoadUsers = async () => {
  try {
    let users = await getAll();

    if (!users) throw Error("No data available");
    globalUsers =users
    dataContainer.innerHTML = "";

    users.forEach((user, idx) => {
      let dataRow = document.createElement("tr");
      dataRow.className = `bg-gray-400 hover:bg-slate-200 hover:text-blue-800 py-2 mb-3 ${
        idx % 2 === 0 ? "bg-gray-600" : ""
      }`;
      dataRow.innerHTML = `
        <td class="border px-4 py-2">${1 + idx}</td>
        <td class="border px-4 py-2">${user.name}</td>
        <td class="border px-4 py-2">${user.age || 0}</td>
        <td class="border px-4 py-2">${user.isAdmin ? "YES" : "NO"}</td>
        <td class="border px-4 py-2">${user.hobbies.join(",")}</td>
        <td class="border px-4 py-2"><button data-id='${
          user._id
        }' class="update-button rounded-md bg-orange-500 px-4 py-1">Update</button></td>
        <td class="border px-4 py-2"><button data-id='${
          user._id
        }' class="delete-button rounded-md bg-red-500 px-4 py-1">Delete</button></td>
      `;
      dataContainer.appendChild(dataRow);
    });
  } catch (error) {
    console.log("An error has occurred: " + error.message);
  }
};

//AddUserhandler
const handleUserCreattion = async () => {
  //form creation
  formModal.innerHTML = "";

  let form = document.createElement("form");
  form.id = "user-form";
  formModal.className =
    "absolute w-full h-full z-1 top-0 left-0 flex items-center justify-center bg-slate-600/40";
  form.className =
    "bg-white rounded-lg shadow-md p-8 min-w-[400px] w-3/5 mx-auto relative";
  form.innerHTML = `
              
  <div>
    <button id="btn-close" class="text-red-500 absolute -top-5 -right-2 z-2 ">X</button>
  </div>

  <div class="mb-4">
    <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
    <input type="text" required id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
  </div>

  <div class="mb-4">
    <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
    <input type="email" required id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
  </div>


  <div class="mb-4">
    <label for="age" class="block text-gray-700 font-bold mb-2">Age</label>
    <input type="number" required id="age" name="age" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
  </div>

  <div class="mb-4">
    <label for="hobbies" class="block text-gray-700 font-bold mb-2">Hobbies</label>
    <input type="text" required id="hobbies" name="hobbies" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
  </div>

  <div class="flex justify-end">
    <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Submit</button>
  </div>

     
  `;

  //add for submit hanlser
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      name: formData.get("name"),
      age: formData.get("age"),
      email: formData.get("email"),
      hobbies: formData.get("hobbies"),
    };
    // form.reset();
    //post to the server
    try {
      let res = await postUser(user);
      if (!res) alert("An errror has ocuured!");
      alert(JSON.stringify(res));
      alert("User successulyy crewated!");
      // load users
      await handleLoadUsers();
      //close the form
      formModal.innerHTML = "";
    } catch (error) {
      alert("An error has occured! plz try again " + error.message);
    }
  });
  //close-btn hander
  let closeBtn = form.querySelector("#btn-close");
  closeBtn.addEventListener("click", () => {
    formModal.innerHTML = "";
  });
  formModal.appendChild(form);
  document.body.appendChild(formModal);
};

//AddUserhandler
const handleCreateUserUpdateForm = async (selectedUser) => {
  //form creation
  formModal.innerHTML = "";

  let form = document.createElement("form");
  formModal.className =
    "absolute w-full h-full z-1 top-0 left-0 flex items-center justify-center bg-slate-600/40";
  form.className =
    "bg-white rounded-lg shadow-md p-8 min-w-[400px] w-3/5 mx-auto relative";
  form.innerHTML = `
                
    <div>
      <button id="btn-close" class="text-red-500 absolute -top-5 -right-2 z-2 ">X</button>
    </div>
  
    <div class="mb-4">
      <label for="name"  class="block text-gray-700 font-bold mb-2">Name</label>
      <input type="text" value="${selectedUser.name||''}" required id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
    </div>
    
  
    <div class="mb-4">
      <label for="age" class="block text-gray-700 font-bold mb-2">Age</label>
      <input type="number" value="${selectedUser.age||0}" required id="age" name="age" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
    </div>
  
    <div class="mb-4">
      <label for="hobbies" class="block text-gray-700 font-bold mb-2">Hobbies</label>
      <input type="text" value="${selectedUser.hobbies.join(",")||''}" required id="hobbies" name="hobbies" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
    </div>
  
    <div class="flex justify-end">
      <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Submit</button>
    </div>
  
       
    `;

  //add for submit hanlser
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      name: formData.get("name"),
      age: formData.get("age"),
    //   email: formData.get("email"),
      hobbies: formData.get("hobbies"),
    };
    // form.reset();
    //post to the server
    try {
      let res = await updateUser(selectedUser._id, user);
      if (!res) alert("An errror has ocuured!");
      alert(JSON.stringify(res));
      alert("User successulyy updated!");
      // load users
      await handleLoadUsers();
      //close the form
      formModal.innerHTML = "";
    } catch (error) {
      alert("An error has occured! plz try again " + error.message);
    }
  });
  //close-btn hander
  let closeBtn = form.querySelector("#btn-close");
  closeBtn.addEventListener("click", () => {
    formModal.innerHTML = "";
  });
  formModal.appendChild(form);
  document.body.appendChild(formModal);
};

//addUserBtn
const createAddUserBtn = async () => {
  //btn
  //   dataContainer.className = dataContainer.className || "" + " relative mx-20";
  const btnContainer = document.querySelector("#add-user-btn-container");
  let addUserBtn = document.createElement("button");
  addUserBtn.textContent = "Add User";
  addUserBtn.className =
    "rounded-lg px-4 py-2 bg-green-500 text-white rouded-lg font-bold text-center";
  addUserBtn.addEventListener("click", () => {
    handleUserCreattion();
  });
  btnContainer.appendChild(addUserBtn);
};

const handleDeleteAndUiUpdate = async () => {
  document.querySelectorAll(".delete-button").forEach(async (btn) => {
    btn.addEventListener("click", async (e) => {
      try {
        await DeleteById(e.target.getAttribute("data-id"));
        alert("User Successsully deleted!");
        await handleLoadUsers();
      } catch (error) {
        alert("Delete operation failed! Please try again");
      }
    });
  });
};


// update user

const handleUiUpdate = async () => {
    document.querySelectorAll(".update-button").forEach(async (btn) => {
      btn.addEventListener("click", async (e) => {
        let id = e.target.getAttribute("data-id"),
        user = globalUsers.find(usr=>usr._id ===id) || null

        if(!user) return
        await handleCreateUserUpdateForm(user)

        //   create form
      });
    });
  };
  





document.addEventListener("DOMContentLoaded", async () => {
  //Assign handlseers to buttons
  await handleLoadUsers();
  //delete event listenter
  await handleDeleteAndUiUpdate();

  // user creation
  await createAddUserBtn();

    //update event listenter
    await handleUiUpdate();

  //add event handeler for form submission
//   await handleFormSubmission();
});
