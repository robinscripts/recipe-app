import { useEffect, useState } from "react";
import { getRecipeSummary } from "../api";

const RecipeModal = ({ recipeId, onClick }) => {
  const [recipeSummary, setRecipeSummary] = useState();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const x = await getRecipeSummary(recipeId);
        setRecipeSummary(x);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSummary();
  },[recipeId]);


  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary?.title}</h2>
            <span className="close-btn" onClick={onClick}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }}></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
