const Motif = () => {
  return (
    <select name="motifQualification" required defaultValue={"A"}>
      <option value="A">Academique</option>
      <option value="C">Accès à la citoyenneté canadienne</option>
      <option value="D">Forces canadiennes</option>
      <option value="E">Etudes en France</option>
      <option value="F">Immigration au Canada</option>
      <option value="I">Intégration</option>
      <option value="N">Accès à la nationalité française</option>
      <option value="P">Professionnelle</option>
      <option value="Q">Immigration au québec</option>
      <option value="R">Carte de Résident</option>
      <option value="X">Individuelle</option>
    </select>
  );
};

export default Motif;
