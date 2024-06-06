(window.webpackJsonpGatoGraphQLCustomEndpointOptions=window.webpackJsonpGatoGraphQLCustomEndpointOptions||[]).push([[1],{50:function(t,e){t.exports='<h1 id="custom-endpoints">Custom Endpoints</h1> <p>Create custom schemas, with custom access rules for different users, each available under its own endpoint.</p> <h2 id="description">Description</h2> <p>A GraphQL server normally exposes a single endpoint for retrieving and posting data.</p> <p>In addition to supporting the single endpoint, the Gato GraphQL also makes it possible to create custom endpoints, providing different schema configurations to deal with the needs from different targets, such as:</p> <ul> <li>Some specific client or user</li> <li>A group of users with more access to features (such as PRO users)</li> <li>One of the several applications, like mobile app or website</li> <li>3rd-party APIs</li> <li>Any other</li> </ul> <p>The custom endpoint is a Custom Post Type, and its permalink is the endpoint. An endpoint with title <code>&quot;My endpoint&quot;</code> and slug <code>my-endpoint</code> will be accessible under <code>/graphql/my-endpoint/</code>.</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/custom-endpoint.png" alt="Custom endpoint editor" title="Custom endpoint editor"></p> <h2 id="clients">Clients</h2> <p>Each custom endpoint has its own set of clients to interact with:</p> <p>✅ A <strong>GraphiQL client</strong>, available under the endpoint + <code>?view=graphiql</code> (eg: <code>/graphql/my-endpoint/?view=graphiql</code>).</p> <p>Module <code>GraphiQL for Custom Endpoints</code> must be enabled.</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/custom-endpoint-graphiql.png" alt="Custom endpoint&#39;s GraphiQL client" title="Custom endpoint&#39;s GraphiQL client"></p> <p>✅ An <strong>Interactive schema client</strong>, available under the endpoint + <code>?view=schema</code> (eg: <code>/graphql/my-endpoint/?view=schema</code>).</p> <p>Module <code>Interactive Schema for Custom Endpoints</code> must be enabled.</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/custom-endpoint-interactive-schema.png" alt="Custom endpoint&#39;s Interactive schema" title="Custom endpoint&#39;s Interactive schema"></p> <h2 id="creating-a-custom-endpoint">Creating a Custom Endpoint</h2> <p>Clicking on the Custom Endpoints link in the menu, it displays the list of all the created custom endpoints:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/custom-endpoints-page.png" alt="Custom Endpoints in the admin"></p> </div> <p>A custom endpoint is a custom post type (CPT). To create a new custom endpoint, click on button &quot;Add New GraphQL endpoint&quot;, which will open the WordPress editor:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/new-custom-endpoint.png" alt="Creating a new Custom Endpoint"></p> <p>When the custom endpoint is ready, publish it, and its permalink becomes its endpoint URL. Links to the endpoint (and source and clients) are shown on the &quot;Custom Endpoint Overview&quot; sidebar panel:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/custom-endpoint-overview.png" alt="Custom Endpoint Overview"></p> <p>Appending <code>?view=source</code> to the permalink, it will show the endpoint&#39;s configuration (as long as the user is logged-in and the user role has access to it):</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/custom-endpoint-source.png" alt="Custom endpoint source"></p> <p>By default, the custom endpoint has path <code>/graphql/</code>, and this value is configurable through the Settings:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/settings-custom-endpoints.png" alt="Custom endpoint Settings"></p> </div> <h3 id="schema-configuration">Schema configuration</h3> <p>Defining what elements the schema contains, and what access will users have to it, is defined in the schema configuration.</p> <p>So we must create a create a schema configuration, and then select it from the dropdown:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/select-schema-configuration.png" alt="Selecting the schema configuration"></p> <h3 id="organizing-custom-endpoints-by-category">Organizing Custom Endpoints by Category</h3> <p>On the sidebar panel &quot;Endpoint categories&quot; we can add categories to help manage the Custom Endpoint:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/graphql-custom-endpoint-editor-with-categories.png" alt="Endpoint categories when editing a Custom Endpoint"></p> <p>For instance, we can create categories to manage endpoints by client, application, or any other required piece of information:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/graphql-endpoint-categories.png" alt="List of endpoint categories"></p> <p>On the list of Custom Endpoints, we can visualize their categories and, clicking on any category link, or using the filter at the top, will only display all entries for that category:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/graphql-custom-endpoints-with-categories.png" alt="List of Custom Endpoints with their categories"></p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/graphql-custom-endpoints-filtering-by-category.png" alt="Filtering Custom Endpoints by category"></p> <h3 id="private-endpoints">Private endpoints</h3> <p>By setting the status of the Custom Endpoint as <code>private</code>, the endpoint can only be accessed by the admin user. This prevents our data from being unintentionally shared with users who should not have access to the data.</p> <p>For instance, we can create private Custom Endpoints that help manage the application, such as retrieving data to create reports with our metrics.</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/private-custom-endpoint.png" alt="Private Custom Endpoint"></p> <h3 id="password-protected-endpoints">Password-protected endpoints</h3> <p>If we create a Custom Endpoint for a specific client, we can now assign a password to it, to provide an additional level of security that only that client will access the endpoint.</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/password-protected-custom-endpoint.png" alt="Password-protected Custom Endpoint"></p> <p>When first accessing a password-protected endpoint (whether accessing the endpoint directly, or its GraphiQL or Interactive Schema clients), we encounter a screen requesting the password:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/password-protected-custom-endpoint-unauthorized.png" alt="Password-protected Custom Endpoint: First access"></p> <p>Once the password is provided and validated, only then the user will access the intended endpoint or client:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.5.2/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/custom-endpoints/../../images/password-protected-custom-endpoint-authorized.png" alt="Password-protected Custom Endpoint: After authorization"></p> <h2 id="editor-inputs">Editor Inputs</h2> <p>These inputs in the body of the editor are shipped with the plugin (more inputs can be added by extensions):</p> <table> <thead> <tr> <th>Input</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><strong>Title</strong></td> <td>Custom endpoint\'s title</td> </tr> <tr> <td><strong>Schema configuration</strong></td> <td>From the dropdown, select the schema configuration that applies to the custom endpoint, or one of these options: <ul><li><code>"Default"</code>: the schema configuration is the one selected on the plugin\'s Settings</li><li><code>"None"</code>: the custom endpoint will be unconstrained</li><li><code>"Inherit from parent"</code>: Use the same schema configuration as the parent custom endpoint.<br/>This option is available when module <code>"API Hierarchy"</code> is enabled, and the custom endpoint has a parent query (selected on the Document settings)</li></ul></td> </tr> <tr> <td><strong>Options</strong></td> <td>Select if the custom endpoint is enabled.<br/>It\'s useful to disable a custom endpoint it\'s a parent query in an API hierarchy</td> </tr> <tr> <td><strong>GraphiQL</strong></td> <td>Enable/disable attaching a GraphiQL client to the endpoint, accessible under <code>?view=graphiql</code></td> </tr> <tr> <td><strong>Interactive Schema</strong></td> <td>Enable/disable attaching an Interactive schema client to the endpoint, accessible under <code>?view=schema</code></td> </tr> <tr> <td><strong>API Hierarchy</strong></td> <td>Use the same query as the parent custom endpoint.<br/>This section is enabled when the custom endpoint has a parent query (selected on the Document settings)</td> </tr> </tbody> </table> <p>These are the inputs in the Document settings:</p> <table> <thead> <tr> <th>Input</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><strong>Permalink</strong></td> <td>The endpoint under which the custom endpoint will be available</td> </tr> <tr> <td><strong>Categories</strong></td> <td>Can categorize the custom endpoint.<br/>Eg: <code>mobile</code>, <code>app</code>, etc</td> </tr> <tr> <td><strong>Excerpt</strong></td> <td>Provide a description for the custom endpoint.<br/>This input is available when module <code>&quot;Excerpt as Description&quot;</code> is enabled</td> </tr> <tr> <td><strong>Page attributes</strong></td> <td>Select a parent custom endpoint.<br/>This input is available when module <code>&quot;API Hierarchy&quot;</code> is enabled</td> </tr> </tbody></table> \x3c!-- ## Settings\n\n| Option | Description | \n| --- | --- |\n| **Endpoint base slug** | The base path for the custom endpoint URL. It defaults to `graphql` | --\x3e \x3c!-- ## Resources\n\nVideo showing how to create a custom endpoint: <a href="https://vimeo.com/413503485" target="_blank">vimeo.com/413503485</a>. --\x3e '}}]);