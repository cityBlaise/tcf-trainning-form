import { FC } from "react";

const Sex: FC = () => {
  return (
    <select name="utilisateur[sexe]" defaultValue={"masculin"}>
      <option value="masculin">homme</option>
      <option value="feminin">femme</option>
      <option value="non binaire">non binaire</option>
    </select>
  );
};

export default Sex;
