import { useEffect, useState } from "react";
import supabase from "../supabase";
import "../style.css";

import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader";
import FactList from "../components/facts/FactList";
import NewFactForm from "../components/facts/NewFactForm";
import { useNavigate } from "react-router-dom";

const Home = ({ showForm, setShowForm }) => {
  const [facts, setFacts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [CurrentCategory, setCurrentCategory] = useState("all");
  const [isRegistrationPageActive, setIsRegistrationPageActive] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    const isLoggedIn = account?.aud === "authenticated";

    if (!isLoggedIn) {
      navigate("/autentificare");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");

      if (CurrentCategory !== "all")
        query = query.eq("category", CurrentCategory);

      const { data: facts, error } = await query.limit(1000);

      if (!error) setFacts(facts);
      else alert("Exista o problema la data de baze");
      setIsLoading(false);
    }
    getFacts();
  }, [CurrentCategory, refresh]);
  return (
    <div
      className={`home-content ${
        isRegistrationPageActive ? "hide-on-registration" : ""
      }`}
    >
      {showForm && (
        <NewFactForm setRefresh={setRefresh} setShowForm={setShowForm} />
      )}
      <main
        className={`main ${
          isRegistrationPageActive ? "hide-on-registration" : ""
        }`}
      >
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </div>
  );
};

export default Home;
