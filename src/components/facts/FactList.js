import { useEffect, useState } from "react";
import Fact from "./Fact";
import { ROLES } from "../../constants";
import supabase from "../../supabase";
import Loader from "../Loader";

function FactList({ facts, setFacts }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getProfile() {
    const account = JSON.parse(localStorage.getItem("account"));
    if (!account) return false;

    const { data } = await supabase.from("profiles").select("*").eq("id", account.id).single();

    return data.role === ROLES.ADMIN;
  }

  useEffect(() => {
    getProfile().then((res) => {
      setIsAdmin(res);
      setLoading(false);
    });
  }, []);

  if (facts.length === 0 && !loading)
    return <p className="message">No facts for this category yet! Create the first one ✌️</p>;

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <ul className="facts-list">
          {facts.map((fact, index) => (
            <Fact key={`${fact.id}-${index}`} fact={fact} setFacts={setFacts} isAdmin={isAdmin} />
          ))}
        </ul>
      )}
      {!loading && <p>There are {facts.length} facts in the database. Add your own!</p>}
    </section>
  );
}

export default FactList;
