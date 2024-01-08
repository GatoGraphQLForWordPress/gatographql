(window.webpackJsonpGatoGraphQLSchemaConfigMultiFieldDirectives=window.webpackJsonpGatoGraphQLSchemaConfigMultiFieldDirectives||[]).push([[1],{50:function(s,a){s.exports='<h1 id="multi-field-directives">Multi-Field Directives</h1> <p>A single directive can be applied to multiple fields, for performance and extended use cases.</p> <h2 id="description">Description</h2> <p>This module allows directives to be applied to multiple fields, instead of only one. When enabled, an argument <code>affectAdditionalFieldsUnderPos</code> is added to all directives, where the relative positions of additional fields to apply the directive to can be specified.</p> <p>For instance, in the following query, directive <code>@strTranslate</code> is applied only to field <code>content</code>:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    excerpt\n    content <span class="hljs-meta">@strTranslate</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Field <code>excerpt</code> can also be applied directive <code>@strTranslate</code>, by adding the directive argument <code>affectAdditionalFieldsUnderPos</code> with value <code>[1]</code> (as <code>1</code> is the relative position of field <code>excerpt</code> from directive <code>@strTranslate</code>):</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    excerpt\n    content\n      <span class="hljs-meta">@strTranslate</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">affectAdditionalFieldsUnderPos</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1</span><span class="hljs-punctuation">]</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The number of fields to add is not limited. In this query, the <code>dateStr</code> is also being translated:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    dateStr\n    excerpt\n    content\n      <span class="hljs-meta">@strTranslate</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">affectAdditionalFieldsUnderPos</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1</span>, <span class="hljs-number">2</span><span class="hljs-punctuation">]</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The field over which the directive is naturally applied (such as <code>content</code> in all queries above) must not be specified on the argument.</p> <p>On the query above, the relative positions from directive <code>@strTranslate</code> to the previous fields are:</p> <ul> <li>Position <code>2</code>: <code>dateStr</code></li> <li>Position <code>1</code>: <code>excerpt</code></li> <li>Position <code>0</code>: <code>content</code> &lt;= It&#39;s implicit, always applied</li> </ul> <h2 id="use-cases">Use cases</h2> <p>There are two main use cases for this feature:</p> <ol> <li>Performance</li> <li>Extended functionality</li> </ol> <h3 id="performance">Performance</h3> <p>For directives that execute calls to external APIs, the lower number of requests they execute, they faster they will be resolved.</p> <p>That&#39;s the case with directive <code>@strTranslate</code>, which connects to the Google Translate API. Normally, to translate fields <code>content</code> and <code>excerpt</code> from a list of posts, the query would be this one:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    excerpt <span class="hljs-meta">@strTranslate</span>\n    content <span class="hljs-meta">@strTranslate</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>By adding <code>@strTranslate</code> twice, this query executes two requests to the Google Translate API (one to translate all values for <code>excerpt</code>, one for all values for <code>content</code>).</p> <p>Thanks to the <strong>Multi-Field Directives</strong> feature, the query below also translates all values for both <code>content</code> and <code>excerpt</code> fields, but instead it executes a single request to the Google Translate API:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    excerpt\n    content\n      <span class="hljs-meta">@strTranslate</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">affectAdditionalFieldsUnderPos</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1</span><span class="hljs-punctuation">]</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h3 id="extended-functionality">Extended Functionality</h3> <p>Directives receiving extra fields can provide additional calculations.</p> <p>For instance, directive <code>@export</code> normally exports the value of a single field, such as the logged-in user&#39;s name:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> GetLoggedInUserName <span class="hljs-punctuation">{</span>\n  me <span class="hljs-punctuation">{</span>\n    name <span class="hljs-meta">@export</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">as</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;userName&quot;</span><span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Through argument <code>affectAdditionalFieldsUnderPos</code>, <code>@export</code> can receive multiple fields, and will then export a dictionary containing those fields as entries:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> GetLoggedInUserNameAndSurname <span class="hljs-punctuation">{</span>\n  me <span class="hljs-punctuation">{</span>\n    name\n    surname\n      <span class="hljs-meta">@export</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">as</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;userProps&quot;</span>\n        <span class="hljs-symbol">affectAdditionalFieldsUnderPos</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1</span><span class="hljs-punctuation">]</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p><code>@export</code> will now produce the following value on variable <code>$userProps</code></p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Leo&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;surname&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Loso&quot;</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="configuration">Configuration</h2> <p>To enable or disable multi-field directives in the GraphQL schema, go to the &quot;Multi-Field Directives&quot; module on the Settings page, and tick/untick the checkbox for <code>Enable multi-field directives?</code>:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.5.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/multifield-directives/../../images/settings-multifield-directives.png" alt="Settings for Multi-Field Directives" title="Settings for Multi-Field Directives"></p> </div> <p>To enable or disable multi-field directives on a specific endpoint, select the desired option in block &quot;Multi-Field Directives&quot; from the corresponding Schema Configuration:</p> <div class="img-width-610" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.5.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/multifield-directives/../../images/schema-config-multifield-directives.png" alt="Multi-Field Directives in the Schema Configuration" title="Multi-Field Directives in the Schema Configuration"></p> </div> '}}]);