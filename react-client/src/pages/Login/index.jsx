import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import './login.css';

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const [type, setType]=useState('password');
  	const [icon, setIcon]=useState(<VisibilityOffIcon/>);

	const handleToggle=()=>{    
		if(type==='password'){
		setIcon(<RemoveRedEyeIcon/>);      
		setType('text');
		}
		else{
		setIcon(<VisibilityOffIcon/>);     
		setType('password');
		}
	}

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			console.log(res)
			localStorage.setItem('user', JSON.stringify({email: res.data.email, name: res.data.name }));
			localStorage.setItem("token", res.token);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="register-wrapper">
			<div className="register">
				<div className="small-register">
					<form className="form-container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<div className='input-form'>
							<EmailIcon className='lock'/>
							<input
							autoComplete='off'
							placeholder="Email"
							type="email"
							name="email"
							id="email"
							onChange={handleChange}
							value={data.email}
						/>
						</div>
						<div className='input-form'>
							<LockIcon className="lock"/>
							<input
							placeholder="Password"
							type={type}
							name="password"
							id="password"
							onChange={handleChange}
							value={data.password}
							/>
							<span onClick={handleToggle}>{icon}</span>
						</div>
						{error && <div className="error">{error}</div>}
						<button type="submit" className="btn">
							Sing In
						</button>
					</form>
				</div>
				<div className="right-wrapper">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="btn">
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;