export function formatCasSoumis(cas) {
  return cas.map((element) => {
    return {
      id: element.id,
      nom: element.nomEmission,
      
 
    };
  });
}
export function formatVbg(vbg) {
  return vbg.map((element) => {
    return {
      id: element.id,
      nom: element.nom,
      description: element.description,
    };
  });
}

export function groupeByAttribut(data, attribut) {
  const dataGrouped = {};
  for (const element of data) {
    if (element.hasOwnProperty(attribut)) {
      if (!dataGrouped.hasOwnProperty(element[attribut])) {
        dataGrouped[element[attribut]] = [];
      }
      dataGrouped[element[attribut]].push(element);
    }
  }
  return dataGrouped;
}

export function groupeByYear(data, attribut_timestamp) {
  const dataGrouped = {};
  for (const element of data) {
    if (element.hasOwnProperty(attribut_timestamp)) {
      let year = new Date(element.attribut_timestamp).getFullYear();
      if (!dataGrouped.hasOwnProperty(year)) {
        dataGrouped[year] = [];
      }
      dataGrouped[year].push(element);
    }
  }
  return dataGrouped;
}

export function groupByMonth(data, attr, year = null) {
  const current_date = new Date();
  const months = ["Janvier","Février","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]

  const dataGrouped = [];
  for (let index = 0; index < current_date.getMonth() + 1; index++) {
    dataGrouped[months[index]] = data.filter((element) => {
      return new Date(element[attr]).getMonth() == index;
    });
  }
  return dataGrouped;
}
export function groupVbgByMonth(vbg, year = null) {
  vbg = formatVbg(vbg);
  const current_date = new Date();
  const dataGrouped = [];
  for (let index = 0; index < current_date.getMonth() + 1; index++) {
    dataGrouped[index] = vbg.filter((element) => {
      return new Date(element.dateSoumition).getMonth() == index;
    });
  }
  return dataGrouped;
}
export function filtrerByPeriode(data,periode1,periode2){
  periode1 = new Date(periode1)
  periode2 = new Date(periode2)
  return data.filter(function(d){
    return (new Date(d.date.dateSoumition) >= periode1 && new Date(d.date.dateSoumition) <= periode2)
  })

}