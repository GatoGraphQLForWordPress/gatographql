<?php

declare(strict_types=1);

namespace GatoGraphQL\GatoGraphQL\PluginSkeleton;

/**
 * Plugin Option names.
 *
 * They must be namespaced (via the OptionNamespacer service),
 * so that they all start with "gatographql-"
 */
class PluginOptions
{
    /**
     * Store the plugin/extension versions in the Options table,
     * to track when each of them is installed/updated.
     *
     * It is stored as an array of "plugin/extension baseName" => "version"
     */
    public final const PLUGIN_VERSIONS = 'plugin-versions';
}
