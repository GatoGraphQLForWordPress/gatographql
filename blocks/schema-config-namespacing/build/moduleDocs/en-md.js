(window.webpackJsonpGatoGraphQLSchemaConfigNamespacing=window.webpackJsonpGatoGraphQLSchemaConfigNamespacing||[]).push([[1],{51:function(e,a){e.exports='<h1 id="schema-namespacing">Schema Namespacing</h1> <p>This module allows to have all types added to the schema by plugins be automatically namespaced, by prepending their names with the corresponding PHP package&#39;s owner and name (by default) or providing a specific prefix for them.</p> <p>Namespacing the schema avoids naming conflicts, which happens when different owners (eg: different teams in the company, or 3rd party plugins) use the same name for a type or interface.</p> <p>The WordPress data model is considered canonical, and its GraphQL schema types (such as <code>Post</code> and <code>User</code>) and interfaces (such as <code>Commentable</code> and <code>WithMeta</code>) are not namespaced.</p> <h2 id="how-it-works">How it works</h2> <p>In the namespaced schema, types <code>Event</code> and <code>Location</code> become <code>EM_Event</code> and <code>EM_Location</code> respectively, following the addition of prefix <code>EM_</code> to the types from a certain plugin.</p> <p>While the schema normally looks like this:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/master/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-namespacing/../../images/normal-interactive-schema.png" alt="Interactive schema"></p> <p>...its namespaced version looks like this:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/master/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-namespacing/../../images/namespaced-interactive-schema.png" alt="Namespaced interactive schema"></p> <h2 id="how-to-use">How to use</h2> <p>Namespacing the schema can be configured as follows, in order of priority:</p> <p>✅ Specific mode for the custom endpoint or persisted query, defined in the schema configuration</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/master/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-namespacing/../../images/schema-configuration-namespacing.png" alt="Namespacing, set in the Schema configuration" title="Namespacing, set in the Schema configuration"></p> <p>✅ Default mode, defined in the Settings</p> <p>If the schema configuration has value <code>&quot;Default&quot;</code>, it will use the mode defined in the Settings:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/master/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/schema-namespacing/../../images/settings-namespacing-default.png" alt="Namespacing in Settings" title="Namespacing in Settings"></p> </div> <h2 id="when-to-use">When to use</h2> <p>If plugins WooCommerce and Easy Digital Downloads both implemented a <code>Product</code> type for Gato GraphQL, then we could not normally install both plugins at the same time. The Schema namespacing module helps avert this conflict, because their type names would be converted into <code>WC_Product</code> and <code>EDD_Product</code> respectively.</p> <p>Similarly, the Marketing and Tutorials teams from the same company can release their own type <code>Discount</code>, instead of <code>Marketing_Discount</code> and <code>Tutorial_Discount</code>.</p> <h2 id="graphql-spec">GraphQL spec</h2> <p>This functionality is currently not part of the GraphQL spec, but it has been requested:</p> <ul> <li><a href="https://github.com/graphql/graphql-spec/issues/163">Issue #163 - Namespaces</a></li> </ul> '}}]);