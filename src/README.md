# pages/login 移动端统一登录入口

# pages/student 学生移动端
对应页面和样式放在该文件夹下

# pages/parents 家长移动端
对应页面和样式放在该文件夹下

# pages/teacher 教师移动端
对应页面和样式放在该文件夹下

# components 放置个模块公用部分组件

# config 整个项目全局用到的配置项包括：axios、分页 等

# formRules 表单验证规则

# libs  放置项目中用到工具包括：格式化日期、ajax请求封装等

# router  整个项目中放置的路由文件
# router/parentsRouter router/studentRouter router/teacherRouter
# 根据不同的端划分路由,不同端也根据不同的业务模块合理的划分路由,最终打包按照路由打包同时实现路由懒加载

# store 整个项目状态管理,可以单独的为每一个具体处理的业务做一套状态管理,每一个状态管理通过vuex中的文件路径调用去加载和引用

# vuex 状态管理的主入口,具体实现在store中.

# assets 放置所有的静态资源包含:图片、css等 注：css中的图片要做相对路径
