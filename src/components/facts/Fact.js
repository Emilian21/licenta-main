import { useState } from "react";
import supabase from "../../supabase";
import { CATEGORIES } from "../../constants";
import IconButton from "@mui/joy/IconButton";
import { IoCloseCircleOutline } from "react-icons/io5";

function Fact({ fact, setFacts, isAdmin }) {
  const [isUpdating, setIsUpdating] = useState(false);
  //   const isDisputed = fact.voteinteresting + fact.votesMindBlowing < fact.votesFalse;
  const account = JSON.parse(localStorage.getItem("account"));

  async function handleVote(columnName) {
    setIsUpdating(true);

    if (fact[columnName]?.includes(account.email)) {
      const { data: updatedFact, error } = await supabase
        .from("facts")
        .update({
          [columnName]: fact[columnName].filter((email) => email !== account.email),
        })
        .eq("id", fact.id)
        .select();

      setIsUpdating(false);
      if (!error) setFacts((facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)));

      return;
    }

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({
        [columnName]: fact[columnName] ? [...fact[columnName], account.email] : [account.email],
      })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error) setFacts((facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)));
  }

  const handleDelete = async () => {
    console.log(fact.id);
    const { data, error } = await supabase.from("facts").delete().eq("id", fact.id);

    console.log(data);
    if (!error) setFacts((facts) => facts.filter((f) => f.id !== fact.id));
  };

  const isInteresting = fact.interesting?.includes(account.email);
  const isMindBlowing = fact.mind_blowing?.includes(account.email);
  const isFalse = fact.false?.includes(account.email);

  return (
    <>
      <li className="fact">
        {isAdmin && (
          <IconButton
            className="delete-button"
            sx={{
              // make it at the top of the right corner of the element

              marginLeft: "10px",
              color: "#fff",
              fontSize: "50px",
              "&:hover": {
                backgroundColor: "#413b3a",
              },
            }}
            onClick={handleDelete}
          >
            <IoCloseCircleOutline />
          </IconButton>
        )}

        <p>
          {/* {isDisputed ? <span className="disputed">[⛔️]</span> : null} */}
          {fact.text}
          <a className="source" href={fact.source} target="_blank">
            (Source)
          </a>
        </p>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)?.color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button
            className={isInteresting ? "voted" : ""}
            onClick={() => handleVote("interesting")}
          >
            👍 {fact.interesting?.length ?? 0}
          </button>
          <button
            className={isMindBlowing ? "voted" : ""}
            onClick={() => handleVote("mind_blowing")}
          >
            🤯 {fact.mind_blowing?.length ?? 0}
          </button>
          <button className={isFalse ? "voted" : ""} onClick={() => handleVote("false")}>
            ⛔️ {fact.false?.length ?? 0}
          </button>
        </div>
      </li>
    </>
  );
}

export default Fact;
