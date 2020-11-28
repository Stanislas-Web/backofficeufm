export function formatCasSoumis(cas) {
  return cas.map((element) => {
    return {
      id: element._id,
      nom: element.nom,
      age: element.age,
      sexe: element.sexe,
      numerosTelephone: element.numerosTelephone,
      email: element.email,
      acteurStructures_id: element.acteurStructures.id,
      acteurStructures_nom: element.acteurStructures.nom,
      provinces_id: element.provinces.id,
      provinces_nom: element.provinces.nom,
      dateSoumition: element.date,
    };
  });
}
export function formatVbg(vbg) {
  return vbg.map((element) => {
    return {
      id: element._id,
      type_violence: element.type_violence,
      auteur_viol: element.auteur_viol,
      tranche_age_victime: element.tranche_age_victime,
      sexe_victime: element.sexe_victime,
      province: element.province.nom,
      dateViol: element.date.dateViol,
      dateSoumition: element.date.dateSoumition,
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