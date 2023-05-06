<?php

declare(strict_types=1);

namespace GatoGraphQL\GatoGraphQL\ConfigurationCache;

class ContainerCacheConfigurationManager extends AbstractCacheConfigurationManager
{
    /**
     * The timestamp from when last saving settings/modules to the DB
     */
    protected function getTimestamp(): int
    {
        return $this->getUserSettingsManager()->getContainerTimestamp();
    }

    /**
     * Cache under the plugin's cache/ subfolder
     */
    protected function getDirectoryName(): string
    {
        return 'container';
    }
}
