import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../../backend/firebase";
import { toast, Toaster } from "react-hot-toast";
import "./Register.css";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const register = async () => {
		if (!name) {
			// alert("Please enter name");
			toast.error("Please enter name");
			return;
		}
		await registerWithEmailAndPassword(name, email, password);
	};

	useEffect(() => {
		if (loading) return;
	}, [user, loading]);

	return (
		<>
			<Toaster />
			<div className="register">
				<div className="register__container">
					<input
						type="text"
						className="register__textBox"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Full Name"
					/>
					<input
						type="text"
						className="register__textBox"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail Address"
					/>
					<input
						type="password"
						className="register__textBox"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
					<button className="register__btn" onClick={register}>
						Register
					</button>
					<div className="text__color">
						Already have an account? <Link to="/">Login</Link> now.
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
