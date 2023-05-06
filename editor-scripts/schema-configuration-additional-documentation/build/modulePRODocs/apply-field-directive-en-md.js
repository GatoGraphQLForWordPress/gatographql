(window.webpackJsonpGatoGraphQLSchemaConfigurationAdditionalDocumentation=window.webpackJsonpGatoGraphQLSchemaConfigurationAdditionalDocumentation||[]).push([[11],{57:function(s,a){s.exports='<h1 id="apply-field-directive">Apply Field Directive</h1> <p><code>@applyField</code> directive, to execute a certain field on the resolved field&#39;s value</p> <h2 id="description">Description</h2> <p>Applied to some field, the <code>@applyField</code> directive allows to execute another field (which is available on the same type and is applied on the same object), and either pass that resulting value along to another directive, or override the value of the field.</p> <p>This allows us to manipulate the field&#39;s value in multiple ways, applying some functionality as provided via the <strong>Function Fields</strong>, and storing the new result in the response.</p> <p>In the query below, the <code>Post.title</code> field for the object has value <code>&quot;Hello world!&quot;</code>. By adding <code>@applyField</code> to execute the field <code>_strUpperCase</code> (and preceding it with <code>@passOnwards</code>, which exports the field value under dynamic <code>$input</code>):</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  post<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    title\n      <span class="hljs-meta">@passOnwards</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">as</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;input&quot;</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strUpperCase&quot;</span>\n        <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-symbol">text</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$input</span>\n        <span class="hljs-punctuation">}</span>,\n        <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>...the field value is transformed to upper case, producing:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HELLO WORLD!&quot;</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="how-to-use">How to use</h2> <p><code>@applyField</code> receives the following arguments:</p> <table> <thead> <tr> <th>Argument</th> <th>Mandatory?</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><code>name</code></td> <td>Yes</td> <td>The name of the field to execute (eg: <code>_strUpperCase</code>)</td> </tr> <tr> <td><code>arguments</code></td> <td>No, unless the field has mandatory arguments</td> <td>A JSON object with the arguments to pass to the field (eg: <code>{ text: $input }</code> to execute <code>_strUpperCase(text: $input)</code>)</td> </tr> <tr> <td><code>setResultInResponse</code></td> <td>No (can also provide <code>passOnwardsAs</code>)</td> <td>if <code>true</code>, it will override the field value in the response</td> </tr> <tr> <td><code>passOnwardsAs</code></td> <td>No (can also provide <code>setResultInResponse</code>)</td> <td>The dynamic variable name under which to define the resulting value</td> </tr> </tbody></table> <h3 id="name"><code>name</code></h3> <p>The field name corresponds to some field that lives on the same type where <code>@applyFunction</code> is being applied. For instance, in the previous query below, it is applied on the <code>Post</code> type.</p> <p>Because <strong>Global Fields</strong> are present in all types, these can always be referenced via <code>@applyFunction</code>. In particular, all fields available via <strong>Function Fields</strong> can be executed (including <code>_objectProperty</code>, <code>_strSubstr</code>, <code>_strReplace</code>, and all others).</p> <h3 id="arguments"><code>arguments</code></h3> <p>These are the arguments to pass to the field. Please notice that this argument is not mandatory by itself, however when the field has mandatory arguments, then it must be provided.</p> <p>In the previous query, function <code>_strUpperCase</code> has a mandatory <code>text</code> input. If it is not provided:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  post<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    title\n      <span class="hljs-meta">@passOnwards</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">as</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;input&quot;</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strUpperCase&quot;</span>\n        <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>...then we obtain an error:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;errors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n    <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Directive &#x27;applyField&#x27; failed because its nested function &#x27;_strUpperCase&#x27; produced errors&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;causes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n        <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mandatory argument &#x27;text&#x27; in field &#x27;_strUpperCase&#x27; of type &#x27;Post&#x27; has not been provided&quot;</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">]</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h3 id="setresultinresponse"><code>setResultInResponse</code></h3> <p>When set to <code>true</code>, the value from the applied field will override the original field&#39;s value in the response.</p> <h3 id="passonwardsas"><code>passOnwardsAs</code></h3> <p>This argument accepts a <code>String</code> corresponding to a dynamic variable name, to export the resulting applied field&#39;s value. This value can then be input to another directive, which will eventually override the original value (using <code>setResultInResponse: true</code>).</p> <p>In the query below, there are 2 <code>@applyFunction</code> operations applied:</p> <ol> <li>Transform to upper case, and pass the value onwards under <code>$ucTitle</code></li> <li>Replace <code>&quot; &quot;</code> with <code>&quot;-&quot;</code> and override the field value</li> </ol> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  post<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    title\n      <span class="hljs-meta">@passOnwards</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">as</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;input&quot;</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strUpperCase&quot;</span>\n        <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-symbol">text</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$input</span>\n        <span class="hljs-punctuation">}</span>,\n        <span class="hljs-symbol">passOnwardsAs</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ucTitle&quot;</span>\n      <span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strReplace&quot;</span>\n        <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-symbol">replace</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot; &quot;</span>,\n          <span class="hljs-symbol">with</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;-&quot;</span>,\n          <span class="hljs-symbol">in</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$ucTitle</span>\n        <span class="hljs-punctuation">}</span>,\n        <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The response will be:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HELLO-WORLD!&quot;</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="further-examples">Further examples</h2> <p>Retrieve the opposite value than the field provides:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    id\n    <span class="hljs-symbol">notHasComments</span><span class="hljs-punctuation">:</span> hasComments\n      <span class="hljs-meta">@passOnwards</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">as</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;hasComments&quot;</span><span class="hljs-punctuation">)</span>\n      <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n        <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_not&quot;</span>,\n        <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$hasComments</span>\n        <span class="hljs-punctuation">}</span>,\n        <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n      <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Manipulate all items in an array, shortening to no more than 20 chars long:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    categoryNames\n      <span class="hljs-meta">@forEach</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">passValueOnwardsAs</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;categoryName&quot;</span><span class="hljs-punctuation">)</span>\n        <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n          <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strSubstr&quot;</span>\n          <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-symbol">string</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$categoryName</span>,\n            <span class="hljs-symbol">offset</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>,\n            <span class="hljs-symbol">length</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>\n          <span class="hljs-punctuation">}</span>,\n          <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n        <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Convert the first item of an array to upper case:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    categoryNames\n      <span class="hljs-meta">@underArrayItem</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">passOnwardsAs</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;value&quot;</span>, <span class="hljs-symbol">index</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">)</span>\n        <span class="hljs-meta">@applyField</span><span class="hljs-punctuation">(</span>\n          <span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_strUpperCase&quot;</span>\n          <span class="hljs-symbol">arguments</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-symbol">text</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$value</span>\n          <span class="hljs-punctuation">}</span>,\n          <span class="hljs-symbol">setResultInResponse</span><span class="hljs-punctuation">:</span> <span class="hljs-literal">true</span>\n        <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> '}}]);