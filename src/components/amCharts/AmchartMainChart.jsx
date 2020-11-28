import React, { useState, useEffect } from "react";
import {
  formatVbg,
  formatCasSoumis,
  groupByMonth,
  
} from "../../services/helpers/api.data.helper";
import { formatDataForAmChartPie,formatDataForAmChartMainByMonth } from "../../services/helpers/amChart.helper";
import API from "../../services/api";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function AmchartMainChart({tagName}) {
  const [dataAll, setDataAll] = useState({
    dataVbg : [],
    dataCasSoumis : [],
  });
  const [dataAmchart, setDataAmchart] = useState([]);



  // const [dataVbg, setDataVbg] = useState([]);
  // const [dataCasSoumis, setDataCasSoumis] = useState([]);
  useEffect( () => {
    (async function(){
      //Le code de await doit être ici
      const dataVbg = await API.get("vbg").then((res)=> formatDataForAmChartPie(groupByMonth(formatVbg(res.data), "dateSoumition")));
      const dataCasSoumis = await API.get("cassoumis").then((res)=> formatDataForAmChartPie(groupByMonth(formatCasSoumis(res.data), "dateSoumition")));
      setDataAmchart(formatDataForAmChartMainByMonth(dataVbg,dataCasSoumis))
      } ) ()
     
    // setDataAll({
    //   dataVbg : dataVbg,
    //   dataCasSoumis : dataCasSoumis,
    // })
  }, []);











  // Amchart Code

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  let chart = am4core.create(tagName, am4charts.XYChart);
 
  chart.colors.step = 2;
  chart.maskBullets = false;
  chart.data = dataAmchart

  console.log(dataAmchart);
  
  // Add data
  chart.data = [
    {
      label: "2012-01-01", //label
      vbg: 227, // vbg
      // townName: "New York", 
      townName2: "New York",
      townSize: 12,
      casSoumis: 40.71, // Dossier traité
      // duration: 408,
    },
    {
      label: "2012-01-02",
      vbg: 371,
      // townName: "Washington",
      // townSize: 7,
      casSoumis: 38.89,
      // duration: 482,
    },
    {
      date: "2012-01-03",
      distance: 433,
      // townName: "Wilmington",
      // townSize: 3,
      latitude: 34.22,
      // duration: 562,
    },

  ];

  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 50;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.fullWidthTooltip = true;

  let distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
  distanceAxis.title.text = "Nombre";
  //distanceAxis.renderer.grid.template.disabled = true;

  // let durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
  // durationAxis.title.text = "Duration";
  // durationAxis.baseUnit = "minute";
  // //durationAxis.renderer.grid.template.disabled = true;
  // durationAxis.renderer.opposite = true;
  // durationAxis.syncWithAxis = distanceAxis;

  // durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";

  let latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
  latitudeAxis.renderer.grid.template.disabled = true;
  latitudeAxis.renderer.labels.template.disabled = true;
  latitudeAxis.syncWithAxis = distanceAxis;

  // Create series
  let distanceSeries = chart.series.push(new am4charts.ColumnSeries());
  distanceSeries.dataFields.valueY = "vbg";
  // distanceSeries.dataFields.dateX = "label";
  distanceSeries.yAxis = distanceAxis;
  distanceSeries.tooltipText = "{valueY} miles";
  distanceSeries.name = "VBG";
  distanceSeries.columns.template.fillOpacity = 0.7;
  distanceSeries.columns.template.propertyFields.strokeDasharray = "dashLength";
  distanceSeries.columns.template.propertyFields.fillOpacity = "alpha";
  distanceSeries.showOnInit = true;

  let distanceState = distanceSeries.columns.template.states.create("hover");
  distanceState.properties.fillOpacity = 0.9;

  // let durationSeries = chart.series.push(new am4charts.LineSeries());
  // durationSeries.dataFields.valueY = "duration";
  // durationSeries.dataFields.dateX = "label";
  // durationSeries.yAxis = durationAxis;
  // durationSeries.name = "Duration";
  // durationSeries.strokeWidth = 2;
  // durationSeries.propertyFields.strokeDasharray = "dashLength";
  // durationSeries.tooltipText = "{valueY.formatDuration()}";
  // durationSeries.showOnInit = true;

  // let durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
  // let durationRectangle = durationBullet.createChild(am4core.Rectangle);
  // durationBullet.horizontalCenter = "middle";
  // durationBullet.verticalCenter = "middle";
  // durationBullet.width = 7;
  // durationBullet.height = 7;
  // durationRectangle.width = 7;
  // durationRectangle.height = 7;

  // let durationState = durationBullet.states.create("hover");
  // durationState.properties.scale = 1.2;

  let latitudeSeries = chart.series.push(new am4charts.LineSeries());
  latitudeSeries.dataFields.valueY = "casSoumis";
  latitudeSeries.dataFields.categoryX = "label";
  // latitudeSeries.yAxis = latitudeAxis;
  // latitudeSeries.name = "Duration";
  // latitudeSeries.strokeWidth = 2;
  // latitudeSeries.propertyFields.strokeDasharray = "dashLength";
  // latitudeSeries.tooltipText = "Cas Soumis: {valueY} ({label})";
  // latitudeSeries.showOnInit = true;

  // let latitudeBullet = latitudeSeries.bullets.push(
  //   new am4charts.CircleBullet()
  // );
  // latitudeBullet.circle.fill = am4core.color("#fff");
  // latitudeBullet.circle.strokeWidth = 2;
  // latitudeBullet.circle.propertyFields.radius = "townSize";

  // let latitudeState = latitudeBullet.states.create("hover");
  // latitudeState.properties.scale = 1.2;

  // let latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
  // latitudeLabel.label.text = "{label}";
  // latitudeLabel.label.horizontalCenter = "left";
  // latitudeLabel.label.dx = 14;

  // Add legend
  chart.legend = new am4charts.Legend();

  // Add cursor
  // chart.cursor = new am4charts.XYCursor();
  // chart.cursor.fullWidthLineX = true;
  // chart.cursor.xAxis = dateAxis;
  // chart.cursor.lineX.strokeOpacity = 0;
  // chart.cursor.lineX.fill = am4core.color("#000");
  // chart.cursor.lineX.fillOpacity = 0.1;

  // useEffect(() => {
  //   API.get("getGlobalStat").then((res) => {
  //     setdataStat(res.data);
  //   });
  // }, []);
  return <div id={tagName} style={{ width: "100%", height: "420px" }}></div>;
}
