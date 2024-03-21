import axios from "axios";

export const SigninUser = async (user: { email: string; password: string }) => {
  const { email, password } = user;
  try {
    const response = await axios.post("https://reqres.in/api/login", {
      email,
      password,
    });
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
