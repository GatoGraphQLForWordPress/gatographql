(window.webpackJsonpGatoGraphQLSchemaConfigurationAdditionalDocumentation=window.webpackJsonpGatoGraphQLSchemaConfigurationAdditionalDocumentation||[]).push([[0],{47:function(e,o){e.exports='<h1 id="anybuiltinscalar-type">AnyBuiltInScalar Type</h1> <p>Scalar type <code>AnyBuiltInScalar</code> represents any of <a href="https://spec.graphql.org/draft/#sec-Scalars.Built-in-Scalars">GraphQL&#39;s built-in scalar types</a>:</p> <ul> <li><code>String</code></li> <li><code>Int</code></li> <li><code>Boolean</code></li> <li><code>Float</code></li> <li><code>ID</code></li> </ul> <h2 id="description">Description</h2> <p>The GraphQL specification currently <a href="https://github.com/graphql/graphql-spec/issues/215">does not support the union of scalar types</a>.</p> <p>As such, if a field can return different scalar types, such as <code>Int</code> and <code>String</code>, currently we would need to recreate the field multiple times, one time per type, such as:</p> <ul> <li><code>optionValueInt</code></li> <li><code>optionValueString</code></li> </ul> <p>However, this can easily make the GraphQL schema become bloated, so it should be avoided, as much as possible.</p> <p>It is for this reason that <code>AnyBuiltInScalar</code> was introduced. It is used whenever data in WordPress can be stored in different formats: options (saved in the <code>wp_options</code> table) and meta values.</p> <p>The affected fields are:</p> <p>For <code>QueryRoot</code>:</p> <ul> <li><code>optionValue: AnyBuiltInScalar</code></li> <li><code>optionValues: [AnyBuiltInScalar]</code></li> </ul> <p>For <code>Post</code>, <code>Page</code>, <code>GenericCustomPost</code>, <code>Comment</code>, <code>User</code>, <code>Tag</code> and <code>Category</code>:</p> <ul> <li><code>metaValue: AnyBuiltInScalar</code></li> <li><code>metaValues: [AnyBuiltInScalar]</code></li> </ul> '}}]);