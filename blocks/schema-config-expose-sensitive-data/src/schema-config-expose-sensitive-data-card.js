/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RadioControl } from '@wordpress/components';
import { compose, withState } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { getModuleDocMarkdownContentOrUseDefault } from './module-doc-markdown-loader';
import {
	InfoTooltip,
	SETTINGS_VALUE_LABEL,
	ATTRIBUTE_VALUE_DEFAULT,
	ATTRIBUTE_VALUE_ENABLED,
	ATTRIBUTE_VALUE_DISABLED,
	withCard,
	withEditableOnFocus,
} from '@gatographql/components';

const SchemaConfigExposeSensitiveDataCard = ( props ) => {
	const {
		isSelected,
		setAttributes,
		attributes: {
			enabledConst,
		},
	} = props;
	const options = [
		{
			label: SETTINGS_VALUE_LABEL,
			value: ATTRIBUTE_VALUE_DEFAULT,
		},
		{
			label: __('Expose “sensitive” data elements in the schema', 'gatographql'),
			value: ATTRIBUTE_VALUE_ENABLED,
		},
		{
			label: __('Do not expose “sensitive” data elements', 'gatographql'),
			value: ATTRIBUTE_VALUE_DISABLED,
		},
	];
	const optionValues = options.map( option => option.value );
	return (
		<>
			<em>{ __('Expose “sensitive” data elements in the schema?', 'gatographql') }</em>
			<InfoTooltip
				{ ...props }
				text={ __('Expose “sensitive” data elements in the GraphQL schema (such as field "Root.roles", field arg "Root.posts(status:)", and others), which provide access to potentially private user data', 'gatographql') }
			/>
			{ !isSelected && (
				<>
					<br />
					{ ( enabledConst == ATTRIBUTE_VALUE_DEFAULT || !optionValues.includes(enabledConst) ) &&
						<span>🟡 { __('Default', 'gatographql') }</span>
					}
					{ enabledConst == ATTRIBUTE_VALUE_ENABLED &&
						<span>✅ { __('Expose “sensitive” data elements in the schema', 'gatographql') }</span>
					}
					{ enabledConst == ATTRIBUTE_VALUE_DISABLED &&
						<span>❌ { __('Do not expose “sensitive” data elements', 'gatographql') }</span>
					}
				</>
			) }
			{ isSelected &&
				<RadioControl
					{ ...props }
					options={ options }
					selected={ enabledConst }
					onChange={ newValue => (
						setAttributes( {
							enabledConst: newValue
						} )
					)}
				/>
			}
		</>
	);
}

export default compose( [
	withEditableOnFocus(),
	withState( {
		header: __('Expose Sensitive Data in the Schema', 'gatographql'),
		className: 'gatographql-schema-expose-sensitive-data',
		getMarkdownContentCallback: getModuleDocMarkdownContentOrUseDefault
	} ),
	withCard(),
] )( SchemaConfigExposeSensitiveDataCard );