/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/exam/exam-design/subject-management/:id',
    name: 'details',
    component: './Exam/ExamDesign/SubjectDetails',
    layout: false,
  },
  {
    name: 'my-exam',
    icon: 'audit',
    path: '/myexam',
    component: './MyExam',
  },
  {
    name: 'my-course',
    icon: 'playSquare',
    path: '/mycourse',
    component: './MyExam',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    access: 'console',
    routes: [
      {
        path: '/user/user-management',
        name: 'management',
        component: './UserManagement/User',
      },
      {
        path: '/user/usergroups-management',
        name: 'usergroups',
        component: './UserManagement/UserGroup',
      },
    ],
  },
  {
    path: '/exam',
    name: 'exam',
    icon: 'calculator',
    access: 'console',
    routes: [
      {
        path: '/exam/exam-design',
        name: 'design',
        routes: [
          {
            path: '/exam/exam-design/list',
            name: 'list',
            component: './Exam/ExamDesign/ExamList',
          },
          {
            path: '/exam/exam-design/subject-management',
            name: 'subject',
            component: './Exam/ExamDesign/Subject',
          },
          {
            path: '/exam/exam-design/question-type-management',
            name: 'question',
            component: './Admin',
          },
        ],
      },
      {
        path: '/exam/course',
        name: 'course',
        routes: [
          {
            path: '/exam/course/activat',
            name: 'activat',
            component: './Admin',
          },
          {
            path: '/exam/course/bulk-course-enrollment',
            name: 'bce',
            component: './Admin',
          },
        ],
      },
      {
        path: '/exam/question',
        name: 'question',
        routes: [
          {
            path: '/exam/question/gerneral',
            name: 'gerneral',
            component: './Admin',
          },
          {
            path: '/exam/question/reading-comprehension',
            name: 'reading',
            component: './Admin',
          },
        ],
      },
      {
        path: '/exam/paper',
        name: 'paper',
        routes: [
          {
            path: '/exam/paper/exam',
            name: 'exam',
            component: './Admin',
          },
          {
            path: '/exam/paper/random',
            name: 'random',
            component: './Admin',
          },
          {
            path: '/exam/paper/manual',
            name: 'manual',
            component: './Admin',
          },
          {
            path: '/exam/paper/instant',
            name: 'instant',
            component: './Admin',
          },
        ],
      },
      {
        path: '/exam/recycle',
        name: 'recycle',
        routes: [
          {
            path: '/exam/recycle/regular-questions',
            name: 'regular',
            component: './Admin',
          },
          {
            path: '/exam/recycle/specialized-questions',
            name: 'specialized',
            component: './Admin',
          },
          {
            path: '/exam/recycle/knowledge-points',
            name: 'knowledge',
            component: './Admin',
          },
        ],
      },
    ],
  },
  {
    path: '/course',
    name: 'course',
    icon: 'youtube',
    access: 'console',
    routes: [
      {
        path: '/course/category',
        name: 'category',
        component: './Admin',
      },
      {
        path: '/course/course-management',
        name: 'management',
        component: './Admin',
      },
      {
        path: '/course/model-management',
        name: 'model',
        component: './Admin',
      },
    ],
  },
  {
    path: '/',
    redirect: '/myexam',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
