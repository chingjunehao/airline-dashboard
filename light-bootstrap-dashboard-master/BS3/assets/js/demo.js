type = ['', 'info', 'success', 'warning', 'danger'];
AA_rt = []
SIA_rt = []

quaters = ['01-2017', '04-2017', '07-2017', '10-2017', '01-2018', '04-2018', '07-2018', '10-2018', '01-2019', '04-2019', '07-2019', '10-2019']

// engagement of over time
// current enggagement compare with last month
// best post
// hashtag and non-hashtag

airasia_campaign = []
singaporeair_campaign = []
airasia = 0
singaporeair = 0

airasia_engagement = []
singaporeair_engagement = []

aa_nonhashtag_engagement = []
sa_nonhashtag_engagement = []

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

function scaleArray(arr, multiplier){
  let newarr = arr.map((ele) => {
    return ele * multiplier
  })
  return newarr
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


const engagement = new Promise(async function (resolve, reject) {
  // quaters.forEach(async (month) => {
  await asyncForEach(quaters, async (month) => {
    await $.getJSON("./assets/data/campaign_airasia_" + month + ".json", function (data) {
      airasia_campaign.push(data)
      airasia_engagement.push(sum(data['mention_engagement']) + sum(data['hashtag_engagement']))
      aa_nonhashtag_engagement.push(sum(data['nonhashtag_engagement']))
    });

    await $.getJSON("./assets/data/campaign_singaporeair_" + month + ".json", function (data) {
      singaporeair_campaign.push(data)
      singaporeair_engagement.push(sum(data['mention_engagement']) + sum(data['hashtag_engagement']))
      sa_nonhashtag_engagement.push(sum(data['nonhashtag_engagement'])
    });
  })
  resolve()
})

engagement.then(() => {
  airasia_engagement = scaleArray(airasia_engagement, 0.01)
  singaporeair_engagement = scaleArray(singaporeair_engagement, 0.01)
  var dataSales = {
    labels: quaters,
    series: [
      [], // blue
      [], // red
      airasia_engagement, // orange
      [], // purple
      singaporeair_engagement, // green
    ]
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    high: 5000,
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 3
    }),
    showLine: true,
    showPoint: true,
  };

  var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
})


$.getJSON("./assets/data/campaign_airasia.json", function (data) {
  airasia = data

  $.getJSON("./assets/data/campaign_singaporeair.json", function (data) {
    singaporeair = data

    // airasia_engagement += airasia['mention_engagement']
    // airasia_engagement += airasia['hashtag_engagement']

    // singaporeair_engagement += singaporeair['mention_engagement']
    // singaporeair_engagement += singaporeair['hashtag_engagement']


    // let airasia = [0.009741440130548227, 0.013359511798649765, 0.00883286485014257, 0.007461353193841948, 0.008727486529813552, 0.008721039633023295, 0.007992540295723986, 0.04218897611271627, 0.012430572107440743, 0.00725495416855221, 0.011083153750272265, 0.01646243537584439, 0.00787488442930176, 0.027000524742861784, 0.008656818622689558, 0.03732914413979903, 0.014493572057560342, 0.004769494831643723, 0.001, 0.002970407696111981, 0.001, 0.001, 0.007778180977447869, 0.007441330620156819, 0.009741440130548227]
    // let Singaporeair = [0.013359511798649765, 0.009065908680802464, 0.007461353193841948, 0.008727486529813552, 0.008902946666780882, 0.525298750999021, 0.04389573867557461, 0.013379683691411492, 0.0076873460552011235, 0.011346210969378772, 0.016906547271310277, 0.00787488442930176, 0.028217341975076138, 0.009040518003006459, 0.03732914413979903, 0.014493572057560342, 0.004769494831643723, 0.001, 0.002970407696111981, 0.001, 0.0016834331936551403, 0.007778180977447869, 0.010771583645554297]

    // var dataSales = {
    //   labels: ['0000', '0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300'],
    //   series: [
    //     [], // blue
    //     [], // red
    //     airasia, // orange
    //     [], // purple
    //     Singaporeair, // green
    //   ]
    // };

    // var optionsSales = {
    //   lineSmooth: false,
    //   low: 0,
    //   high: 0.1,
    //   showArea: false,
    //   height: "245px",
    //   axisX: {
    //     showGrid: false,
    //   },
    //   lineSmooth: Chartist.Interpolation.simple({
    //     divisor: 3
    //   }),
    //   showLine: true,
    //   showPoint: true,
    // };

    // var responsiveSales = [
    //   ['screen and (max-width: 640px)', {
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];

    // Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
  })
})





