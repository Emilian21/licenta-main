import React, { useState } from "react";
import "../App.css";
import supabase from "../supabase.js";
import { useNavigate } from "react-router-dom";

function Inregistrare() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(email) || !isValidPassword(password)) {
      alert("Completează ambele câmpuri cu date valide pentru a continua.");
    } else {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        console.log(data);
        if (data) {
          const { data: newEntry, error } = await supabase
            .from("profiles")
            .update({
              first_name: firstName,
              last_name: lastName,
            })
            .eq("id", data.user.id);

          console.log(newEntry, error);
        }
        setLoading(false);

        if (error) {
          alert("Înregistrarea a eșuat. Verificați datele introduse.");
        } else {
          alert(
            `Înregistrarea a fost realizată cu succes. Vă rugăm să accesati link-ul de confirmare trimis spre ${email}.`
          );
          navigate("/autentificare");
        }
      } catch (error) {
        console.error("Eroare la înregistrare:", error.message);
      }
    }
  }

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  return (
    <div className="container">
      <main className="aut">
        <ul>
          <li>
            <form className="form-fact" onSubmit={handleSubmit}>
              <input
                placeholder="Prenume"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Nume"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Introdu o adresă de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                style={{ marginTop: "15px" }}
                type="password"
                placeholder="Parola"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <a
                  className="register-link"
                  onClick={() => navigate("/autentificare")}
                >
                  Ai deja cont? Autentifică-te
                </a>
              </span>
              <button className="btn" disabled={loading}>
                Inregistrare
              </button>
            </form>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Inregistrare;
