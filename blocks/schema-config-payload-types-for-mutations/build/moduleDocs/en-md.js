(window.webpackJsonpGatoGraphQLSchemaConfigPayloadTypesForMutations=window.webpackJsonpGatoGraphQLSchemaConfigPayloadTypesForMutations||[]).push([[1],{50:function(s,a){s.exports='<h1 id="mutations">Mutations</h1> <p>Mutations are operations that have side effects, such as performing an insert or update of data in the database. The available mutation fields are those under the <code>MutationRoot</code> type (or some of the fields under <code>Root</code> when using nested mutations), and these can be executed in the GraphQL document via the operation type <code>mutation</code>:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> <span class="hljs-punctuation">{</span>\n  updatePost<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span>,\n    <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;New title&quot;</span>\n  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    title\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The <strong>Mutations</strong> module acts as an upstream dependency for all modules containing mutations. This allows us to remove all mutations from the GraphQL schema simply by disabling this module.</p> <h2 id="returning-a-payload-object-or-the-mutated-entity">Returning a Payload Object or the Mutated Entity</h2> <p>Mutation fields can be configured to return either of these 2 different entities:</p> <ul> <li>A payload object type</li> <li>Directly the mutated entity</li> </ul> <h3 id="payload-object-type">Payload object type</h3> <p>A payload object type contains all the data concerning the mutation:</p> <ul> <li>The status of the mutation (success or failure)</li> <li>The errors (if any) using distinctive GraphQL types, or</li> <li>The successfully mutated entity</li> </ul> <p>For instance, mutation <code>updatePost</code> returns an object of type <code>PostUpdateMutationPayload</code> (please notice that we still need to query its field <code>post</code> to retrieve the updated post entity):</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> UpdatePost <span class="hljs-punctuation">{</span>\n  updatePost<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1724</span>,\n    <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;New title&quot;</span>,\n    <span class="hljs-symbol">status</span><span class="hljs-punctuation">:</span> publish\n  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-comment"># This is the status of the mutation: SUCCESS or FAILURE</span>\n    status\n    errors <span class="hljs-punctuation">{</span>\n      __typename\n      <span class="hljs-punctuation">...</span><span class="hljs-keyword">on</span> ErrorPayload <span class="hljs-punctuation">{</span>\n        message\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span>\n    post <span class="hljs-punctuation">{</span>\n      id\n      title\n      <span class="hljs-comment"># This is the status of the post: publish, pending, trash, etc</span>\n      status\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The payload object allows us to represent better the errors, even having a unique GraphQL type per kind of error. This allows us to present different reactions for different errors in the application, thus improving the user experience.</p> <p>In the example above, the <code>PostUpdateMutationPayload</code> type contains field <code>errors</code>, which returns a list of <code>CustomPostUpdateMutationErrorPayloadUnion</code>. This is a union type which includes the list of all possible errors that can happen when modifying a custom post (to be queried via introspection field <code>__typename</code>):</p> <ul> <li><code>CustomPostDoesNotExistErrorPayload</code></li> <li><code>GenericErrorPayload</code></li> <li><code>LoggedInUserHasNoEditingCustomPostCapabilityErrorPayload</code></li> <li><code>LoggedInUserHasNoPermissionToEditCustomPostErrorPayload</code></li> <li><code>LoggedInUserHasNoPublishingCustomPostCapabilityErrorPayload</code></li> <li><code>UserIsNotLoggedInErrorPayload</code></li> </ul> <p>If the operation was successful, we will receive:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;updatePost&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SUCCESS&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;errors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1724</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Some title&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;publish&quot;</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>If the user is not logged in, we will receive:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;updatePost&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;FAILURE&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;errors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n        <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;__typename&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;UserIsNotLoggedInErrorPayload&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;You must be logged in to create or update custom posts&quot;</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>If the user doesn&#39;t have the permission to edit posts, we will receive:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;updatePost&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;FAILURE&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;errors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n        <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;__typename&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;LoggedInUserHasNoEditingCustomPostCapabilityErrorPayload&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Your user doesn&#x27;t have permission for editing custom posts.&quot;</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>As a consequence of all the additional <code>MutationPayload</code>, <code>MutationErrorPayloadUnion</code> and <code>ErrorPayload</code> types added, the GraphQL schema will have a bigger size:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.2.3/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/mutations/../../images/mutations-using-payload-object-types.png" alt="GraphQL schema with payload object types for mutations" title="GraphQL schema with payload object types for mutations"></p> <h3 id="mutated-entity">Mutated entity</h3> <p>The mutation will directly return the mutated entity in case of success, or <code>null</code> in case of failure, and any error message will be displayed in the JSON response&#39;s top-level <code>errors</code> entry.</p> <p>For instance, mutation <code>updatePost</code> will return the object of type <code>Post</code>:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> UpdatePost <span class="hljs-punctuation">{</span>\n  updatePost<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1724</span>,\n    <span class="hljs-symbol">title</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;New title&quot;</span>,\n    <span class="hljs-symbol">status</span><span class="hljs-punctuation">:</span> publish\n  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    id\n    title\n    status\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>If the operation was successful, we will receive:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;updatePost&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1724</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Some title&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;publish&quot;</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>In case of errors, these will appear under the <code>errors</code> entry of the response. For instance, if the user is not logged in, we will receive:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;errors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;You must be logged in to create or update custom posts&#x27;&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;locations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n          <span class="hljs-punctuation">{</span>\n            <span class="hljs-attr">&quot;line&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;column&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span>\n          <span class="hljs-punctuation">}</span>\n        <span class="hljs-punctuation">]</span>\n      <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;updatePost&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>We must notice that, as a result, the top-level <code>errors</code> entry will contain not only syntax, schema validation and logic errors (eg: not passing a field argument&#39;s name, requesting a non-existing field, or calling <code>_sendHTTPRequest</code> and the network is down respectively), but also &quot;content validation&quot; errors (eg: &quot;you&#39;re not authorized to modify this post&quot;).</p> <p>Because there are no additional types added, the GraphQL schema will look leaner:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.2.3/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/mutations/../../images/mutations-not-using-payload-object-types.png" alt="GraphQL schema without payload object types for mutations" title="GraphQL schema without payload object types for mutations"></p> <h3 id="configuration">Configuration</h3> <p>Using payload object types for mutations in the schema can be configured as follows, in order of priority:</p> <p>✅ Specific mode for the custom endpoint or persisted query, defined in the schema configuration</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.2.3/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/mutations/../../images/schema-configuration-payload-object-types-for-mutations.png" alt="Defining if to use payload object types for mutations, set in the Schema configuration" title="Defining if to use payload object types for mutations, set in the Schema configuration"></p> <p>✅ Default mode, defined in the Settings</p> <p>If the schema configuration has value <code>&quot;Default&quot;</code>, it will use the mode defined in the Settings:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.2.3/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/mutations/../../images/settings-payload-object-types-for-mutations-default.png" alt="Defining if to use payload object types for mutations, in the Settings" title="Defining if to use payload object types for mutations, in the Settings"></p> </div> '}}]);