$.notify({
  icon: 'pe-7s-gift',
  message: "Feel free to navigate through the dashboard"

}, {
  type: 'info',
  timer: 4000
});


// demo = {

//   initChartist: function () 
//   {

//     let airasia = [0.009741440130548227, 0.013359511798649765, 0.00883286485014257, 0.007461353193841948, 0.008727486529813552, 0.008721039633023295, 0.007992540295723986, 0.04218897611271627, 0.012430572107440743, 0.00725495416855221, 0.011083153750272265, 0.01646243537584439, 0.00787488442930176, 0.027000524742861784, 0.008656818622689558, 0.03732914413979903, 0.014493572057560342, 0.004769494831643723, 0.001, 0.002970407696111981, 0.001, 0.001, 0.007778180977447869, 0.007441330620156819, 0.009741440130548227]
//     let Singaporeair = [0.013359511798649765, 0.009065908680802464, 0.007461353193841948, 0.008727486529813552, 0.008902946666780882, 0.525298750999021, 0.04389573867557461, 0.013379683691411492, 0.0076873460552011235, 0.011346210969378772, 0.016906547271310277, 0.00787488442930176, 0.028217341975076138, 0.009040518003006459, 0.03732914413979903, 0.014493572057560342, 0.004769494831643723, 0.001, 0.002970407696111981, 0.001, 0.0016834331936551403, 0.007778180977447869, 0.010771583645554297]
//     airasia.forEach((item, index, arr) => {
//       arr[index] = item * 1.15
//     })
//     Singaporeair.forEach((item, index, arr) => {
//       arr[index] = item * 1.15
//     })

//     console.log(airasia)
//     console.log(Singaporeair)

//     // var json_data = { "2013-01-21": 1, "2013-01-22": 7 };
//     // var result = [];

//     // for (var i in json_data)
//     //   result.push([i, json_data[i]]);

//     var dataSales = {
//       labels: ['0000', '0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300'],
//       series: [
//         [], // blue
//         [], // red
//         airasia, // orange
//         [], // purple
//         Singaporeair, // green
//       ]
//     };

//     var optionsSales = {
//       lineSmooth: false,
//       low: 0,
//       high: 0.1,
//       showArea: false,
//       height: "245px",
//       axisX: {
//         showGrid: false,
//       },
//       lineSmooth: Chartist.Interpolation.simple({
//         divisor: 3
//       }),
//       showLine: true,
//       showPoint: true,
//     };

//     var responsiveSales = [
//       ['screen and (max-width: 640px)', {
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           }
//         }
//       }]
//     ];

//     Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

//     airasia = [3261572, 3261802, 3262087, 3262299, 3264825, 3262611, 3262851, 3262986, 3263176, 3263309, 3263501, 3263787, 3263919, 3264014, 3264232, 3264950, 3264532, 3264732, 3265052, 3265161, 3265345, 3265545]
//     Singaporeair = [710936, 711014, 711081, 711145, 712528, 711265, 711395, 711622, 711692, 711825, 711891, 711930, 712130, 712250, 712320, 712582, 712400, 712488, 712655, 712722, 712799, 712829]
//     airasia.forEach((item, index, arr) => {
//       arr[index] = item / 10000
//     })
//     Singaporeair.forEach((item, index, arr) => {
//       arr[index] = item / 10000
//     })

//     console.log(airasia)
//     console.log(Singaporeair)

//     // var json_data = { "2013-01-21": 1, "2013-01-22": 7 };
//     // var result = [];

//     // for (var i in json_data)
//     //   result.push([i, json_data[i]]);

//     var dataSales = {
//       labels: ['16 Dec', '17 Dec', '18 Dec', '19 Dec', '20 Dec', '21 Dec', '22 Dec', '23 Dec', '24 Dec', '25 Dec', '26 Dec', '27 Dec', '28 Dec', '29 Dec', '30 Dec', '31 Dec', '1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan'],
//       series: [
//         [], // blue
//         [], // red
//         airasia, // orange
//         [], // purple
//         [], // green
//       ]
//     };

