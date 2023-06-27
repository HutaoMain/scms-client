import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <section className="login-header">
        <h1>Sign in to your Account</h1>
      </section>
      <div className="login-logo"></div>
      <div className="login-title">
        <h1>Welcome to ZAB Digital Prints</h1>
      </div>
      <div className="login-form">
        <form>
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="button-group">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
