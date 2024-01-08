(window.webpackJsonpGatoGraphQLSchemaConfigComposableDirectives=window.webpackJsonpGatoGraphQLSchemaConfigComposableDirectives||[]).push([[1],{50:function(s,a){s.exports='<h1 id="composable-directives">Composable Directives</h1> <p>Allow directives to nest and modify the behavior of other directives.</p> <h2 id="description">Description</h2> <p>This module allows directives to execute complex functionalities, by composing other directives inside, calling them before/after preparing the field value accordingly. Directives with this capability are called &quot;meta directives&quot;.</p> <p>A use case is to convert the type of the field value to the type expected by the nested directive. For instance, each element from an array can be provided to a directive that expects a single value. In this query, field <code>capabilities</code> returns <code>[String]</code> (an array of strings), and directive <code>@strUpperCase</code> receives <code>String</code>. Hence, executing the following query:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> <span class="hljs-punctuation">{</span>\n  user<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    capabilities <span class="hljs-meta">@strUpperCase</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>...returns an error due to the type mismatch:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;errors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n    <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Directive &#x27;strUpperCase&#x27; from field &#x27;capabilities&#x27; cannot be applied on object with ID &#x27;1&#x27; because it is not a string&quot;</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;user&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;capabilities&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The meta directive <code>@underEachArrayItem</code> (provided via extension <strong>Data Iteration Meta Directives</strong>) can solve this problem, as it iterates over an array of elements and applies its nested directive on each of them, setting the stage before <code>@strUpperCase</code> is executed and making it receive a single element (of type <code>String</code>) instead of an array.</p> <p>The query from above can be satisfied like this:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> <span class="hljs-punctuation">{</span>\n  user<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    capabilities\n      <span class="hljs-meta">@underEachArrayItem</span>\n        <span class="hljs-meta">@strUpperCase</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>...producing the intended response:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;user&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;capabilities&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n        <span class="hljs-string">&quot;READ&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-string">&quot;LEVEL_0&quot;</span>\n      <span class="hljs-punctuation">]</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="using-meta-directives">Using meta directives</h2> <p>Every meta directive can affect (or &quot;nest&quot;) multiple directives at once. Which directives are affected is indicated via argument <code>affectDirectivesUnderPos</code>, which receives an array of positive integers, each of them defining the affected directive&#39;s relative position.</p> <p>By default, argument <code>affectDirectivesUnderPos</code> has default value <code>[1]</code>, meaning that it will affect the directive right next to it.</p> <p>In the example below, we have:</p> <ul> <li><code>@underEachArrayItem</code> is the meta directive</li> <li><code>@strTranslate</code> is nested under <code>@underEachArrayItem</code> (implicit default value <code>affectDirectivesUnderPos: [1]</code>)</li> </ul> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  someField\n    <span class="hljs-meta">@underEachArrayItem</span>\n      <span class="hljs-meta">@strTranslate</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>In the example below, we instead have:</p> <ul> <li><code>@strTranslate</code> and <code>@strUpperCase</code> are nested under <code>@underEachArrayItem</code> (as indicated by relative positions <code>[1, 2]</code> in argument <code>affectDirectivesUnderPos</code>)</li> </ul> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  someField\n    <span class="hljs-meta">@underEachArrayItem</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">affectDirectivesUnderPos</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1</span>, <span class="hljs-number">2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@strTranslate</span>\n      <span class="hljs-meta">@strUpperCase</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Meta directives can also be nested within meta directives.</p> <p>In the example below, we have:</p> <ul> <li><code>@underEachArrayItem</code> is the topmost meta directive</li> <li><code>@underJSONObjectProperty</code> is nested under <code>@underEachArrayItem</code></li> <li><code>@strUpperCase</code> is nested under <code>@underJSONObjectProperty</code></li> </ul> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> UppercaseEntriesInsideObject <span class="hljs-punctuation">{</span>\n  <span class="hljs-symbol">entries</span><span class="hljs-punctuation">:</span> _echo<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n    <span class="hljs-punctuation">{</span>\n      <span class="hljs-symbol">text</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Hello my friends&quot;</span>\n    <span class="hljs-punctuation">}</span>,\n    <span class="hljs-punctuation">{</span>\n      <span class="hljs-symbol">text</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;How do you like this software so far?&quot;</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">)</span>\n   <span class="hljs-meta">@underEachArrayItem</span>\n      <span class="hljs-meta">@underJSONObjectProperty</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">key</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n        <span class="hljs-meta">@strUpperCase</span>\n  <span class="hljs-punctuation">}</span></span></code></pre> <p>The response is:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;entries&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HELLO MY FRIENDS&quot;</span>\n      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HOW DO YOU LIKE THIS SOFTWARE SO FAR?&quot;</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">]</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h3 id="exporting-dynamic-variables">Exporting dynamic variables</h3> <p>A meta directive can pass the value it contains as a &quot;dynamic variable&quot; to its nested directives, via a directive argument (<code>passValueOnwardsAs</code> for <code>@underEachArrayItem</code>, or <code>passOnwardsAs</code> otherwise).</p> <p>In the query below, the array <code>[&quot;Hello everyone&quot;, &quot;How are you?&quot;]</code> is iterated upon using <code>@underEachArrayItem</code>, and by defining argument <code>passValueOnwardsAs: &quot;text&quot;</code> each value in the array is made available to the nested directive <code>@applyField</code> under the dynamic variable <code>$text</code>:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> <span class="hljs-punctuation">{</span>\n  _echo<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Hello everyone&quot;</span>, <span class="hljs-string">&quot;How are you?&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">)</span>\n    <span class="hljs-meta">@underEachArrayItem</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">passValueOnwardsAs</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text&quot;</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strReplace&quot;</span>\n        <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-symbol">search</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot; &quot;</span>\n            <span class="hljs-symbol">replaceWith</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;-&quot;</span>\n            <span class="hljs-symbol">in</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$text</span>\n        <span class="hljs-punctuation">}</span>,\n        <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n      <span class="hljs-punctuation">)</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>This will produce:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;echo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-string">&quot;Hello-everyone&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-string">&quot;How-are-you?&quot;</span>\n    <span class="hljs-punctuation">]</span>\n  <span class="hljs-punctuation">}</span></span></code></pre> <h2 id="configuration">Configuration</h2> <p>To enable or disable composable directives in the GraphQL schema, go to the &quot;Composable Directives&quot; module on the Settings page, and tick/untick the checkbox for <code>Enable composable directives?</code>:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.5.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/composable-directives/../../images/settings-composable-directives.png" alt="Settings for Composable Directives" title="Settings for Composable Directives"></p> </div> <p>To enable or disable composable directives on a specific endpoint, select the desired option in block &quot;Composable Directives&quot; from the corresponding Schema Configuration:</p> <div class="img-width-610" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.5.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/composable-directives/../../images/schema-config-composable-directives.png" alt="Composable Directives in the Schema Configuration" title="Composable Directives in the Schema Configuration"></p> </div> <h2 id="examples">Examples</h2> <p>Translating the post categories from English to French:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> <span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    id\n    title\n    categoryNames\n      <span class="hljs-meta">@underEachArrayItem</span>\n        <span class="hljs-meta">@strTranslate</span><span class="hljs-punctuation">(</span>\n          <span class="hljs-symbol">from</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;en&quot;</span>,\n          <span class="hljs-symbol">to</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;fr&quot;</span>\n        <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Transform a single post&#39;s <code>&quot;title.rendered&quot;</code> property, obtained through the WP REST API endpoint, into title case:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> <span class="hljs-punctuation">{</span>\n  <span class="hljs-symbol">postData</span><span class="hljs-punctuation">:</span> _sendJSONObjectItemHTTPRequest<span class="hljs-punctuation">(</span>\n    <span class="hljs-symbol">url</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/posts/1/?_fields=id,type,title,date&quot;</span>\n  <span class="hljs-punctuation">)</span>\n    <span class="hljs-meta">@underJSONObjectProperty</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;title.rendered&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@strTitleCase</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Transform multiple posts&#39; <code>&quot;title.rendered&quot;</code> property into upper case:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> <span class="hljs-punctuation">{</span>\n  <span class="hljs-symbol">postListData</span><span class="hljs-punctuation">:</span> _sendJSONObjectCollectionHTTPRequest<span class="hljs-punctuation">(</span>\n    <span class="hljs-symbol">url</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/posts/?per_page=3&amp;_fields=id,type,title,date&quot;</span>\n  <span class="hljs-punctuation">)</span>\n    <span class="hljs-meta">@underEachArrayItem</span>\n      <span class="hljs-meta">@underJSONObjectProperty</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;title.rendered&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n        <span class="hljs-meta">@strUpperCase</span>\n<span class="hljs-punctuation">}</span></span></code></pre> '}}]);