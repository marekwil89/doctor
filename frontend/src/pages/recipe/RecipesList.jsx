import React, { useState, useEffect, useContext } from 'react';
import { __RouterContext } from 'react-router-dom';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { ContextError } from '../../contexts/ContextErrorProvider';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import recipe from '../../assets/icons/recept.png';
import { Modal } from '../../components/Modal';
import { RecipeDetail } from './RecipeDetail';
import { ContextUser } from '../../contexts/ContextUserProvider';
import { Permission } from '../../components/Permission';

export const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const { refresh } = useContext(ContextRefresh);
  const { setError } = useContext(ContextError);
  const { history } = useContext(__RouterContext);
  const { user } = useContext(ContextUser);

  const getRecipes = async () => {
    const pathname = await history.location.pathname;
    const patientId = await pathname.substr(pathname.length - 1);
    const userType = await user && user.admin === true ? 'admin' : 'doctor';

    const recipesData = userType && patientId && await fetch(`${server.host}${server.port}/${userType}/recipe/${patientId}`, setMethod('GET'));

    try {
      const recipes = await recipesData.json();

      if (recipes.errors) return setError(recipes.errors);

      setRecipes(recipes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [refresh]);

  return (
    <div className="list-recipe">
      <div className="col-md-12">
        {recipes && recipes.length ? recipes.map(elem => (
          <div key={elem.id} className="recipe-box">
            <div className="recipe-name mr-auto">
              <span><img src={recipe}/>{elem.name}</span>
            </div>
            <div className="recipe-action">
              <Permission required="doctor">
                <Modal btnName="POKAŻ" btnVariant="transparent" btnSize="small" title="Szczegóły Recepty">
                  <RecipeDetail {...elem}/>
                </Modal>
              </Permission>
            </div>
          </div>
        )) : (
          <div className="alert alert-danger new p-4 w-100">
            <strong>Brak recept</strong>
          </div>
        )}
      </div>
    </div>
  );
};
