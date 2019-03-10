import {
  ajax
} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: null,
    starDisabled: false,
    showNewNum: false,
    title: '微机实验基础',
    html: `属性：nodes 类型：Array / String 结点列表 / HTML String
全局支持class和style属性，不支持id属性。
    结点类型：type = node ， name 标签名 String 是 支持部分受信任的HTML结点，  attrs 属性 Object 否 支持部分受信任的属性，遵循Pascal命名法 ，  children 子结点列表 Array 否 结构和nodes一致
结点类型：type = text  ，text 文本 String 是 支持entities
nodes 不推荐使用 String 类型，性能会有所下降
rich - text 组件内屏蔽所有结点的事件。
    attrs 属性不支持 id ，支持 class 。
    name 属性大小写不敏感。
    如果使用了不受信任的HTML结点，该结点及其所有子结点将会被移除。
    img 标签仅支持网络图片。`,
    starNum: 23,
    time: "2019.2.22",
    school: '哈尔滨工业大学',
    userName: '白军万'
  },

  //转发
  onShareAppMessage: function (res) {
    if(res.from == 'button'){
      //TODO
    }
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list
    }
  },

  getCourseDetail: function(opts){
    ajax({
      url: 'Api/CDSP/GetTestData',
      // method: 'post',
      data: {
        ...opts
      },
      success: (data) => {
        return;
        this.setData({
          title: data.title,
          html: data.html,
          starNum: data.starNum,
          time: data.time,
          school: data.schoole,
          userName: data.userName
        });
      }
    })
  },

  //点赞
  starAdd: function(opts = {}){
    if (this.data.starDisabled)return;
    //设置数据
    ajax({
      url: 'Api/CDSP/GetTestData',
      // method: 'post',
      data: {
        ...opts
      },
      success: (data) => {
        this.setData({
          showNewNum: true,
          starNum: ++this.data.starNum,
          starDisabled: true
        });
        this.modifyStarNum();
      }
    })
  },

  //修改点赞数据
  modifyStarNum: function(id){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var courseList = prevPage.data.courseList //取上页data里的数据也可以修
    courseList[0].course_design_title = 'aaaaaaaaaaaaaaaaaa';
    prevPage.setData({
      courseList
    })
  },

  onLoad(opts){
    this.setData({
      searchData: {
        ...opts
      }
    });

    //获取详细信息
    this.getCourseDetail(opts)
  }
})