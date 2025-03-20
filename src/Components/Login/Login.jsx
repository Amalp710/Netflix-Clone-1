import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../Firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

function Login() {
  // State to manage whether the form is in 'Sign In' or 'Sign Up' mode
  const [signState, setSignState] = useState('Sign In');
  
  // State variables to store user input
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State to track loading state when performing authentication
  const [loading, setLoading] = useState(false);

  // Function to handle user authentication (Sign In / Sign Up)
  const user_auth = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Show loading spinner

    if (signState === "Sign In") {
      // Call login function with email and password
      await login(email, password);
    } else {
      // Call signup function with name, email, and password
      await signup(name, email, password);
    }

    setLoading(false); // Hide loading spinner
  };

  return (
    // Show loading spinner if authentication is in progress
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='login'>
        {/* Netflix Logo */}
        <img className='login-logo' src={logo} alt="Netflix Logo" />

        {/* Login Form */}
        <div className='login-form'>
          <h1>{signState}</h1>
          <form>
            {/* Show name input only if user is signing up */}
            {signState === "Sign Up" && (
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type="text" 
                placeholder='Your name' 
              />
            )}
            
            {/* Email Input */}
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder='Email' 
            /><br />
            
            {/* Password Input */}
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder='Password' 
            />

            {/* Submit Button */}
            <button onClick={user_auth} type='submit'>{signState}</button>

            {/* Form Help Section */}
            <div className='form-help'>
              <div className='remember'>
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          {/* Toggle Between Sign In and Sign Up */}
          <div className='form-switch'>
            {signState === "Sign In" ? (
              <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Login;
