## 项目运行


```
git clone 

cd 1mschool

npm install (安装依赖包)

npm run dev (运行本地开发环境)

npm run build (打包生成代码)

npm run clean (清除所有生成代码)

```

因项目流程全部基于gulp实现，需要在运行打包命令前需要先进行全局gulp安装

```
npm i -g gulp
```



## 页面


|--配送端

|------- 登录            login.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/login.html "title text")

|------- 今日订单        today-order.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/today-order.html "title text")

|------- 历史订单        order-history.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/order-history.html "title text")

|------- 配餐中          detail-dining.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/detail-dining.html "title text")

|------- 待送餐          detail-wait.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/detail-wait.html "title text")

|------- 送餐中(商家)     detail-meal.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/detail-meal.html "title text")

|------- 已退款          detail-refunded.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/detail-refunded.html "title text")

|------- 送餐中(车手)     detail-uncomplete.html[访问](http://218.70.106.250:21580/1mschool/build/delivery/detail-uncomplete.html "title text")

|------- 已完成           detail-down.html[访问]
(http://218.70.106.250:21580/1mschool/build/delivery/detail-down.html "title text")

|------- 我的账单           my-bill.html[访问]
(http://218.70.106.250:21580/1mschool/build/delivery/my-bill.html "title text")

|------- 我的信息           my-info.html[访问]
(http://218.70.106.250:21580/1mschool/build/delivery/my-info.html "title text")

|------- 我的信息-编辑           my-info-edit.html[访问]
(http://218.70.106.250:21580/1mschool/build/delivery/my-info-edit.html "title text")

|------- 修改密码           update-password.html[访问]
(http://218.70.106.250:21580/1mschool/build/delivery/update-password.html "title text")


|--用户端

|------- 已支付          detail-payed.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-payed.html "title text")

|------- 配餐中          detail-matching.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-matching.html "title text")

|------- 待送餐          detail-wait.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-wait.html "title text")

|------- 送餐中          detail-delivery.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-delivery.html "title text")

|------- 已完成     detail-down.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-down.html "title text")

|------- 已退款           detail-refund.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-refund.html "title text")

|------- 商家拒绝订单      detail-refusorder.html[访问](http://218.70.106.250:21580/1mschool/build/user/detail-refusorder.html "title text")

|------- 绑定手机           bind-phone.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/bind-phone.html "title text")

|------- 选择学校地址           choose-school-address.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/choose-school-address.html "title text")

|------- 选择学校           choose-school.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/choose-school.html "title text")

|------- 我要吐槽           make-complaints.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/make-complaints.html "title text")

|------- 新增地址           new-address.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/new-address.html "title text")

|------- 我的地址           my-address.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/my-address.html "title text")

|------- 优惠券           my-coupon.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/my-coupon.html "title text")

|------- 选餐           choose-meal.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/choose-meal.html "title text")

|------- 我的订单           my-order.html[访问]
(http://218.70.106.250:21580/1mschool/build/user/my-order.html "title text")

|------- 食堂订餐           index.html[访问](http://218.70.106.250:21580/1mschool/build/user/index.html "title text")

|------- 提交订单           submit-order.html[访问](http://218.70.106.250:21580/1mschool/build/user/submit-order.html "title text")


|--管理端

|------- 我的账单          my-bill.html[访问](http://218.70.106.250:21580/1mschool/build/manage/my-bill.html "title text")

|------- 我的信息          my-info.html[访问](http://218.70.106.250:21580/1mschool/build/manage/my-info.html "title text")

|------- 修改密码          update-password.html[访问](http://218.70.106.250:21580/1mschool/build/manage/update-password.html "title text")


### 公共组件

|-- [通用-按钮]          button.html

|-- [通用-表单]          form.html[访问](http://218.70.106.250:21580/1mschool/build/module/form.html "title text")

|-- [通用-图标]          icon.html

|-- [通用-列表]          list.html[访问](http://218.70.106.250:21580/1mschool/build/module/list.html "title text")

|-- [通用-订单]          orderdetail.html

|-- [通用-弹窗]          popup.html[访问](http://218.70.106.250:21580/1mschool/build/module/popup.html "title text")

|-- [通用-搜索]          search.html

|-- [通用-tab]           tab.html

|-- [通用-页面结构]        template.html[访问](http://218.70.106.250:21580/1mschool/build/module/template.html "title text")


### 结构

|-- 进度条             /htmls/ui.progress.html

|-- 个人中心基础结构    /htmls/_m_uc_base.html

|-- 重要提示基础结构    /htmls/ui-tips.html


### 2018年7月2日 修改记录

问题：选择学校页有如图两个问题

效果预览：[打开](http://218.70.106.250:21580/1mschool/build/user/choose-school-address.html "title text")

问题：搜索框后面有一个 X 点击清楚搜索框内容

效果预览：[打开](http://218.70.106.250:21580/1mschool/build/module/search.html "title text")

问题：订单明细，支付中安卓 被截断，如果加 line-height 的样式，则会跟左边的绿点无法水平对齐，请处理此问题

效果预览：[打开](http://218.70.106.250:21580/1mschool/build/user/detail-payed.html "title text")

问题：请做一个支付中的等待样式，防止重复提交

效果预览：[打开](http://218.70.106.250:21580/1mschool/build/user/submit-order.html "title text")

问题：蓝湖-登陆页面有修改，麻烦看一下

效果预览：[打开](http://218.70.106.250:21580/1mschool/build/delivery/login.html "title text")

问题：订餐主页的广告麻烦做成多图片轮播的样式，最多五张图片轮播

效果预览：[打开](http://218.70.106.250:21580/1mschool/build/user/index.html "title text")



