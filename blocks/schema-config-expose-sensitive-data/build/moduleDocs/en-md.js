(globalThis.webpackChunkschema_config_expose_sensitive_data=globalThis.webpackChunkschema_config_expose_sensitive_data||[]).push([[882],{187:e=>{e.exports='<h1 id="expose-sensitive-data-in-the-schema">Expose Sensitive Data in the Schema</h1> <p>Expose “sensitive” data elements in the GraphQL schema, which provide access to potentially private user data.</p> <p>The GraphQL schema must strike a balance between public and private elements (including fields and input fields), as to avoid exposing private information in a public API.</p> <p>For instance, to access post data, we have field <code>Root.posts</code>, which by default can only retrieve published posts. With this module, a new option <code>Expose Sensitive Data in the Schema</code> is added to the Schema Configuration. When enabled, argument <code>filter</code> in <code>Root.posts</code> exposes an additional input <code>status</code>, enabling to retrieve non-published posts (eg: posts with status <code>&quot;draft&quot;</code>), which is private data.</p> <h2 id="list-of-sensitive-data-elements">List of “sensitive” data elements</h2> <p>By default, the following data elements are treated as “sensitive” (they can also be configured as “normal” in the Settings page for the corresponding module; see below):</p> <p><strong>User:</strong></p> <ul> <li><code>email</code></li> <li><code>roles</code></li> <li><code>capabilities</code></li> </ul> <p><strong>Custom Posts:</strong></p> <ul> <li><code>status</code></li> <li><code>wpAdminEditURL</code></li> <li><code>hasPassword</code></li> <li><code>password</code></li> <li><code>rawContent</code></li> <li><code>rawTitle</code></li> <li><code>rawExcerpt</code></li> </ul> <p><strong>Comments:</strong></p> <ul> <li><code>status</code></li> <li><code>rawContent</code></li> </ul> <p><strong>Custom Post Mutations:</strong></p> <ul> <li><code>authorBy</code> input</li> </ul> <p><strong>Menu Items:</strong></p> <ul> <li><code>rawTitle</code></li> </ul> <h2 id="inspecting-the-sensitive-data-elements-via-schema-introspection">Inspecting the “sensitive” data elements via schema introspection</h2> <p>The <code>isSensitiveDataElement</code> property is added to field <code>extensions</code> when doing schema introspection. To find out which are the “sensitive” data elements from the schema, execute this query:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">query</span> ViewSensitiveDataElements <span class="hljs-punctuation">{</span>\n  __schema <span class="hljs-punctuation">{</span>\n    types <span class="hljs-punctuation">{</span>\n      name\n      fields <span class="hljs-punctuation">{</span>\n        name\n        extensions <span class="hljs-punctuation">{</span>\n          isSensitiveDataElement\n        <span class="hljs-punctuation">}</span>\n        args <span class="hljs-punctuation">{</span>\n          name\n          extensions <span class="hljs-punctuation">{</span>\n            isSensitiveDataElement\n          <span class="hljs-punctuation">}</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">}</span>\n      inputFields <span class="hljs-punctuation">{</span>\n        name\n        extensions <span class="hljs-punctuation">{</span>\n          isSensitiveDataElement\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">}</span>\n      enumValues <span class="hljs-punctuation">{</span>\n        name\n        extensions <span class="hljs-punctuation">{</span>\n          isSensitiveDataElement\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>And then search for entries with <code>&quot;isSensitiveDataElement&quot;: true</code> in the results.</p> <h2 id="overriding-the-default-configuration">Overriding the default configuration</h2> <p>The elements listed above can be made public.</p> <p>In the Settings page, in the corresponding tab for each, there is a checkbox to configure if to treat them as “sensitive” or “normal”:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/11.1.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-expose-sensitive-data/../../images/settings-treat-user-email-as-sensitive-data.webp" alt="Settings to treat user email as “sensitive” data"></p> </div> <h2 id="how-to-use">How to use</h2> <p>Exposing “sensitive” data elements in the schema can be configured as follows, in order of priority:</p> <p>✅ Specific mode for the custom endpoint or persisted query, defined in the schema configuration</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/11.1.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-expose-sensitive-data/../../images/schema-configuration-adding-sensitive-fields-to-schema.webp" alt="Adding sensitive fields to the schema, set in the Schema configuration" title="Adding sensitive fields to the schema, set in the Schema configuration"></p> <p>✅ Default mode, defined in the Settings</p> <p>If the schema configuration has value <code>&quot;Default&quot;</code>, it will use the mode defined in the Settings:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/11.1.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-expose-sensitive-data/../../images/settings-schema-expose-sensitive-data-default.webp" alt="Expose Sensitive Data in the Schema, in the Settings" title="Expose Sensitive Data in the Schema, in the Settings"></p> </div> <h2 id="when-to-use">When to use</h2> <p>Use whenever exposing private information is allowed, such as when building a static website, fetching data from a local WordPress instance (i.e. not a public API).</p> '}}]);