---
socials:
  - icon: i-eva:github-outline
    link: https://github.com/ikoodar
  - icon: i-ri:twitter-fill
    link: https://gitee.com/lycnihao
    alias: 'twitter'
  - icon: i-ant-design:zhihu-outlined
    link: https://www.zhihu.com/people/neilyo-99-90
    alias: 'zhihu'
  - icon: i-ri-bilibili-fill
    link: https://space.bilibili.com/327872329
    alias: 'bilibili'
---

<div flex justify-between items-end>
  <div text-2xl sm:text-4xl font-bold>
    <div>Hi, I'm <span text-c-dark>lYuanC</span>👋。</div>
    <div flex>Java <Developer ml-3 /></div>
    <Links :links="frontmatter.socials" mt-5/>
  </div>
  <div 
    class="p-1 mb-1 border border-c rounded-full hidden md:block"
    shadow="[inset_0_0_10px_#000000] slate-200 dark:slate-800"
  >
    <FlipImage class="!w-40" src="/avatar.png" alt="avatar" />
  </div>
</div>

---

<div grid="~ cols-4" gap-3 lt-md:grid-cols-3>
  <div lt-md:hidden flex justify-center items-center col-span-1>
    <img rounded-md w-160px src="/images/home/hello.png" alt="hello">
  </div>
  <p col-span-3>
    你好，我是<span text-c-dark>lYuanC</span>，一个Java开发工程师，目前在长沙工作。<br/><br/>
    在这里，我将我的想法，欢迎大家浏览。
  </p>
</div>

![](/images/home/bg.jpg)

## 关于我

- 🥰 我叫 lYuanC 🧑🏻‍💻.

- 👾 普通码农，`Java` crud boy.

- 🚀 喜欢骑行、羽毛球、听音乐等.

- 🍔 等攒够了六便士就去寻找属于我的月亮: `while(true) { money++; }`.

## 其他

您可以使用以下信息介绍:

<div grid="~ cols-[max-content_1fr] gap-1" border-c-dark border-1 p-3 rounded-md>
  <div text-right pr2 op50 font-bold>名字</div>
  <TextCopy>lYuanC</TextCopy>

  <div text-right pr2 op50 font-bold>头像</div>
  <div><a href="https://koodar.net/avatar.png" target="_blank">https://blog.koodar.net/avatar.png</a></div>

  <div text-right pr2 op50 font-bold>描述</div>
  <TextCopy>普通码农一个，没什么好说的</TextCopy>

  <div text-right pr2 op50 font-bold>位置</div>
  <TextCopy>中国, 长沙</TextCopy>

  <div text-right pr2 op50 font-bold>网站</div>
  <TextCopy><a href="https://blog.koodar.net" target="_blank">blog.koodar.net</a></TextCopy>

  <div text-right pr2 op50 font-bold>GitHub</div>
  <TextCopy><a href="https://github.com/ikoodar" target="_blank">@lYuanC</a></TextCopy>
</div>



<route lang="yaml">
meta: 
  layout: about
</route>

