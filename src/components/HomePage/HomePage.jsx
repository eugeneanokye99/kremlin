// HomePage.js
import { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout, storage } from "../../../backend/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './HomePage.css';

function HomePage() {
  const [pname, setPname] = useState("");
  const [age, setAge] = useState("");
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const fetchUserName = async () => {
    try {
      if (!user) return;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
      });
    } catch (err) {
      console.error(err);
     // alert("An error occurred while fetching user data: " + err.message);
    }
  };
  

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);


  const handleUpload = async (event) => {
    try {
      if (!user) return; // Ensure user is logged in

      const file = event.target.files[0]; // Get the uploaded file
      const storageRef = storage.ref(); // Reference to the root of Firebase Storage

      const fileRef = storageRef.child(file.name); // Create a reference to the file
      await fileRef.put(file); // Upload the file to Firebase Storage

      console.log("File uploaded successfully!");
      // You can add additional logic here, like updating the user's profile with the uploaded file URL
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (
    <div className="dashboard">
        <div className="flex justify-between items-center my-1 text-[30px]">
          <div>Welcome, Prince</div>
          {/* <div>{user?.email}</div> */}


          <div className="menu">
            <button onClick={logout}>Logout</button>
          </div>
        </div>

      <div className="dashboard__container">
        <div className="mt-10">
          <h1 className="text-[40px] text-center">User Information</h1>

          <input
              type="text"
              className="patient__textBox"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
              placeholder="Full Name"
            />


          <input
            type="number"
            className="patient__textBox"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />

         <Link to="/scan">
            <button className="w-60 h-15 text-[30px] ml-14 mt-20 bg-zinc-800 text-white">
              Scan
            </button>
          </Link>

          <h2 className="or">or</h2>


        {/* Input element for file upload */}
         <input
          type="file"
          accept="image/*" // Specify the file types you want to allow for upload
          onChange={handleUpload}
          style={{ display: "none" }} // Hide the input visually
          ref={fileInputRef} // Ref to the file input element**
        />
        <button 
        className="w-60 h-15 text-[30px] ml-14 mt-10 bg-zinc-800 text-white"
        onClick={() => fileInputRef.current.click()}
        >
          Upload File
        </button>

        </div>

      </div>
    </div>
  );
}

export default HomePage;
