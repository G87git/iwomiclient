import React from "react";
import PostData from "../../model/PostData";
import FieldSet from "../fieldset";
import Tooltip from "react-tooltip-lite";
import { useCtx } from "../../context/lang-store";

export const Tab1 = ({
  handleDispatch,
  handleStepDispatch,
  anomalie,
  metiers,
  errorCategory,
  profilesData,
}) => {
  const {
    libelleAnormalie,
    descriptionAnormalie,
    categorie,
    controlleurAnormalie,
    comptableAnormale,
    metierAnormalie,
  } = anomalie || {};
  const { languageData } = useCtx();
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleDispatch({ [name]: value });
  };

  function handleMetierChange({ target: { name, value } }) {
    PostData(
      { method: "get", url: `/getProfilesbyMetier/${value}`, body: {} },
      (res) => {
        if (res !== "Error") {
          const profileSelect = res.data.map((elm) => ({
            label: elm.name,
            value: elm.acscd,
          }));
          handleStepDispatch({
            profileSelect,
            anomalie: { ...anomalie, [name]: value },
          });
        }
      }
    );

    PostData(
      {
        method: "post",
        url: "/getUsersByMetier",
        body: { cetab: localStorage.getItem("cetab"), code: value },
      },
      (res) => {
        if (res !== "Error") {
          const userSelect = res.data.map((elm) => ({
            label: elm.name,
            value: elm.id,
          }));
          const userSelectID = res.data.map((elm) => ({
            label: elm.name,
            value: elm.id,
          }));
          handleStepDispatch({
            userSelect,
            userSelectID,
            anomalie: { ...anomalie, [name]: value },
          });
        }
      }
    );
  }
  return (
    <div className="tab-content py-4 text-muted">
      <div className="tab-pane active" id="home1" role="tabpanel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
              <FieldSet
                legend={languageData.p_anom.config.addconfig.gene.anoma.title}
              >
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row mb-4">
                        <label
                          htmlFor="horizontal-email-input"
                          className="col-sm-4 col-form-label"
                        >
                          {
                            languageData.p_anom.config.addconfig.gene.anoma
                              .n_anom
                          }
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="horizontal-email-input"
                            name="libelleAnormalie"
                            onChange={handleChange}
                            value={libelleAnormalie}
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label
                          htmlFor="projectdesc"
                          className="col-sm-4 col-form-label"
                        >
                          {
                            languageData.p_anom.config.addconfig.gene.anoma
                              .d_anom
                          }
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            className="form-control"
                            id="projectdesc"
                            rows="1"
                            placeholder="Description..."
                            name="descriptionAnormalie"
                            onChange={handleChange}
                            value={descriptionAnormalie}
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label
                          htmlFor="projectdesc"
                          className="col-sm-4 col-form-label"
                        >
                          <Tooltip content="Catégorie de l'anomalie">
                            {
                              languageData.p_anom.config.addconfig.gene.anoma
                                .cat
                            }
                          </Tooltip>
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-select"
                            name="categorie"
                            onChange={handleChange}
                            value={categorie}
                          >
                            <option>
                              {
                                languageData.p_anom.config.addconfig.gene.anoma
                                  .select_cat
                              }
                            </option>
                            {errorCategory &&
                              errorCategory.map((category, index) => (
                                <option value={category.value} key={index}>
                                  {category.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </FieldSet>
            </div>
            <div className="col-xl-6">
              <FieldSet
                legend={languageData.p_anom.config.addconfig.gene.profil.title}
              >
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row mb-4">
                        <label
                          htmlFor="horizontal-firstname-input"
                          className="col-sm-4 col-form-label"
                        >
                          {
                            languageData.p_anom.config.addconfig.gene.profil
                              .cont
                          }
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-select"
                            name="controlleurAnormalie"
                            onChange={handleChange}
                            value={controlleurAnormalie}
                          >
                            <option>
                              {
                                languageData.p_anom.config.addconfig.gene.profil
                                  .select_cont
                              }
                            </option>
                            {profilesData &&
                              profilesData.map((profile, i) => (
                                <option key={i} value={profile.value}>
                                  {profile.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label
                          htmlFor="horizontal-email-input"
                          className="col-sm-4 col-form-label"
                        >
                          {
                            languageData.p_anom.config.addconfig.gene.profil
                              .compt
                          }
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-select"
                            name="comptableAnormale"
                            value={comptableAnormale}
                            onChange={handleChange}
                          >
                            <option>
                              {
                                languageData.p_anom.config.addconfig.gene.profil
                                  .select_compt
                              }
                            </option>
                            {profilesData &&
                              profilesData.map((profile, i) => (
                                <option key={i} value={profile.value}>
                                  {profile.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label
                          htmlFor="projectdesc"
                          className="col-sm-4 col-form-label"
                        >
                          {languageData.p_anom.config.addconfig.gene.profil.met}
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-select"
                            name="metierAnormalie"
                            value={metierAnormalie}
                            onChange={handleMetierChange}
                          >
                            <option>
                              {
                                languageData.p_anom.config.addconfig.gene.profil
                                  .select_met
                              }
                            </option>
                            {metiers &&
                              metiers.map((profile, i) => (
                                <option key={i} value={profile.value}>
                                  {profile.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </FieldSet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
