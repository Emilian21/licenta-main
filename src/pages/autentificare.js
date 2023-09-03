import React, { useState } from "react";
import "../App.css";
import supabase from "../supabase.js";
import { useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log("Email:", email);
    // console.log("Password:", password);

    if (!isValidEmail(email) || !isValidPassword(password)) {
      alert("Completează ambele câmpuri cu date valide pentru a continua.");
    } else {
      try {
        console.log("Trying to sign in...");

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        const { user } = data;

        if (error) {
          alert("Autentificarea a eșuat. Verificați datele introduse.");
        } else {
          alert(
            `Bun venit, ${user.email}! Autentificarea a fost realizată cu succes.`
          );
          localStorage.setItem("account", JSON.stringify(user));

          navigate("/");
        }
      } catch (error) {
        console.error("Eroare la autentificare:", error);
      }
    }
  }

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <main className="aut">
        <ul>
          <li>
            <form className="form-fact" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Introdu o adresă de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Parola"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <a
                  className="register-link"
                  onClick={() => navigate("/inregistrare")}
                >
                  Nu ai cont? Înregistrează-te!
                </a>
              </span>
              <button className="btn" disabled={loading}>
                Autentificare
              </button>
            </form>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
