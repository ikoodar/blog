---
title: VitePress集成UnoCss
lang: zh
excerpt: VitePress集成UnoCss
---
### 起因

最近搭建了一个VitePress程序，由于markdown文档中添加了一些css代码辅助布局，故此在系统中引入Unocss

### 过程

1. 引入Unocss模块

```cmd
npm install unocss --save-dev  
```

2. 创建一个unocss.config.ts

unocss规则都写在这个文件中

```ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // 其他规则...
  theme: {
    fontFamily: {
      sans: 'Computer Modern Sans, LXGW WenKai, HKST',
    },
    boxShadow: {
      nav: '0 1px 8px 0 rgba(27, 35, 47, .1)',
    },
    colors: {
      brand: '#1772d0',
    },
    maxWidth: {
      content: '90ch',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'sub',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        ui: 'DM Sans:400,700',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
  // 其他规则...
})
```

3. 修改config.mts

在config中添加vite属性，并在plugins中引入UnoCss

```ts
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite';
import UnoCssConfig from '../unocss.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 其他属性...
  // 参考自 https://github.com/vuejs/vitepress/issues/2424
  vite: {
    optimizeDeps: {
      exclude: ['vitepress']
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    plugins: [
      UnoCSS(UnoCssConfig)
    ]
  }
  // 其他属性...
})
```

### 最后

至此，md文档中就可以使用如下格式的写法啦

```markdown
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

## 关于我

- 🥰 我叫 lYuanC 🧑🏻‍💻.

- 👾 普通码农，`Java` crud boy.

- 🚀 喜欢骑行、羽毛球、听音乐等.

- 🍔 等攒够了六便士就去寻找属于我的月亮: `while(true) { money++; }`.
```

