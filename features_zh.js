webpackJsonp([1,24],{239:function(s,a,n){s.exports=n.p+"54d6cb2f693ceb46c5ae49b090874d1b.svg"},696:function(s,a,n){s.exports={content:"<style>.post{max-width:700px;margin:auto}</style><h1 id=特性><a href=#%E7%89%B9%E6%80%A7 aria-hidden=true><span class=\"icon icon-link\"></span></a>特性</h1><p><img src=./imgs/features.svg data-image-loader=0></p><h2 id=可推理的配置><a href=#%E5%8F%AF%E6%8E%A8%E7%90%86%E7%9A%84%E9%85%8D%E7%BD%AE aria-hidden=true><span class=\"icon icon-link\"></span></a>可推理的配置</h2><p>如 .babelrc 一般，edam 能够从 <code>process.cwd()</code> 寻找 edam 配置，并且依次向父亲寻找。（使用<a href=https://github.com/davidtheclark/cosmiconfig>cosmiconfig</a>）。并且 json 文件支持注释等人性化语法（<a href=https://github.com/json5/json5>JSON5</a>）</p><p>其中支持像 <a href=http://www.typescriptlang.org/docs/handbook/tsconfig-json.html><code>tsconfig.json</code></a> 中的 extends 字段。</p><p>如</p><pre><code class=\"hljs language-text\"data-query={} data-lang=text><span class=hljs-comment>// root/.edamrc</span>\n{\n  <span class=hljs-attribute>alias</span>: {\n    <span class=hljs-attribute>react</span>: <span class=hljs-string>'facebook/react'</span>\n  },\n  <span class=hljs-attribute>plugins</span>: [<span class=hljs-string>'edam-plugin-dulcet-prompt'</span>]\n}\n<span class=hljs-comment>// root/tpl/.edamrc</span>\n{\n  <span class=hljs-attribute>extends</span>: [<span class=hljs-string>'../.edamrc'</span>]\n  <span class=hljs-attribute>alias</span>: {\n    <span class=hljs-attribute>edam</span>: {\n      <span class=hljs-attribute>type</span>: <span class=hljs-string>'git'</span>,\n      <span class=hljs-attribute>url</span>: <span class=hljs-string>'imcuttle/edam'</span>,\n      <span class=hljs-attribute>config</span>: {\n        <span class=hljs-attribute>output</span>: <span class=hljs-string>\"./here\"</span>\n      }\n      <span class=hljs-comment>// 优先级更高，在 source 选中 edam 时候，config 会生效</span>\n      <span class=hljs-comment>// 支持属性: cacheDir / output / plugins / storePrompts / pull</span>\n      <span class=hljs-comment>// >= 2.1.0</span>\n    }\n  }\n}\n<span class=hljs-comment>// root/tpl/.edamrc 等同于</span>\n{\n  <span class=hljs-attribute>alias</span>: {\n    <span class=hljs-attribute>edam</span>: {\n      <span class=hljs-attribute>type</span>: <span class=hljs-string>'git'</span>,\n      <span class=hljs-attribute>url</span>: <span class=hljs-string>'imcuttle/edam'</span>,\n      <span class=hljs-attribute>config</span>: {\n        <span class=hljs-attribute>output</span>: <span class=hljs-string>\"./here\"</span>\n      }\n    },\n    <span class=hljs-attribute>react</span>: <span class=hljs-string>'facebook/react'</span>\n  },\n  <span class=hljs-attribute>plugins</span>: [<span class=hljs-string>'edam-plugin-dulcet-prompt'</span>]\n}</code></pre><h2 id=支持三种模板来源><a href=#%E6%94%AF%E6%8C%81%E4%B8%89%E7%A7%8D%E6%A8%A1%E6%9D%BF%E6%9D%A5%E6%BA%90 aria-hidden=true><span class=\"icon icon-link\"></span></a>支持三种模板来源</h2><p>默认支持 <code>npm/git/file</code> 三种模板来源：</p><h3 id=npm><a href=#npm aria-hidden=true><span class=\"icon icon-link\"></span></a><code>npm</code></h3><p>edam 将从 npm 中拉取模板，如我们可以直接在 cli 中指定来源为 <code>npm:edam@1.0.0</code> 或者在配置文件中写更明确的来源</p><pre><code class=\"hljs language-text\"data-query={} data-lang=text>{\n  <span class=hljs-attribute>source</span>: {\n    type: <span class=hljs-string>'npm'</span>,\n    url: <span class=hljs-string>'edam'</span>,\n    version: <span class=hljs-string>'latest'</span>\n  }\n}</code></pre><h3 id=git><a href=#git aria-hidden=true><span class=\"icon icon-link\"></span></a>git</h3><p>edam 还可以从远端 git 服务器拉取模板，如我们可以直接在 cli 中指定来源为 <code>github:imcuttle/cuttle?checkout=master</code> 或者在配置文件中写更明确的来源</p><pre><code class=\"hljs language-text\"data-query={} data-lang=text>{\n  <span class=hljs-attribute>source</span>: {\n    <span class=hljs-attribute>type</span>: <span class=hljs-string>'git'</span>,\n    <span class=hljs-attribute>url</span>: <span class=hljs-string>'https://github.com/imcuttle/edam.git'</span>,\n    <span class=hljs-comment>// branch / commit SHA / tag</span>\n    <span class=hljs-attribute>checkout</span>: <span class=hljs-string>'master'</span>\n  }\n}</code></pre><h3 id=file><a href=#file aria-hidden=true><span class=\"icon icon-link\"></span></a>file</h3><p>当然啦，edam 肯定是可以从本地文件拉取模板，直接指定来源为文件路径即可。</p><h2 id=保持上一次的输入值><a href=#%E4%BF%9D%E6%8C%81%E4%B8%8A%E4%B8%80%E6%AC%A1%E7%9A%84%E8%BE%93%E5%85%A5%E5%80%BC aria-hidden=true><span class=\"icon icon-link\"></span></a>保持上一次的输入值</h2><p>每次生成一份模板产物的时候，我们都需要去输入那些交互值，edam 会保存你上次输入值。而且你也可以使用 <code>yes</code> 去跳过哪些频繁的输入交互。</p><h2 id=自定义-loader-与-内联-loader><a href=#%E8%87%AA%E5%AE%9A%E4%B9%89-loader-%E4%B8%8E-%E5%86%85%E8%81%94-loader aria-hidden=true><span class=\"icon icon-link\"></span></a>自定义 loader 与 内联 loader</h2><p>模板开发者可以使用任意社区中的模板引擎，如官方提供的一个 loader: <a href=https://github.com/imcuttle/edam/blob/master/packages/edam-prettier-loader/index.js>edam-prettier-loader</a>，用于美化文本。</p><h2 id=可拔插><a href=#%E5%8F%AF%E6%8B%94%E6%8F%92 aria-hidden=true><span class=\"icon icon-link\"></span></a>可拔插</h2><p>可以根据自己的需要，书写自己的插件，如<a href=https://github.com/imcuttle/edam/blob/master/packages/edam-plugin-dulcet-prompt/index.js>edam-plugin-dulcet-prompt</a></p><h2 id=命令行自动补全><a href=#%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8 aria-hidden=true><span class=\"icon icon-link\"></span></a>命令行自动补全</h2><p><a href=https://github.com/imcuttle/edam/blob/master/packages/edam-completer/Readme.md>edam-completer</a></p>",extra:{"_image-loader_":[n(239)]}}}});
//# sourceMappingURL=features_zh.js.map