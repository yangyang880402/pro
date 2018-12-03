<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="less">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
dl,
dt,
dd,
ol,
nav ul,
nav li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  color: #333;
}
span,
div,
ul,
li,
a {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  /* user-select: none; */
}
html,
body,
ul,
li {
  margin: 0;
  padding: 0;
  font-family: "microsoft yahei", Verdana, Arial, Helvetica, sans-serif;
  color: #333;
}
body {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
// 进入过渡生效时
.fade-enter-active {
  transition: opacity 1s;
}
// 离开过渡生效
.fade-leave-active {
  opacity: 0;
  transition: opacity 1s;
}
</style>
