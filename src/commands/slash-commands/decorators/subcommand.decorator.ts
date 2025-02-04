import { SlashCommandDiscovery, SlashCommandMeta } from '../slash-command.discovery';
import { ApplicationCommandOptionType } from 'discord.js';
import { Reflector } from '@nestjs/core';

export const Subcommand = Reflector.createDecorator<
	Omit<SlashCommandMeta, 'type' | 'options' | 'guilds'>
>({
	transform: options =>
		new SlashCommandDiscovery({
			type: ApplicationCommandOptionType.Subcommand,
			...options
		})
});
