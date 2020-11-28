export function formatDataForAmChartBar(data) {}
export function formatDataForAmChartPie(object) {
  const dataFormated = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      dataFormated.push({
        label: key,
        nombre: object[key].length,
      });
    }
  }
  return dataFormated;
}

export function formatDataForAmChartMainByMonth(vbg,casSoumis) {
  const current_date = new Date();
  const dataGrouped = [];
  const months = ["Janvier","Février","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]

  for (let index = 0; index < current_date.getMonth() + 1; index++) {
    dataGrouped.push(
      {
        label : months[index],
        vbg : vbg[index].nombre,
        casSoumis : casSoumis[index].nombre,
      }
    )
  }
  return dataGrouped;
}

