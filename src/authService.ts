class AuthService {
  isAuthenticated: boolean = false

  check = () => {
    return fetch(`http://localhost:9000/users/me?access_token=${localStorage.getItem('token')}`)
      .then(() => {
        this.isAuthenticated = true;
      })
      .catch(() => {
        this.isAuthenticated = false;
      })
  }

  login = response => {
    console.log(response);
    return fetch("http://localhost:9000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          access_token: response.accessToken
        })
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        this.isAuthenticated = true;
      })
      .catch((err) => {
        console.log(err);
        this.isAuthenticated = false;
      })
  }

  signout = () => {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}

export default new AuthService();