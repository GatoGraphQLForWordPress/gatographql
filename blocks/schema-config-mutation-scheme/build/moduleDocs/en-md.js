(window.webpackJsonpGatoGraphQLSchemaConfigMutationScheme=window.webpackJsonpGatoGraphQLSchemaConfigMutationScheme||[]).push([[1],{50:function(s,n){s.exports='<h1 id="nested-mutations">Nested Mutations</h1> <p>Nested mutations enable to perform mutations on a type other than the root type in GraphQL.</p> <h2 id="description">Description</h2> <p>The query below executes a standard mutation, using the mutation field <code>updatePost</code> from the <code>Root</code> type:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> <span class="hljs-punctuation">{</span>\n  updatePost<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span>,\n    <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;New title&quot;</span>\n  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    title\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The query from above can also be executed through a nested mutation, where the post object is first queried through field <code>post</code>, and then mutation field <code>update</code>, which belongs to type <code>Post</code>, is applied on the post object:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> <span class="hljs-punctuation">{</span>\n  post<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">{</span> <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    update<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;New title&quot;</span>\n    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n      title\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Mutations can also be nested, modifying data on the result from another mutation:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> <span class="hljs-punctuation">{</span>\n  createPost<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;First title&quot;</span>\n  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    id\n    update<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Second title&quot;</span>,\n      <span class="hljs-symbol">contentAs</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">html</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Some content&quot;</span> <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n      title\n      content\n      addComment<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n        <span class="hljs-symbol">commentAs</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">html</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;My first comment&quot;</span> <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n        id\n        content\n        date\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="how-it-works">How it works</h2> <p>Nested mutations change the root type, from <code>QueryRoot</code> and <code>MutationRoot</code>, to a single <code>Root</code> type handling both queries and mutations:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.6/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/nested-mutations/../../images/schema-docs-nested-mutation.png" alt="Nested mutations in the schema docs"></p> <p>With nested mutations, every type in the schema can contain both query and mutation fields. To differentiate them, the mutation field&#39;s description is prepended with label <code>&quot;[Mutation] &quot;</code>.</p> <p>For instance, these are the fields for type <code>Root</code>:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.6/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/nested-mutations/../../images/mutation-desc-in-graphiql-docs.png" alt="Description for type `Root` in GraphiQL docs"></p> <h2 id="settings">Settings</h2> <p>Item &quot;Default Mutation scheme&quot; in the module settings enables to configure if to enable nested mutations or not, and its behavior:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.6/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/nested-mutations/../../images/settings-nested-mutations-default.png" alt="Settings for nested mutations"></p> </div> <p>It has these options:</p> <ul> <li>Do no enable nested mutations</li> <li>Enable nested mutations, keeping all mutation fields in the root</li> <li>Enable nested mutations, removing the redundant mutation fields from the root</li> </ul> <p>These options are set for the GraphQL server in general, but can be overriden for specific Custom Endpoints and Persisted Queries through the Schema Configuration (see the next section).</p> <h3 id="do-no-enable-nested-mutations">Do no enable nested mutations</h3> <p>This option disables nested mutations (using the standard behavior instead) for the GraphQL server.</p> <p>Disabling nested mutations can also be achieved by disabling the module, but in that case we can&#39;t enable nested mutations for specific Custom Endpoints and Persisted Queries through the Schema Configuration.</p> <h3 id="enable-nested-mutations-keeping-all-mutation-fields-in-the-root">Enable nested mutations, keeping all mutation fields in the root</h3> <p>When nested mutations are enabled, mutation fields may be added two times to the schema:</p> <ul> <li>once under the <code>Root</code> type</li> <li>once under the specific type</li> </ul> <p>For instance:</p> <ul> <li><code>Root.updatePost</code></li> <li><code>Post.update</code></li> </ul> <p>With this option, the &quot;duplicated&quot; mutation fields from the <code>Root</code> type are kept.</p> <h3 id="enable-nested-mutations-removing-the-redundant-mutation-fields-from-the-root">Enable nested mutations, removing the redundant mutation fields from the root</h3> <p>Same option as above, but removing the &quot;duplicated&quot; mutation fields from the <code>Root</code> type.</p> <h2 id="schema-configuration">Schema configuration</h2> <p>A &quot;Mutation Scheme&quot; section has been added to a Schema Configuration, allowing to enable/disable/configure nested mutations for Custom Endpoints and Persisted Queries on an individual basis.</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.6/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/nested-mutations/../../images/schema-configuration-mutation-scheme.png" alt="Mutation scheme in the schema configuration"></p> <h2 id="graphql-spec">GraphQL spec</h2> <p>This functionality is currently not part of the GraphQL spec, but it has been requested:</p> <ul> <li><a href="https://github.com/graphql/graphql-spec/issues/252">Issue #252 - Proposal: Serial fields (nested mutations)</a></li> </ul> '}}]);