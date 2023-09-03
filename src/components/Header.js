import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/joy/IconButton";
import { BiLogOut } from "react-icons/bi";
import supabase from "../supabase";

function Header({ showForm, setShowForm }) {
  const navigate = useNavigate();
  const location = useLocation();
  const appTitle = "Verson";

  const currentPath = location.pathname;
  const isInAuth =
    currentPath === "/autentificare" || currentPath === "/inregistrare";
  const isProfilePage = currentPath === "/profil";

  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("account");
    navigate("/autentificare");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./logo.png" height="68" width="68" alt="Verson" />
        <h1>{appTitle}</h1>
      </div>

      {!isInAuth && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {isProfilePage ? (
            <button
              className="btn btn-large btn-open"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          ) : (
            <button
              className="btn btn-large btn-open"
              onClick={() => setShowForm((show) => !show)}
            >
              {showForm ? "Close" : "Share a fact"}
            </button>
          )}

          <button
            className="btn btn-large btn-open"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/profil")}
          >
            Account
          </button>

          <IconButton
            sx={{
              marginLeft: "10px",
              color: "#fff",
              fontSize: "50px",
              "&:hover": {
                backgroundColor: "#413b3a",
              },
            }}
            onClick={handleLogout}
          >
            <BiLogOut />
          </IconButton>
        </div>
      )}
    </header>
  );
}

export default Header;
