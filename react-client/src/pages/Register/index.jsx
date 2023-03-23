import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './register.css';

const Signup = () => {
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: '',
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

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
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res);
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
		<div className="signup-wrapper">
			<div className="small-container">
				<div className="left-container">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="btn">
							Sing in
						</button>
					</Link>
				</div>
				<div className="right-container">
					<form className="form-container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<div className="input-form">
							<PersonIcon className="lock"/>
							<input
								type="text"
								name="name"
								placeholder="Name"
								onChange={handleChange}
								value={data.name}
								required={true}
							/>
						</div>
						<div className='input-form'>
							<EmailIcon className="lock"/>
							<input
								placeholder="Email"
								type="email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
							/>
						</div>
						<div className='input-form'>
							<LockIcon className='lock'/>
							<input
								placeholder="Enter Your Password"
								type={type}
								name="password"
								onChange={handleChange}
								value={data.password}	
								min={6}
								required
							/>
							<span onClick={handleToggle}>{icon}</span>
						</div>
						<div className='input-form'>
							<LockIcon className='lock'/>
							<input
								placeholder="Enter Your  ConfirmPassword"
								type={type}
								name="password_confirmation"
								onChange={handleChange}
								value={data.password_confirmation}	
								min={6}
								required
							/>
							<span onClick={handleToggle}>{icon}</span>
						</div>
						{error && <div className="error">{error}</div>}
						<button type="submit" className="btn">
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;