import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Client } from 'discord.js';
import { ComponentDiscovery } from './component.discovery';
import { MESSAGE_COMPONENT_METADATA } from '../necord.constants';
import { ExplorerService } from '../common';

@Module({})
export class ComponentsModule implements OnModuleInit, OnApplicationBootstrap {
	private readonly componentsMap = new Map<string, ComponentDiscovery>();

	public constructor(
		private readonly client: Client,
		private readonly explorerService: ExplorerService
	) {}

	public onModuleInit() {
		return this.explorerService.explore(
			MESSAGE_COMPONENT_METADATA,
			ComponentDiscovery,
			component =>
				this.componentsMap.set(
					[component.getComponentType(), component.getCustomId()].join(':'),
					component
				)
		);
	}

	public onApplicationBootstrap() {
		return this.client.on('interactionCreate', interaction => {
			if (!interaction.isMessageComponent()) return;

			return this.componentsMap
				.get([interaction.componentType, interaction.customId].join(':'))
				?.execute(interaction);
		});
	}
}
