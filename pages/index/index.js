//index.js
var util = require('../../utils/util.js');

Page({ 
  data: { 
    weather:{
    wendu: 19,
    ganmao: "昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。",
    yesterday: {
       date: "20日  星期六", 
       high: "高温 15℃", 
       low: "低温 8℃", 
       fl: "<3级", 
       type: "小雨" }, 
    forecast: [
      { 
        date: "21日星期天", 
        type: "晴" ,
        high: "高温 22℃",
        low: "低温 8℃", 
        fengxiang: "南风", 
        fengli: "3-4级"
        }, 
        {
        date: "22日星期一", 
        high: "高温 25℃", 
        fengli: "<![CDATA[3-4级]]>",
        low: "低温 14℃", 
        fengxiang: "南风", 
        type: "晴" 
        }, 
        { 
        date: "23日星期二", 
        high: "高温 27℃", 
        fengli: "<![CDATA[<3级]]>", 
        low: "低温 15℃", 
        fengxiang: "东南风", 
        type: "多云" 
        }, { 
        date: "24日星期三", 
        high: "高温 21℃", 
        fengli: "<![CDATA[<3级]]>", 
        low: "低温 10℃", 
        fengxiang: "东北风",
        type: "小雨" 
        }, { 
        date: "25日星期四", 
        high: "高温 23℃", 
        fengli: "<![CDATA[<3级]]>", 
        low: "低温 11℃", 
        fengxiang: "北风", 
        type: "多云" 
        }
      ]
      
  },
  today:'2019-4-21',
  city:'北京',
  inputCity:'',
  },

  onLoad: function(options){
     this.setData({
       today:util.formatTime(new Date()).split('  ')[0]
     });
     var self = this;
     wx.getLocation({
       type: 'wgs84',
       success: function (res){
         wx.request({
           url:'https://api.map.baidu.com/geocoder/v2/' + '?ak=ASAT5N3tnHIa4APW0SNPeXN5&location=' + res.latitude+',' + res.longitude + '&output=json&pois=0',
           data: {},
           header: {
             'Content-Type': 'application/json'
           },
           success: function(res){
             var city = res.data.result.addressComponent.city.replace('市','');
             self.searchWeather(city);
           }
         })
       }
     })
  },

  searchWeather:function(cityName){
    var self = this;
    wx.request({
      url: 'https://wthrcdn.etouch.cn/weather_mini?city=' + cityName,
      data:{},
      header:{
        'Content-Type': 'application/json'
      },
      success: function (res){
        if(res.data.statys == 1002){
          wwx.showModal({
            title: '提示',
            content: '输入的城市名称有误,请重新输入!',
            showCancel: false,
            success: function(res){
              self.setData({inputCity:''});
            }
          })
        }else{
          var weather = res.data.data;

          for(var i=0; i<weather.forecast.length; i++){
            var d = weather.forecast[i].date;

            weather.forecast[i].date = ' ' + d.replace('星期',' 星期');
          }
          self.setData({
            city: cityName,
            weather: weather,
            inputCity: ''
          })
        }
      }
    })
  },

  inputing:function(e){
    this.setData({inputCity:e.detail.value});
  },

  bindSearch:function(){
    this.searchWeather(this.data.inputCity);
  }
})