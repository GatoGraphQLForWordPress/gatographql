/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, withState } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { getModuleDocMarkdownContentOrUseDefault } from './module-doc-markdown-loader';
import {
	SchemaConfigMetaCard,
	withCustomizableConfiguration,
	withEditableOnFocus,
	withCard,
} from '@gatographql/components';

const SchemaConfigCommentMetaCard = ( props ) => {
	return (
		<SchemaConfigMetaCard
			{ ...props }
			labelEntity={ __('comments', 'gatographql') }
			labelExampleItem='description'
			labelExampleEntries={
				[
					'description',
					'/desc.*/',
					'#desc([a-zA-Z]*)#',
				]
			}
		/>
	);
}

export default compose( [
	withEditableOnFocus(),
	withState( {
		header: __('Comment Meta', 'gatographql'),
		className: 'gatographql-comment-meta',
		getMarkdownContentCallback: getModuleDocMarkdownContentOrUseDefault
	} ),
	withCard(),
	withCustomizableConfiguration(),
] )( SchemaConfigCommentMetaCard );