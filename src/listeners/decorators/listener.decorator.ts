import { ListenerDiscovery, ListenerMeta } from '../listener.discovery';
import { Reflector } from '@nestjs/core';

export const Listener = Reflector.createDecorator<ListenerMeta>({
	transform: options => new ListenerDiscovery(options)
});
