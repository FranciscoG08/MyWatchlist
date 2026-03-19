import api from './api.js'

//Login
export const login = async(email,password)=>{
    const res = await api.post("/auth/login",{email,password});
    const token = res.data.data.token;
    localStorage.setItem("token",token)

    return res.data;
}

//Register
export const register = async(email,password)=>{
    const res = await api.post("/auth/register",{email,password});
    const token = res.data.data.token;
    localStorage.setItem("token",token)

    return res.data;
}

//Logout
export const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token");
    navigate("/login");
  } catch (err) {
    console.error(err);
  }
};