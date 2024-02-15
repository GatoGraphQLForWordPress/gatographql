(window.webpackJsonpGatoGraphQLSchemaConfiguration=window.webpackJsonpGatoGraphQLSchemaConfiguration||[]).push([[1],{51:function(e,t){e.exports='<h1 id="schema-configuration">Schema Configuration</h1> <p>A schema configuration is used by the Single Endpoint, Custom Endpoints and Persisted Queries to customize their behavior.</p> <h2 id="description">Description</h2> <p>The GraphQL schema can be configured with those elements provided by the different installed and enabled modules. (Go to the &quot;Modules&quot; page to see the list of all of them.)</p> <p>Each module can define its configuration through its own block in the Schema Configuration editor. This includes blocks for:</p> <ul> <li>Setting the schema as public or private</li> <li>Enabling “sensitive” data elements</li> <li>Namespacing the schema</li> <li>Using nested mutations</li> <li>Defining response headers</li> <li>Define who can access the schema via Access Control Lists</li> <li>Set-up HTTP caching via Cache Control Lists</li> <li>Many others</li> </ul> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/schema-configuration.png" alt="Schema Configuration"></p> <h2 id="creating-a-schema-configuration">Creating a Schema Configuration</h2> <p>Clicking on the Schema Configurations link in the menu, it displays the list of all of them:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/schema-configurations-page.png" alt="Schema Configurations in the admin"></p> </div> <p>A schema configuration is a custom post type (CPT). To create a new schema configuration, click on button &quot;Add New Schema Configuration&quot;, which will open the WordPress editor:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/new-schema-configuration.png" alt="Creating a new Schema Configuration"></p> </div> <p>We can optionally remove those configuration blocks which use the corresponding &quot;Default&quot; value from the Settings. The removed block can be added once again via the inserter menu, by clicking on the <code>+</code> button at the bottom (please notice that only one instance of each block can be inserted):</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/schema-configuration-removing-and-adding-blocks.gif" alt="Removing and adding blocks in the Schema Configuration"></p> <p>To configure the different elements in the schema configuration, click on corresponding input, and it becomes editable. Then select the entries that apply to the configuration. When you are done, click on &quot;Publish&quot;:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/editing-schema-configuration.gif" alt="Creating a new Schema Configuration"></p> <p>Once published, the schema configuration becomes available when editing a Custom Endpoint or Persisted Query:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/schema-configuration-in-custom-endpoint.png" alt="Selecting the Schema Configuration in the Custom Endpoint"></p> <p>If the Custom Endpoint or Persisted Query has value <code>&quot;Default&quot;</code>, then the schema configuration selected in the Settings for the corresponding endpoint, under tabs &quot;Custom Endpoints&quot; or &quot;Persisted Queries&quot;, will be used:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/settings-default-schema-configuration-for-custom-endpoints.png" alt="Default Schema Configuration in the Settings"></p> </div> <p>Opening the schema configuration&#39;s permalink in the browser will show its contents (as long as the user is logged-in and the user role has access to it):</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/2.1.1/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-configuration/../../images/schema-configuration-source.png" alt="Schema configuration&#39;s source"></p> <h2 id="editor-inputs">Editor Inputs</h2> <p>These inputs in the body of the editor are shipped with the plugin (more inputs can be added by extensions):</p> <table> <thead> <tr> <th>Input</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><strong>Expose Sensitive Data in the Schema</strong></td> <td>Expose “sensitive” data elements in the GraphQL schema (such as field <code>Root.roles</code>, field arg <code>Root.posts(status:)</code>, and others), which provide access to potentially private user data. If <code>"Default"</code> is selected, the value selected in the Settings is used.</td> </tr> <tr> <td><strong>Mutation Scheme</strong></td><td>Define if to enable mutations, and if the redundant fields from the root must be removed. If <code>"Default"</code> is selected, the value selected in the Settings is used.</td> </tr> <tr> <td><strong>Namespace Types?</strong></td><td>Define if to have all types in the schema automatically namespaced. If <code>"Default"</code> is selected, the value selected in the Settings is used.</td> </tr> <tr> <td><strong>Access Control Lists</strong></td> <td>(If module <code>Access Control</code> is enabled) Manage who can access the schema, by selecting the Access Control Lists that must be applied to the custom endpoint or persisted query</td> </tr> <tr> <td><strong>Public/Private Schema</strong></td> <td>(If module <code>Public/Private Schema</code> is enabled) When access to some a field or directive is denied, there are 2 ways for the API to behave:<ul><li><code>"Public"</code>: Provide an error message to the user, indicating why access is denied. This behavior makes the metadata from the schema always available.</li><li><code>"Private"</code>: The error message indicates that the field or directive does not exist. This behavior exposes the metadata from the schema only to those users who can access it.</li></ul>If <code>"Default"</code> is selected, the value selected in the Settings is used.</td> </tr> <tr> <td><strong>Cache Control Lists</strong></td> <td>(If module <code>Cache Control</code> is enabled) Manage the behavior of HTTP caching, by selecting the Cache Control Lists that must be applied to the custom endpoint or persisted query</td> </tr> <tr> <td><em>Many others</em></td> <td>(Check the corresponding enabled modules...)</td> </tr> </tbody> </table> <p>These are the inputs in the Document settings:</p> <table> <thead> <tr> <th>Input</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><strong>Excerpt</strong></td> <td>Provide a description for the schema configuration.<br/>This input is available when module <code>Excerpt as Description</code> is enabled</td> </tr> </tbody></table> '}}]);