import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";


function LogIn() {
  const navigate = useNavigate();

  async function submitLogIn(event) {
    event.preventDefault();
    console.log(event);
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    console.log(username, password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    console.log(data, error);

    sessionStorage.setItem("userInfo", data.user)
    navigate("/")
  }

  return (
    <>
      <h4 className="text-center m-5">
        Login Here, or if you need, you can sign up on the right
      </h4>
      <hr />
      <div className="row align-items-center">
        <div className="col-6 d-flex justify-content-center">
          <form onSubmit={submitLogIn}>
            <br />
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="email@example.com" />
            <br /><br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
            <br /><br />
            <input type="submit" value="Sign In"/>
          </form>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <form>
            <br />
            <label htmlFor="createUsername">Username:</label>
            <input type="text" id="createUsername" />
            <br /><br />
            <label htmlFor="registerEmail">Email:</label>
            <input type="text" id="registerEmail" placeholder="email@example.com" />
            <br /><br />
            <label htmlFor="registerPassword">Password:</label>
            <input type="password" name="registerPassword" id="registerPassword" />
            <br /><br />
            <label htmlFor="confirm">Confirm Password:</label>
            <input type="password" name="confirm" id="confirm" />
            <br /><br />
            <input type="submit" value="Register" />
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
