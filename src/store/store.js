import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
         state: {
           IsLogin : false,
           loginInfo:null ,
           schoolName:'',//学校的名字
           schoolLogo:'',//学校的logo图片地址
           schoolId:'',//学校id
           subjectId:0,//科目选择的对应id
           subjectName:'',//科目选择的对应名字
           titleIndex:0,//题目的sort,即第几题
           subjectList:[],//科目列表
           questioninfo:[],//当前题目的数据
           isCollection:false,//前题目是否加入错题集
           menuSortInfoList:[], //顺序答题,考试上拉窗的题目讯息
           questioninfoAll:'', //顺序答题,考试已请求的题目总集
           questionId:'',//当前题目的id
           exambasedata:''//考试模块的基本信息
         },
         mutations: {
           SET_LOGIN(state,data){//设置登录状态
             state.IsLogin = true
             state.loginInfo = data
           },
           SET_SCHOOL(state,data){//设置学校信息,logo&名字
             state.schoolLogo = data.schoolLogo;
             state.schoolName = data.schoolName;
             state.schoolId = data.schoolId;
             localStorage.setItem('schoolLogo',data.schoolLogo);
             localStorage.setItem('schoolName',data.schoolName);
             localStorage.setItem('schoolId',data.schoolId);
             // console.log(localStorage.getItem(schoolId))
           },
           SET_SUBJECTNAME(state,data){//设置科目选择的名字和id
              state.subjectId = data.subjectId;
              state.subjectName = data.subjectName
           },
           SET_TITLE(state,data){//设置题目的标号
              state.titleIndex = data;
           },
           SET_SUBJECTLIST(state,data){//设置科目ID
              state.subjectList = data;
           },
           SET_QUESTIONID(state,data){//设置题目的ID
              state.questionId = data;
           },
           SET_QUESTIONINFO(state,data){//设置当前题目的数据
              state.questioninfo = data;
           },
           SET_COLLECTION(state,data){//设置当前题目是否已收藏
              state.isCollection = data;
           },
           SET_MENUSORTINFOLIST(state,data){//当vuex中没有菜单栏数据的时候,将接口中获得的初始菜单数据赋值
              state.menuSortInfoList = data;
           },
           SET_MENUSORTINFOLIST_TWO(state,data){//顺序答题时,根据初始菜单数据,修改菜单数据的某个数据
              state.menuSortInfoList[data.menuSort-1].menuSort = data.menuSort;
              state.menuSortInfoList[data.menuSort-1].state = data.state;
           },
           SET_MENUSORTINFOLIST_THREE(state,data){//考试模块,根据初始菜单数据,修改菜单数据的某个数据
              state.menuSortInfoList[data.sort-1].sort = data.sort;
              state.menuSortInfoList[data.sort-1].state = 2;
              state.menuSortInfoList[data.sort-1].studentAnswer = data.studentAnswer;
           },
           SET_QUESTIONINFOALL(state,data){//顺序答题和考试模块的题目总集,将总集中没有的题目数据,插入到总集数据中
              if(data){
              if(state.questioninfoAll){
              state.questioninfoAll.push(data);
            }else{
                 state.questioninfoAll = [];
                 state.questioninfoAll.push(data);
            }
            }else{
              state.questioninfoAll = '';
            } 
           },
           SET_QUESTIONINFOALL_TWO(state,data){//顺序答题时,答题并将题目提交到接口后,将回答的答案,正确的答案,和是否被收藏的数据,修改总集里面对应的题目里的数据
              state.questioninfoAll[data.num].studentAnswer = data.studentAnswer;
              state.questioninfoAll[data.num].trueAnswer = data.trueAnswer;
              state.questioninfoAll[data.num].isCollection = data.isCollection;
           },
           SET_QUESTIONINFOALL_THREE(state,data){//考试时,答题提交当前题目的选项后,将学生的答案修改到对应题目的学生答案
              state.questioninfoAll[data.num].studentAnswer = data.studentAnswer;
           },
           SET_EXAMBASEDATA(state,data){
              state.exambasedata = data;
           } 
         },
         actions: {
          set_school(context,value){
              context.commit('SET_SCHOOL',value);
          },
          set_subjectname(context,value){
              context.commit('SET_SUBJECTNAME',value);
          },
           set_subjectlist(context,value){
              context.commit('SET_SUBJECTLIST',value);
           },
           set_questionid(context,value){
              context.commit('SET_QUESTIONID',value);
           },
           set_questioninfo(context,value){
              context.commit('SET_QUESTIONINFO',value);
           },
           set_collection(context,value){
              context.commit('SET_COLLECTION',value);
           },
           set_menusortinfolist(context,value){
              context.commit('SET_MENUSORTINFOLIST',value);
           },
           set_menusortinfolist_two(context,value){
              context.commit('SET_MENUSORTINFOLIST_TWO',value);
           },
           set_menusortinfolist_three(context,value){
              context.commit('SET_MENUSORTINFOLIST_THREE',value);
           },
           set_questioninfoall(context,value){
              context.commit('SET_QUESTIONINFOALL',value);
           },
           set_questioninfoall_two(context,value){
              context.commit('SET_QUESTIONINFOALL_TWO',value);
           },
           set_questioninfoall_three(context,value){
              context.commit('SET_QUESTIONINFOALL_THREE',value);
           },
           set_exambasedata(context,value){
              context.commit('SET_EXAMBASEDATA',value);
           }
         }
       });