//     var optionsSales = {
//       lineSmooth: false,
//       low: 0,
//       high: 500,
//       showArea: false,
//       height: "245px",
//       axisX: {
//         showGrid: false,
//       },
//       lineSmooth: Chartist.Interpolation.simple({
//         divisor: 3
//       }),
//       showLine: true,
//       showPoint: true,
//     };

//     var responsiveSales = [
//       ['screen and (max-width: 640px)', {
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           }
//         }
//       }]
//     ];

//     Chartist.Line('#chartfollowerairasia', dataSales, optionsSales, responsiveSales);

//     airasia = [3261572, 3261802, 3262087, 3262299, 3264825, 3262611, 3262851, 3262986, 3263176, 3263309, 3263501, 3263787, 3263919, 3264014, 3264232, 3264950, 3264532, 3264732, 3265052, 3265161, 3265345, 3265545]
//     Singaporeair = [710936, 711014, 711081, 711145, 712528, 711265, 711395, 711622, 711692, 711825, 711891, 711930, 712130, 712250, 712320, 712582, 712400, 712488, 712655, 712722, 712799, 712829]
//     airasia.forEach((item, index, arr) => {
//       arr[index] = item / 10000
//     })
//     Singaporeair.forEach((item, index, arr) => {
//       arr[index] = item / 10000
//     })

//     console.log(airasia)
//     console.log(Singaporeair)

//     // var json_data = { "2013-01-21": 1, "2013-01-22": 7 };
//     // var result = [];

//     // for (var i in json_data)
//     //   result.push([i, json_data[i]]);

//     var dataSales = {
//       labels: ['16 Dec', '17 Dec', '18 Dec', '19 Dec', '20 Dec', '21 Dec', '22 Dec', '23 Dec', '24 Dec', '25 Dec', '26 Dec', '27 Dec', '28 Dec', '29 Dec', '30 Dec', '31 Dec', '1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan'],
//       series: [
//         [], // blue
//         [], // red
//         [], // orange
//         [], // purple
//         Singaporeair, // green
//       ]
//     };

//     var optionsSales = {
//       lineSmooth: false,
//       low: 0,
//       high: 100,
//       showArea: false,
//       height: "245px",
//       axisX: {
//         showGrid: false,
//       },
//       lineSmooth: Chartist.Interpolation.simple({
//         divisor: 3
//       }),
//       showLine: true,
//       showPoint: true,
//     };

//     var responsiveSales = [
//       ['screen and (max-width: 640px)', {
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           }
//         }
//       }]
//     ];

//     Chartist.Line('#chartfollowersingaporeair', dataSales, optionsSales, responsiveSales);


//     var data = {
//       labels: ['United States', 'Others', 'Unknown', 'Malaysia', 'Indonesia', 'Japan', "Argentina", "Egypt", "Thailand", "Singapore"],
//       series: [
//         [],
//         [21.05, 21.05, 15.78, 10.52, 5.26, 5.26, 5.26, 5.26, 5.26, 5.26]
//       ]
//     };

//     var options = {
//       seriesBarDistance: 10,
//       axisX: {
//         showGrid: false
//       },
//       height: "245px"
//     };

//     var responsiveOptions = [
//       ['screen and (max-width: 640px)', {
//         seriesBarDistance: 5,
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           }
//         }
//       }]
//     ];

//     Chartist.Bar('#chartActivity', data, options, responsiveOptions);

//     var data = {
//       labels: ['Malaysia', 'Unknown', 'Indonesia', 'Paris', 'Japan', 'India', 'Brunei'],
//       series: [
//         [50.82, 24.59, 16.39, 3.27, 1.63, 1.63, 1.63],
//       ]
//     };

//     var options = {
//       seriesBarDistance: 10,
//       axisX: {
//         showGrid: false
//       },
//       height: "245px"
//     };

//     var responsiveOptions = [
//       ['screen and (max-width: 640px)', {
//         seriesBarDistance: 5,
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           }
//         }
//       }]
//     ];

//     Chartist.Bar('#chartActivitySIA', data, options, responsiveOptions);

//     var dataPreferences = {
//       series: [
//         [25, 30, 20, 25]
//       ]
//     };

//     var optionsPreferences = {
//       donut: true,
//       donutWidth: 40,
//       startAngle: 0,
//       total: 100,
//       showLabel: false,
//       axisX: {
//         showGrid: false
//       }
//     };

//     Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

//     Chartist.Pie('#chartPreferences', {
//       labels: ['62%', '32%', '6%'],
//       series: [62, 32, 6]
//     });
//   }
// }
