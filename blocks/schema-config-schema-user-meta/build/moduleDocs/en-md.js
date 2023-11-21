(window.webpackJsonpGatographqlSchemaConfigSchemaUserMeta=window.webpackJsonpGatographqlSchemaConfigSchemaUserMeta||[]).push([[1],{50:function(e,a){e.exports='<h1 id="user-meta">User Meta</h1> <p>Retrieve meta values for users, by querying fields <code>metaValue</code> and <code>metaValues</code>.</p> <p>For security reasons, which meta keys can be queried must be explicitly configured. By default, the list is empty.</p> <h2 id="description">Description</h2> <p>Query fields <code>metaValue</code> and <code>metaValues</code> on a user, passing the required meta key as field argument <code>key</code>.</p> <p>For instance, this query retrieves the user&#39;s <code>last_name</code> meta value (as long as allowed by configuration):</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  users <span class="hljs-punctuation">{</span>\n    id\n    <span class="hljs-symbol">lastName</span><span class="hljs-punctuation">:</span> metaValue<span class="hljs-punctuation">(</span><span class="hljs-symbol">key</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;last_name&quot;</span><span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="configuring-the-allowed-meta-keys">Configuring the allowed meta keys</h2> <p>We must configure the list of meta keys that can be queried via the meta fields.</p> <p>Each entry can either be:</p> <ul> <li>A regex (regular expression), if it&#39;s surrounded by <code>/</code> or <code>#</code>, or</li> <li>The full meta key, otherwise</li> </ul> <p>For instance, any of these entries match meta key <code>&quot;last_name&quot;</code>:</p> <ul> <li><code>last_name</code></li> <li><code>/last_.*/</code></li> <li><code>#last_([a-zA-Z]*)#</code></li> </ul> <p>There are 2 places where this configuration can take place, in order of priority:</p> <ol> <li>Custom: In the corresponding Schema Configuration</li> <li>General: In the Settings page</li> </ol> <p>In the Schema Configuration applied to the endpoint, select option <code>&quot;Use custom configuration&quot;</code> and then input the desired entries:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-user-meta/../../images/schema-configuration-user-meta-entries.png" alt="Defining the entries in the Schema Configuration" title="Defining the entries in the Schema Configuration"></p> <p>Otherwise, the entries defined in the &quot;User Meta&quot; tab from the Settings will be used:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-user-meta/../../images/settings-user-meta-entries.png" alt="Defining the entries in the Settings" title="Defining the entries in the Settings"></p> </div> <p>There are 2 behaviors, &quot;Allow access&quot; and &quot;Deny access&quot;:</p> <ul> <li><strong>Allow access:</strong> only the configured entries can be accessed, and no other can</li> <li><strong>Deny access:</strong> the configured entries cannot be accessed, all other entries can</li> </ul> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-user-meta/../../images/schema-configuration-user-meta-behavior.png" alt="Defining the access behavior" title="Defining the access behavior"></p> </div> <h2 id="performance-considerations">Performance considerations</h2> <p>Fetching multiple meta keys for the same object requires a single database call.</p> <p>However, every call to the database involves only 1 object.</p> <p>When the query involves a large number of results, resolving the query could become slow.</p> '}}]);