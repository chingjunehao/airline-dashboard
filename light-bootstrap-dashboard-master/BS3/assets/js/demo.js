type = ['', 'info', 'success', 'warning', 'danger'];

AA_rt = []
SIA_rt = []

const get_audience_locations = async function (path) {
  return new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest()
    var url = path

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText)
        // console.log(myArr)
        resolve(myArr)
      }
      else {
        reject('error')
      }
    }
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
  })
}



get_audience_locations("assets/data/SIA_rt.json")
  .then((response) => {
    SIA_rt = response
  })
  .catch((err) => {
    console.error(err)
  })

get_audience_locations("assets/data/AA_rt.json")
  .then((response) => {
    AA_rt = response
  })
  .catch((err) => {
    console.error(err)
  })


demo = {
  initPickColor: function () {
    $('.pick-class-label').click(function () {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  checkScrollForTransparentNavbar: debounce(function () {
    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    if ($(document).scrollTop() > scroll_distance) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
        $('.navbar[color-on-scroll]').addClass('navbar-default');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
        $('.navbar[color-on-scroll]').removeClass('navbar-default');
      }
    }
  }, 17),

  // initDocChartist: function(){
  //     var dataSales = {
  //       labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
  //       series: [
  //          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
  //         [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
  //         [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
  //       ]
  //     };

  //     var optionsSales = {
  //       lineSmooth: false,
  //       low: 0,
  //       high: 800,
  //       showArea: true,
  //       height: "245px",
  //       axisX: {
  //         showGrid: false,
  //       },
  //       lineSmooth: Chartist.Interpolation.simple({
  //         divisor: 3
  //       }),
  //       showLine: false,
  //       showPoint: false,
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


  //     var data = {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //       series: [
  //         [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
  //         [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
  //       ]
  //     };

  //     var options = {
  //         seriesBarDistance: 10,
  //         axisX: {
  //             showGrid: false
  //         },
  //         height: "245px"
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

  //     var dataPreferences = {
  //         series: [
  //             [25, 30, 20, 25]
  //         ]
  //     };

  //     var optionsPreferences = {
  //         donut: true,
  //         donutWidth: 40,
  //         startAngle: 0,
  //         total: 100,
  //         showLabel: false,
  //         axisX: {
  //             showGrid: false
  //         }
  //     };

  //     Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  //     Chartist.Pie('#chartPreferences', {
  //       labels: ['62%','32%','6%'],
  //       series: [62, 32, 6]
  //     });
  // },

  initChartist: function () {

    let airasia = [0.009741440130548227, 0.013359511798649765, 0.00883286485014257,0.007461353193841948,0.008727486529813552, 0.008721039633023295, 0.007992540295723986, 0.04218897611271627, 0.012430572107440743, 0.00725495416855221, 0.011083153750272265, 0.01646243537584439,  0.00787488442930176, 0.027000524742861784, 0.008656818622689558, 0.03732914413979903, 0.014493572057560342, 0.004769494831643723, 0.001, 0.002970407696111981, 0.001, 0.001, 0.007778180977447869,  0.007441330620156819, 0.009741440130548227 ]
    let Singaporeair = [0.013359511798649765, 0.009065908680802464, 0.007461353193841948, 0.008727486529813552, 0.008902946666780882, 0.525298750999021, 0.04389573867557461, 0.013379683691411492, 0.0076873460552011235, 0.011346210969378772, 0.016906547271310277, 0.00787488442930176, 0.028217341975076138, 0.009040518003006459, 0.03732914413979903, 0.014493572057560342, 0.004769494831643723, 0.001, 0.002970407696111981, 0.001, 0.0016834331936551403, 0.007778180977447869, 0.010771583645554297 ]
    airasia.forEach((item, index, arr) => {
      arr[index] = item * 1.15
    })
    Singaporeair.forEach((item, index, arr) => {
      arr[index] = item * 1.15
    })

    console.log(airasia)
    console.log(Singaporeair)

    // var json_data = { "2013-01-21": 1, "2013-01-22": 7 };
    // var result = [];

    // for (var i in json_data)
    //   result.push([i, json_data[i]]);

    var dataSales = {
      labels: ['0000', '0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300'],
      series: [
        [], // blue
        [], // red
        airasia, // orange
        [], // purple
        Singaporeair, // green
      ]
    };

    var optionsSales = {
      lineSmooth: false,
      low: 0,
      high: 0.1,
      showArea: true,
      height: "245px",
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: false,
      showPoint: false,
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


    var data = {
      labels: ['United States', 'Others', 'Unknown', 'Malaysia', 'Indonesia', 'Japan', "Argentina", "Egypt", "Thailand", "Singapore"],
      series: [
        [],
        [21.05, 21.05, 15.78, 10.52, 5.26, 5.26, 5.26, 5.26, 5.26, 5.26]
      ]
    };

    var options = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    };

    var responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    Chartist.Bar('#chartActivity', data, options, responsiveOptions);

    var data = {
      labels: ['Malaysia', 'Unknown', 'Indonesia', 'Paris', 'Japan', 'India', 'Brunei'],
      series: [
        [50.82, 24.59, 16.39, 3.27, 1.63, 1.63, 1.63],
      ]
    };

    var options = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    };

    var responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    Chartist.Bar('#chartActivitySIA', data, options, responsiveOptions);

    var dataPreferences = {
      series: [
        [25, 30, 20, 25]
      ]
    };

    var optionsPreferences = {
      donut: true,
      donutWidth: 40,
      startAngle: 0,
      total: 100,
      showLabel: false,
      axisX: {
        showGrid: false
      }
    };

    Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    Chartist.Pie('#chartPreferences', {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    });
  },

  initGoogleMaps: function () {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]

    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function (from, align) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "pe-7s-gift",
      message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    });
  }


}
