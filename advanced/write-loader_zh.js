webpackJsonp([16,24],{689:function(s,a){s.exports={content:'<p>模板配置中与 Loader 相关的字段有 <code>mappers</code> <code>loaders</code></p><ul><li><code>loaders</code> 形如</li></ul><pre><code class="hljs language-text"data-query={} data-lang=text>{\n  <span class=hljs-attribute>module</span>: <span class=hljs-built_in>require</span>(<span class=hljs-string>\'./loaders/module\'</span>),\n  foo: [<span class=hljs-built_in>require</span>(<span class=hljs-string>\'./loaders/foo\'</span>)],\n  LoDash: [\n    [<span class=hljs-built_in>require</span>(<span class=hljs-string>\'./loaders/lodash\'</span>), { <span class=hljs-comment>/*options*/</span> }]\n  ]\n}</code></pre><p>用于定义 loader 集合，预设两种 Loader: <a href=https://lodash.com/docs/4.17.5#template><code>LoDash</code></a> <code>module</code>.</p><p>LoDash 为模板替换 Loader，在文本中书写 <code>&lt;%= name %></code> 将会被替换。</p><p>而 <code>module</code> Loader 较为特殊，不是模板引擎替换，而是以 commonjs 的规范处理输出 JSON 数据，所以非常适合于json文本的处理。</p><p>如，书写一个名为 <code>package.json.js</code> 的文件</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-comment>// @loader module?indent=2</span>\n\n<span class=hljs-built_in>module</span>.exports = <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>{ _, test, description, name } = {}</span>) </span>{\n  <span class=hljs-keyword>const</span> pkg = {\n    name,\n    <span class=hljs-attr>version</span>: <span class=hljs-string>\'0.0.1\'</span>,\n    <span class=hljs-attr>dependencies</span>: {},\n    <span class=hljs-attr>main</span>: <span class=hljs-string>\'edam.js\'</span>,\n    <span class=hljs-attr>description</span>: description,\n    <span class=hljs-attr>author</span>: _.git.name,\n    <span class=hljs-attr>scripts</span>: {\n      <span class=hljs-attr>test</span>: <span class=hljs-string>\'jest\'</span>\n    },\n    <span class=hljs-attr>keywords</span>: [<span class=hljs-string>\'edam-template\'</span>],\n    <span class=hljs-attr>repository</span>: _.git.name + <span class=hljs-string>\'/\'</span> + name\n  }\n\n  <span class=hljs-keyword>if</span> (!test) {\n    <span class=hljs-keyword>delete</span> pkg.scripts.test\n  }\n\n  <span class=hljs-keyword>return</span> pkg\n}</code></pre><p>module Loader 将会输出为 <code>JSON.stringify(pkg, null, indent)</code>.</p><ul><li><code>mappers</code> 形如</li></ul><pre><code class="hljs language-text"data-query={} data-lang=text>[\n  {\n    // glob\n    test: <span class=hljs-symbol>\'*.ts</span>\',\n    loader: <span class=hljs-symbol>\'LoDash?query</span>\'\n  }\n]</code></pre><p>用于分发文件使用哪个<code>loader</code>，默认都采用 LoDash Loader 和 hbs Loader。</p><p><strong>注意：Edam@3 将会移除 LoDash Loader，默认引入 <a href=https://plopjs.com/documentation/#built-in-helpers>Plop Handlebar</a> Loader</strong> Plop Handlebar 使用 Handlebar 模板，注入了一些 helper:</p><ul><li>camelCase: changeFormatToThis</li><li>snakeCase: change_format_to_this</li><li>dashCase/kebabCase: change-format-to-this</li><li>dotCase: change.format.to.this</li><li>pathCase: change/format/to/this</li><li>properCase/pascalCase: ChangeFormatToThis</li><li>lowerCase: change format to this</li><li>sentenceCase: Change format to this,</li><li>constantCase: CHANGE_FORMAT_TO_THIS</li><li>titleCase: Change Format To This</li></ul><p>介绍完 loader 相关的概念后，进入正文：书写Loader</p><h2 id=怎么书写loader><a href=#%E6%80%8E%E4%B9%88%E4%B9%A6%E5%86%99loader aria-hidden=true><span class="icon icon-link"></span></a>怎么书写Loader</h2><p>官方提供两种预设Loader，可以提供参考</p><ul><li><a href=https://github.com/imcuttle/edam/blob/master/packages/edam/src/core/Compiler/loaders/lodash.ts>LoDash</a></li><li><a href=https://github.com/imcuttle/edam/blob/master/packages/edam/src/core/Compiler/loaders/module.ts>module</a></li></ul><h3 id=raw-loader><a href=#raw-loader aria-hidden=true><span class="icon icon-link"></span></a>Raw Loader</h3><p>Raw Loader 中第一个接受的值为 Buffer 类型。如下 Base64 Loader 就是一个 Raw Loader</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>module</span>.export = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>buffer, variables</span>) </span>{\n  <span class=hljs-comment>// const options = this.options</span>\n  <span class=hljs-keyword>return</span> buffer.toString(<span class=hljs-string>\'base64\'</span>)\n}\n<span class=hljs-comment>// NOTE</span>\n<span class=hljs-built_in>module</span>.export.raw = <span class=hljs-literal>true</span></code></pre><h3 id=synchronization><a href=#synchronization aria-hidden=true><span class="icon icon-link"></span></a>Synchronization</h3><p>如不指定 <code>raw</code> 为 <code>true</code>，则第一个接受值为字符串。如下Loader将小写转大写。</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>module</span>.exports = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>string</span>) </span>{\n  <span class=hljs-keyword>return</span> string.toUpperCase()\n}</code></pre><h3 id=asynchronization><a href=#asynchronization aria-hidden=true><span class="icon icon-link"></span></a>Asynchronization</h3><p>同时Loader支持异步返回，如下：</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>module</span>.exports = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>string</span>) </span>{\n  <span class=hljs-keyword>return</span> <span class=hljs-keyword>new</span> <span class=hljs-built_in>Promise</span>(<span class=hljs-function><span class=hljs-params>resolve</span> =></span> resolve(string.toUpperCase()))\n}</code></pre><h3 id=allowerror-235><a href=#allowerror-235 aria-hidden=true><span class="icon icon-link"></span></a>allowError (>=2.3.5)</h3><p>如果 loader 对于最终结果产生影响不大的话，使用 <code>allowError</code> 表示loader允许错误发生，不会对输出的结果产生影响 如 <code>edam-prettier-loader</code> 只是对最终结果美化，对于最终结果没有影响</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>module</span>.exports = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>string</span>) </span>{\n  <span class=hljs-keyword>return</span> <span class=hljs-keyword>new</span> <span class=hljs-built_in>Promise</span>(<span class=hljs-function><span class=hljs-params>resolve</span> =></span> resolve(string.toUpperCase()))\n}\n<span class=hljs-built_in>module</span>.exports.allowError = <span class=hljs-literal>true</span></code></pre>',extra:{"_image-loader_":[]}}}});
//# sourceMappingURL=write-loader_zh.js.map